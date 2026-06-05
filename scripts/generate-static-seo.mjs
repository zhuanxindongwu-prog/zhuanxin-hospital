import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { staticArticleSeo } from '../src/data/articleSeo.js'
import { mediaArticles } from '../src/data/mediaArticles.js'
import { productSeo } from '../src/data/productSeo.js'
import { doctors } from '../src/data/doctors.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const dist = path.join(root, 'dist')
const siteUrl = (process.env.VITE_SITE_URL || 'https://zhuanxin-hospital.vercel.app').replace(/\/$/, '')
const siteName = '專心動物醫院 CardioSpecial'
const defaultImage = '/imgs/all.webp'

const absoluteUrl = (route = '/') => new URL(route, `${siteUrl}/`).toString()
const escapeHtml = (value = '') =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')

const clinicSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'VeterinaryCare',
      '@id': `${siteUrl}/#clinic`,
      name: siteName,
      url: siteUrl,
      image: absoluteUrl('/imgs/all.webp'),
      telephone: '+886-2-2363-3016',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '仁愛路一段47號1樓',
        addressLocality: '中正區',
        addressRegion: '台北市',
        postalCode: '100',
        addressCountry: 'TW'
      }
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
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

const productSchemas = (route) => {
  const product = productSeo[route]
  if (!product) return []

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.description,
      image: absoluteUrl(product.image),
      category: product.category,
      url: absoluteUrl(route),
      sameAs: product.brandUrl,
      keywords: product.keywords,
      brand: {
        '@type': 'Brand',
        name: product.brand,
        url: product.brandUrl
      }
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
    breadcrumbSchema([
      { name: '首頁', path: '/' },
      { name: '產品介紹', path: '/products' },
      { name: product.name, path: route }
    ])
  ]
}

const mediaArticleToSeo = (article) => ({
  title: article.title,
  description: article.description,
  image: article.image,
  category: article.category,
  publishedDate: article.date,
  modifiedDate: article.date,
  tags: [article.category, article.label, '專心快訊', '犬貓照護'].filter(Boolean)
})

const routes = [
  {
    path: '/',
    title: '專心動物醫院 CardioSpecial｜犬貓心臟專科與腫瘤門診',
    description:
      '專心動物醫院位於台北市中正區，專注犬貓心臟疾病與腫瘤專科醫療，提供心臟超音波、心律不整診斷、慢性病管理與長期照護。',
    image: defaultImage,
    body: {
      h1: '專心動物醫院 CardioSpecial',
      paragraphs: ['台北犬貓心臟專科與腫瘤門診，提供心臟超音波、心律不整診斷、慢性病管理與長期照護。']
    },
    schemas: [clinicSchema]
  },
  {
    path: '/articles',
    title: '專心快訊｜犬貓心臟病、腫瘤照護與醫療觀點',
    description: '閱讀專心動物醫院整理的犬貓心臟疾病、腫瘤照護、日常觀察與醫療觀點，掌握症狀與就醫時機。',
    image: defaultImage,
    body: {
      h1: '專心快訊',
      paragraphs: ['整理犬貓心臟疾病、腫瘤照護、PetVoice 居家生理監測與醫療觀點。']
    },
    schemas: [
      clinicSchema,
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: '專心快訊',
        description: '專心動物醫院整理的犬貓心臟疾病、腫瘤照護、日常觀察與醫療觀點。',
        url: absoluteUrl('/articles'),
        inLanguage: 'zh-Hant-TW'
      },
      breadcrumbSchema([
        { name: '首頁', path: '/' },
        { name: '專心快訊', path: '/articles' }
      ])
    ]
  },
  {
    path: '/petvoice',
    title: 'PetVoice 犬貓居家生理監測｜專心動物醫院',
    description:
      '專心動物醫院導入日本 PetVoice 犬貓居家生理監測系統，協助掌握心率、安靜時呼吸數、活動與睡眠等健康趨勢。',
    image: '/imgs/petvoice宣傳.png',
    body: {
      h1: 'PetVoice 犬貓居家生理監測',
      paragraphs: [
        '專心動物醫院導入日本 PetVoice，協助飼主觀察心率、安靜時呼吸數、活動、睡眠與居家生活趨勢。',
        'PetVoice 用於居家趨勢觀察與照護輔助，不能取代獸醫師診斷。'
      ],
      links: [
        { href: '/petvoice-guide', text: 'PetVoice 完整指南' },
        { href: '/articles/media/petvoice-home-monitoring', text: 'PetVoice 媒體報導整理' }
      ]
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
    image: '/imgs/laiwate.jpg',
    body: {
      h1: '賴瓦特 LikeWater 寵物專用全效清潔防護液',
      paragraphs: ['適用犬貓生活空間與日常用品，作為溫和清潔、抗菌防護與除臭淨味輔助。']
    },
    schemas: [clinicSchema, ...productSchemas('/ohtrust')]
  }
]

