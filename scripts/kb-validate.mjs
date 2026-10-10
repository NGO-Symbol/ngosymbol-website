import { readFile, readdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(fileURLToPath(new URL('..', import.meta.url)))
const graphDir = resolve(root, 'documents/knowledge/graph')

async function readJsonLines(name) {
  const text = await readFile(resolve(graphDir, name), 'utf8')
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .map((line, index) => {
      try {
        return JSON.parse(line)
      } catch (error) {
        throw new Error(`${name}:${index + 1}: ${error.message}`)
      }
    })
}

const nodes = await readJsonLines('nodes.jsonl')
const edges = await readJsonLines('edges.jsonl')
const nodeIds = new Set()
const allowedConfidence = new Set(['USER_CONFIRMED', 'EXTRACTED', 'INFERRED', 'PROPOSED'])

for (const node of nodes) {
  if (!node.id || !node.type || !node.label || !node.source) {
    throw new Error(`Invalid node: ${JSON.stringify(node)}`)
  }
  if (nodeIds.has(node.id)) throw new Error(`Duplicate node id: ${node.id}`)
  if (!allowedConfidence.has(node.confidence)) throw new Error(`Invalid node confidence: ${node.id}`)
  nodeIds.add(node.id)
}

for (const edge of edges) {
  if (!edge.source || !edge.target || !edge.relation || !edge.source_ref) {
    throw new Error(`Invalid edge: ${JSON.stringify(edge)}`)
  }
  if (!nodeIds.has(edge.source)) throw new Error(`Unknown edge source: ${edge.source}`)
  if (!nodeIds.has(edge.target)) throw new Error(`Unknown edge target: ${edge.target}`)
  if (!allowedConfidence.has(edge.confidence)) throw new Error(`Invalid edge confidence: ${edge.source}`)
}

const documents = await readdir(resolve(root, 'documents/knowledge'))
for (const required of ['INDEX.md', 'organization.md', 'website-strategy.md', 'technical-architecture.md']) {
  if (!documents.includes(required)) throw new Error(`Missing knowledge document: ${required}`)
}

console.log(`Knowledge base valid: ${nodes.length} nodes, ${edges.length} edges.`)
