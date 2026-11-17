#!/usr/bin/env bash
# External uptime check for symbol.ngo, run every 5 min by .github/workflows/uptime.yml (ported from wbm-uptime).
#
# It runs on GitHub's runners and checks the published site from outside. Pages and redirects:
#   https://symbol.ngo/, /en/, /sitemap.xml, /documentsart/ answer 200 and contain an expected string;
#   https://www.symbol.ngo/, http://symbol.ngo/ and http://www.symbol.ngo/ end up on https://symbol.ngo/.
#
# State (up/down) lives in $STATE_FILE, which the workflow carries between runs with actions/cache. Telegram gets one
# message when the site goes down and one when it recovers, never one every 5 min. A failing check is retried once
# after 45 s, so a single slow response does not page anyone.
#
# The daily run (MODE=daily) also warns when
#   - the TLS certificate of symbol.ngo expires in < 14 days (GitHub Pages renews it by itself; a warning means the
#     renewal is stuck, for example the DNS records changed), and
#   - the registration of the domain symbol.ngo expires in < 30 days (RDAP of the .ngo registry; renew at Cloudflare).
#
# Env: SMTP_USER, SMTP_PASSWORD, ALERT_EMAIL_TO (email alerts) and/or TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID (repository secrets),
#      SMTP_HOST (default smtp.gmail.com), STATE_FILE, MODE (check | daily | test).
# Without the two secrets nothing is sent: the script prints what it would have sent, and still exits 0.
# Locally: bash scripts/uptime-check.sh          (prints instead of sending)
#          MODE=daily bash scripts/uptime-check.sh

set -uo pipefail

STATE_FILE="${STATE_FILE:-.uptime/state}"
MODE="${MODE:-check}"
SITE="${UPTIME_SITE:-https://symbol.ngo}"
DOMAIN="${UPTIME_DOMAIN:-symbol.ngo}"
CERT_WARN_DAYS=14
DOMAIN_WARN_DAYS=30

# url|text the body must contain. Final status after redirects must be 200.
CHECKS=(
  "$SITE/|Символ"
  "$SITE/en/|Symbol"
  "$SITE/sitemap.xml|<urlset"
  "$SITE/documentsart/|Покажіть свої документи"
)

# url|where it must end up (the final URL after redirects, with status 200).
REDIRECTS=(
  "https://www.$DOMAIN/|$SITE/"
  "http://$DOMAIN/|$SITE/"
  "http://www.$DOMAIN/|$SITE/"
)

# Telegram uses HTML parse mode: a literal < or & in a message would be rejected.
escape_html() { sed -e 's/&/\&amp;/g' -e 's/</\&lt;/g' -e 's/>/\&gt;/g'; }

# Email through SMTP over TLS (a Gmail app password of the sending account). Recipients: comma-separated ALERT_EMAIL_TO.
send_email() {
  if [[ -z "${SMTP_USER:-}" || -z "${SMTP_PASSWORD:-}" || -z "${ALERT_EMAIL_TO:-}" ]]; then
    echo "[email disabled: secrets SMTP_USER / SMTP_PASSWORD / ALERT_EMAIL_TO are not set]"
    return
  fi
  local text subject mail rcpts=() addr
  # The messages are written for Telegram's HTML mode: drop the tags and decode the three escapes for plain text.
  text=$(printf '%s' "$1" | sed -e 's/<[^>]*>//g' -e 's/&lt;/</g' -e 's/&gt;/>/g' -e 's/&amp;/\&/g')
  subject="=?UTF-8?B?$(printf '%s' "$(printf '%s\n' "$text" | head -n 1)" | base64 | tr -d '\n')?="
  mail=$(mktemp)
  printf 'From: symbol.ngo uptime <%s>\r\nTo: %s\r\nSubject: %s\r\nMIME-Version: 1.0\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: 8bit\r\n\r\n%s\r\n' \
    "$SMTP_USER" "$ALERT_EMAIL_TO" "$subject" "$text" > "$mail"
  IFS=',' read -ra list <<< "$ALERT_EMAIL_TO"
  for addr in "${list[@]}"; do addr="${addr// /}"; [[ -n "$addr" ]] && rcpts+=(--mail-rcpt "$addr"); done
  if curl -sS --max-time 30 --ssl-reqd --url "smtps://${SMTP_HOST:-smtp.gmail.com}:465" --user "$SMTP_USER:$SMTP_PASSWORD" \
      --mail-from "$SMTP_USER" "${rcpts[@]}" --upload-file "$mail" >/dev/null 2>&1; then
    echo "Email: sent"
  else
    echo "::warning::Email send failed (check SMTP_USER / SMTP_PASSWORD; Gmail needs an app password)"
  fi
  rm -f "$mail"
}

