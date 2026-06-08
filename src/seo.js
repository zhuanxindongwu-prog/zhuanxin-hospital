import { computed } from 'vue'
import { useHead } from '@vueuse/head'
import { useRoute } from 'vue-router'
import { doctors } from './data/doctors'
import { getMediaArticle } from './data/mediaArticles'
import { productSeo } from './data/productSeo'
import { getStaticArticleSeo } from './data/articleSeo'

const DEFAULT_SITE_URL = 'https://cardiospecialvh.tw'
const SITE_NAME = '專心動物醫院'
const ALTERNATE_SITE_NAME = 'CardioSpecial'
const DEFAULT_DESCRIPTION =
  '專心動物醫院位於台北市中正區，專注犬貓心臟疾病與腫瘤專科醫療，提供心臟超音波、心律不整診斷、慢性病管理與長期照護。'
const LOCAL_VET_PATH = '/taipei-zhongzheng-veterinary-hospital'
const AI_GEO_PATH = '/ai-search-veterinary-cardiology'

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
  { name: '台北中正區動物醫院頁', path: LOCAL_VET_PATH },
  { name: '洪榮偉院長專業資歷', path: '/doctor/hung-rong-wei' },
  { name: '狗狗 MMVD Stage C 心衰竭照護重點', path: '/post-mmvd-stage-c' },
  { name: 'PetVoice 犬貓居家生理監測', path: '/petvoice' },
  { name: '專心快訊與媒體報導', path: '/articles' }
]

const siteUrl = (import.meta.env.VITE_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, '')

const absoluteUrl = (path = '/') => new URL(path, `${siteUrl}/`).toString()

const createProductSchemas = (path) => {
  const product = productSeo[path]

  if (!product) return []

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.description,
      image: absoluteUrl(product.image),
      category: product.category,
      url: absoluteUrl(path),
      sameAs: product.brandUrl,
      keywords: product.keywords,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': absoluteUrl(path)
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
      url: absoluteUrl(path),
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
      name: product.name,
      description: product.description,
      url: absoluteUrl(path),
      inLanguage: 'zh-Hant-TW',
      keywords: product.keywords,
      isPartOf: {
        '@id': `${siteUrl}/#website`
      },
      about: {
        '@type': 'Thing',
        name: product.name
      },
      mainEntity: {
        '@type': 'Product',
        name: product.name
      },
      publisher: {
        '@id': `${siteUrl}/#clinic`
      }
    }
  ]
}

const createBreadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path)
  }))
})

const createArticleSchema = (article, path) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  '@id': `${absoluteUrl(path)}#article`,
  headline: article.title,
  description: article.description,
  image: [absoluteUrl(article.image)],
  datePublished: article.publishedDate,
  dateModified: article.modifiedDate || article.publishedDate,
  inLanguage: 'zh-Hant-TW',
  articleSection: article.category,
  keywords: article.tags,
  reviewedBy: article.reviewer
    ? {
        '@type': 'Person',
        name: article.reviewer.name,
        jobTitle: article.reviewer.title,
        url: absoluteUrl(article.reviewer.path)
      }
    : undefined,
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
  about: article.tags?.map((tag) => ({
    '@type': 'Thing',
    name: tag
  })),
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': absoluteUrl(path)
  },
  author: {
    '@type': 'Organization',
    name: SITE_NAME,
    url: siteUrl
  },
  publisher: {
    '@id': `${siteUrl}/#clinic`
  }
})

const createMedicalWebPageSchema = (article, path) => ({
  '@context': 'https://schema.org',
  '@type': 'MedicalWebPage',
  '@id': `${absoluteUrl(path)}#medical-web-page`,
  name: article.title,
  description: article.description,
  url: absoluteUrl(path),
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
    '@id': `${absoluteUrl(path)}#article`
  },
  publisher: {
    '@id': `${siteUrl}/#clinic`
  }
})

const createCollectionSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: '專心快訊',
  description: '專心動物醫院整理的犬貓心臟疾病、腫瘤照護、日常觀察與醫療觀點。',
  url: absoluteUrl('/articles'),
  inLanguage: 'zh-Hant-TW',
  publisher: {
    '@id': `${siteUrl}/#clinic`
  }
})

