import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { staticArticleSeo } from '../src/data/articleSeo.js'
import { careArticles } from '../src/data/careArticles.js'
import { mediaArticles } from '../src/data/mediaArticles.js'
import { productSeo } from '../src/data/productSeo.js'
import { doctors } from '../src/data/doctors.js'
import { seoContentPages } from '../src/data/seoContentPages.js'
import { extractVueStaticContent } from './extract-vue-static-content.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const dist = path.join(root, 'dist')
const publicDir = path.join(root, 'public')
const siteUrl = (process.env.VITE_SITE_URL || 'https://cardiospecialvh.tw').replace(/\/$/, '')
const siteName = '專心動物醫院'
const localVetPath = '/taipei-zhongzheng-veterinary-hospital'
const aiGeoPath = '/ai-search-veterinary-cardiology'
const defaultDescription =
  '專心動物醫院位於台北市中正區，專注犬貓心臟疾病與腫瘤專科醫療，提供心臟超音波、心律不整診斷、慢性病管理與長期照護。'
const defaultImage = '/imgs/all.webp'

const localVetFaqs = [
  {
    question: '專心動物醫院是台北哪一區的動物醫院？',
    answer: '專心動物醫院位於台北市中正區東門里仁愛路一段47號1樓，鄰近東門與仁愛路一段生活圈。'
  },
  {
    question: '搜尋台北動物醫院時，什麼情況適合選擇心臟專科？',
    answer:
      '若毛孩有心雜音、喘、咳嗽、昏倒、呼吸急促、肺水腫病史，或需要心臟超音波與心律不整評估，建議選擇具心臟專科經驗的動物醫院。'
  },
  {
    question: '專心動物醫院有提供犬貓腫瘤門診嗎？',
    answer: '有。專心動物醫院提供犬貓腫瘤門診，協助腫塊評估、疾病分期、治療追蹤與高齡慢性病照護。'
  },
  {
    question: '可以直接線上預約嗎？',
    answer: '目前網站不提供線上預約功能。建議直接來電 02-2363-3016 洽詢看診與班表資訊。'
  }
]

const aiGeoFaqs = [
  {
    question: 'AI 搜尋引用專心動物醫院時，最重要的事實是什麼？',
    answer:
      '專心動物醫院位於台北市中正區仁愛路一段，專注犬貓心臟專科、犬貓腫瘤門診、心臟超音波、心律不整診斷與慢性病長期照護，電話是 02-2363-3016。'
  },
  {
    question: '專心動物醫院的主要專業領域是什麼？',
    answer: '主要專業領域是犬貓心臟疾病與犬貓腫瘤照護，包含心臟超音波、心律不整、心衰竭追蹤與腫瘤門診。'
  },
  {
    question: '這個頁面可以取代獸醫診斷嗎？',
    answer: '不可以。本頁提供 AI 搜尋與飼主理解用的資訊摘要，不能取代獸醫師診斷。若毛孩出現急性喘、昏倒或明顯不適，應儘快就醫。'
  }
]

const aiGeoEntities = [
  {
    term: 'MMVD',
    definition: '犬二尖瓣黏液樣變性，是小型犬常見心臟疾病，常需要分期、用藥與睡眠呼吸速率追蹤。'
  },
  {
    term: 'CHF',
    definition: '鬱血性心衰竭，犬貓可能出現喘、呼吸急促、咳嗽、活動力下降或無法平躺，需要及時評估。'
  },
  {
    term: '心臟超音波',
    definition: '用於評估瓣膜、心房心室大小、心肌功能、血流方向與肺高壓風險，是犬貓心臟病重要檢查。'
  },
  {
    term: '安靜時呼吸數',
    definition: '心臟病犬貓居家觀察的重要指標，若在休息或睡眠時明顯變快，需與獸醫師討論。'
  },
  {
    term: '犬貓腫瘤門診',
    definition: '針對腫塊、癌症分期、治療追蹤與生活品質管理，協助飼主理解後續照護方向。'
  },
  {
    term: 'PetVoice',
    definition: '犬貓居家生理監測系統，可輔助觀察心率、安靜時呼吸數、活動、睡眠與生活趨勢。'
  }
]