send() {
  send_email "$1"
  if [[ -z "${TELEGRAM_BOT_TOKEN:-}" || -z "${TELEGRAM_CHAT_ID:-}" ]]; then
    echo "[telegram disabled: secrets TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID are not set] Message:"
    echo "$1"
    return
  fi
  local response
  response=$(curl -sS --max-time 20 -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
    --data-urlencode "chat_id=${TELEGRAM_CHAT_ID}" \
    --data-urlencode "text=$1" \
    --data-urlencode "parse_mode=HTML" \
    --data-urlencode "disable_web_page_preview=true" 2>&1) || true
  # Telegram answers errors with HTTP 4xx + {"ok":false,"description":…}; curl still exits 0.
  if [[ "$response" == *'"ok":true'* ]]; then
    echo "Telegram: sent"
  else
    echo "::warning::Telegram send failed: $(echo "$response" | grep -o '"description":"[^"]*"')"
  fi
}

# Seconds since the epoch for a date string: GNU date (runners) first, then BSD date (macOS).
to_epoch() {
  date -d "$1" +%s 2>/dev/null || date -j -f '%b %e %T %Y %Z' "$1" +%s 2>/dev/null || date -j -u -f '%Y-%m-%dT%H:%M:%S' "${1%%.*}" +%s 2>/dev/null
}

# Prints a reason for every failing check; prints nothing when all pass.
run_checks() {
  local entry url needle body code
  for entry in "${CHECKS[@]}"; do
    url="${entry%%|*}"
    needle="${entry#*|}"
    body=$(mktemp)
    code=$(curl -sSL --max-time 20 -A 'symbol-uptime/1 (+github-actions)' \
      -o "$body" -w '%{http_code}' "$url" 2>/dev/null) || code="${code:-000}"
    if [[ "$code" != 200 ]]; then
      echo "$url → HTTP $code"
    elif [[ -n "$needle" ]] && ! grep -qF "$needle" "$body"; then
      echo "$url → 200, but the page has no «$needle»"
    fi
    rm -f "$body"
  done
  local target final
  for entry in "${REDIRECTS[@]}"; do
    url="${entry%%|*}"
    target="${entry#*|}"
    final=$(curl -sSL --max-time 20 -A 'symbol-uptime/1 (+github-actions)' -o /dev/null \
      -w '%{http_code} %{url_effective}' "$url" 2>/dev/null) || final="000 unreachable"
    if [[ "$final" != "200 $target" ]]; then
      echo "$url → ends at «${final#* }» (HTTP ${final%% *}), expected $target"
    fi
  done
}

check_cert() {
  local end end_s days
  end=$(echo | openssl s_client -servername "$DOMAIN" -connect "$DOMAIN:443" 2>/dev/null |
    openssl x509 -noout -enddate 2>/dev/null | cut -d= -f2)
  [[ -z "$end" ]] && return # the site check already reports an unreachable host
  end_s=$(to_epoch "$end") || return
  days=$(((end_s - $(date +%s)) / 86400))
  echo "TLS certificate: $days days left"
  if ((days < CERT_WARN_DAYS)); then
    send "⚠️ <b>${DOMAIN}: SSL-сертифікат спливає через ${days} дн.</b>
GitHub Pages зазвичай продовжує його сам. Перевір Settings → Pages (HTTPS) і DNS-записи в Cloudflare: вони мають бути «DNS only»."
  fi
}

check_domain() {
  local json expires end_s days
  json=$(curl -sSL --max-time 30 "https://rdap.org/domain/$DOMAIN" 2>/dev/null) || json=""
  expires=$(printf '%s' "$json" | jq -r '[.events[]? | select(.eventAction == "expiration") | .eventDate][0] // empty' 2>/dev/null)
  if [[ -z "$expires" ]]; then
    echo "::warning::Domain expiry: RDAP gave no expiration date for $DOMAIN (skipped)"
    return
  fi
  end_s=$(to_epoch "$expires") || { echo "::warning::Domain expiry: cannot read date «$expires»"; return; }
  days=$(((end_s - $(date +%s)) / 86400))
  echo "Domain registration: $days days left (until ${expires%%T*})"
  if ((days < DOMAIN_WARN_DAYS)); then
    send "⚠️ <b>Домен ${DOMAIN} спливає через ${days} дн.</b> (до ${expires%%T*})
Продовж реєстрацію в Cloudflare: Domain Registration → Manage Domains."
  fi
}

if [[ "$MODE" == test ]]; then
  send "🧪 Тест монітора ${DOMAIN}: якщо ти це бачиш, алерти про падіння сайту дійдуть сюди."
  exit 0
fi

mkdir -p "$(dirname "$STATE_FILE")"
previous=$(cat "$STATE_FILE" 2>/dev/null || echo up)

failures=$(run_checks)
if [[ -n "$failures" ]]; then
  echo "First attempt failed, retrying in ${RETRY_DELAY:-45} s:"
  echo "$failures"
  sleep "${RETRY_DELAY:-45}"
  failures=$(run_checks)
fi

if [[ -n "$failures" ]]; then
  echo "DOWN:"
  echo "$failures"
  if [[ "$previous" != down ]]; then
    send "🚨 <b>${DOMAIN} не працює</b>
$(printf '%s' "$failures" | escape_html)

Наступне повідомлення прийде, коли сайт відновиться."
  fi
  echo down >"$STATE_FILE"
else
  echo "UP: all $((${#CHECKS[@]} + ${#REDIRECTS[@]})) checks passed"
  if [[ "$previous" == down ]]; then
    send "✅ <b>${DOMAIN} знову працює</b>"
  fi
  echo up >"$STATE_FILE"
fi

# The workflow saves the state cache only when it changed (no new cache entry every 5 min).
current=$(cat "$STATE_FILE")
[[ -n "${GITHUB_OUTPUT:-}" && "$current" != "$previous" ]] && echo "changed=true" >>"$GITHUB_OUTPUT"

if [[ "$MODE" == daily ]]; then
  check_cert
  check_domain
fi
exit 0
