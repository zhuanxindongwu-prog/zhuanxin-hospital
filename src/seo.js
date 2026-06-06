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
      knowsAbout: ['犬貓心臟專科', '犬貓腫瘤門診', '心臟超音波', '心律不整診斷'],
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
