import test from 'node:test'
import assert from 'node:assert/strict'
import { staticArticleSeo } from './data/articleSeo.js'
import { careArticles, getArticlePath } from './data/careArticles.js'
import { mediaArticles } from './data/mediaArticles.js'
import { seoContentPages } from './data/seoContentPages.js'
import { searchArticles, getSearchArticle, getArticleOverviewItems, getArticleOutline, createReferenceSchema, createArticleDirectorySchema } from './data/searchArticles.js'

test('search inventory covers every article family once without treating service pages as articles', () => {
  const paths = [...Object.keys(staticArticleSeo), ...[...careArticles, ...mediaArticles].map(getArticlePath), ...Object.values(seoContentPages).filter(page => page.type !== 'service').map(page => page.path)]
  assert.deepEqual(new Set(searchArticles.map(article => article.path)), new Set(paths))
  assert.equal(searchArticles.length, new Set(paths).size)
  assert.equal(getSearchArticle('/services/veterinary-cardiology'), undefined)
  for (const article of searchArticles) {
    assert.ok(article.description.length >= 35, article.path + ' needs an informative summary')
    assert.ok(article.seoTitle && article.title)
    assert.ok(article.publishedDate && article.modifiedDate)
    assert.equal(getSearchArticle(article.path), article)
  }
})

test('authored articles preserve clinical text, photographs and attribution without inventing reviews', () => {
  for (const source of [...careArticles, ...mediaArticles]) {
    const article = getSearchArticle(getArticlePath(source))
    for (const key of ['title', 'image', 'intro', 'sections', 'authors', 'reviewer', 'sources']) assert.deepEqual(article[key], source[key], source.slug + ': ' + key)
    assert.equal(article.publishedDate, source.date)
    assert.equal(article.modifiedDate, source.updatedDate || source.date)
    assert.equal(article.reviewedDate, source.reviewedDate)
    const items = getArticleOverviewItems(article)
    assert.ok(items.some(item => item.text.includes(source.date)))
    for (const author of source.authors || []) assert.ok(items.some(item => item.href === author.path && item.text.includes(author.name)))
  }
})

test('chapter outlines use stable unique anchors and omit unavailable optional sections', () => {
  assert.deepEqual(getArticleOutline({}), [])
  const outline = getArticleOutline({ sections: [{ title: '相同標題' }, { title: '相同標題' }], faqs: [{}], sources: [{}] })
  assert.deepEqual(outline.map(item => item.id), ['section-1', 'section-2', 'page-faq', 'page-references'])
  assert.equal(new Set(outline.map(item => item.id)).size, outline.length)
})

test('references retain bibliographic facts without labelling every medical guideline as news', () => {
  const source = { title: 'ACVIM consensus guidelines', publisher: 'JVIM', date: '2019-04-11', url: 'https://example.org/guideline' }
  const schema = createReferenceSchema(source)
  assert.equal(schema['@type'], 'WebPage')
  assert.equal(schema.name, source.title)
  assert.equal(schema.url, source.url)
  assert.equal(schema.datePublished, source.date)
  assert.equal(schema.publisher.name, source.publisher)
})

test('structured abstracts use the existing visible guide summary and declared reviews have a visible linked attribution', () => {
  for (const article of searchArticles) {
    assert.equal(article.abstract, article.summary || article.description)
    const items = getArticleOverviewItems(article)
    assert.ok(items.some(item => item.text === article.abstract))
    if (article.reviewer && article.reviewerVisible) {
      assert.ok(items.some(item => item.href === article.reviewer.path && item.text.includes(article.reviewer.name) && item.text.startsWith('內容審閱：')))
    }
  }
})

test('the article collection exposes every canonical article and a descriptive linked title', () => {
  const schema = createArticleDirectorySchema('https://cardiospecialvh.tw')
  assert.equal(schema['@type'], 'CollectionPage')
  assert.equal(schema.name, '專心犬貓心臟病照護秘笈')
  assert.equal(schema.mainEntity.numberOfItems, searchArticles.length)
  assert.equal(new Set(schema.mainEntity.itemListElement.map(item => item.url)).size, searchArticles.length)
  for (const [index, article] of searchArticles.entries()) {
    const entry = schema.mainEntity.itemListElement[index]
    assert.equal(entry.url, 'https://cardiospecialvh.tw' + article.path)
    assert.equal(entry.name, article.title)
    assert.equal(entry.position, index + 1)
  }
})

test('medication FAQs follow the existing individualized instructions rather than a universal replacement schedule', () => {
  const article = getSearchArticle('/articles/dog-mmvd-medication-safety')
  const vomiting = article.faqs.find(faq => faq.question.includes('吐出來'))
  const missed = article.faqs.find(faq => faq.question.includes('錯過'))
  assert.ok(article.sections.some(section => section.paragraphs.some(text => text.includes(vomiting.answer))))
  assert.match(missed.answer, /具體藥品/)
  assert.doesNotMatch(vomiting.answer + missed.answer, /半小時內|8-10小時|6小時後|立即給予藥物/)
  assert.equal(article.publishedDate, '2026-10-26')
  assert.equal(article.reviewedDate, undefined)
})
