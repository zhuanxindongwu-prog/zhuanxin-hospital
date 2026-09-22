import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

import { staticArticleSeo } from '../src/data/articleSeo.js'
import { careArticles, getArticlePath } from '../src/data/careArticles.js'
import { mediaArticles } from '../src/data/mediaArticles.js'
import { seoContentPages } from '../src/data/seoContentPages.js'
import { clinicAddress } from '../src/siteContact.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), 'utf8')
const routeHtmlPath = (route) => path.join('dist', route.replace(/^\//, ''), 'index.html')
const stripMarkup = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[^;]+;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const readTitle = (html) => html.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim() || ''
const readDescription = (html) =>
  html.match(/<meta\s+name="description"\s+content="([^"]*)"\s*\/?>/i)?.[1]?.trim() || ''
const readCanonical = (html) =>
  html.match(/<link\s+rel="canonical"\s+href="([^"]*)"\s*\/?>/i)?.[1]?.trim() || ''
const readH1 = (html) => stripMarkup(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || '')
const readSchemas = (html) =>
  [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
    .map((match) => JSON.parse(match[1]))
    .flatMap((schema) => schema['@graph'] || [schema])

const staticArticleRoutes = Object.keys(staticArticleSeo)
const readMain = (html) => html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] || ''

test('production homepage renders the approved design and its matching CSS before JavaScript', () => {
  const html = read('dist/index.html')
  assert.ok(readH1(html).includes('把每一次心跳'), 'Static homepage must match the live design')
  assert.equal((html.match(/class="team-doctor/g) || []).length, 8)
  assert.doesNotMatch(html, /僅本機預覽|首頁設計提案/)
  assert.match(html, /<link[^>]*rel="preload"[^>]*href="\/imgs\/DRH.webp"/)
  const stylesheetPaths = [...html.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*href="([^"]+)"/g)].map(match => match[1])
  const css = stylesheetPaths.map(file => read(`dist${file}`)).join('\n')
  const scopes = [...new Set(html.match(/data-v-[a-z\d]+/g))]
  assert.ok(scopes.length > 0, 'Homepage styles must be isolated from other pages')
  for (const scope of scopes) assert.ok(css.includes(scope), `Missing initial CSS for ${scope}`)
  assert.match(html, /<meta name="robots" content="index, follow"/)
})

test('homepage initial HTML lets visitors reach services, the team, and articles without JavaScript', () => {
  const main = readMain(read('dist/index.html'))
  for (const route of ['/services/veterinary-cardiology', '/services/echocardiography', '/doctor/hung-rong-wei', '/articles']) {
    assert.ok(main.includes(`href="${route}"`), `homepage is missing ${route}`)
  }
  assert.match(main, /href="tel:0223633016"/)
})

test('restored articles are discoverable in initial HTML and have canonical pages and sitemap entries', () => {
  const routes = [
    ...['dog-cough', 'breathing-difficulty', 'pet-syncope', 'cat-hindlimb-emergency',
      'cardiac-physical-exam', 'chest-xray', 'pet-ecg', 'nt-probnp', 'feline-hcm',
      'canine-dcm', 'canine-heartworm', 'pet-arrhythmia', 'congenital-heart-disease',
      'pulmonary-hypertension', 'cardiorenal-syndrome', 'cardiac-medication'].map((slug) => `/guides/${slug}`),
    ...['young-dog-bradyarrhythmia-ecg-case', 'dog-cough-heart-disease-guide',
      'feline-transient-myocardial-thickening', 'euthyroid-sick-syndrome-heart-disease',
      'pet-fainting-first-aid'].map((slug) => `/articles/media/${slug}`)
  ]
  const index = readMain(read(routeHtmlPath('/articles')))
  const sitemap = read('dist/sitemap.xml')
  for (const route of routes) {
    assert.ok(index.includes(`href="${route}"`), `article index is missing ${route}`)
    assert.ok(fs.existsSync(path.join(root, routeHtmlPath(route))), `${route} was not generated`)
    const html = read(routeHtmlPath(route))
    assert.equal(readCanonical(html), `https://cardiospecialvh.tw${route}`)
    assert.ok(sitemap.includes(`<loc>https://cardiospecialvh.tw${route}</loc>`))
    assert.ok(stripMarkup(readMain(html)).length > 400, `${route} lacks article content`)
    assert.ok(readSchemas(html).some((schema) => schema['@type'] === 'Article'), `${route} lacks Article schema`)
  }
})

test('medical reference links and guide FAQs are available before JavaScript', () => {
  const entries = [
    ...Object.entries(staticArticleSeo),
    ...Object.values(seoContentPages).map((page) => [page.path, page]),
    ...[...careArticles, ...mediaArticles].map((article) => [getArticlePath(article), article])
  ]
  for (const [route, article] of entries) {
    const main = readMain(read(routeHtmlPath(route)))
    for (const source of article.sources || []) {
      const escapedUrl = source.url.replaceAll('&', '&amp;')
      assert.ok(main.includes(`href="${escapedUrl}"`), `${route} hides reference ${source.url}`)
    }
    if (route.startsWith('/guides/')) {
      for (const faq of article.faqs) assert.ok(main.includes(faq.answer), `${route} hides FAQ answers`)
    }
    assert.ok(!main.includes('undefined'), `${route} leaks an absent optional field`)
  }
})

test('static homepage exposes the canonical full address', () => {
  const homepage = read('dist/index.html')

  assert.ok(homepage.includes(clinicAddress))
})

test('public and production sitemaps come from one generated source', () => {
  const publicSitemap = read('public/sitemap.xml')
  const productionSitemap = read('dist/sitemap.xml')

  assert.equal(publicSitemap, productionSitemap)
  assert.ok(!productionSitemap.includes('<priority>'))
  assert.match(
    productionSitemap,
    /<loc>https:\/\/cardiospecialvh\.tw\/<\/loc>\s*<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/
  )
})

test('static SEO routes use clean directory URLs without duplicate html copies', () => {
  for (const route of staticArticleRoutes) {
    const duplicatePath = path.join(root, 'dist', `${route.replace(/^\//, '')}.html`)
    assert.equal(fs.existsSync(duplicatePath), false, `${route}.html should not be emitted`)
  }
})

test('important article routes expose substantial initial HTML and internal links', () => {
  for (const route of staticArticleRoutes) {
    const html = read(routeHtmlPath(route))
    const main = html.match(/<main class="seo-static-page">([\s\S]*?)<\/main>/)?.[1] || ''
    const internalLinks = [...main.matchAll(/<a href="\/(?!\/)/g)]

    assert.ok(stripMarkup(main).length >= 600, `${route} initial HTML is too thin`)
    assert.ok(internalLinks.length >= 2, `${route} needs at least two internal links`)
    assert.match(main, /<h2>/, `${route} needs semantic section headings`)
  }
})

test('article data exposes verified review, source, date, and related-link fields', () => {
  const articles = [...Object.values(staticArticleSeo), ...careArticles, ...mediaArticles]

  for (const article of articles) {
    const label = article.slug || article.title
    assert.ok(article.reviewer?.name && article.reviewer?.path, `${label} reviewer is missing`)
    assert.ok(article.sources?.length > 0, `${label} sources are missing`)
    assert.ok(article.relatedLinks?.length >= 2, `${label} related links are missing`)
    assert.ok(article.modifiedDate || article.updatedDate || article.date, `${label} update date is missing`)

    for (const source of article.sources) {
      assert.ok(source.publisher && source.title && source.url, `${label} has an incomplete source`)
      assert.match(source.url, /^https:\/\//, `${label} source URL must use HTTPS`)
    }
  }
})

test('product image loading keeps the first image eager and defers later images', () => {
  const products = read('src/components/Products.vue')
  const card = read('src/components/products/ProductComparisonCard.vue')

  assert.ok(products.includes("loading: 'eager'"))
  assert.ok(products.includes("loading: 'lazy'"))
  assert.ok(card.includes(':loading="product.loading"'))
  assert.ok(card.includes(':fetchpriority="product.fetchpriority"'))
})

test('PetVoice product page exposes substantial initial HTML for Taiwan product intent', () => {
  const html = read(routeHtmlPath('/petvoice'))
  const main = html.match(/<main class="seo-static-page">([\s\S]*?)<\/main>/)?.[1] || ''
  const h2Count = [...main.matchAll(/<h2>/g)].length
  const internalLinks = [...main.matchAll(/<a href="\/(?!\/)/g)]

  assert.ok(stripMarkup(main).length >= 1200, 'PetVoice initial HTML is too thin')
  assert.ok(h2Count >= 5, `PetVoice needs at least five H2 headings, found ${h2Count}`)
  assert.ok(internalLinks.length >= 3, 'PetVoice needs at least three internal links')
  assert.match(main, /PetVoice 台灣購買與保固說明/)
  assert.match(main, /台灣地區由專心動物醫院代理/)
  assert.match(main, /一年保固/)
  assert.match(main, /2026 年內購買採一次性買斷制/)
})

test('PetVoice product and media article keep distinct intent and self-referencing canonicals', () => {
  const productHtml = read(routeHtmlPath('/petvoice'))
  const mediaPath = '/articles/media/petvoice-home-monitoring'
  const mediaHtml = read(routeHtmlPath(mediaPath))

  assert.match(readTitle(productHtml), /^PetVoice 台灣/)
  assert.match(readH1(productHtml), /^PetVoice 台灣/)
  assert.equal(readCanonical(productHtml), 'https://cardiospecialvh.tw/petvoice')

  assert.match(readTitle(mediaHtml), /專心動物醫院導入 PetVoice/)
  assert.match(readH1(mediaHtml), /專心動物醫院導入 PetVoice/)
  assert.equal(
    readCanonical(mediaHtml),
    'https://cardiospecialvh.tw/articles/media/petvoice-home-monitoring'
  )

  assert.notEqual(readTitle(productHtml), readTitle(mediaHtml))
  assert.notEqual(readH1(productHtml), readH1(mediaHtml))
  assert.notEqual(readDescription(productHtml), readDescription(mediaHtml))
})

test('PetVoice product schema exposes product, trust, FAQ, and breadcrumb entities', () => {
  const schemas = readSchemas(read(routeHtmlPath('/petvoice')))
  const product = schemas.find((schema) => schema['@type'] === 'Product')
  const webpage = schemas.find((schema) => schema['@type'] === 'WebPage')

  assert.ok(product, 'PetVoice Product schema is missing')
  assert.ok(webpage, 'PetVoice WebPage schema is missing')
  assert.ok(schemas.some((schema) => schema['@type'] === 'FAQPage'), 'PetVoice FAQPage schema is missing')
  assert.ok(
    schemas.some((schema) => schema['@type'] === 'BreadcrumbList'),
    'PetVoice BreadcrumbList schema is missing'
  )
  assert.equal(webpage.dateModified, '2026-08-08')
  assert.equal(webpage.reviewedBy?.name, '專心動物醫院醫療團隊')
  assert.ok(webpage.citation?.length >= 2, 'PetVoice WebPage needs at least two official citations')
  assert.ok(product.additionalProperty?.length >= 5, 'PetVoice Product needs visible feature properties')
})

test('PetVoice media article exposes article-specific FAQ, citations, and product link', () => {
  const route = '/articles/media/petvoice-home-monitoring'
  const html = read(routeHtmlPath(route))
  const schemas = readSchemas(html)
  const article = schemas.find((schema) => schema['@type'] === 'Article')
  const main = html.match(/<main class="seo-static-page">([\s\S]*?)<\/main>/)?.[1] || ''

  assert.ok(article, 'PetVoice media Article schema is missing')
  assert.ok(schemas.some((schema) => schema['@type'] === 'FAQPage'), 'PetVoice media FAQPage schema is missing')
  assert.equal(article.reviewedBy?.['@type'], 'Organization')
  assert.equal(article.reviewedBy?.name, '專心動物醫院醫療團隊')
  assert.ok(article.citation?.length >= 5, 'PetVoice media article needs its authorized media citations')
  assert.ok((main.match(/<h2\b/g) || []).length >= 5, 'PetVoice media article needs semantic section headings')
  assert.match(main, /href="\/petvoice"/)
  assert.match(main, /為什麼專心動物醫院導入 PetVoice/)
})
