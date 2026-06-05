import fs from 'node:fs'

const read = (path) => fs.readFileSync(new URL(`../${path}`, import.meta.url), 'utf8')

const checks = [
  {
    name: 'PetVoice guide route exists',
    pass: () => read('src/router/index.js').includes("path: '/petvoice-guide'")
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
    name: 'Build runs static SEO generator',
    pass: () => read('package.json').includes('scripts/generate-static-seo.mjs')
  },
  {
    name: 'Static SEO generator exists',
    pass: () => fs.existsSync(new URL('../scripts/generate-static-seo.mjs', import.meta.url))
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

if (failed.length) {
  console.error('SEO audit failed:')
  for (const check of failed) {
    console.error(`- ${check.name}`)
  }
  process.exit(1)
}

console.log(`SEO audit passed: ${checks.length}/${checks.length} checks`)
