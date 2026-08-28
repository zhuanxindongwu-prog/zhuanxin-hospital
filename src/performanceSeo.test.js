import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), 'utf8')

test('the app waits for the initial route before mounting', () => {
  const main = read('src/main.js')
  const readyIndex = main.indexOf('await router.isReady()')
  const mountIndex = main.indexOf("app.mount('#app')")

  assert.ok(readyIndex >= 0, 'main.js must wait for router.isReady()')
  assert.ok(readyIndex < mountIndex, 'router.isReady() must resolve before app.mount()')
})

test('homepage hero exposes one responsive, high-priority image element', () => {
  const hero = read('src/components/Hero.vue')

  assert.match(hero, /<picture class="hero-media"/)
  assert.match(hero, /hero-team-768\.avif 768w/)
  assert.match(hero, /hero-team-1600\.avif 1600w/)
  assert.match(hero, /fetchpriority="high"/)
  assert.match(hero, /loading="eager"/)
  assert.doesNotMatch(hero, /url\(['"]\/imgs\/2026大合照\.JPG['"]\)/)
})

test('static homepage preloads the same responsive hero image', () => {
  const generator = read('scripts/generate-static-seo.mjs')

  assert.match(generator, /hero-team-1600\.avif/)
  assert.match(generator, /imagesrcset=/)
  assert.match(generator, /imagesizes="100vw"/)
  assert.doesNotMatch(generator, /preload[\s\S]{0,180}\/imgs\/all\.webp/)
})

test('articles collection uses one name across runtime and static SEO', () => {
  const router = read('src/router/index.js')
  const generator = read('scripts/generate-static-seo.mjs')
  const page = read('src/components/articles.vue')
  const homepageGuide = read('src/components/News.vue')
  const collectionName = '專心犬貓心臟病照護秘笈'
  const title = `${collectionName}｜症狀、檢查與居家照護｜專心動物醫院`

  assert.ok(router.includes(title))
  assert.ok(generator.includes(title))
  assert.ok(homepageGuide.includes(`<h2>${collectionName}</h2>`))
  assert.ok(page.includes(`<h1>${collectionName}</h1>`))
  assert.ok(generator.includes(`name: '${collectionName}'`))
  assert.doesNotMatch(router, /專心照護指南/)
  assert.doesNotMatch(generator, /專心照護指南/)
})

test('homepage guide selects the newest three articles from care and media content', () => {
  const homepageGuide = read('src/components/News.vue')

  assert.match(homepageGuide, /import \{ careArticles, getArticlePath \} from '\.\.\/data\/careArticles'/)
  assert.match(homepageGuide, /const careArticleCards = careArticles\.map/)
  assert.match(homepageGuide, /getArticlePath\(article\)/)
  assert.match(homepageGuide, /sortArticlesByDateDesc\(dedupeByLink\(\[\.\.\.careArticleCards, \.\.\.mediaArticleCards\]\)\)/)
  assert.match(homepageGuide, /\.slice\(0, 3\)/)
})

test('PetVoice purchase notice is session-capped and keyboard accessible', () => {
  const petvoice = read('src/components/PetVoice.vue')

  assert.match(petvoice, /<Teleport to="body">/)
  assert.match(petvoice, /ref="purchaseAlertCloseButton"/)
  assert.match(petvoice, /id="purchase-alert-description"/)
  assert.match(petvoice, /sessionStorage\.getItem\(purchaseAlertSessionKey\)/)
  assert.match(petvoice, /sessionStorage\.setItem\(purchaseAlertSessionKey, 'true'\)/)
  assert.match(petvoice, /purchaseAlertCloseButton\.value\?\.focus\(\)/)
})

test('legacy cardiology URLs have permanent redirects to current content', () => {
  const config = JSON.parse(read('vercel.json'))
  const redirects = new Map(config.redirects.map((redirect) => [redirect.source, redirect]))
  const expected = new Map([
    ['/二尖瓣退化', '/topics/mmvd'],
    ['/先天性心臟病', '/articles/congenital-heart-disease-preoperative-screening'],
    ['/在家監控呼吸心跳', '/petvoice-guide'],
    ['/衛教資訊', '/articles']
  ])

  for (const [source, destination] of expected) {
    assert.equal(redirects.get(source)?.destination, destination, `${source} redirect is missing`)
    assert.equal(redirects.get(source)?.permanent, true, `${source} redirect must be permanent`)
  }
})

test('SPA-only routes rewrite to the clean root entry document', () => {
  const config = JSON.parse(read('vercel.json'))
  const rewrites = new Map(config.rewrites.map((rewrite) => [rewrite.source, rewrite.destination]))
  const spaOnlyRoutes = ['/adminLogin', '/adminAppointments', '/doctor-schedule', '/pet-cpr-game']

  assert.equal(config.cleanUrls, true)

  for (const route of spaOnlyRoutes) {
    assert.equal(rewrites.get(route), '/', `${route} must rewrite to the clean root entry document`)
  }

  assert.ok(
    config.rewrites.every((rewrite) => !rewrite.destination.endsWith('.html')),
    'cleanUrls rewrites must not target an .html URL'
  )
})
