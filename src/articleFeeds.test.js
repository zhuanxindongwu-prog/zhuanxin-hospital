import test from 'node:test'
import assert from 'node:assert/strict'
import { createArticleFeeds } from './data/articleFeeds.js'
import { searchArticles } from './data/searchArticles.js'

const sample = [
  { path: '/articles/older', title: '較早文章', abstract: '較早摘要', publishedDate: '2026-10-20', modifiedDate: '2026-10-20' },
  { path: '/articles/updated', title: '心臟 & "照護" <問答>', abstract: 'A & B < C', publishedDate: '2026-10-26', modifiedDate: '2026-11-03' }
]

test('subscriptions escape XML text and keep distinct publication and update dates in the newest-first entries', () => {
  const { rss, atom } = createArticleFeeds(sample, 'https://example.org')
  assert.match(rss, /心臟 &amp; &quot;照護&quot; &lt;問答&gt;/)
  assert.match(atom, /A &amp; B &lt; C/)
  assert.ok(rss.indexOf('https://example.org/articles/updated') < rss.indexOf('https://example.org/articles/older'))
  assert.ok(atom.indexOf('https://example.org/articles/updated') < atom.indexOf('https://example.org/articles/older'))
  const rssItems = [...rss.matchAll(/<item>([\s\S]*?)<\/item>/g)]
  assert.equal(new Date(rssItems[0][1].match(/<pubDate>(.*?)<\/pubDate>/)[1]).toISOString(), '2026-10-25T16:00:00.000Z')
  assert.equal(new Date(rss.match(/<lastBuildDate>(.*?)<\/lastBuildDate>/)[1]).toISOString(), '2026-11-02T16:00:00.000Z')
  const atomEntry = atom.match(/<entry>([\s\S]*?)<\/entry>/)[1]
  assert.match(atomEntry, /<published>2026-10-26T00:00:00\+08:00<\/published>/)
  assert.match(atomEntry, /<updated>2026-11-03T00:00:00\+08:00<\/updated>/)
  assert.deepEqual(sample.map(article => article.path), ['/articles/older', '/articles/updated'], 'feed sorting must not mutate the article catalog')
})

test('both subscription formats include all 44 canonical articles exactly once without service or admin URLs', () => {
  const { rss, atom } = createArticleFeeds(searchArticles, 'https://cardiospecialvh.tw')
  const rssIds = [...rss.matchAll(/<guid isPermaLink="true">(.*?)<\/guid>/g)].map(match => match[1])
  const atomIds = [...atom.matchAll(/<entry>\s*<id>(.*?)<\/id>/g)].map(match => match[1])
  assert.equal(rssIds.length, 44)
  assert.equal(new Set(rssIds).size, 44)
  assert.deepEqual(new Set(atomIds), new Set(rssIds))
  for (const article of searchArticles) assert.ok(rssIds.includes('https://cardiospecialvh.tw' + article.path), article.path)
  assert.doesNotMatch(rss + atom, /adminLogin|adminAppointments|\/services\//)
})

test('invalid feed records fail the build rather than publishing duplicate IDs or false dates', () => {
  assert.throws(() => createArticleFeeds([]), /article/i)
  assert.throws(() => createArticleFeeds([sample[0], sample[0]]), /duplicate/i)
  assert.throws(() => createArticleFeeds([{ ...sample[0], modifiedDate: '2026-02-30' }]), /date/i)
  assert.throws(() => createArticleFeeds([{ ...sample[0], modifiedDate: '2026-01-01' }]), /date/i)
})