const createLocalVetSchemas = () => [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${absoluteUrl(LOCAL_VET_PATH)}#webpage`,
    name: '台北中正區動物醫院｜犬貓心臟專科與腫瘤門診',
    description:
      '專心動物醫院位於台北市中正區仁愛路一段，提供犬貓心臟專科、犬貓腫瘤門診、心臟超音波、心律不整診斷與慢性病長期追蹤。',
    url: absoluteUrl(LOCAL_VET_PATH),
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
    url: absoluteUrl(LOCAL_VET_PATH),
    mainEntity: localVetFaqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  },
  createBreadcrumbSchema([
    { name: '首頁', path: '/' },
    { name: '台北中正區動物醫院', path: LOCAL_VET_PATH }
  ])
]

const createAiGeoSchemas = () => [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${absoluteUrl(AI_GEO_PATH)}#webpage`,
    name: '犬貓心臟專科與腫瘤門診 AI 搜尋摘要',
    description:
      '專心動物醫院 AI 搜尋摘要，整理台北中正區犬貓心臟專科、犬貓腫瘤門診、心臟超音波、心律不整與慢性病照護的核心事實、FAQ 與可信來源。',
    url: absoluteUrl(AI_GEO_PATH),
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
    '@id': `${absoluteUrl(AI_GEO_PATH)}#faq`,
    url: absoluteUrl(AI_GEO_PATH),
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
    '@id': `${absoluteUrl(AI_GEO_PATH)}#terms`,
    name: '犬貓心臟專科與腫瘤門診主題實體',
    hasDefinedTerm: aiGeoEntities.map((entity) => ({
      '@type': 'DefinedTerm',
      name: entity.term,
      description: entity.definition,
      inDefinedTermSet: `${absoluteUrl(AI_GEO_PATH)}#terms`
    }))
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${absoluteUrl(AI_GEO_PATH)}#sources`,
    name: '專心動物醫院 AI 搜尋可信來源',
    itemListElement: aiGeoSources.map((source, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: source.name,
      url: absoluteUrl(source.path)
    }))
  },
  createBreadcrumbSchema([
    { name: '首頁', path: '/' },
    { name: 'AI 搜尋摘要', path: AI_GEO_PATH }
  ])
]

const createDoctorProfileSchema = (doctor, path) => ({
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  name: `${doctor.name}｜${doctor.title}`,
  description: doctor.intro,
  url: absoluteUrl(path),
  mainEntity: {
    '@type': 'Person',
    '@id': `${absoluteUrl(path)}#person`,
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
})

const getArticleSeo = (route, mediaArticle) => {
  if (mediaArticle) {
    return {
      title: mediaArticle.title,
      description: mediaArticle.description,
      image: mediaArticle.image,
      category: mediaArticle.category,
      publishedDate: mediaArticle.date,
      modifiedDate: mediaArticle.updatedDate || mediaArticle.date,
      tags: [mediaArticle.category, mediaArticle.label, '專心快訊', '犬貓照護'].filter(Boolean),
      sources: mediaArticle.sources
    }
  }

  return getStaticArticleSeo(route.path)
}

const clinicSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['VeterinaryCare', 'LocalBusiness', 'MedicalBusiness', 'Organization'],
      '@id': `${siteUrl}/#clinic`,
      name: SITE_NAME,
      alternateName: ALTERNATE_SITE_NAME,
      url: siteUrl,
      image: absoluteUrl('/imgs/all.webp'),
      logo: absoluteUrl('/專心logo.JPEG'),
      description: DEFAULT_DESCRIPTION,
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
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Thursday', 'Friday'],
          opens: '10:00',
          closes: '21:30'
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: 'Tuesday',
          opens: '13:00',
          closes: '21:00'
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Wednesday', 'Saturday'],
          opens: '10:00',
          closes: '18:00'
        }
      ]
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: SITE_NAME,
      alternateName: ALTERNATE_SITE_NAME,
      inLanguage: 'zh-Hant-TW',
      publisher: {
        '@id': `${siteUrl}/#clinic`
      }
    }
  ]
}