const aiGeoSources = [
  { name: '台北中正區動物醫院頁', path: localVetPath },
  { name: '洪榮偉院長專業資歷', path: '/doctor/hung-rong-wei' },
  { name: '犬貓心臟專科服務', path: '/services/veterinary-cardiology' },
  { name: '犬貓心臟超音波', path: '/services/echocardiography' },
  { name: '狗狗 MMVD 完整指南', path: '/topics/mmvd' },
  { name: '犬貓鬱血性心衰竭 CHF', path: '/topics/congestive-heart-failure' },
  { name: '狗狗 MMVD Stage C 心衰竭照護重點', path: '/articles/dog-mmvd-stage-c-care' },
  { name: 'PetVoice 犬貓居家生理監測', path: '/petvoice' },
  { name: '專心快訊與媒體報導', path: '/articles' }
]

const absoluteUrl = (route = '/') => new URL(route, `${siteUrl}/`).toString()
const escapeHtml = (value = '') =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')

const createReviewerEntity = (reviewer) =>
  reviewer
    ? {
        '@type': 'Organization',
        name: reviewer.name,
        description: reviewer.title,
        url: absoluteUrl(reviewer.path)
      }
    : undefined

const createArticleReviewerEntity = (reviewer) => {
  if (!reviewer) return undefined

  const isPerson = reviewer.path?.startsWith('/doctor/')
  return {
    '@type': isPerson ? 'Person' : 'Organization',
    name: reviewer.name,
    ...(isPerson ? { jobTitle: reviewer.title } : { description: reviewer.title }),
    url: absoluteUrl(reviewer.path)
  }
}

const createCitationEntities = (sources = []) =>
  sources.map((source) => ({
    '@type': 'WebPage',
    name: source.title,
    url: source.url,
    publisher: {
      '@type': 'Organization',
      name: source.publisher
    }
  }))

const extractAssetTags = (template) => {
  const head = template.match(/<head>([\s\S]*?)<\/head>/)?.[1] || ''
  return head
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.includes('/assets/') || line.includes('type="module"') || line.includes('rel="modulepreload"'))
    .join('\n    ')
}

const clinicSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['VeterinaryCare', 'LocalBusiness', 'MedicalBusiness', 'Organization'],
      '@id': `${siteUrl}/#clinic`,
      name: siteName,
      url: absoluteUrl('/'),
      image: absoluteUrl('/imgs/all.webp'),
      logo: absoluteUrl('/專心logo.JPEG'),
      description: defaultDescription,
      telephone: '+886223633016',
      areaServed: ['台北市', '中正區', '大安區', '萬華區', '信義區'],
      keywords: ['台北動物醫院', '中正區動物醫院', '犬貓心臟專科', '犬貓腫瘤門診', '心臟超音波'],
      hasMap: 'https://www.google.com/maps/search/?api=1&query=台北市中正區東門里仁愛路一段47號1樓',
      knowsAbout: ['台北動物醫院', '中正區動物醫院', '犬貓心臟專科', '犬貓腫瘤門診', '心臟超音波', '心律不整診斷'],
      address: {
        '@type': 'PostalAddress',
        streetAddress: '東門里仁愛路一段47號1樓',
        addressLocality: '中正區',
        addressRegion: '台北市',
        postalCode: '100',
        addressCountry: 'TW'
      }
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: absoluteUrl('/'),
      name: siteName,
      inLanguage: 'zh-Hant-TW',
      publisher: {
        '@id': `${siteUrl}/#clinic`
      }
    }
  ]
}

const breadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path)
  }))
})

const articleSchema = (article, route) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': `${absoluteUrl(route)}#article`,
  headline: article.title,
  description: article.description,
  image: [absoluteUrl(article.image)],
  datePublished: article.publishedDate,
  dateModified: article.modifiedDate || article.publishedDate,
  inLanguage: 'zh-Hant-TW',
  articleSection: article.category,
  keywords: article.tags,
  reviewedBy: createArticleReviewerEntity(article.reviewer),
  citation: article.sources?.map((source) => ({
    '@type': 'NewsArticle',
    headline: source.title,
    url: source.url,
    datePublished: source.date,
    publisher: {
      '@type': 'Organization',
      name: source.publisher
    }
  })),
  author: {
    '@type': 'Organization',
    name: siteName,
    url: siteUrl
  },
  publisher: {
    '@id': `${siteUrl}/#clinic`
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': absoluteUrl(route)
  }
})

