// Which network a link points to, read from its address: drives the name and the icon of <SocialLink>.
export type Network = 'instagram' | 'telegram' | 'facebook' | 'whatsapp' | 'linkedin' | 'youtube' | 'tiktok' | 'x' | 'behance' | 'vimeo' | 'email' | 'website'

const hosts: [RegExp, Network, string][] = [
  [/instagram\.com/, 'instagram', 'Instagram'],
  [/(t\.me|telegram\.(me|org))/, 'telegram', 'Telegram'],
  [/(facebook\.com|fb\.com)/, 'facebook', 'Facebook'],
  [/(whatsapp\.com|wa\.me)/, 'whatsapp', 'WhatsApp'],
  [/linkedin\.com/, 'linkedin', 'LinkedIn'],
  [/(youtube\.com|youtu\.be)/, 'youtube', 'YouTube'],
  [/tiktok\.com/, 'tiktok', 'TikTok'],
  [/(twitter\.com|x\.com)/, 'x', 'X'],
  [/behance\.net/, 'behance', 'Behance'],
  [/vimeo\.com/, 'vimeo', 'Vimeo']
]

export function networkOf(url: string): { network: Network; name: string } {
  if (url.startsWith('mailto:')) return { network: 'email', name: url.slice(7) }
  let host = ''
  try { host = new URL(url).hostname.replace(/^www\./, '') } catch {}
  for (const [pattern, network, name] of hosts) if (pattern.test(host)) return { network, name }
  return { network: 'website', name: host || url }
}

export function isSocialUrl(url?: string) {
  return !!url && networkOf(url).network !== 'website'
}
