import { careArticles, getArticlePath } from './careArticles.js'
import { mediaArticles } from './mediaArticles.js'
import { cardiologyGuideCards } from './cardiologyGuidePages.js'
import { sortArticlesByDateDesc } from './articleSorting.js'

const featuredGuides = [
  {
    title: '犬貓心臟超音波：檢查什麼、何時需要安排？',
    category: '心臟檢查',
    date: '2026-06-12',
    image: '/imgs/guides/congestive-heart-failure.jpg',
    link: '/services/echocardiography',
    description: '了解心臟超音波如何評估心臟結構、血流、疾病分期與治療方向。'
  },
  {
    title: '犬貓鬱血性心衰竭 CHF',
    category: '心臟疾病',
    date: '2026-06-12',
    image: '/imgs/optimized/毛孩的心臟.webp',
    link: '/topics/congestive-heart-failure',
    description: '整理呼吸警訊、急性處置、長期用藥與居家監測的重要原則。'
  },
  {
    title: '毛孩的心臟正在承受壓力嗎？犬貓心臟病警訊',
    category: '常見警訊',
    date: '2026-06-05',
    image: '/imgs/optimized/毛孩的心臟.webp',
    link: '/articles/pet-heart-disease-screening',
    description: '認識心雜音、咳嗽、喘與昏倒等訊號，以及心臟檢查與早期評估的重要性。'
  },

  {
    title: '狗狗 MMVD 二尖瓣黏液樣變性完整指南',
    category: '心臟疾病',
    date: '2026-06-12',
    image: '/imgs/guides/mmvd-overview.jpg',
    link: '/topics/mmvd',
    description: '從 B1、B2、C 到 D 期，理解 MMVD 的分期、檢查、治療與居家照護。'
  },
  {
    title: '犬貓心臟病大哉問',
    category: '常見警訊',
    date: '2026-06-05',
    image: '/imgs/dejiang.webp',
    link: '/articles/pet-heart-disease-warning-signs',
    description: '從咳嗽、喘氣、昏倒與活動力下降，判斷什麼時候應安排心臟評估。'
  },
  {
    title: '狗狗 MMVD 內科治療與外科手術怎麼選？',
    category: '治療與照護',
    date: '2026-06-05',
    image: '/imgs/guides/mmvd-treatment.jpg',
    link: '/articles/dog-mmvd-treatment-options',
    description: '理解內科藥物與外科手術的適應症、風險，以及個別化治療選擇。'
  },
  {
    title: '狗狗 MMVD Stage C 心衰竭照護重點',
    category: '治療與照護',
    date: '2026-06-05',
    image: '/imgs/guides/mmvd-stage-c.jpg',
    link: '/articles/dog-mmvd-stage-c-care',
    description: '掌握穩定用藥、睡眠呼吸速率監測與定期追蹤的照護原則。'
  },
  {
    title: 'PetVoice 犬貓居家生理監測完整指南',
    category: '居家監測',
    date: '2026-06-05',
    image: '/imgs/optimized/petvoice宣傳.webp',
    link: '/petvoice-guide',
    description: '認識心率、安靜時呼吸數、活動與睡眠趨勢如何輔助長期照護。'
  },
  {
    title: 'Still Beating：不曾停止的心跳',
    category: '真實案例',
    date: '2026-06-05',
    image: '/imgs/optimized/converted_image.webp',
    link: '/articles/still-beating-veterinary-cardiology',
    description: '從病例故事理解心臟疾病治療過程中的風險、選擇與陪伴。'
  }
]

const toCard = (article) => ({
  title: article.title,
  category: article.category,
  date: article.date,
  updatedDate: article.updatedDate,
  image: article.image,
  link: getArticlePath(article),
  description: article.description
})

const dedupeByLink = (articles) => {
  const seen = new Set()
  return articles.filter((article) => {
    if (!article.link || seen.has(article.link)) return false
    seen.add(article.link)
    return true
  })
}

// The browser and generated HTML share one catalogue so restored pages cannot become orphaned.
const careCards = careArticles.map(toCard)
export const sortedMediaEntries = sortArticlesByDateDesc(
  mediaArticles.filter((article) => article.label !== 'Facebook Care Guide')
)
export const mediaArticleCards = sortedMediaEntries.map(toCard)
export const careGuideCards = sortArticlesByDateDesc(
  dedupeByLink([...featuredGuides, ...careCards, ...cardiologyGuideCards])
)
export const editorialArticleCards = sortArticlesByDateDesc(
  dedupeByLink([...mediaArticleCards, ...careGuideCards])
)
export const homepageArticleCards = sortArticlesByDateDesc(
  dedupeByLink([...careCards, ...mediaArticleCards])
).slice(0, 3)
