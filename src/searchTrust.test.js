import test from 'node:test'
import assert from 'node:assert/strict'
import * as identity from './data/siteIdentity.js'
import { createHomepageSchema } from './data/homepageSearch.js'
import { createArticleByline } from './data/articleBylines.js'

test('clinic search facts include all six open days and contact facts with absolute IDs for the requested origin', () => {
  assert.equal(typeof identity.createClinicSchema, 'function')
  const graph = identity.createClinicSchema('https://example.org/')['@graph']
  const clinic = graph.find(entity => entity['@id'] === 'https://example.org/#clinic')
  assert.equal(clinic.telephone, '+886223633016')
  assert.equal(clinic.address.streetAddress, '東門里仁愛路一段47號1樓')
  assert.equal(clinic.openingHoursSpecification.length, 6)
  const monday = clinic.openingHoursSpecification.find(hours => hours.dayOfWeek === 'Monday')
  assert.equal(monday.opens, '10:00')
  assert.equal(monday.closes, '21:30')
  assert.ok(!clinic.openingHoursSpecification.some(hours => hours.dayOfWeek === 'Sunday'))
  assert.equal(graph.find(entity => entity['@type'] === 'WebSite').publisher['@id'], clinic['@id'])
  assert.ok(clinic.contactPoint.some(point => point.telephone === clinic.telephone))
  assert.ok(identity.clinicWeeklyHours.some(hours => hours.day === 'Sunday' && hours.closed))
})

test('homepage credit identifies the institution that arranges its information without assigning a medical reviewer', () => {
  const schema = createHomepageSchema('https://example.org', '專心動物醫院')
  assert.equal(schema.author?.['@type'], 'Organization')
  assert.equal(schema.author.name, '專心動物醫院')
  assert.equal(schema.author['@id'], schema.publisher['@id'])
  assert.equal(schema.author.url, 'https://example.org/')
  assert.equal(schema.reviewedBy, undefined)
})

test('existing named authors link to the same real doctor IDs used by their profile pages', () => {
  const byline = createArticleByline({ authors: [{ name: '吳冠勳', title: '心臟專科住院醫師', path: '/doctor/wu-guan-xun' }] }, 'https://example.org/')
  assert.equal(byline.length, 1)
  assert.equal(byline[0].name, '吳冠勳')
  assert.equal(byline[0].jobTitle, '心臟專科住院醫師')
  assert.equal(byline[0]['@id'], 'https://example.org/doctor/wu-guan-xun#person')
  assert.equal(byline[0].url, 'https://example.org/doctor/wu-guan-xun')
  assert.equal(byline[0].worksFor['@id'], 'https://example.org/#clinic')
})

test('an article with only a reviewer remains attributed to the institution rather than turning the reviewer into an author', () => {
  const byline = createArticleByline({ reviewer: { name: '洪榮偉', path: '/doctor/hung-rong-wei' } }, 'https://example.org')
  assert.equal(byline['@type'], 'Organization')
  assert.equal(byline['@id'], 'https://example.org/#clinic')
  assert.equal(byline.name, '專心動物醫院')
})

test('external author records retain their own identity without hospital employment or invented profile IDs', () => {
  const [author] = createArticleByline({ authors: [{ name: '外部作者', path: 'https://publisher.example/doctor/wu-guan-xun' }] }, 'https://example.org')
  assert.equal(author.url, 'https://publisher.example/doctor/wu-guan-xun')
  assert.equal(author.worksFor, undefined)
  assert.equal(author['@id'], undefined)
})