for (const [route, article] of Object.entries(staticArticleSeo)) {
  routes.push({
    path: route,
    title: `${article.title}｜專心動物醫院`,
    description: article.description,
    image: article.image,
    type: 'article',
    body: {
      h1: article.title,
      paragraphs: [article.description],
      links: route === '/petvoice-guide' ? [{ href: '/petvoice', text: 'PetVoice 犬貓居家生理監測主頁' }] : []
    },
    schemas: [
      clinicSchema,
      articleSchema(article, route),
      breadcrumbSchema([
        { name: '首頁', path: '/' },
        { name: '專心快訊', path: '/articles' },
        { name: article.title, path: route }
      ])
    ]
  })
}

for (const article of mediaArticles) {
  const route = `/articles/media/${article.slug}`
  const seo = mediaArticleToSeo(article)
  routes.push({
    path: route,
    title: `${article.title}｜專心動物醫院`,
    description: article.description,
    image: article.image,
    type: 'article',
    body: {
      h1: article.title,
      paragraphs: [article.intro, ...article.highlights],
      links: article.label.toLowerCase().includes('petvoice') ? [{ href: '/petvoice', text: 'PetVoice 犬貓居家生理監測主頁' }] : []
    },
    schemas: [
      clinicSchema,
      articleSchema(seo, route),
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
      paragraphs: [doctor.intro, ...(doctor.about || [])]
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
          name: doctor.name,
          jobTitle: doctor.title,
          image: absoluteUrl(doctor.image),
          worksFor: {
            '@id': `${siteUrl}/#clinic`
          }
        }
      }
    ]
  })
}

const renderHead = (route) => {
  const canonical = absoluteUrl(route.path)
  const image = absoluteUrl(route.image || defaultImage)
  const type = route.type || 'website'
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
    <link rel="canonical" href="${canonical}" />
    ${route.schemas
      .map((schema) => `<script type="application/ld+json">${JSON.stringify(schema).replaceAll('<', '\\u003c')}</script>`)
      .join('\n    ')}`
}

const renderBody = (route) => `
    <div id="app">
      <main class="seo-static-page">
        <h1>${escapeHtml(route.body.h1)}</h1>
        ${(route.body.paragraphs || []).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('\n        ')}
        ${(route.body.links || [])
          .map((link) => `<p><a href="${escapeHtml(link.href)}">${escapeHtml(link.text)}</a></p>`)
          .join('\n        ')}
      </main>
    </div>`

const patchHtml = (template, route) =>
  template
    .replace(/<head>[\s\S]*?<\/head>/, `<head>${renderHead(route)}\n  </head>`)
    .replace(/<div id="app"><\/div>/, renderBody(route))

const writeRouteHtml = async (template, route) => {
  const routePath = route.path === '/' ? dist : path.join(dist, route.path.replace(/^\//, ''))
  const html = patchHtml(template, route)
  await fs.mkdir(routePath, { recursive: true })
  await fs.writeFile(path.join(routePath, 'index.html'), html)

  if (route.path !== '/') {
    await fs.writeFile(path.join(dist, `${route.path.replace(/^\//, '')}.html`), html)
  }
}

const sitemapUrls = routes
  .map((route) => {
    const priority = route.path === '/' ? '1.0' : route.path === '/petvoice' ? '0.9' : route.path === '/petvoice-guide' ? '0.85' : '0.7'
    return `  <url>
    <loc>${absoluteUrl(route.path)}</loc>
    <lastmod>2026-06-05</lastmod>
    <priority>${priority}</priority>
  </url>`
  })
  .join('\n')

const template = await fs.readFile(path.join(dist, 'index.html'), 'utf8')

for (const route of routes) {
  await writeRouteHtml(template, route)
}

await fs.writeFile(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls}\n</urlset>\n`
)

await fs.writeFile(
  path.join(dist, 'robots.txt'),
  `User-agent: *\nAllow: /\nDisallow: /adminLogin\nDisallow: /adminAppointments\n\nSitemap: ${absoluteUrl('/sitemap.xml')}\n`
)

console.log(`Generated static SEO HTML for ${routes.length} routes`)
