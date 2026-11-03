import { staticArticleSeo } from './articleSeo.js'
import { careArticles, getArticlePath } from './careArticles.js'
import { mediaArticles } from './mediaArticles.js'
import { seoContentPages } from './seoContentPages.js'

// Search copy describes the existing article; it does not replace its clinical text or headline.
const searchCopy = {
  '/articles/dog-loss-of-consciousness-syncope-seizure': {
    seoTitle: '狗狗突然失去意識：暈厥與癲癇、心電圖與 Holter 評估',
    description: '狗狗突然倒下是暈厥、癲癇，還是其他問題？整理事件經過、意識與恢復過程的觀察重點，說明心電圖與 Holter 如何協助獸醫師追查原因。'
  },
  '/articles/dog-mmvd-medication-safety': {
    seoTitle: '狗狗 MMVD 心臟藥何時開始？疾病分期與給藥安全',
    description: '狗狗 MMVD 的用藥取決於疾病分期與個別狀態。本文說明 B1、B2 與心衰竭治療定位，以及藥名核對、漏藥與重複給藥時的就醫溝通重點。'
  },
  '/articles/media/dog-heart-medication-long-term': {
    seoTitle: '狗狗心臟藥要吃一輩子嗎？漏藥、重複給藥與停藥評估',
    description: '狗狗症狀改善後還要繼續吃心臟藥嗎？本文整理長期用藥目的、漏藥與重複給藥時需要提供的資訊，協助飼主與獸醫師討論個別處方及追蹤。'
  },
  '/articles/dog-diuretics-kidney-function': {
    seoTitle: '狗狗吃利尿劑會傷腎嗎？心衰竭與腎功能監測',
    description: '狗狗心衰竭治療為什麼需要利尿劑，又該如何理解腎指數變化？從鬱血、腎臟灌流與心腎交互作用，認識用藥評估及腎功能監測的重要性。'
  },
  '/articles/dog-mmvd-nonlinear-progression-chordal-rupture': {
    seoTitle: '狗狗 MMVD 不一定線性進展：腱索斷裂與急性肺水腫'
  }
}

const topicLinks = {
  '/guides/dog-cough': ['/articles/media/dog-cough-heart-disease-guide', '/articles/media/dog-cough-pulmonary-edema-home-monitoring', '/guides/chest-xray'],
  '/guides/breathing-difficulty': ['/articles/dog-orthopnea-night-breathing-emergency', '/guides/chest-xray', '/topics/congestive-heart-failure'],
  '/guides/pet-syncope': ['/articles/dog-loss-of-consciousness-syncope-seizure', '/guides/pet-ecg', '/guides/pet-arrhythmia'],
  '/guides/cat-hindlimb-emergency': ['/guides/feline-hcm', '/guides/breathing-difficulty', '/services/veterinary-cardiology'],
  '/guides/cardiac-physical-exam': ['/articles/media/complete-veterinary-cardiac-examination', '/guides/pet-ecg', '/services/echocardiography'],
  '/guides/chest-xray': ['/guides/breathing-difficulty', '/guides/dog-cough', '/services/echocardiography'],
  '/guides/pet-ecg': ['/articles/media/young-dog-bradyarrhythmia-ecg-case', '/guides/pet-arrhythmia', '/articles/dog-loss-of-consciousness-syncope-seizure'],
  '/guides/nt-probnp': ['/services/echocardiography', '/guides/feline-hcm', '/guides/cardiorenal-syndrome'],
  '/guides/feline-hcm': ['/articles/media/feline-transient-myocardial-thickening', '/guides/cat-hindlimb-emergency', '/guides/nt-probnp'],
  '/guides/canine-dcm': ['/guides/pet-arrhythmia', '/services/echocardiography', '/topics/congestive-heart-failure'],
  '/guides/canine-heartworm': ['/guides/pulmonary-hypertension', '/guides/dog-cough', '/services/veterinary-cardiology'],
  '/guides/pet-arrhythmia': ['/guides/pet-ecg', '/articles/dog-loss-of-consciousness-syncope-seizure', '/articles/media/young-dog-bradyarrhythmia-ecg-case'],
  '/guides/congenital-heart-disease': ['/articles/media/congenital-heart-disease-preoperative-screening', '/services/echocardiography', '/guides/cardiac-physical-exam'],
  '/guides/pulmonary-hypertension': ['/guides/canine-heartworm', '/guides/breathing-difficulty', '/services/echocardiography'],
  '/guides/cardiorenal-syndrome': ['/articles/dog-diuretics-kidney-function', '/guides/cardiac-medication', '/topics/congestive-heart-failure'],
  '/guides/cardiac-medication': ['/articles/dog-mmvd-medication-safety', '/articles/media/dog-heart-medication-long-term', '/articles/dog-diuretics-kidney-function']
}

