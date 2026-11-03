import fs from 'node:fs'
import path from 'node:path'
import assert from 'node:assert/strict'
import { fileURLToPath } from 'node:url'
import { searchArticles, getArticleOutline } from '../src/data/searchArticles.js'
import { homepageFaqs, homepageSummary } from '../src/data/homepageSearch.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const origin = 'https://cardiospecialvh.tw'
const read = file => fs.readFileSync(path.join(root, file), 'utf8')
const decode = value => value.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#39;', "'").replaceAll('&lt;', '<').replaceAll('&gt;', '>')
const textOf = html => decode(html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ')
const schemaOf = html => [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
  .flatMap(match => { const schema = JSON.parse(match[1]); return schema['@graph'] || [schema] })
const routeFile = route => 'dist' + (route === '/' ? '' : route) + '/index.html'
const metaOf = (html, name) => decode(html.match(new RegExp(`<meta\\s+(?:name|property)="${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"\\s+content="([^"]*)"`))?.[1] || '')
const sitemap = read('dist/sitemap.xml')
const llms = read('dist/llms.txt')
const seenTitles = new Set()
const report = []

for (const article of searchArticles) {
  const html = read(routeFile(article.path))
  const body = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] || ''
  const visible = textOf(body)
  const bodyLinks = new Set([...body.matchAll(/<a\b[^>]*href="([^"]*)"/g)].map(match => decode(match[1])))
  const title = decode(html.match(/<title>([^<]+)<\/title>/)?.[1] || '')
  const schemas = schemaOf(html)
  const entity = schemas.find(schema => schema['@type'] === 'Article')
  const medical = schemas.find(schema => schema['@type'] === 'MedicalWebPage')
  const check = (ok, reason) => assert.ok(ok, article.path + ': ' + reason)
  check(title === article.seoTitle + '｜專心動物醫院', 'search title must match the shared record')
  check(!seenTitles.has(title), 'title must be unique')
  seenTitles.add(title)
  check(metaOf(html, 'description') === article.description, 'search description must match the shared record')
  check(metaOf(html, 'og:description') === article.description, 'social description must match')
  check(metaOf(html, 'robots').includes('max-image-preview:large') && !metaOf(html, 'robots').includes('noindex'), 'allow indexing and large previews')
  check((html.match(/<h1\b/g) || []).length === 1, 'exactly one main heading')
  check(html.includes('rel="canonical" href="' + origin + article.path + '"'), 'self-referencing canonical')
  check(sitemap.includes('<loc>' + origin + article.path + '</loc>'), 'discoverable in sitemap')
  check(llms.includes('](' + origin + article.path + ')'), 'discoverable in the generated article index')
  check(visible.includes(article.abstract), 'article abstract visible before JavaScript')
  check(visible.includes(article.publishedDate) && visible.includes(article.modifiedDate), 'original dates visible')
  check(entity?.headline === article.title && entity?.abstract === article.abstract, 'schema matches the visible article')
  check(entity?.datePublished === article.publishedDate && entity?.dateModified === article.modifiedDate, 'dates are not fabricated')
  check(medical && !medical.lastReviewed, 'content updates must not be labelled medical review dates')
  if (!article.reviewer || article.reviewerVisible === false) check(!entity.reviewedBy, 'do not add an unavailable review claim')
  if (entity.reviewedBy) check(visible.includes(entity.reviewedBy.name) && bodyLinks.has(article.reviewer.path), 'review attribution must be visibly linked')
  for (const author of article.authors || []) {
    check(visible.includes(author.name) && bodyLinks.has(author.path), 'linked author: ' + author.name)
    check(entity.author.some(person => person.name === author.name && person.url === origin + author.path), 'schema author: ' + author.name)
  }
  for (const source of article.sources || []) {
    check(bodyLinks.has(source.url), 'visible original citation: ' + source.url)
    const citation = entity.citation.find(item => item.url === source.url)
    check(citation?.['@type'] === 'WebPage' && citation.name === source.title, 'reference type and identity: ' + source.url)
  }
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(match => match[1])
  check(new Set(ids).size === ids.length, 'unique section anchors')
  for (const section of getArticleOutline(article)) check(ids.includes(section.id), 'working section anchor: ' + section.id)
  for (const link of article.relatedLinks) {
    check(link.title && fs.existsSync(path.join(root, routeFile(link.path))), 'related article destination: ' + link.path)
    check(bodyLinks.has(link.path), 'visible related article: ' + link.path)
  }
  report.push({ path: article.path, title, description: article.description, abstract: article.abstract, published: article.publishedDate, updated: article.modifiedDate, sources: article.sources?.length || 0, status: 'PASS' })
}

const homepage = read('dist/index.html')
const homepageText = textOf(homepage)
assert.equal(metaOf(homepage, 'description'), homepageSummary)
const faq = schemaOf(homepage).find(schema => schema['@type'] === 'FAQPage')
assert.equal(faq.mainEntity.length, homepageFaqs.length)
for (const [index, item] of homepageFaqs.entries()) {
  assert.ok(homepageText.includes(item.question) && homepageText.includes(item.answer))
  assert.equal(faq.mainEntity[index].name, item.question)
  assert.equal(faq.mainEntity[index].acceptedAnswer.text, item.answer)
}
const directory = schemaOf(read('dist/articles/index.html')).find(schema => schema['@type'] === 'CollectionPage')
assert.equal(directory.mainEntity.numberOfItems, searchArticles.length)
assert.equal(new Set(directory.mainEntity.itemListElement.map(item => item.url)).size, searchArticles.length)

const reportDirectory = path.join(root, 'output', 'seo-geo')
fs.mkdirSync(reportDirectory, { recursive: true })
fs.writeFileSync(path.join(reportDirectory, 'article-coverage.json'), JSON.stringify(report, null, 2) + '\n')
console.log(`SEO/GEO coverage passed: homepage + ${searchArticles.length}/${searchArticles.length} articles; metadata, visible summaries, dates, author/source identity, related links, anchors and discovery verified.`)
