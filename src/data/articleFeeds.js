export const articleFeedLinks = [
  { path: '/feed.xml', type: 'application/rss+xml', title: '專心照護文章 RSS' },
  { path: '/atom.xml', type: 'application/atom+xml', title: '專心照護文章 Atom' }
]

const xml = value => String(value)
  .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;').replaceAll("'", '&apos;')

const validateDay = value => {
  const date = new Date(`${value}T00:00:00Z`)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || !Number.isFinite(date.getTime()) || date.toISOString().slice(0, 10) !== value) {
    throw new Error(`Invalid article date: ${value}`)
  }
  return value
}
// Source dates have day precision. Encode the start of that day in Taiwan,
// without introducing a build timestamp or claiming a more precise edit time.
const atomDay = day => `${day}T00:00:00+08:00`
const rssDay = day => new Date(atomDay(day)).toUTCString()

export const createArticleFeeds = (articles, siteUrl = 'https://cardiospecialvh.tw') => {
  if (!articles.length) throw new Error('Article subscriptions need at least one article')
  const absolute = path => new URL(path, siteUrl + '/').href
  const seen = new Set()
  const entries = articles.map(article => {
    const url = absolute(article.path)
    if (seen.has(url)) throw new Error(`Duplicate article URL: ${url}`)
    seen.add(url)
    const published = validateDay(article.publishedDate)
    const updated = validateDay(article.modifiedDate || published)
    if (updated < published) throw new Error(`Article update date precedes publication date: ${article.path}`)
    return { ...article, url, published, updated }
  }).sort((a, b) => b.updated.localeCompare(a.updated) || a.url.localeCompare(b.url))
  const updated = entries[0].updated
  const name = '專心動物醫院照護文章與疾病指南'
  const description = '專心動物醫院的犬貓心臟疾病衛教、照護文章與疾病指南。'
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${xml(name)}</title>
    <link>${xml(absolute('/articles'))}</link>
    <description>${xml(description)}</description>
    <language>zh-TW</language>
    <lastBuildDate>${rssDay(updated)}</lastBuildDate>
    <atom:link href="${xml(absolute('/feed.xml'))}" rel="self" type="application/rss+xml" />
${entries.map(article => `    <item>
      <guid isPermaLink="true">${xml(article.url)}</guid>
      <title>${xml(article.title)}</title>
      <link>${xml(article.url)}</link>
      <description>${xml(article.abstract || article.description)}</description>
      <pubDate>${rssDay(article.published)}</pubDate>
    </item>`).join('\n')}
  </channel>
</rss>
`
  const atom = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="zh-Hant-TW">
  <id>${xml(absolute('/articles'))}</id>
  <title>${xml(name)}</title>
  <subtitle>${xml(description)}</subtitle>
  <link href="${xml(absolute('/atom.xml'))}" rel="self" type="application/atom+xml" />
  <link href="${xml(absolute('/articles'))}" rel="alternate" type="text/html" />
  <updated>${atomDay(updated)}</updated>
  <author><name>專心動物醫院</name><uri>${xml(absolute('/'))}</uri></author>
${entries.map(article => `  <entry>
    <id>${xml(article.url)}</id>
    <title type="text">${xml(article.title)}</title>
    <link href="${xml(article.url)}" rel="alternate" type="text/html" />
    <published>${atomDay(article.published)}</published>
    <updated>${atomDay(article.updated)}</updated>
    <summary type="text">${xml(article.abstract || article.description)}</summary>
  </entry>`).join('\n')}
</feed>
`
  return { rss, atom }
}
