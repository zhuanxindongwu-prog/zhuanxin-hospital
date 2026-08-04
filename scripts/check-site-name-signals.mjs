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

const countMatches = (pattern) => [...homepage.matchAll(pattern)].length

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

if (!homepage.match(/<title>專心動物醫院[^<]*<\/title>/i)) {
  fail('homepage title must start with 專心動物醫院')
}

if (!homepage.match(/<h1[^>]*>\s*專心動物醫院[\s\S]*?<\/h1>/i)) {
  fail('homepage H1 must contain 專心動物醫院')
}

for (const [label, pattern] of [
  ['title', /<title>/gi],
  ['description', /<meta\s+name="description"/gi],
  ['application-name', /<meta\s+name="application-name"/gi],
  ['og:site_name', /<meta\s+property="og:site_name"/gi],
  ['canonical', /<link\s+rel="canonical"/gi]
]) {
  const count = countMatches(pattern)
  if (count !== 1) {
    fail(`homepage must expose exactly one ${label} tag, found ${count}`)
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

const expectedAlternates = ['專心動物', 'Cardio Special Veterinary Hospital']
if (JSON.stringify(website.alternateName) !== JSON.stringify(expectedAlternates)) {
  fail(`WebSite.alternateName must be ${JSON.stringify(expectedAlternates)}`)
}

const organizationNodes = schemas
  .flatMap((schema) => schema['@graph'] || [schema])
  .filter((schema) => {
    const types = Array.isArray(schema['@type']) ? schema['@type'] : [schema['@type']]
    return types.includes('Organization')
  })

if (organizationNodes.length !== 1) {
  fail(`homepage must expose exactly one Organization node, found ${organizationNodes.length}`)
}

const organization = organizationNodes[0]

if (organization.name !== '專心動物醫院') {
  fail('Organization.name must be 專心動物醫院')
}

if (organization.url !== 'https://cardiospecialvh.tw/') {
  fail('Organization.url must match the canonical homepage URL')
}

if (organization.logo !== 'https://cardiospecialvh.tw/%E5%B0%88%E5%BF%83logo.JPEG') {
  fail('Organization.logo must use the published hospital logo')
}

console.log('Site name signal check passed.')
