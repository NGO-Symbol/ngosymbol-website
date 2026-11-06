// Generative portrait stand-ins built from the logo: its spiral, the square tip of the spiral, the orbit rings and the brand colours.
// The picture is random but seeded, so one person always gets the same one (on the server, in the browser and on every visit).
import { spiralPath } from './brand-spiral'

export type ArtShape = { tag: 'path' | 'circle' | 'rect' | 'g'; attrs: Record<string, string | number>; children?: ArtShape[] }
export interface PortraitArt { background: string; shapes: ArtShape[] }

// Fixed brand values, not theme tokens: the dark theme swaps those, and the art should look the same in both.
const violet = '#9280a6'
const apricot = '#fdd08f'
const plum = '#302738'
const lilac = '#d8cfe1'
const cream = '#fff7eb'
const palettes = [
  { bg: violet, main: apricot, accent: plum, soft: lilac },
  { bg: plum, main: apricot, accent: violet, soft: lilac },
  { bg: apricot, main: violet, accent: plum, soft: cream },
  { bg: lilac, main: violet, accent: plum, soft: apricot },
  { bg: plum, main: violet, accent: apricot, soft: lilac },
]

const LOGO_CENTER = 89.11
// Changing it reshuffles every picture. This value gives the people on the site today a varied set.
const SALT = 'symbol-96'
const round = (value: number) => Math.round(value * 100) / 100

function hash(text: string) {
  let h = 2166136261
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619)
  return h >>> 0
}

// mulberry32: a small seeded generator returning 0..1
function generator(seed: number) {
  let state = seed
  return () => {
    state = (state + 0x6d2b79f5) | 0
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function spiral(fill: string, x: number, y: number, scale: number, rotate: number, options: { flip?: boolean; opacity?: number } = {}): ArtShape {
  const size = `${options.flip ? -round(scale) : round(scale)} ${round(scale)}`
  return {
    tag: 'g',
    attrs: { transform: `translate(${round(x)} ${round(y)}) rotate(${round(rotate)}) scale(${size}) translate(${-LOGO_CENTER} ${-LOGO_CENTER})`, fill, opacity: options.opacity ?? 1 },
    children: [{ tag: 'path', attrs: { d: spiralPath, transform: 'matrix(1.333333 0 0 -1.333333 145.1133 104.1613)' } }],
  }
}

const dot = (fill: string, cx: number, cy: number, r: number): ArtShape => ({ tag: 'circle', attrs: { cx: round(cx), cy: round(cy), r: round(r), fill } })

// the square tip of the logo's spiral
function tip(fill: string, x: number, y: number, size: number, rotate: number): ArtShape {
  return { tag: 'rect', attrs: { x: round(x - size / 2), y: round(y - size / 2), width: round(size), height: round(size), fill, transform: `rotate(${round(rotate)} ${round(x)} ${round(y)})` } }
}

function ring(stroke: string, r: number, width: number, dash?: string): ArtShape {
  return { tag: 'circle', attrs: { cx: 50, cy: 50, r: round(r), fill: 'none', stroke, 'stroke-width': round(width), ...(dash ? { 'stroke-dasharray': dash } : {}) } }
}

type Colours = (typeof palettes)[number]
type Composition = (c: Colours, random: () => number) => ArtShape[]

const onCircle = (radius: number, angle: number) => [50 + radius * Math.cos(angle * Math.PI / 180), 50 + radius * Math.sin(angle * Math.PI / 180)] as const

const compositions: Composition[] = [
  // rosette: spirals turning around one centre
  (c, random) => {
    const count = 3 + Math.floor(random() * 4)
    const start = random() * 360
    const flip = random() > .5
    const petals = Array.from({ length: count }, (_, i) => {
      const angle = start + i * 360 / count
      const [x, y] = onCircle(21, angle)
      return spiral(i % 2 ? c.soft : c.main, x, y, .44, angle + 90, { flip })
    })
    return [...petals, dot(c.accent, 50, 50, 5)]
  },
  // whirl: the spiral echoing into itself
  (c, random) => {
    const colours = [c.main, c.accent, c.soft]
    const turn = 24 + random() * 34
    const start = random() * 360
    const shift = Math.floor(random() * 3)
    return Array.from({ length: 5 }, (_, i) => spiral(colours[(i + shift) % 3]!, 50, 50, 1.3 * .68 ** i, start + i * turn))
  },
  // close-up: one huge spiral past the edge, with a planet on an orbit
  (c, random) => {
    const angle = random() * 360
    const [x, y] = onCircle(13, angle)
    const [px, py] = onCircle(39, angle + 150 + random() * 60)
    return [ring(c.soft, 39, .6, '1 2.4'), spiral(c.main, x, y, 1.2, random() * 360, { flip: random() > .5 }), dot(c.accent, px, py, 5.5), tip(c.soft, px, py, 3, 45)]
  },
  // orbits: rings of different weight around a small spiral, as in the logo's circle
  (c, random) => {
    const rings = [ring(c.soft, 44, 1.2), ring(c.main, 36, 3.5, `${round(40 + random() * 60)} ${round(14 + random() * 26)}`), ring(c.soft, 27, .8, '1.5 3')]
    const planets = Array.from({ length: 3 }, (_, i) => {
      const [x, y] = onCircle([44, 36, 27][i]!, random() * 360)
      return dot(i === 1 ? c.accent : c.main, x, y, [3, 4.5, 2.5][i]!)
    })
    return [...rings, spiral(c.main, 50, 50, .32, random() * 360), ...planets]
  },
  // duet: two spirals meeting, one the mirror of the other
  (c, random) => {
    const angle = random() * 360
    const [x1, y1] = onCircle(19, angle)
    const [x2, y2] = onCircle(19, angle + 180)
    const [tx, ty] = onCircle(38, angle + 90)
    return [spiral(c.main, x1, y1, .78, angle), spiral(c.soft, x2, y2, .78, angle + 180, { flip: true }), tip(c.accent, tx, ty, 8, angle + 45), tip(c.accent, 100 - tx, 100 - ty, 4, angle)]
  },
]

export function portraitArt(seed: string): PortraitArt {
  const random = generator(hash(`${SALT}:${seed}`))
  // colours and composition come from separate hashes, so neither predicts the other
  const colours = palettes[hash(`${SALT}:colours:${seed}`) % palettes.length]!
  const compose = compositions[hash(`${SALT}:shape:${seed}`) % compositions.length]!
  return { background: colours.bg, shapes: compose(colours, random) }
}
