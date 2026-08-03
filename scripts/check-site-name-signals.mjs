import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const homepage = readFileSync(resolve(root, 'dist/index.html'), 'utf8')

const fail = (message) => {
  console.error(`Site name signal check failed: ${message}`)
  process.exit(1)
}

const readMeta = (attribute, value) => {
  const escapedValue = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const pattern = new RegExp(`<meta\\s+${attribute}="${escapedValue}"\\s+content="([^"]*)"\\s*\\/?>`, 'i')
  return homepage.match(pattern)?.[1]
}

if (!homepage.includes('<link rel="canonical" href="https://cardiospecialvh.tw/"')) {
  fail('homepage canonical URL must be https://cardiospecialvh.tw/')
}

for (const [attribute, value] of [
  ['name', 'application-name'],
  ['name', 'apple-mobile-web-app-title'],
  ['property', 'og:site_name']
]) {
  if (readMeta(attribute, value) !== '專心動物醫院') {
    fail(`${value} must be 專心動物醫院`)
  }
}

const schemas = [...homepage.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(
  (match) => JSON.parse(match[1])
)
const websiteNodes = schemas
  .flatMap((schema) => schema['@graph'] || [schema])
  .filter((schema) => schema['@type'] === 'WebSite')

if (websiteNodes.length !== 1) {
  fail(`homepage must expose exactly one WebSite node, found ${websiteNodes.length}`)
}

const website = websiteNodes[0]

if (website.name !== '專心動物醫院') {
  fail('WebSite.name must be 專心動物醫院')
}

if (website.url !== 'https://cardiospecialvh.tw/') {
  fail('WebSite.url must match the canonical homepage URL including the trailing slash')
}

const expectedAlternates = ['CardioSpecial', 'cardiospecialvh.tw']
if (JSON.stringify(website.alternateName) !== JSON.stringify(expectedAlternates)) {
  fail(`WebSite.alternateName must be ${JSON.stringify(expectedAlternates)}`)
}

console.log('Site name signal check passed.')