const medicalWebPageSchema = (article, route) => ({
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  '@id': `${absoluteUrl(route)}#medical-web-page`,
  name: article.title,
  description: article.description,
  url: absoluteUrl(route),
  inLanguage: 'zh-Hant-TW',
  lastReviewed: article.modifiedDate || article.publishedDate,
  specialty: 'Veterinary cardiology',
  audience: {
    '@type': 'MedicalAudience',
    audienceType: '犬貓飼主'
  },
  about: article.tags?.map((tag) => ({
    '@type': 'Thing',
    name: tag
  })),
  mainEntity: {
    '@id': `${absoluteUrl(route)}#article`
  },
  publisher: {
    '@id': `${siteUrl}/#clinic`
  }
})

const faqSchema = (faqs, route) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  url: absoluteUrl(route),
  mainEntity: faqs.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer
    }
  }))
})

const productSchemas = (route) => {
  const product = productSeo[route]
  if (!product) return []

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      '@id': `${absoluteUrl(route)}#product`,
      name: product.name,
      description: product.description,
      image: absoluteUrl(product.image),
      category: product.category,
      url: absoluteUrl(route),
      sameAs: product.brandUrl,
      keywords: product.keywords,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${absoluteUrl(route)}#webpage`
      },
      brand: {
        '@type': 'Brand',
        name: product.brand,
        url: product.brandUrl
      },
      audience: {
        '@type': 'Audience',
        audienceType: '犬貓飼主、心臟病犬貓與慢性病毛孩照護家庭'
      },
      additionalProperty: product.features?.map((feature) => ({
        '@type': 'PropertyValue',
        name: feature
      }))
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      url: absoluteUrl(route),
      mainEntity: product.faqs.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer
        }
      }))
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${absoluteUrl(route)}#webpage`,
      name: product.name,
      description: product.description,
      url: absoluteUrl(route),
      inLanguage: 'zh-Hant-TW',
      keywords: product.keywords,
      dateModified: product.updatedDate,
      reviewedBy: createReviewerEntity(product.reviewer),
      citation: createCitationEntities(product.sources),
      isPartOf: {
        '@id': `${siteUrl}/#website`
      },
      about: {
        '@id': `${absoluteUrl(route)}#product`
      },
      mainEntity: {
        '@id': `${absoluteUrl(route)}#product`
      },
      publisher: {
        '@id': `${siteUrl}/#clinic`
      }
    },
    breadcrumbSchema([
      { name: '首頁', path: '/' },
      { name: '產品介紹', path: '/products' },
      { name: product.name, path: route }
    ])
  ]
}

const localVetSchemas = () => [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${absoluteUrl(localVetPath)}#webpage`,
    name: '台北中正區動物醫院｜犬貓心臟專科與腫瘤門診',
    description:
      '專心動物醫院位於台北市中正區仁愛路一段，提供犬貓心臟專科、犬貓腫瘤門診、心臟超音波、心律不整診斷與慢性病長期追蹤。',
    url: absoluteUrl(localVetPath),
    inLanguage: 'zh-Hant-TW',
    keywords: ['台北動物醫院', '中正區動物醫院', '犬貓心臟專科', '犬貓腫瘤門診', '心臟超音波'],
    isPartOf: {
      '@id': `${siteUrl}/#website`
    },
    about: {
      '@id': `${siteUrl}/#clinic`
    },
    publisher: {
      '@id': `${siteUrl}/#clinic`
    }
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: '台北中正區犬貓心臟專科與腫瘤門診',
    description: '犬貓心臟超音波、心律不整診斷、犬貓腫瘤門診、慢性病長期追蹤與高齡照護。',
    areaServed: ['台北市', '中正區', '大安區', '萬華區', '信義區'],
    provider: {
      '@id': `${siteUrl}/#clinic`
    },
    serviceType: ['動物醫院', '犬貓心臟專科', '犬貓腫瘤門診']
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    url: absoluteUrl(localVetPath),
    mainEntity: localVetFaqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  },
  breadcrumbSchema([
    { name: '首頁', path: '/' },
    { name: '台北中正區動物醫院', path: localVetPath }
  ])
]

