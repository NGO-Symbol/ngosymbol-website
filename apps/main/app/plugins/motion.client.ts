// Motion tiers on <html data-motion>: «full», «lite» or «off», so animations never slow a device down.
// - off: the visitor asked for reduced motion in the system settings.
// - lite: data saver is on, or the device is weak (≤ 2 CPU cores or ≤ 2 GB of memory), or — watched live — the page
//   keeps dropping frames (over a quarter of frames slower than 50 ms during three seconds). Lite keeps the page
//   calm: no endless or decorative motion, quick reveals, no logo or tap animations (styles in assets/css/main.css).
// The tier only goes down during a visit, never back up, so the page does not flicker between the two.
export default defineNuxtPlugin(() => {
  const root = document.documentElement
  const nav = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number }
  const weak = !!nav.connection?.saveData || (nav.deviceMemory ?? 8) <= 2 || (navigator.hardwareConcurrency ?? 8) <= 2
  root.dataset.motion = matchMedia('(prefers-reduced-motion: reduce)').matches ? 'off' : weak ? 'lite' : 'full'
  if (root.dataset.motion !== 'full') return

  let frames = 0
  let slow = 0
  let last = 0
  let windowStart = 0
  function tick(now: number) {
    if (last) {
      frames++
      if (now - last > 50) slow++
    }
    else windowStart = now
    last = now
    if (now - windowStart > 3000) {
      if (frames > 30 && slow / frames > 0.25) { root.dataset.motion = 'lite'; return }
      frames = 0; slow = 0; windowStart = now
    }
    if (document.visibilityState === 'visible') requestAnimationFrame(tick)
  }
  // Hidden tabs get no frames; watching starts again (with a fresh window) when the page is shown.
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && root.dataset.motion === 'full') { last = 0; requestAnimationFrame(tick) }
  })
  requestAnimationFrame(tick)
})
