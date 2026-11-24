import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { november2026Articles } from './data/november2026Articles.js'
import { getMediaArticle } from './data/mediaArticles.js'
import { searchArticles } from './data/searchArticles.js'
import { careGuideCards } from './data/articleCatalog.js'
import { createArticleFeeds } from './data/articleFeeds.js'

const replacements = {
  'dog-recurrent-cough-heart-or-airway': 'dog-cough-differential-diagnosis',
  'cardiac-pets-anesthesia-assessment': 'cardiac-pets-preoperative-anesthesia-care',
  'dog-heart-disease-daily-life': 'dog-heart-disease-activity-assessment',
  'dog-sudden-pulmonary-edema': 'dog-mmvd-acute-decompensation-chordal-rupture'
}

test('withdrawn magazine manuscripts cannot be rendered or rediscovered while hospital versions remain available', () => {
  const { rss, atom } = createArticleFeeds(searchArticles)
  const { redirects } = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'))
  assert.ok(november2026Articles.every(article => article.family === '專心官網'))
  for (const [removed, retained] of Object.entries(replacements)) {
    const removedPath = `/articles/${removed}`
    const retainedPath = `/articles/${retained}`
    assert.equal(getMediaArticle(removed), undefined)
    assert.equal(searchArticles.find(article => article.path === removedPath), undefined)
    assert.equal(careGuideCards.find(article => article.link === removedPath), undefined)
    assert.ok(!rss.includes(removedPath) && !atom.includes(removedPath))
    assert.ok(searchArticles.every(article => !article.relatedLinks?.some(link => link.path === removedPath)))
    assert.ok(getMediaArticle(retained))
    assert.ok(redirects.some(rule => rule.source === removedPath && rule.destination === retainedPath && rule.permanent))
  }
})
