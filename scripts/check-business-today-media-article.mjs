import fs from 'node:fs'
import { mediaArticles } from '../src/data/mediaArticles.js'

const slug = 'taiwan-japan-cardiology-forum-continuous-monitoring'
const sourceUrl = 'https://school.businesstoday.com.tw/posts/zhuanxinhospital06292026'

const fail = (message) => {
  console.error(`Business Today media article check failed: ${message}`)
  process.exit(1)
}

const article = mediaArticles.find((item) => item.slug === slug)

if (!article) fail('article slug is missing from mediaArticles')
if (article.label !== '媒體') fail('article label should be 媒體')
if (article.category !== '媒體') fail('article category should be 媒體')
if (article.date !== '2026-06-29') fail('article date should match the source publication date')
if (!article.title.includes('連續監測')) fail('title should reflect continuous monitoring')
if (!article.description.includes('台日心臟專科')) fail('description should reflect the forum topic')
if (!article.image || !fs.existsSync(new URL(`../public${article.image}`, import.meta.url))) {
  fail('article image asset is missing')
}
if (!article.sources?.some((source) => source.url === sourceUrl)) fail('source URL is missing')

const { sortArticlesByDateDesc } = await import('../src/data/articleSorting.js')
const sorted = sortArticlesByDateDesc([
  { title: 'old', date: '2026-06-15' },
  article,
  { title: 'newer', date: '2026-06-30' }
])

if (sorted.map((item) => item.date).join(',') !== '2026-06-30,2026-06-29,2026-06-15') {
  fail('date sorting should be newest first')
}

const articlesComponent = fs.readFileSync(new URL('../src/components/articles.vue', import.meta.url), 'utf8')
if (!articlesComponent.includes('sortArticlesByDateDesc')) {
  fail('articles index should use shared date sorting')
}

console.log(`Business Today media article check passed: /articles/media/${slug}`)