const rawArticles = [
  ...Object.entries(staticArticleSeo).map(([path, article]) => ({ ...article, path })),
  ...[...careArticles, ...mediaArticles].map(article => ({ ...article, path: getArticlePath(article) })),
  ...Object.values(seoContentPages).filter(page => page.type !== 'service')
]
const titles = new Map([...rawArticles, ...Object.values(seoContentPages)].map(article => [article.path, article.title]))

export const searchArticles = rawArticles.map(article => ({
  ...article,
  seoTitle: searchCopy[article.path]?.seoTitle || article.title,
  description: searchCopy[article.path]?.description || article.description,
  abstract: article.summary || searchCopy[article.path]?.description || article.description,
  publishedDate: article.publishedDate || article.date,
  modifiedDate: article.modifiedDate || article.updatedDate || article.publishedDate || article.date,
  tags: article.tags || [],
  // Existing guide layouts intentionally hide their review block; do not publish a hidden review claim.
  reviewerVisible: !article.path.startsWith('/guides/') && !article.path.startsWith('/topics/'),
  images: [...new Set([
    ...(article.images || []),
    ...(article.sections || []).flatMap(section => [
      ...(section.media || []).map(media => media.type === 'video' ? media.poster : media.src),
      section.photo?.src
    ]).filter(Boolean)
  ])],
  relatedLinks: topicLinks[article.path]
    ? topicLinks[article.path].map(path => ({ title: titles.get(path), path }))
    : article.relatedLinks || []
}))
const byPath = new Map(searchArticles.map(article => [article.path, article]))
export const getSearchArticle = path => byPath.get(path)

export const getArticleOverviewItems = (article, { summary = true, metadata = true } = {}) => {
  if (!article) return []
  return [
    ...(summary ? [{ tag: 'h2', text: '本文摘要' }, { tag: 'p', text: article.abstract }] : []),
    ...(metadata ? [{ tag: 'p', text: `發布：${article.publishedDate}｜內容更新：${article.modifiedDate}` }] : []),
    ...(metadata && article.authors?.length
      ? article.authors.map(author => ({ tag: 'p', text: `撰文：${author.name}`, href: author.path }))
      : metadata ? [{ tag: 'p', text: '內容整理：專心動物醫院', href: '/' }] : []),
    ...(metadata && article.reviewer && article.reviewerVisible
      ? [{ tag: 'p', text: `內容審閱：${article.reviewer.name}｜${article.reviewer.title}`, href: article.reviewer.path }]
      : [])
  ]
}

export const getArticleOutline = (article = {}) => [
  ...(article.sections || []).map((section, index) => ({ id: `section-${index + 1}`, title: section.title })),
  ...(article.faqs?.length ? [{ id: 'page-faq', title: '常見問題' }] : []),
  ...(article.sources?.length ? [{ id: 'page-references', title: '參考來源' }] : [])
]

export const createReferenceSchema = source => ({
  '@type': 'WebPage',
  name: source.title,
  url: source.url,
  ...(source.date ? { datePublished: source.date } : {}),
  ...(source.publisher ? { publisher: { '@type': 'Organization', name: source.publisher } } : {})
})

export const createArticleDirectorySchema = (siteUrl = 'https://cardiospecialvh.tw') => {
  const absolute = path => new URL(path, siteUrl + '/').href
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': absolute('/articles') + '#collection',
    name: '專心犬貓心臟病照護秘笈',
    url: absolute('/articles'),
    inLanguage: 'zh-Hant-TW',
    isPartOf: { '@id': absolute('/') + '#website' },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: searchArticles.length,
      itemListElement: searchArticles.map((article, index) => ({
        '@type': 'ListItem', position: index + 1, name: article.title, url: absolute(article.path)
      }))
    }
  }
}