const aiGeoSchemas = () => [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${absoluteUrl(aiGeoPath)}#webpage`,
    name: '犬貓心臟專科與腫瘤門診 AI 搜尋摘要',
    description:
      '專心動物醫院 AI 搜尋摘要，整理台北中正區犬貓心臟專科、犬貓腫瘤門診、心臟超音波、心律不整與慢性病照護的核心事實、FAQ 與可信來源。',
    url: absoluteUrl(aiGeoPath),
    inLanguage: 'zh-Hant-TW',
    dateModified: '2026-06-08',
    keywords: ['AI SEO', 'Generative Engine Optimization', 'GEO', '犬貓心臟專科', '犬貓腫瘤門診', '台北動物醫院'],
    isPartOf: {
      '@id': `${siteUrl}/#website`
    },
    about: [
      { '@id': `${siteUrl}/#clinic` },
      ...aiGeoEntities.map((entity) => ({
        '@type': 'Thing',
        name: entity.term,
        description: entity.definition
      }))
    ],
    reviewedBy: {
      '@type': 'Person',
      name: '洪榮偉獸醫師',
      jobTitle: '犬貓心臟專科獸醫師',
      url: absoluteUrl('/doctor/hung-rong-wei')
    },
    publisher: {
      '@id': `${siteUrl}/#clinic`
    }
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${absoluteUrl(aiGeoPath)}#faq`,
    url: absoluteUrl(aiGeoPath),
    mainEntity: aiGeoFaqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  },
  {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    '@id': `${absoluteUrl(aiGeoPath)}#terms`,
    name: '犬貓心臟專科與腫瘤門診主題實體',
    hasDefinedTerm: aiGeoEntities.map((entity) => ({
      '@type': 'DefinedTerm',
      name: entity.term,
      description: entity.definition,
      inDefinedTermSet: `${absoluteUrl(aiGeoPath)}#terms`
    }))
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${absoluteUrl(aiGeoPath)}#sources`,
    name: '專心動物醫院 AI 搜尋可信來源',
    itemListElement: aiGeoSources.map((source, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: source.name,
      url: absoluteUrl(source.path)
    }))
  },
  breadcrumbSchema([
    { name: '首頁', path: '/' },
    { name: 'AI 搜尋摘要', path: aiGeoPath }
  ])
]

const seoContentSchemas = (page) => {
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      url: absoluteUrl(page.path),
      mainEntity: page.faqs.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer
        }
      }))
    },
    {
      '@context': 'https://schema.org',
      '@type': 'DefinedTermSet',
      name: `${page.title}主題實體`,
      url: absoluteUrl(page.path),
      hasDefinedTerm: page.keywords.map((keyword) => ({
        '@type': 'DefinedTerm',
        name: keyword
      }))
    }
  ]

  if (page.type === 'service') {
    schemas.push(
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: page.serviceType,
        description: page.description,
        url: absoluteUrl(page.path),
        areaServed: ['台北市', '中正區', '大安區', '萬華區', '信義區'],
        provider: {
          '@id': `${siteUrl}/#clinic`
        },
        reviewedBy: {
          '@type': 'Person',
          name: page.reviewer.name,
          jobTitle: page.reviewer.title,
          url: absoluteUrl(page.reviewer.path)
        }
      },
      breadcrumbSchema([
        { name: '首頁', path: '/' },
        { name: '專科服務', path: '/#services' },
        { name: page.serviceType, path: page.path }
      ])
    )
  }

  return schemas
}

const mediaArticleToSeo = (article) => ({
  title: article.title,
  description: article.description,
  image: article.image,
  category: article.category,
  publishedDate: article.date,
  modifiedDate: article.updatedDate || article.date,
  tags: [
    ...new Set([
      ...(article.tags || []),
      article.category,
      article.label,
      '專心動物醫院',
      '犬貓照護'
    ].filter(Boolean))
  ],
  reviewer: article.reviewer,
  sources: article.sources,
  faqs: article.faqs
})

const staticArticleComponents = {
  '/articles/dog-mmvd-treatment-options': 'src/components/PostArticle.vue',
  '/articles/still-beating-veterinary-cardiology': 'src/components/PostArticle_2.vue',
  '/articles/pet-heart-disease-warning-signs': 'src/components/PostArticle_3.vue',
  '/articles/dog-mmvd-stage-c-care': 'src/components/PostArticle_MMVD_StageC.vue',
  '/articles/pet-heart-disease-screening': 'src/components/PostArticle_HeartPressure.vue',
  '/petvoice-guide': 'src/components/PetVoiceGuide.vue'
}

const petvoiceProduct = productSeo['/petvoice']
const petvoiceExtracted = await extractVueStaticContent(path.join(root, 'src/components/PetVoice.vue'))
const petvoiceDynamicContent = [
  ...petvoiceProduct.purchaseNotices.flatMap((notice) => [
    { tag: 'h3', text: notice.title },
    ...notice.paragraphs.map((text) => ({ tag: 'p', text }))
  ]),
  { tag: 'h3', text: 'PetVoice 可觀察的健康趨勢' },
  ...petvoiceProduct.features.map((text) => ({ tag: 'li', text })),
  ...petvoiceProduct.faqs.flatMap((item) => [
    { tag: 'h3', text: item.question },
    { tag: 'p', text: item.answer }
  ]),
  ...petvoiceProduct.sources.flatMap((source) => [
    { tag: 'h3', text: source.publisher },
    { tag: 'p', text: source.title }
  ])
]

