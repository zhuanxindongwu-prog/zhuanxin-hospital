import fs from 'node:fs'
import { mediaArticles } from '../src/data/mediaArticles.js'

const article = mediaArticles.find((item) => item.slug === 'digital-health-veterinary-care-2026')

const fail = (message) => {
  console.error(`Digital health article check failed: ${message}`)
  process.exit(1)
}

if (!article) fail('article slug is missing from mediaArticles')
if (!article.title.includes('Digital Health')) fail('title should identify Digital Health')
if (!article.description.includes('智慧寵物醫療')) fail('description should mention smart veterinary care')
if (!article.image || !fs.existsSync(new URL(`../public${article.image}`, import.meta.url))) {
  fail('article image asset is missing')
}
if (article.label !== '媒體') fail('article should be grouped as a media article')
if (article.reviewer?.name !== '專心動物醫院醫療團隊') fail('medical reviewer metadata is missing')
if (!Array.isArray(article.highlights) || article.highlights.length < 4) fail('highlights are incomplete')
if (!Array.isArray(article.sections) || article.sections.length < 3) fail('article sections are incomplete')
if (!Array.isArray(article.faqs) || article.faqs.length < 3) fail('FAQ content is incomplete')
if (!article.sources?.some((source) => source.url === 'https://school.businesstoday.com.tw/posts/zhuanxinhospital06302026-1')) {
  fail('original Business Today source is missing')
}
if (article.image !== '/imgs/media/nangang-pet-expo-digital-health.webp') {
  fail('article should use the licensed Business Today cover')
}

const mediaArticleComponent = fs.readFileSync(new URL('../src/components/MediaArticle.vue', import.meta.url), 'utf8')
if (!mediaArticleComponent.includes('article.faqs')) fail('MediaArticle should render article FAQ content')
if (!mediaArticleComponent.includes('hasArticleTrustPanel')) {
  fail('MediaArticle should only render the trust/source panel when reviewer or source data exists')
}

const runtimeSeo = fs.readFileSync(new URL('../src/seo.js', import.meta.url), 'utf8')
if (!runtimeSeo.includes('createFaqSchema') || !runtimeSeo.includes('seo.value.article.faqs')) {
  fail('runtime SEO should expose FAQPage schema for article FAQs')
}

const staticSeo = fs.readFileSync(new URL('../scripts/generate-static-seo.mjs', import.meta.url), 'utf8')
if (!staticSeo.includes('faqSchema') || !staticSeo.includes('seo.faqs')) {
  fail('static SEO generator should expose FAQPage schema for article FAQs')
}

console.log(`Digital health article check passed: /articles/media/${article.slug}`)
