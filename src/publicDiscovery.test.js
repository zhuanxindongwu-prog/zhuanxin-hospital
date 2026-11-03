import test from 'node:test'
import assert from 'node:assert/strict'
import { createRobotsTxt } from './data/crawlerAccess.js'
import { createDiscoveryDocuments } from './data/publicDiscovery.js'
import { renderPublicMarkdown } from '../scripts/render-public-markdown.mjs'
import { homepageFaqs, homepageSummary } from './data/homepageSearch.js'

test('explicit search crawler rules keep both original restricted paths in every group', () => {
  const robots = createRobotsTxt('https://example.org')
  for (const bot of ['OAI-SearchBot', 'Claude-SearchBot', 'PerplexityBot', 'Googlebot', 'Applebot', '*']) assert.ok(robots.includes('User-agent: ' + bot + '\n'))
  for (const group of robots.split('\n\n').filter(group => group.includes('User-agent:'))) {
    assert.ok(group.split('\n').includes('Allow: /'))
    assert.ok(group.includes('Disallow: /adminLogin'))
    assert.ok(group.includes('Disallow: /adminAppointments'))
  }
  assert.ok(robots.includes('Sitemap: https://example.org/sitemap.xml'))
  assert.doesNotMatch(robots, /Crawl-delay:/i)
})

test('AI summary,FAQ and service files describe existing public facts with canonical links and contact-only capabilities', () => {
  const documents = createDiscoveryDocuments('https://example.org')
  const summary = JSON.parse(documents['/ai/summary.json'])
  assert.equal(summary.name, '專心動物醫院')
  assert.equal(summary.description, homepageSummary)
  assert.equal(summary.url, 'https://example.org/')
  assert.equal(summary.contact.telephone, '02-2363-3016')
  assert.deepEqual(JSON.parse(documents['/ai/faq.json']).faqs, homepageFaqs)
  const service = JSON.parse(documents['/ai/service.json'])
  assert.equal(service.onlineBooking, false)
  assert.equal(service.capabilities.length, 3)
  assert.ok(service.capabilities.every(capability => capability.url.startsWith('https://example.org/services/')))
  assert.ok(documents['/.well-known/ai.txt'].includes('https://example.org/robots.txt'))
  assert.doesNotMatch(JSON.stringify(documents), /adminLogin|adminAppointments|booking_url|toolname/)
})

test('public Markdown preserves nested Chinese content,paragraphs,lists,source links and supplied images', () => {
  const html = '<header>導覽</header><main><h1>心臟<strong>照護</strong></h1><p>第一段<br>下一行 &amp; 資訊。</p><ul><li>第一項</li><li><a href="/guides/dog-cough">咳嗽指南</a></li></ul><figure><img src="/imgs/supplied.webp" alt="原始照片"><figcaption>原圖說明</figcaption></figure><h2>參考來源</h2><p><a href="https://example.net/guideline">原始指引</a></p></main>'
  const markdown = renderPublicMarkdown(html, 'https://example.org')
  assert.match(markdown, /# 心臟照護\n/)
  assert.match(markdown, /第一段\n下一行 & 資訊。/)
  assert.match(markdown, /- 第一項\n- \[咳嗽指南\]\(https:\/\/example.org\/guides\/dog-cough\)/)
  assert.match(markdown, /!\[原始照片\]\(https:\/\/example.org\/imgs\/supplied.webp\)/)
  assert.match(markdown, /原圖說明/)
  assert.match(markdown, /## 參考來源/)
  assert.match(markdown, /\[原始指引\]\(https:\/\/example.net\/guideline\)/)
  assert.doesNotMatch(markdown, /導覽|<[^>]+>/)
})

test('Markdown excludes hidden decorations,forms and scripts but retains expandable FAQ answers and descriptions', () => {
  const html = '<main><h1>公開頁</h1><script>秘密腳本</script><style>秘密樣式</style><nav>目錄</nav><div aria-hidden="true">裝飾寵物</div><p hidden>隱藏文字</p><form><input value="不公開"></form><button>按鈕</button><details><summary>常見問題？</summary><p>既有公開答案。</p></details><dl><dt>週日</dt><dd>休診</dd></dl><video poster="/poster.webp" aria-label="既有影片"><source src="/clip.mp4"></video></main>'
  const markdown = renderPublicMarkdown(html, 'https://example.org')
  assert.doesNotMatch(markdown, /秘密|裝飾寵物|隱藏文字|不公開|按鈕|目錄/)
  assert.match(markdown, /常見問題？/)
  assert.match(markdown, /既有公開答案。/)
  assert.match(markdown, /週日[\s\S]*休診/)
  assert.match(markdown, /\[既有影片\]\(https:\/\/example.org\/clip.mp4\)/)
})

test('Markdown retains block-linked article card content and URLs without accepting executable links', () => {
  const markdown = renderPublicMarkdown('<main><a href="/articles/example"><h3>原標題</h3><p>原摘要</p></a><p><a href="javascript:alert(1)">文字</a></p></main>', 'https://example.org')
  assert.match(markdown, /### 原標題/)
  assert.match(markdown, /原摘要/)
  assert.match(markdown, /https:\/\/example.org\/articles\/example/)
  assert.doesNotMatch(markdown, /javascript:|<h3>/)
  assert.throws(() => renderPublicMarkdown('<header>只有導覽</header>', 'https://example.org'), /main element/)
})

test('a visual eyebrow stays in the document while its multiline H1 becomes the single document title', () => {
  const markdown = renderPublicMarkdown('<main><p>專業照護</p><h1>原標題<br>副標題</h1><p>既有內容。</p></main>', 'https://example.org')
  assert.match(markdown, /^# 原標題 副標題\n/)
  assert.ok(markdown.includes('專業照護'))
  assert.ok(markdown.includes('既有內容。'))
  assert.equal((markdown.match(/^# /gm) || []).length, 1)
})