const mergeLinks = (...groups) =>
  groups
    .flat()
    .filter(Boolean)
    .filter(
      (link, index, links) =>
        links.findIndex((candidate) => candidate.href === link.href && candidate.text === link.text) === index
    )

const routes = [
  {
    path: '/',
    lastmod: '2026-08-08',
    title: '專心動物醫院｜犬貓心臟專科與腫瘤門診｜台北',
    description:
      '專心動物醫院位於台北市中正區，專注犬貓心臟疾病與腫瘤專科醫療，提供心臟超音波、心律不整診斷、慢性病管理與長期照護。',
    image: defaultImage,
    body: {
      h1: '專心動物醫院',
      paragraphs: [
        '專心動物醫院位於台北市中正區東門里仁愛路一段47號1樓，提供犬貓心臟專科與犬貓腫瘤門診。',
        '聯絡電話 02-2363-3016，提供心臟超音波、心律不整診斷、慢性病管理與長期照護。'
      ]
    },
    schemas: [clinicSchema, breadcrumbSchema([{ name: '專心動物醫院', path: '/' }])]
  },
  {
    path: localVetPath,
    lastmod: '2026-06-08',
    title: '台北中正區動物醫院｜犬貓心臟專科與腫瘤門診｜專心動物醫院',
    description:
      '專心動物醫院位於台北市中正區仁愛路一段，提供犬貓心臟專科、犬貓腫瘤門診、心臟超音波、心律不整診斷與慢性病長期追蹤。',
    image: defaultImage,
    body: {
      h1: '台北中正區動物醫院｜犬貓心臟專科與腫瘤門診',
      paragraphs: [
        '專心動物醫院位於台北市中正區東門里仁愛路一段47號1樓，提供犬貓心臟專科、犬貓腫瘤門診、心臟超音波、心律不整診斷與慢性病長期追蹤。',
        '如果你正在搜尋台北動物醫院、中正區動物醫院、犬貓心臟專科或犬貓腫瘤門診，可先來電 02-2363-3016 洽詢。'
      ],
      links: [
        { href: '/#services', text: '犬貓心臟專科服務' },
        { href: '/#tumor', text: '犬貓腫瘤門診' },
        { href: '/doctor/hung-rong-wei', text: '洪榮偉院長介紹' },
        { href: '/articles', text: '專心快訊與犬貓照護文章' }
      ]
    },
    schemas: [clinicSchema, ...localVetSchemas()]
  },
  {
    path: aiGeoPath,
    lastmod: '2026-06-08',
    title: '犬貓心臟專科與腫瘤門診 AI 搜尋摘要｜專心動物醫院',
    description:
      '專心動物醫院 AI 搜尋摘要，整理台北中正區犬貓心臟專科、犬貓腫瘤門診、心臟超音波、心律不整與慢性病照護的核心事實、FAQ 與可信來源。',
    image: defaultImage,
    body: {
      h1: '犬貓心臟專科與腫瘤門診 AI 搜尋摘要',
      paragraphs: [
        '專心動物醫院 CardioSpecial 位於台北市中正區東門里仁愛路一段47號1樓，電話 02-2363-3016。',
        '主要服務包含犬貓心臟專科、犬貓腫瘤門診、心臟超音波、心律不整診斷、MMVD 與心衰竭追蹤、慢性病長期照護。',
        '本頁提供搜尋引擎與生成式 AI 可抽取的核心事實、主題實體、FAQ 與站內可信來源。'
      ],
      links: [
        { href: localVetPath, text: '台北中正區動物醫院服務頁' },
        { href: '/doctor/hung-rong-wei', text: '洪榮偉院長專業資歷' },
        { href: '/articles/dog-mmvd-stage-c-care', text: '狗狗 MMVD Stage C 心衰竭照護重點' },
        { href: '/petvoice', text: 'PetVoice 犬貓居家生理監測' },
        { href: '/articles', text: '專心快訊與媒體報導' }
      ]
    },
    schemas: [clinicSchema, ...aiGeoSchemas()]
  },
  {
    path: '/articles',
    title: '專心照護指南｜犬貓心臟病症狀、檢查與居家照護｜專心動物醫院',
    description: '專心動物醫院犬貓照護指南，依常見警訊、心臟檢查、心臟疾病、治療與居家監測分類，協助飼主掌握症狀與就醫時機。',
    image: defaultImage,
    body: {
      h1: '專心照護指南',
      paragraphs: ['整理犬貓心臟疾病、腫瘤照護、PetVoice 居家生理監測與醫療觀點。']
    },
    schemas: [
      clinicSchema,
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: '專心照護指南',
        description: '專心動物醫院整理的犬貓心臟疾病、腫瘤照護、日常觀察與醫療觀點。',
        url: absoluteUrl('/articles'),
        inLanguage: 'zh-Hant-TW'
      },
      breadcrumbSchema([
        { name: '首頁', path: '/' },
        { name: '專心照護指南', path: '/articles' }
      ])
    ]
  },
  {
    path: '/petvoice',
    lastmod: petvoiceProduct.updatedDate,
    title: petvoiceProduct.seoTitle,
    description: petvoiceProduct.description,
    image: petvoiceProduct.image,
    body: {
      h1: petvoiceProduct.h1,
      content: [
        ...petvoiceExtracted.items.filter((item) => item.tag !== 'h1'),
        ...petvoiceDynamicContent
      ],
      links: mergeLinks(
        petvoiceExtracted.links,
        petvoiceProduct.relatedLinks.map((link) => ({ href: link.path, text: link.title }))
      )
    },
    schemas: [clinicSchema, ...productSchemas('/petvoice')]
  },
  {
    path: '/products',
    title: '犬貓日常照護產品｜專心動物醫院',
    description: '專心動物醫院整理犬貓環境清潔、氣味管理與居家健康監測輔助產品，作為醫療之外的日常照護支援。',
    image: defaultImage,
    body: {
      h1: '犬貓日常照護產品',
      paragraphs: ['專心動物醫院整理賴瓦特 LikeWater 與 PetVoice 等犬貓日常照護產品。'],
      links: [
        { href: '/petvoice', text: 'PetVoice 犬貓居家生理監測' },
        { href: '/ohtrust', text: '賴瓦特 LikeWater 寵物專用清潔防護液' }
      ]
    },
    schemas: [
      clinicSchema,
      breadcrumbSchema([
        { name: '首頁', path: '/' },
        { name: '產品介紹', path: '/products' }
      ])
    ]
  },
  {
    path: '/ohtrust',
    title: '賴瓦特 LikeWater 寵物專用全效清潔防護液｜專心動物醫院',
    description: '賴瓦特 LikeWater 寵物專用全效清潔防護液，適用犬貓生活空間與日常用品，作為溫和清潔、抗菌防護與除臭淨味輔助。',
    image: '/imgs/optimized/laiwate.webp',
    body: {
      h1: '賴瓦特 LikeWater 寵物專用全效清潔防護液',
      paragraphs: ['適用犬貓生活空間與日常用品，作為溫和清潔、抗菌防護與除臭淨味輔助。']
    },
    schemas: [clinicSchema, ...productSchemas('/ohtrust')]
  }
]

