import fs from 'node:fs'
import { mediaArticles } from '../src/data/mediaArticles.js'

const read = (path) => fs.readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

const checks = [
  {
    name: 'PetVoice guide route exists',
    pass: () => read('src/router/index.js').includes("path: '/petvoice-guide'")
  },
  {
    name: 'Local veterinary hospital SEO route exists',
    pass: () => read('src/router/index.js').includes("path: '/taipei-zhongzheng-veterinary-hospital'")
  },
  {
    name: 'Local veterinary hospital page appears in sitemap',
    pass: () => read('public/sitemap.xml').includes('/taipei-zhongzheng-veterinary-hospital')
  },
  {
    name: 'Homepage links to local veterinary hospital SEO page',
    pass: () => read('src/components/Hero.vue').includes('/taipei-zhongzheng-veterinary-hospital')
  },
  {
    name: 'Footer links to local veterinary hospital SEO page',
    pass: () => read('src/components/Footer.vue').includes('/taipei-zhongzheng-veterinary-hospital')
  },
  {
    name: 'Runtime and static SEO expose local veterinary service schemas',
    pass: () =>
      read('src/seo.js').includes('createLocalVetSchemas') &&
      read('src/seo.js').includes("'@type': 'Service'") &&
      read('scripts/generate-static-seo.mjs').includes('localVetSchemas') &&
      read('scripts/generate-static-seo.mjs').includes("'@type': 'Service'")
  },
  {
    name: 'Clinic schema exposes Taipei local SEO keywords',
    pass: () =>
      read('src/seo.js').includes('台北動物醫院') &&
      read('src/seo.js').includes('中正區動物醫院') &&
      read('scripts/generate-static-seo.mjs').includes('台北動物醫院') &&
      read('scripts/generate-static-seo.mjs').includes('中正區動物醫院')
  },
  {
    name: 'PetVoice guide has static article SEO',
    pass: () => read('src/data/articleSeo.js').includes("'/petvoice-guide'")
  },
  {
    name: 'PetVoice guide appears in sitemap',
    pass: () => read('public/sitemap.xml').includes('/petvoice-guide')
  },
  {
    name: 'PetVoice page links to the guide',
    pass: () => read('src/components/PetVoice.vue').includes('/petvoice-guide')
  },
  {
    name: 'Articles index links to the guide',
    pass: () => read('src/components/articles.vue').includes('/petvoice-guide')
  },
  {
    name: 'Article schema exposes reviewer metadata',
    pass: () => read('src/seo.js').includes('reviewedBy')
  },
  {
    name: 'Runtime and static article schemas expose media citations',
    pass: () =>
      read('src/seo.js').includes('citation: article.sources') &&
      read('scripts/generate-static-seo.mjs').includes('citation: article.sources')
  },
  {
    name: 'Media article visibly explains source citations',
    pass: () =>
      read('src/components/MediaArticle.vue').includes('媒體引用來源') &&
      read('src/components/MediaArticle.vue').includes('作為本頁內容整理與查核依據')
  },
  {
    name: 'Build runs static SEO generator',
    pass: () => read('package.json').includes('scripts/generate-static-seo.mjs')
  },
  {
    name: 'Static SEO generator exists',
    pass: () => fs.existsSync(new URL('../scripts/generate-static-seo.mjs', import.meta.url))
  },
  {
    name: 'Static SEO generator preserves Vite assets',
    pass: () => read('scripts/generate-static-seo.mjs').includes('extractAssetTags')
  },
  {
    name: 'Runtime removes hydrated static schema duplicates',
    pass: () =>
      read('scripts/generate-static-seo.mjs').includes('data-static-seo-schema') &&
      read('src/seo.js').includes("querySelectorAll('script[data-static-seo-schema]')")
  },
  {
    name: 'Vercel serves generated static routes before SPA-only fallbacks',
    pass: () => {
      const config = JSON.parse(read('vercel.json'))
      return !config.rewrites?.some((rewrite) => rewrite.source === '/(.*)')
    }
  },
  {
    name: 'Firebase authentication is lazy-loaded for protected routes',
    pass: () =>
      !read('src/router/index.js').includes("import { auth } from '../firebase/firebaseConfig'") &&
      read('src/router/index.js').includes("import('../firebase/firebaseConfig')")
  },
  {
    name: 'Runtime and static SEO expose MedicalWebPage schema',
    pass: () =>
      read('src/seo.js').includes("'@type': 'MedicalWebPage'") &&
      read('scripts/generate-static-seo.mjs').includes("'@type': 'MedicalWebPage'")
  },
  {
    name: 'Below-the-fold homepage images use lazy loading',
    pass: () =>
      read('src/components/About.vue').includes('loading="lazy"') &&
      read('src/components/News.vue').includes('loading="lazy"') &&
      read('src/components/Doctors.vue').includes('loading="lazy"')
  },
  {
    name: 'Article and product listing images use lazy loading',
    pass: () =>
      read('src/components/articles.vue').includes('loading="lazy"') &&
      read('src/components/Products.vue').includes('loading="lazy"')
  },
  {
    name: 'Doctor cards use optimized WebP decorative assets',
    pass: () =>
      read('src/components/Doctors.vue').includes('/imgs/optimized/') &&
      !read('src/components/Doctors.vue').includes("petImage: '/imgs/moso.png'")
  },
  {
    name: 'Global layout prevents accidental horizontal overflow',
    pass: () => read('src/style.css').includes('overflow-x: clip')
  },
  {
    name: 'About section removes mobile Bootstrap gutter overflow',
    pass: () =>
      read('src/components/About.vue').includes('about-row') &&
      read('src/components/About.vue').includes('--bs-gutter-x: 0')
  },
  {
    name: 'Site name signals consistently use the hospital brand',
    pass: () =>
      read('index.html').includes('<meta property="og:site_name" content="專心動物醫院"') &&
      read('index.html').includes('<meta name="application-name" content="專心動物醫院"') &&
      read('src/seo.js').includes("const SITE_NAME = '專心動物醫院'") &&
      read('scripts/generate-static-seo.mjs').includes("const siteName = '專心動物醫院'")
  },
  {
    name: 'WebSite schema exposes preferred and alternate site names',
    pass: () =>
      read('src/seo.js').includes("const ALTERNATE_SITE_NAME = 'CardioSpecial'") &&
      read('src/seo.js').includes('alternateName: ALTERNATE_SITE_NAME') &&
      read('scripts/generate-static-seo.mjs').includes("const alternateSiteName = 'CardioSpecial'") &&
      read('scripts/generate-static-seo.mjs').includes('alternateName: alternateSiteName')
  },
  {
    name: 'Clinic schema exposes local business brand details',
    pass: () =>
      read('src/seo.js').includes("'LocalBusiness'") &&
      read('src/seo.js').includes("'MedicalBusiness'") &&
      read('scripts/generate-static-seo.mjs').includes("'LocalBusiness'") &&
      read('scripts/generate-static-seo.mjs').includes("'MedicalBusiness'")
  },
  {
    name: 'Homepage visibly exposes complete local SEO details',
    pass: () =>
      read('src/components/Footer.vue').includes('台北市中正區東門里仁愛路一段47號1樓') &&
      read('src/components/Footer.vue').includes('犬貓心臟專科') &&
      read('src/components/Footer.vue').includes('犬貓腫瘤門診')
  },
  {
    name: 'Hung Rong Wei profile exposes credentials and expertise',
    pass: () =>
      read('src/data/doctors.js').includes('國立台灣大學獸醫學士') &&
      read('src/data/doctors.js').includes('Fellow of American Society of Echocardiography') &&
      read('src/components/DoctorDetil.vue').includes('專業經歷與認證')
  },
  {
    name: 'Doctor profile schemas expose credentials',
    pass: () =>
      read('src/seo.js').includes('createDoctorProfileSchema') &&
      read('scripts/generate-static-seo.mjs').includes('hasCredential')
  },
  {
    name: 'Canonical defaults use the custom production domain',
    pass: () =>
      read('index.html').includes('https://cardiospecialvh.tw/') &&
      read('src/seo.js').includes("const DEFAULT_SITE_URL = 'https://cardiospecialvh.tw'") &&
      read('scripts/generate-static-seo.mjs').includes("'https://cardiospecialvh.tw'") &&
      read('.env.example').includes('VITE_SITE_URL=https://cardiospecialvh.tw')
  },
  {
    name: 'Legacy Vercel URLs permanently redirect while preserving paths',
    pass: () => {
      const config = JSON.parse(read('vercel.json'))
      const hasRootRedirect = config.redirects?.some(
        (redirect) =>
          redirect.source === '/' &&
          redirect.destination === 'https://cardiospecialvh.tw/' &&
          redirect.permanent === true &&
          redirect.has?.some(
            (condition) => condition.type === 'host' && condition.value === 'zhuanxin-hospital.vercel.app'
          )
      )
      const hasPathRedirect = config.redirects?.some(
        (redirect) =>
          redirect.source === '/:path*' &&
          redirect.destination === 'https://cardiospecialvh.tw/:path*' &&
          redirect.permanent === true &&
          redirect.has?.some(
            (condition) => condition.type === 'host' && condition.value === 'zhuanxin-hospital.vercel.app'
          )
      )
      return hasRootRedirect && hasPathRedirect
    }
  },
  {
    name: 'Robots and sitemap use the custom production domain',
    pass: () =>
      read('public/robots.txt').includes('https://cardiospecialvh.tw/sitemap.xml') &&
      read('public/sitemap.xml').includes('https://cardiospecialvh.tw/') &&
      !read('public/sitemap.xml').includes('zhuanxin-hospital.vercel.app')
  },
  {
    name: 'Missing MMVD asset reference removed',
    pass: () => !read('src/components/PostArticle.vue').includes('../assets/mmvd-dog.webp')
  },
  {
    name: 'Missing heart dog asset reference removed',
    pass: () => !read('src/components/PostArticle_2.vue').includes('/imgs/heart-dog.webp')
  }
]

const failed = checks.filter((check) => !check.pass())

const duplicateSourceUrls = mediaArticles.flatMap((article) => {
  const urls = article.sources?.map((source) => source.url) || []
  return urls.filter((url, index) => urls.indexOf(url) !== index)
})

if (duplicateSourceUrls.length) {
  console.error('SEO audit failed:')
  console.error(`- Duplicate media source URLs: ${[...new Set(duplicateSourceUrls)].join(', ')}`)
  process.exit(1)
}

if (failed.length) {
  console.error('SEO audit failed:')
  for (const check of failed) {
    console.error(`- ${check.name}`)
  }
  process.exit(1)
}

console.log(`SEO audit passed: ${checks.length}/${checks.length} checks, no duplicate media sources`)
