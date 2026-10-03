import test, { before, after } from 'node:test'
import assert from 'node:assert/strict'
import { createServer } from 'vite'
import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { createMemoryHistory, createRouter } from 'vue-router'
import { createHead } from '@vueuse/head'

let server
before(async () => {
  server = await createServer({
    server: { middlewareMode: true }, appType: 'custom',
    cacheDir: 'node_modules/.vite-editorial-tests',
    optimizeDeps: { noDiscovery: true, include: [] }
  })
})
after(async () => { await server?.close() })

async function renderComponentAt(modulePath, routePath, props = {}) {
  const { default: Component } = await server.ssrLoadModule(modulePath)
  const router = createRouter({ history: createMemoryHistory(), routes: [
    { path: '/:pathMatch(.*)*', component: { template: '<main />' } }
  ] })
  await router.push(routePath)
  await router.isReady()
  return renderToString(createSSRApp(Component, props).use(router).use(createHead()))
}

async function renderAppAt(routePath) {
  const { default: App } = await server.ssrLoadModule('/src/App.vue')
  const { default: Home } = await server.ssrLoadModule('/src/pages/Home.vue')
  const { default: Content } = await server.ssrLoadModule('/src/components/SeoContentPage.vue')
  const router = createRouter({ history: createMemoryHistory(), routes: [
    { path: '/', component: Home },
    { path: '/services/:slug', component: Content },
    { path: '/topics/:slug', component: Content },
    { path: '/:pathMatch(.*)*', component: { template: '<main>Unchanged page body</main>' } }
  ] })
  await router.push(routePath)
  await router.isReady()
  return renderToString(createSSRApp(App).use(router).use(createHead()))
}

test('public navigation retains every destination and adds accessible schedule access', async () => {
  const html = await renderComponentAt('/src/components/Navbar.vue', '/articles', { variant: 'editorial' })
  assert.ok(html.includes('獸醫師團隊'))
  for (const href of ['/#about', '/#services', '/#doctors', '/#news', '/#tumor', '/#contact', '/products', '/doctor-schedule']) {
    assert.ok(html.includes('href="' + href + '"'), href)
  }
  assert.match(html, /aria-expanded="false"/)
  const controlledId = html.match(/aria-controls="([^"]+)"/)?.[1]
  assert.ok(controlledId, 'Menu button must identify its persistent menu')
  assert.ok(html.includes('id="' + controlledId + '"'))
})

test('App gives public routes editorial navigation without changing protected routes or homepage', async () => {
  for (const path of ['/articles', '/topics/mmvd', '/services/echocardiography']) {
    assert.match(await renderAppAt(path), /ed-navbar/)
  }
  for (const path of ['/adminLogin', '/adminAppointments', '/pet-cpr-game']) {
    const html = await renderAppAt(path)
    assert.match(html, /navbar-wrapper/)
    assert.doesNotMatch(html, /ed-navbar/)
  }
  const home = await renderAppAt('/')
  assert.equal((home.match(/<header\b/g) || []).length, 1)
  assert.equal((home.match(/<footer\b/g) || []).length, 1)
  assert.equal((home.match(/class="team-doctor/g) || []).length, 8)
  assert.doesNotMatch(home, /ed-navbar/)
})

test('editorial footer retains contacts and exposes exactly three labelled mobile actions', async () => {
  const html = await renderComponentAt('/src/components/Footer.vue', '/articles', { variant: 'editorial' })
  assert.ok(html.includes('ed-footer'), 'Editorial footer variant must be rendered')
  for (const value of ['台北市中正區東門里仁愛路一段47號1樓', 'tel:0223633016', '@921gquih',
    '/imgs/line-add-friend-qr.png', '營業時間', '週日', '休診', '10:00 – 21:30', '13:00 – 21:00',
    '10:00 – 18:00', '快速連結', '若出現嚴重喘氣、昏倒、無法平躺']) assert.ok(html.includes(value), value)
  const actions = html.match(/<div[^>]*aria-label="行動聯絡工具"[^>]*>([\s\S]*?)<\/div>/)?.[1]
  assert.ok(actions, 'Mobile actions must form a named navigation region')
  assert.equal((actions.match(/<a\b/g) || []).length, 3)
  for (const target of ['tel:0223633016', 'https://line.me/R/ti/p/%40921gquih', 'https://www.google.com/maps/search/']) assert.ok(actions.includes(target))
  const hidden = await renderComponentAt('/src/components/Footer.vue', '/ai-search-veterinary-cardiology', { variant: 'editorial', hideMobileCta: true })
  assert.doesNotMatch(hidden, /aria-label="行動聯絡工具"/)
  const legacy = await renderComponentAt('/src/components/Footer.vue', '/adminLogin')
  assert.doesNotMatch(legacy, /ed-footer|行動聯絡工具/)
  assert.match(legacy, /mobile-bottom-cta/)
})

test('App preserves footer variant and hidden mobile action exceptions', async () => {
  assert.match(await renderAppAt('/articles'), /ed-footer/)
  for (const path of ['/adminLogin', '/adminAppointments', '/pet-cpr-game', '/']) {
    assert.doesNotMatch(await renderAppAt(path), /ed-footer/)
  }
  for (const path of ['/pet-cpr-game', '/ai-search-veterinary-cardiology']) {
    assert.doesNotMatch(await renderAppAt(path), /class="mobile-bottom-cta"/)
  }
})