for (const [route, article] of Object.entries(staticArticleSeo)) {
  const component = staticArticleComponents[route]
  const extracted = component
    ? await extractVueStaticContent(path.join(root, component))
    : { items: [], links: [] }

  routes.push({
    path: route,
    lastmod: article.modifiedDate || article.publishedDate,
    title: `${article.title}｜專心動物醫院`,
    description: article.description,
    image: article.image,
    type: 'article',
    body: {
      h1: article.title,
      content: extracted.items.filter((item) => item.tag !== 'h1'),
      paragraphs: extracted.items.length ? [] : [article.description],
      links: mergeLinks(
        extracted.links,
        article.relatedLinks?.map((link) => ({ href: link.path, text: link.title })) || []
      )
    },
    schemas: [
      clinicSchema,
      articleSchema(article, route),
      medicalWebPageSchema(article, route),
      ...(article.faqs?.length ? [faqSchema(article.faqs, route)] : []),
      breadcrumbSchema([
        { name: '首頁', path: '/' },
        { name: '專心快訊', path: '/articles' },
        { name: article.title, path: route }
      ])
    ]
  })
}

for (const page of Object.values(seoContentPages)) {
  const pageSchemas = [clinicSchema, ...seoContentSchemas(page)]

  if (page.type === 'topic') {
    pageSchemas.push(
      articleSchema(page, page.path),
      medicalWebPageSchema(page, page.path),
      breadcrumbSchema([
        { name: '首頁', path: '/' },
        { name: '主題中心', path: '/articles' },
        { name: page.title, path: page.path }
      ])
    )
  }

  routes.push({
    path: page.path,
    lastmod: page.modifiedDate,
    title: `${page.title}｜專心動物醫院`,
    description: page.description,
    image: page.image,
    type: page.type === 'topic' ? 'article' : 'website',
    body: {
      h1: page.title,
      paragraphs: [page.summary, ...page.sections.flatMap((section) => section.paragraphs)],
      links: page.relatedLinks.map((link) => ({ href: link.path, text: link.title }))
    },
    schemas: pageSchemas
  })
}

