import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

import * as careArticleData from './data/careArticles.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), 'utf8')
const slug = 'dog-mmvd-nonlinear-progression-chordal-rupture'
const articlePath = `/articles/${slug}`

test('MMVD nonlinear progression article exposes a complete reviewed content contract', () => {
  const article = careArticleData.careArticles.find((item) => item.slug === slug)
  const lifestyleSection = article?.sections?.find((section) => section.title === '這會如何改變 B1 犬的生活管理？')

  assert.ok(article, 'MMVD nonlinear progression article is missing')
  assert.equal(article.path, articlePath)
  assert.match(article.title, /MMVD.*B1.*B2.*C/)
  assert.equal(article.reviewer?.name, '專心動物醫院醫療團隊')
  assert.ok(article.image?.endsWith('.webp'), 'article needs an optimized WebP hero image')
  assert.equal(
    article.image,
    '/imgs/guides/mmvd-nonlinear-progression-art.webp',
    'article should use the approved non-photorealistic MMVD artwork'
  )
  assert.ok(fs.existsSync(path.join(root, 'public', article.image)), 'article hero image is missing')
  assert.equal(article.pathway?.length, 7, 'acute progression pathway should contain seven steps')
  assert.match(article.pathway.at(-1)?.title || '', /肺水腫/)
  assert.deepEqual(
    article.evidenceBoundary?.map((item) => item.label),
    ['已知', '合理機轉', '尚未證實']
  )
  assert.ok(article.sections?.length >= 7, 'article body is incomplete')
  assert.ok(article.faqs?.length >= 4, 'article FAQ is incomplete')
  assert.ok(article.sources?.length >= 5, 'article needs primary veterinary references')
  assert.ok(article.relatedLinks?.length >= 3, 'article needs internal topic and service links')
  assert.equal(lifestyleSection?.media?.length, 4, 'lifestyle section should contain four scene assets')
  assert.ok(
    lifestyleSection.media.every((item) => !/[A-Za-z]/.test(item.title)),
    'scene titles should use Chinese only'
  )
  assert.ok(
    lifestyleSection.media.every((item) => {
      const assetPath = item.type === 'video' ? item.poster : item.src
      return assetPath?.endsWith('.webp') && fs.existsSync(path.join(root, 'public', assetPath))
    }),
    'each scene needs an optimized WebP image or poster'
  )
  assert.ok(
    lifestyleSection.media.some(
      (item) => item.type === 'video' && item.src?.endsWith('.mp4') && fs.existsSync(path.join(root, 'public', item.src))
    ),
    'the calm care scene video is missing'
  )
})

test('care article path helper keeps semantic paths and legacy fallbacks stable', () => {
  assert.equal(typeof careArticleData.getArticlePath, 'function')
  assert.equal(careArticleData.getArticlePath({ slug, path: articlePath }), articlePath)
  assert.equal(
    careArticleData.getArticlePath({ slug: 'legacy-care-article' }),
    '/articles/media/legacy-care-article'
  )
})

test('runtime and static article surfaces render the richer MMVD story', () => {
  const router = read('src/router/index.js')
  const articlePage = read('src/components/MediaArticle.vue')
  const articleIndex = read('src/components/articles.vue')
  const generator = read('scripts/generate-static-seo.mjs')
  const vercel = JSON.parse(read('vercel.json'))

  assert.ok(router.includes(`path: '${articlePath}'`))
  assert.ok(router.includes(`articleSlug: '${slug}'`))
  assert.match(articlePage, /article\.pathway/)
  assert.match(articlePage, /article\.evidenceBoundary/)
  assert.match(articlePage, /article\.pullQuote/)
  assert.match(articlePage, /section\.media/)
  assert.match(articlePage, /preload="none"/)
  assert.match(
    articlePage,
    /\.scene-item img,[\s\S]*?height: auto;/,
    'scene media must override intrinsic height attributes to preserve responsive aspect ratios'
  )
  assert.match(articleIndex, /getArticlePath\(article\)/)
  assert.match(generator, /getArticlePath\(article\)/)
  assert.match(generator, /article\.evidenceBoundary/)
  assert.match(generator, /section\.media/)
  assert.ok(
    vercel.redirects.some(
      (redirect) =>
        redirect.source === `/articles/media/${slug}` &&
        redirect.destination === articlePath &&
        redirect.permanent === true
    ),
    'legacy article URL needs a permanent redirect to the semantic path'
  )
})