export const useSeo = () => {
  const route = useRoute()

  if (typeof document !== 'undefined') {
    document.querySelectorAll('script[data-static-seo-schema]').forEach((script) => script.remove())
  }

  const seo = computed(() => {
    const doctor = route.name === 'doctor' ? doctors.find((item) => item.id === route.params.id) : null
    const mediaArticle = route.name === 'mediaArticle' ? getMediaArticle(route.params.slug) : null
    const article = getArticleSeo(route, mediaArticle)

    if (doctor) {
      return {
        title: `${doctor.name}｜${doctor.title}｜${SITE_NAME}`,
        description: doctor.intro,
        image: doctor.image,
        type: 'profile',
        doctor
      }
    }

    if (mediaArticle) {
      return {
        title: `${mediaArticle.title}｜專心動物醫院`,
        description: mediaArticle.description,
        image: mediaArticle.image,
        type: 'article',
        article
      }
    }

    if (article) {
      return {
        title: `${article.title}｜專心動物醫院`,
        description: article.description,
        image: article.image,
        type: 'article',
        article
      }
    }

    return {
      title: route.meta.title || SITE_NAME,
      description: route.meta.description || DEFAULT_DESCRIPTION,
      image: route.meta.image || '/imgs/all.webp',
      type: route.meta.type || 'website',
      noindex: route.meta.noindex
    }
  })

  useHead(
    computed(() => {
      const canonical = absoluteUrl(route.path)
      const image = absoluteUrl(seo.value.image)
      const schemas = seo.value.noindex ? [] : [clinicSchema, ...createProductSchemas(route.path)]

      if (!seo.value.noindex && seo.value.article) {
        schemas.push(createArticleSchema(seo.value.article, route.path))
        schemas.push(createMedicalWebPageSchema(seo.value.article, route.path))
        schemas.push(
          createBreadcrumbSchema([
            { name: '首頁', path: '/' },
            { name: '專心快訊', path: '/articles' },
            { name: seo.value.article.title, path: route.path }
          ])
        )
      }

      if (!seo.value.noindex && route.path === '/articles') {
        schemas.push(createCollectionSchema())
        schemas.push(
          createBreadcrumbSchema([
            { name: '首頁', path: '/' },
            { name: '專心快訊', path: '/articles' }
          ])
        )
      }

      if (!seo.value.noindex && seo.value.doctor) {
        schemas.push(createDoctorProfileSchema(seo.value.doctor, route.path))
        schemas.push(
          createBreadcrumbSchema([
            { name: '首頁', path: '/' },
            { name: '醫師團隊', path: '/#doctors' },
            { name: seo.value.doctor.name, path: route.path }
          ])
        )
      }

      if (!seo.value.noindex && productSeo[route.path]) {
        schemas.push(
          createBreadcrumbSchema([
            { name: '首頁', path: '/' },
            { name: '產品介紹', path: '/products' },
            { name: productSeo[route.path].name, path: route.path }
          ])
        )
      }

      if (!seo.value.noindex && route.path === LOCAL_VET_PATH) {
        schemas.push(...createLocalVetSchemas())
      }

      if (!seo.value.noindex && route.path === AI_GEO_PATH) {
        schemas.push(...createAiGeoSchemas())
      }

      return {
        title: seo.value.title,
        htmlAttrs: {
          lang: 'zh-Hant-TW'
        },
        link: [
          {
            rel: 'canonical',
            href: canonical
          }
        ],
        meta: [
          {
            name: 'description',
            content: seo.value.description
          },
          {
            name: 'application-name',
            content: SITE_NAME
          },
          {
            name: 'apple-mobile-web-app-title',
            content: SITE_NAME
          },
          {
            name: 'robots',
            content: seo.value.noindex ? 'noindex, nofollow' : 'index, follow'
          },
          {
            property: 'og:locale',
            content: 'zh_TW'
          },
          {
            property: 'og:site_name',
            content: SITE_NAME
          },
          {
            property: 'og:type',
            content: seo.value.type
          },
          {
            property: 'og:title',
            content: seo.value.title
          },
          {
            property: 'og:description',
            content: seo.value.description
          },
          {
            property: 'og:url',
            content: canonical
          },
          {
            property: 'og:image',
            content: image
          },
          {
            name: 'twitter:card',
            content: 'summary_large_image'
          },
          {
            name: 'twitter:title',
            content: seo.value.title
          },
          {
            name: 'twitter:description',
            content: seo.value.description
          },
          {
            name: 'twitter:image',
            content: image
          }
        ].concat(
          seo.value.article
            ? [
                {
                  property: 'article:published_time',
                  content: seo.value.article.publishedDate
                },
                {
                  property: 'article:modified_time',
                  content: seo.value.article.modifiedDate || seo.value.article.publishedDate
                },
                {
                  property: 'article:section',
                  content: seo.value.article.category
                },
                ...seo.value.article.tags.map((tag) => ({
                  property: 'article:tag',
                  content: tag
                }))
              ]
            : []
        ),
        script: schemas.map((schema) => ({
          type: 'application/ld+json',
          children: JSON.stringify(schema)
        }))
      }
    })
  )
}
