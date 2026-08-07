import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

import { staticArticleSeo } from '../src/data/articleSeo.js'
import { careArticles } from '../src/data/careArticles.js'
import { mediaArticles } from '../src/data/mediaArticles.js'
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

const staticArticleRoutes = Object.keys(staticArticleSeo)

test('homepage runtime and static HTML expose the canonical full address', () => {
  const homeSource = read('src/pages/Home.vue')
  const homepage = read('dist/index.html')

  assert.match(homeSource, /value:\s*clinicAddress/)
  assert.ok(homeSource.includes("from '../siteContact'"))
  assert.ok(homepage.includes(clinicAddress))
})

test('public and production sitemaps come from one generated source', () => {
  const publicSitemap = read('public/sitemap.xml')
  const productionSitemap = read('dist/sitemap.xml')

  assert.equal(publicSitemap, productionSitemap)
  assert.ok(!productionSitemap.includes('<priority>'))
  assert.match(productionSitemap, /<loc>https:\/\/cardiospecialvh\.tw\/<\/loc>\s*<\/url>/)
  assert.ok(!/<loc>https:\/\/cardiospecialvh\.tw\/<\/loc>\s*<lastmod>/s.test(productionSitemap))
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
