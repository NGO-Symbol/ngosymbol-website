<script setup lang="ts">
// Click feedback: each kind of control answers with its own small shape at the pointer,
// drawn from the logo (ring, arc, diamond, dots). Off for reduced motion.
const variants: [selector: string, effect: string][] = [
  ['.orbit-hook__title a', 'diamond'],
  ['.project-card, .person-card', 'arc'],
  ['.site-header nav a:not(.nav-support)', 'dots'],
  ['.button, .nav-support, .segmented button, .filters button', 'ring'],
  ['.event-row, .calendar__event, .open-call', 'wave'],
  ['.wordmark', ''],
  ['a, button', 'spark']
]

function onPointerDown(event: PointerEvent) {
  if (event.button !== 0 || matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const target = event.target as Element | null
  if (!target) return
  const match = variants.find(([selector]) => target.closest(selector))
  if (!match || !match[1]) return
  const effect = document.createElement('span')
  effect.className = `click-fx click-fx--${match[1]}`
  effect.style.left = `${event.clientX}px`
  effect.style.top = `${event.clientY}px`
  if (match[1] === 'dots') {
    for (let i = 0; i < 8; i++) {
      const dot = document.createElement('i')
      dot.style.setProperty('--angle', `${i * 45}deg`)
      if (i % 2) dot.style.background = 'var(--symbol-apricot)'
      effect.append(dot)
    }
  }
  document.body.append(effect)
  effect.addEventListener('animationend', () => effect.remove(), { once: true })
  window.setTimeout(() => effect.remove(), 1200)
}

onMounted(() => document.addEventListener('pointerdown', onPointerDown, { passive: true }))
onBeforeUnmount(() => document.removeEventListener('pointerdown', onPointerDown))
</script>

<template>
  <span hidden />
</template>

<style>
.click-fx { position: fixed; z-index: 90; pointer-events: none; transform: translate(-50%, -50%); }
.click-fx--ring { width: 18px; height: 18px; border-radius: 50%; border: 2px solid var(--symbol-violet); animation: fx-ring .55s ease-out forwards; }
.click-fx--arc { width: 60px; height: 60px; border-radius: 50%; border: 9px solid var(--symbol-apricot); border-right-color: transparent; animation: fx-arc .8s cubic-bezier(.2, .8, .3, 1) forwards; }
.click-fx--diamond { width: 14px; height: 14px; background: var(--symbol-violet); animation: fx-diamond .6s cubic-bezier(.2, .8, .3, 1) forwards; }
.click-fx--dots { width: 0; height: 0; }
.click-fx--dots i { position: absolute; width: 9px; height: 9px; margin: -4.5px; border-radius: 50%; background: var(--symbol-violet); animation: fx-dot .5s ease-out forwards; }
.click-fx--wave { width: 24px; height: 24px; border-radius: 50%; background: color-mix(in srgb, var(--symbol-apricot) 70%, transparent); animation: fx-wave .6s ease-out forwards; }
.click-fx--spark { width: 10px; height: 10px; border: 2px solid var(--symbol-plum); animation: fx-spark .45s ease-out forwards; }
@keyframes fx-ring { to { width: 170px; height: 170px; border-width: 1px; opacity: 0; } }
@keyframes fx-arc { from { transform: translate(-50%, -50%) rotate(-120deg) scale(.3); opacity: 1; } to { transform: translate(-50%, -50%) rotate(300deg) scale(2.6); opacity: 0; } }
@keyframes fx-diamond { from { transform: translate(-50%, -50%) rotate(45deg) scale(.5); opacity: 1; } to { transform: translate(-50%, -50%) rotate(585deg) scale(5); opacity: 0; } }
@keyframes fx-dot { from { transform: rotate(var(--angle)) translateX(0); opacity: 1; } to { transform: rotate(var(--angle)) translateX(64px) scale(.4); opacity: 0; } }
@keyframes fx-wave { to { width: 420px; height: 420px; opacity: 0; } }
@keyframes fx-spark { from { transform: translate(-50%, -50%) rotate(45deg) scale(1); opacity: 1; } to { transform: translate(-50%, -50%) rotate(225deg) scale(4); opacity: 0; } }

/* Tactile press for buttons and cards */
.button:active, .nav-support:active, .segmented button:active, .filters button:active { transform: scale(.96); }
.project-card:active, .person-card:active { transform: scale(.985); }
</style>
