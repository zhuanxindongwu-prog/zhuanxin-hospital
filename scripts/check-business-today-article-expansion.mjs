import fs from 'node:fs'
import { careArticles } from '../src/data/careArticles.js'
import { mediaArticles } from '../src/data/mediaArticles.js'

const fail = (message) => {
  console.error(`Business Today article expansion check failed: ${message}`)
  process.exit(1)
}

const expectedArticles = [
  {
    slug: 'dog-cough-pulmonary-edema-home-monitoring',
    date: '2026-07-31',
    source: 'https://school.businesstoday.com.tw/posts/zhuanxinhospital07312026',
    image: '/imgs/media/dog-cough-pulmonary-edema.webp'
  },
  {
    slug: 'asia-animal-physiological-database',
    date: '2026-07-17',
    source: 'https://school.businesstoday.com.tw/posts/zhuanxinhospital07172026',
    image: '/imgs/media/asia-animal-physiological-database.webp'
  },
  {
    slug: 'digital-health-veterinary-care-2026',
    date: '2026-06-30',
    source: 'https://school.businesstoday.com.tw/posts/zhuanxinhospital06302026-1',
    image: '/imgs/media/nangang-pet-expo-digital-health.webp'
  },
  {
    slug: 'taiwan-japan-cardiology-forum-continuous-monitoring',
    date: '2026-06-29',
    source: 'https://school.businesstoday.com.tw/posts/zhuanxinhospital06292026',
    image: '/imgs/media/taiwan-japan-cardiology-forum.webp'
  },
  {
    slug: 'monet-home-monitoring',
    date: '2026-05-29',
    source: 'https://school.businesstoday.com.tw/posts/zhuanxinhospital05292026',
    image: '/imgs/media/monet-home-monitoring.webp'
  },
  {
    slug: 'hung-rong-wei-thirty-years',
    date: '2026-05-25',
    source: 'https://school.businesstoday.com.tw/posts/zhuanxinhospital05252026',
    image: '/imgs/media/hung-rong-wei-thirty-years.webp'
  }
]

const excludedSources = [
  'https://school.businesstoday.com.tw/posts/zhuanxinhospital07092026',
  'https://school.businesstoday.com.tw/posts/zhuanxinhospital07022026'
]

const serialized = JSON.stringify(mediaArticles)

for (const expected of expectedArticles) {
  const article = mediaArticles.find((item) => item.slug === expected.slug)

  if (!article) fail(`${expected.slug} is missing`)
  if (article.date !== expected.date) fail(`${expected.slug} has the wrong date`)
  if (article.image !== expected.image) fail(`${expected.slug} is not using its licensed source cover`)
  if (!fs.existsSync(new URL(`../public${article.image}`, import.meta.url))) {
    fail(`${expected.slug} image asset is missing`)
  }
  if (!article.sources?.some((source) => source.url === expected.source)) {
    fail(`${expected.slug} source URL is missing`)
  }
  if (article.reviewer?.name !== '專心動物醫院醫療團隊') {
    fail(`${expected.slug} reviewer is missing`)
  }
  if ((article.tags?.length || 0) < 3) fail(`${expected.slug} needs at least 3 SEO tags`)
  if ((article.faqs?.length || 0) < 3) fail(`${expected.slug} needs at least 3 FAQs`)
  if ((article.relatedLinks?.length || 0) < 2) fail(`${expected.slug} needs at least 2 internal links`)
  if ((article.sections?.length || 0) < 3) fail(`${expected.slug} needs at least 3 content sections`)
}

for (const source of excludedSources) {
  if (serialized.includes(source)) fail(`excluded source is still present: ${source}`)
}

if (careArticles.some((article) => article.slug === 'digital-health-veterinary-care-2026')) {
  fail('Digital Health article should live in mediaArticles only')
}

const slugs = mediaArticles.map((article) => article.slug)
if (new Set(slugs).size !== slugs.length) fail('media article slugs must be unique')

const articleComponent = fs.readFileSync(new URL('../src/components/MediaArticle.vue', import.meta.url), 'utf8')
if (!articleComponent.includes('article.relatedLinks')) fail('article page does not render related links')
if (!articleComponent.includes('class="related-reading"')) fail('related reading section is missing')
if (!articleComponent.includes(':to="article.reviewer.path"')) fail('reviewer profile is not linked')

const seoSource = fs.readFileSync(new URL('../src/seo.js', import.meta.url), 'utf8')
if (!seoSource.includes('mediaArticle.tags')) fail('runtime SEO does not use article-specific tags')

const staticSeoSource = fs.readFileSync(new URL('../scripts/generate-static-seo.mjs', import.meta.url), 'utf8')
if (!staticSeoSource.includes("import { careArticles } from '../src/data/careArticles.js'")) {
  fail('static SEO no longer includes care articles')
}
if (!staticSeoSource.includes('article.relatedLinks?.map')) fail('static SEO does not render related links')
if (!staticSeoSource.includes('article.faqs?.flatMap')) fail('static SEO does not render FAQ copy')

console.log(`Business Today article expansion check passed: ${expectedArticles.length} articles`)