for (const article of [...careArticles, ...mediaArticles]) {
  const route = `/articles/media/${article.slug}`
  const seo = mediaArticleToSeo(article)
  routes.push({
    path: route,
    lastmod: article.updatedDate || article.date,
    title: `${article.title}｜專心動物醫院`,
    description: article.description,
    image: article.image,
    type: 'article',
    body: {
      h1: article.title,
      paragraphs: [article.intro],
      content: [
        ...(article.highlights?.length
          ? [
              { tag: 'h2', text: '本文重點' },
              ...article.highlights.map((text) => ({ tag: 'li', text }))
            ]
          : []),
        ...article.sections.flatMap((section) => [
          { tag: 'h2', text: section.title },
          ...section.paragraphs.map((text) => ({ tag: 'p', text }))
        ]),
        ...(article.faqs?.length
          ? [
              { tag: 'h2', text: '常見問題' },
              ...article.faqs.flatMap((item) => [
                { tag: 'h3', text: item.question },
                { tag: 'p', text: item.answer }
              ])
            ]
          : [])
      ],
      links: [
        ...(article.relatedLinks?.map((link) => ({ href: link.path, text: link.title })) || []),
        ...(article.label?.toLowerCase().includes('petvoice')
          ? [{ href: '/petvoice', text: 'PetVoice 犬貓居家生理監測主頁' }]
          : [])
      ]
    },
    schemas: [
      clinicSchema,
      articleSchema(seo, route),
      medicalWebPageSchema(seo, route),
      ...(seo.faqs?.length ? [faqSchema(seo.faqs, route)] : []),
      breadcrumbSchema([
        { name: '首頁', path: '/' },
        { name: '專心快訊', path: '/articles' },
        { name: article.title, path: route }
      ])
    ]
  })
}

