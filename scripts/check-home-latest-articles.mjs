import fs from 'node:fs'
import { mediaArticles } from '../src/data/mediaArticles.js'
import { sortArticlesByDateDesc } from '../src/data/articleSorting.js'

const fail = (message) => {
  console.error(`Home latest articles check failed: ${message}`)
  process.exit(1)
}

const expectedLatest = sortArticlesByDateDesc(mediaArticles).slice(0, 3)

if (expectedLatest.length !== 3) fail('latest article list should contain exactly 3 items')

const expectedSlugs = [
  'digital-health-veterinary-care-2026',
  'taiwan-japan-cardiology-forum-continuous-monitoring',
  'complete-veterinary-cardiac-examination'
]

if (expectedLatest.map((article) => article.slug).join(',') !== expectedSlugs.join(',')) {
  fail(`unexpected latest article order: ${expectedLatest.map((article) => article.slug).join(',')}`)
}

const newsComponent = fs.readFileSync(new URL('../src/components/News.vue', import.meta.url), 'utf8')

if (!newsComponent.includes("import { mediaArticles } from '../data/mediaArticles'")) {
  fail('News.vue should use mediaArticles as the article source')
}

if (!newsComponent.includes('sortArticlesByDateDesc(mediaArticles).slice(0, 3)')) {
  fail('News.vue should render only the newest 3 articles')
}

if (newsComponent.includes('const featured =') || newsComponent.includes('const articles = [')) {
  fail('News.vue should not use hard-coded guide cards')
}

if (!newsComponent.includes('grid-template-columns: repeat(3, minmax(0, 1fr))')) {
  fail('News.vue desktop grid should be 3 columns')
}

console.log(`Home latest articles check passed: ${expectedSlugs.join(', ')}`)
