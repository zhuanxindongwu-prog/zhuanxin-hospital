import test, { before, after } from 'node:test'
import assert from 'node:assert/strict'
import { createServer } from 'vite'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { createMemoryHistory, createRouter } from 'vue-router'
import { createHead } from '@vueuse/head'

let server
let html
let liveHtml
let serviceHtml

before(async () => {
  server = await createServer({
    server: { middlewareMode: true }, appType: 'custom',
    cacheDir: 'node_modules/.vite-preview-tests',
    optimizeDeps: { noDiscovery: true, include: [] }
  })
  const { default: Preview } = await server.ssrLoadModule('/src/components/homepage/Homepage.vue')
  html = await renderToString(createSSRApp(Preview, { preview: true }))
  const { default: Home } = await server.ssrLoadModule('/src/pages/Home.vue')
  const { default: App } = await server.ssrLoadModule('/src/App.vue')
  for (const url of ['/', '/services/veterinary-cardiology']) {
    const router = createRouter({ history: createMemoryHistory(), routes: [
      { path: '/', component: Home },
      { path: '/services/veterinary-cardiology', component: { template: '<main>心臟專科服務內容</main>' } },
      { path: '/:pathMatch(.*)*', component: { template: '<main></main>' } }
    ] })
    const app = createSSRApp(App).use(router).use(createHead())
    await router.push(url)
    await router.isReady()
    const result = await renderToString(app)
    if (url === '/') liveHtml = result
    else serviceHtml = result
  }
})
after(async () => { await server?.close() })

test('production homepage shows the approved design once and omits the local preview notice', () => {
  assert.ok(liveHtml.includes('把每一次心跳'), 'The approved homepage must be the production root page')
  assert.equal((liveHtml.match(/<header\b/g) || []).length, 1)
  assert.equal((liveHtml.match(/<footer\b/g) || []).length, 1)
  assert.equal((liveHtml.match(/<main\b/g) || []).length, 1)
  assert.doesNotMatch(liveHtml, /僅本機預覽|查看原版|首頁設計提案/)
  assert.equal((liveHtml.match(/class="team-doctor/g) || []).length, 8)
})

test('non-home routes retain their original navigation and footer', () => {
  assert.match(serviceHtml, /navbar-wrapper/)
  assert.match(serviceHtml, /footer-main/)
  assert.match(serviceHtml, /心臟專科服務內容/)
  assert.doesNotMatch(serviceHtml, /把每一次心跳/)
})

test('production homepage prioritizes the director portrait and retains the full clinic address', () => {
  const priorityImages = [...liveHtml.matchAll(/<img\b[^>]*fetchpriority="high"[^>]*>/g)]
  assert.equal(priorityImages.length, 1)
  assert.match(priorityImages[0][0], /src="\/imgs\/DRH.webp"/)
  assert.match(priorityImages[0][0], /loading="eager"/)
  assert.ok(liveHtml.includes('台北市中正區東門里仁愛路一段47號1樓'))
})

test('homepage preview gives visitors a single main heading and a keyboard skip destination', () => {
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1)
  assert.match(html, /href="#main-content"/)
  assert.match(html, /<main[^>]*id="main-content"/)
})

test('every preview section navigation link has an on-page destination', () => {
  const links = [...html.matchAll(/href="#([^"]+)"/g)].map(match => match[1])
  assert(links.length >= 6, 'Visitors need working access to the main homepage sections')
  for (const id of links) assert(html.includes(`id="${id}"`), `Missing section: ${id}`)
})

test('homepage preview keeps appointment, contact, and existing specialty destinations usable', () => {
  for (const href of ['/doctor-schedule', '/services/veterinary-cardiology', '/services/echocardiography', '/services/veterinary-oncology', '/articles', '/petvoice', 'tel:0223633016']) {
    assert(html.includes(`href="${href}"`), `Missing destination: ${href}`)
  }
})

test('homepage preview uses the supplied portrait and original article photography', () => {
  assert.match(html, /src="\/imgs\/DRH.webp"/)
  assert.match(html, /src="\/imgs\/media\/dog-cough-pulmonary-edema.webp"/)
  assert.match(html, /src="\/imgs\/guides\/mmvd-nonlinear-progression-art.webp"/)
  for (const img of html.matchAll(/<img\b[^>]*>/g)) {
    if (!img[0].includes('aria-hidden="true"')) assert.match(img[0], /alt="[^"]+"/)
  }
})

test('all eight veterinarians have complete photo profiles, including the resident without tags', () => {
  for (const id of ['hung-rong-wei', 'lin-zheng', 'lee-ji-zhong', 'wu-guan-xun', 'yan-shi-rong', 'chen-shi-ting', 'chen-xuan-zhen', 'chen-pin-qi']) {
    const profile = [...html.matchAll(/<a\b[^>]*>[\s\S]*?<\/a>/g)].find(([link]) => link.includes(`href="/doctor/${id}"`))?.[0]
    assert(profile, `Missing profile link for ${id}`)
    assert.match(profile, /<img\b/, `Missing profile photo for ${id}`)
    assert.match(profile, /<h3\b[^>]*>[^<]+<\/h3>/, `Missing name heading for ${id}`)
    assert.match(profile, /<p\b[^>]*>[^<]+<\/p>/, `Missing specialties for ${id}`)
  }
  assert.match(html, /src="\/imgs\/optimized\/冠勳的怪貓.webp"/)
  assert.match(html, /src="\/imgs\/chenpingqi.jpg"/)
})

test('each veterinarian keeps the original pet companions and offers a non-navigating greeting button', () => {
  const cards = [...html.matchAll(/<article\b[^>]*>[\s\S]*?<\/article>/g)].map(([card]) => card)
  const companions = {
    'hung-rong-wei': ['milu'], 'lin-zheng': ['lico'], 'lee-ji-zhong': ['alger'],
    'wu-guan-xun': ['bass'], 'yan-shi-rong': ['doubleQ', 'simba'],
    'chen-shi-ting': ['傻狗'], 'chen-xuan-zhen': ['臭狗'], 'chen-pin-qi': ['moso']
  }
  for (const [id, pets] of Object.entries(companions)) {
    const card = cards.find(card => card.includes(`href="/doctor/${id}"`))
    assert(card, `Missing card for ${id}`)
    for (const pet of pets) assert(card.includes(`src="/imgs/optimized/${pet}.webp"`), `Missing ${pet} for ${id}`)
    assert.match(card, /<button\b[^>]*type="button"[^>]*aria-pressed="false"/)
  }
})