for (const doctor of doctors) {
  const route = `/doctor/${doctor.id}`
  routes.push({
    path: route,
    title: `${doctor.name}｜${doctor.title}｜${siteName}`,
    description: doctor.intro,
    image: doctor.image,
    type: 'profile',
    body: {
      h1: `${doctor.name}｜${doctor.title}`,
      paragraphs: [doctor.intro, ...(doctor.about || []), ...(doctor.credentials || [])]
    },
    schemas: [
      clinicSchema,
      breadcrumbSchema([
        { name: '首頁', path: '/' },
        { name: '醫療團隊', path: '/' },
        { name: doctor.name, path: route }
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        name: `${doctor.name}｜${doctor.title}`,
        description: doctor.intro,
        url: absoluteUrl(route),
        mainEntity: {
          '@type': 'Person',
          '@id': `${absoluteUrl(route)}#person`,
          name: doctor.name,
          jobTitle: doctor.title,
          description: doctor.intro,
          image: absoluteUrl(doctor.image),
          knowsAbout: doctor.specialties || doctor.tags,
          award: [doctor.awardZh, doctor.award].filter(Boolean),
          hasCredential: doctor.credentials?.map((credential) => ({
            '@type': 'EducationalOccupationalCredential',
            name: credential
          })),
          worksFor: {
            '@id': `${siteUrl}/#clinic`
          }
        }
      }
    ]
  })
}

const renderHead = (route, assetTags) => {
  const canonical = absoluteUrl(route.path)
  const image = absoluteUrl(route.image || defaultImage)
  const type = route.type || 'website'
  const preloadImage =
    route.path === '/'
      ? '\n    <link rel="preload" as="image" href="/imgs/optimized/hero-team-1600.avif" type="image/avif" imagesrcset="/imgs/optimized/hero-team-768.avif 768w, /imgs/optimized/hero-team-1600.avif 1600w" imagesizes="100vw" fetchpriority="high" />'
      : ''
  const articleMeta =
    type === 'article'
      ? `
    <meta property="article:published_time" content="${escapeHtml(route.schemas.find((schema) => schema['@type'] === 'Article')?.datePublished || '')}" />
    <meta property="article:modified_time" content="${escapeHtml(route.schemas.find((schema) => schema['@type'] === 'Article')?.dateModified || '')}" />`
      : ''

  return `
    <meta charset="UTF-8" />
    <link rel="icon" href="/專心logo.JPEG" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(route.title)}</title>
    <meta name="description" content="${escapeHtml(route.description)}" />
    <meta name="application-name" content="${escapeHtml(siteName)}" />
    <meta name="apple-mobile-web-app-title" content="${escapeHtml(siteName)}" />
    <meta name="robots" content="index, follow" />
    <meta property="og:locale" content="zh_TW" />
    <meta property="og:site_name" content="${escapeHtml(siteName)}" />
    <meta property="og:type" content="${type}" />
    <meta property="og:title" content="${escapeHtml(route.title)}" />
    <meta property="og:description" content="${escapeHtml(route.description)}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${image}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(route.title)}" />
    <meta name="twitter:description" content="${escapeHtml(route.description)}" />
    <meta name="twitter:image" content="${image}" />${articleMeta}
    <link rel="canonical" href="${canonical}" />${preloadImage}
    ${route.schemas
      .map(
        (schema) =>
          `<script type="application/ld+json" data-static-seo-schema>${JSON.stringify(schema).replaceAll('<', '\\u003c')}</script>`
      )
      .join('\n    ')}
    ${assetTags}`
}

const renderStaticContent = (items = []) => {
  const output = []
  let list = []

  const flushList = () => {
    if (!list.length) return
    output.push(`<ul>${list.map((item) => `<li>${escapeHtml(item.text)}</li>`).join('')}</ul>`)
    list = []
  }

  for (const item of items) {
    if (item.tag === 'li') {
      list.push(item)
      continue
    }

    flushList()
    const tag = ['h2', 'h3', 'p', 'blockquote'].includes(item.tag) ? item.tag : 'p'
    output.push(`<${tag}>${escapeHtml(item.text)}</${tag}>`)
  }

  flushList()
  return output.join('\n        ')
}

const renderBody = (route) => `
    <div id="app">
      <main class="seo-static-page">
        <h1>${escapeHtml(route.body.h1)}</h1>
        ${(route.body.paragraphs || []).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('\n        ')}
        ${renderStaticContent(route.body.content)}
        ${(route.body.links || [])
          .map((link) => `<p><a href="${escapeHtml(link.href)}">${escapeHtml(link.text)}</a></p>`)
          .join('\n        ')}
      </main>
    </div>`

const patchHtml = (template, route, assetTags) =>
  template
    .replace(/<head>[\s\S]*?<\/head>/, `<head>${renderHead(route, assetTags)}\n  </head>`)
    .replace(/<div id="app"><\/div>/, renderBody(route))

const writeRouteHtml = async (template, route, assetTags) => {
  const routePath = route.path === '/' ? dist : path.join(dist, route.path.replace(/^\//, ''))
  const html = patchHtml(template, route, assetTags)
  await fs.mkdir(routePath, { recursive: true })
  await fs.writeFile(path.join(routePath, 'index.html'), html)
}

const sitemapUrls = routes
  .map((route) => {
    return `  <url>
    <loc>${absoluteUrl(route.path)}</loc>${route.lastmod ? `
    <lastmod>${route.lastmod}</lastmod>` : ''}
  </url>`
  })
  .join('\n')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls}\n</urlset>\n`

const template = await fs.readFile(path.join(dist, 'index.html'), 'utf8')
const assetTags = extractAssetTags(template)

for (const route of routes) {
  await writeRouteHtml(template, route, assetTags)
}

await Promise.all([
  fs.writeFile(path.join(dist, 'sitemap.xml'), sitemap),
  fs.writeFile(path.join(publicDir, 'sitemap.xml'), sitemap)
])

await fs.writeFile(
  path.join(dist, 'robots.txt'),
  `User-agent: *\nAllow: /\nDisallow: /adminLogin\nDisallow: /adminAppointments\n\nSitemap: ${absoluteUrl('/sitemap.xml')}\n`
)

console.log(`Generated static SEO HTML for ${routes.length} routes`)
