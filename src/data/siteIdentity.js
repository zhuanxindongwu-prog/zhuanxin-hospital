import { lineAddFriendUrl, mapsSearchUrl } from '../siteContact.js'

// Existing identities checked on 2026-11-03; map searches and directory lists
// describe locations but do not uniquely identify the hospital itself.
export const hospitalIdentityLinks = [
  { label: 'Facebook 粉絲專頁', url: 'https://www.facebook.com/cardiospecial/' },
  { label: 'LINE 官方帳號', url: lineAddFriendUrl },
  { label: '維基百科', url: 'https://zh.wikipedia.org/wiki/專心動物醫院' }
]

export const clinicDescription = '專心動物醫院位於台北市中正區，專注犬貓心臟疾病與腫瘤專科醫療，提供心臟超音波、心律不整診斷、慢性病管理與長期照護。'

export const clinicWeeklyHours = [
  { label: '週一', day: 'Monday', opens: '10:00', closes: '21:30' },
  { label: '週二', day: 'Tuesday', opens: '13:00', closes: '21:00' },
  { label: '週三', day: 'Wednesday', opens: '10:00', closes: '18:00' },
  { label: '週四', day: 'Thursday', opens: '10:00', closes: '21:30' },
  { label: '週五', day: 'Friday', opens: '10:00', closes: '21:30' },
  { label: '週六', day: 'Saturday', opens: '10:00', closes: '18:00' },
  { label: '週日', day: 'Sunday', closed: true }
]

export const createClinicSchema = siteUrl => {
  const origin = siteUrl.replace(/\/$/, '')
  const absolute = path => new URL(path, origin + '/').href
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['VeterinaryCare', 'LocalBusiness', 'MedicalBusiness', 'Organization'],
        '@id': `${origin}/#clinic`,
        name: '專心動物醫院',
        url: absolute('/'),
        image: absolute('/imgs/all.webp'),
        logo: absolute('/專心logo.JPEG'),
        description: clinicDescription,
        sameAs: hospitalIdentityLinks.map(identity => identity.url),
        telephone: '+886223633016',
        areaServed: ['台北市', '中正區', '大安區', '萬華區', '信義區'],
        keywords: ['台北動物醫院', '中正區動物醫院', '犬貓心臟專科', '犬貓腫瘤門診', '心臟超音波'],
        hasMap: mapsSearchUrl,
        knowsAbout: ['台北動物醫院', '中正區動物醫院', '犬貓心臟專科', '犬貓腫瘤門診', '心臟超音波', '心律不整診斷'],
        address: {
          '@type': 'PostalAddress', streetAddress: '東門里仁愛路一段47號1樓',
          addressLocality: '中正區', addressRegion: '台北市', postalCode: '100', addressCountry: 'TW'
        },
        openingHoursSpecification: clinicWeeklyHours.filter(hours => !hours.closed).map(hours => ({
          '@type': 'OpeningHoursSpecification', dayOfWeek: hours.day, opens: hours.opens, closes: hours.closes
        })),
        contactPoint: [
          { '@type': 'ContactPoint', contactType: '看診資訊與聯繫', telephone: '+886223633016', url: `${origin}/#contact` },
          { '@type': 'ContactPoint', contactType: 'LINE 聯繫', url: lineAddFriendUrl }
        ]
      },
      {
        '@type': 'WebSite', '@id': `${origin}/#website`, url: absolute('/'),
        name: '專心動物醫院', inLanguage: 'zh-Hant-TW', publisher: { '@id': `${origin}/#clinic` }
      }
    ]
  }
}
