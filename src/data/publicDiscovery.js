import { homepageSummary, homepageFaqs, homepageMaintainer, homepageSearchUpdatedDate } from './homepageSearch.js'
import { clinicWeeklyHours } from './siteIdentity.js'
import { clinicAddress, phoneNumber, lineAddFriendUrl } from '../siteContact.js'
import { seoContentPages } from './seoContentPages.js'

export const createDiscoveryDocuments = siteUrl => {
  const absolute = path => new URL(path, siteUrl).href
  const json = value => JSON.stringify(value, null, 2) + '\n'
  return {
    '/.well-known/ai.txt': [
      '# 專心動物醫院：公開網站資訊入口',
      `Website: ${absolute('/')}`,
      `Robots: ${absolute('/robots.txt')}`,
      `Summary: ${absolute('/ai/summary.json')}`,
      `FAQ: ${absolute('/ai/faq.json')}`,
      `Services: ${absolute('/ai/service.json')}`,
      `Sitemap: ${absolute('/sitemap.xml')}`,
      `Text index: ${absolute('/llms.txt')}`,
      `Public text: ${absolute('/llms-full.txt')}`,
      'Crawling rules remain defined by robots.txt. These files describe existing public information only.'
    ].join('\n') + '\n',
    '/ai/summary.json': json({
      name: homepageMaintainer, url: absolute('/'), description: homepageSummary,
      language: 'zh-Hant-TW', dateModified: homepageSearchUpdatedDate,
      contact: { address: clinicAddress, telephone: phoneNumber, line: lineAddFriendUrl },
      weeklyHours: clinicWeeklyHours,
      scheduleNote: '實際看診安排請以當月班表與院方公告為準。',
      articles: absolute('/articles'), sitemap: absolute('/sitemap.xml')
    }),
    '/ai/faq.json': json({ name: '專心動物醫院首頁常見問題', url: absolute('/#home-faq'), faqs: homepageFaqs }),
    '/ai/service.json': json({
      name: '專心動物醫院公開服務資訊', url: absolute('/'), onlineBooking: false,
      contact: { telephone: phoneNumber, line: lineAddFriendUrl },
      capabilities: Object.values(seoContentPages).filter(page => page.type === 'service').map(page => ({
        name: page.title, description: page.summary || page.description, url: absolute(page.path)
      }))
    })
  }
}
