import { clinicAddress, phoneNumber, lineOfficialId } from '../siteContact.js'

export const homepageSummary = `專心動物醫院位於${clinicAddress}，提供犬貓心臟專科、心臟超音波檢查、心律不整診斷與腫瘤門診。看診事宜請來電 ${phoneNumber} 或透過 LINE 官方帳號 ${lineOfficialId} 聯繫；目前未提供線上預約功能。`

export const homepageFaqs = [
  {
    question: '專心動物醫院在哪裡？',
    answer: `專心動物醫院位於${clinicAddress}。可在本頁「聯絡專心」查看地址並開啟地圖導航。`
  },
  {
    question: '專心動物醫院提供哪些服務？',
    answer: '提供犬貓心臟專科、心臟超音波檢查、心律不整診斷、心臟病治療與追蹤，以及腫瘤門診。可由本頁「專科服務」與「腫瘤門診」了解相關資訊。'
  },
  {
    question: '可以直接在線上預約看診嗎？',
    answer: `目前未提供線上預約功能。看診與預約事宜請來電 ${phoneNumber}，或透過 LINE 官方帳號 ${lineOfficialId} 聯繫醫院；也可先查看本月獸醫師班表。`
  },
  {
    question: '如何找到犬貓照護與衛教文章？',
    answer: '可由選單「照護指南」前往首頁「專心照護筆記」，再點選「所有照護文章」進入文章列表，依關鍵字搜尋或分類篩選文章。'
  }
]

export const homepageSearchUpdatedDate = '2026-11-03'
export const homepageMaintainer = '專心動物醫院'

export const createHomepageSchema = (siteUrl, title) => {
  const origin = siteUrl.replace(/\/$/, '')
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${origin}/#webpage`,
    url: `${origin}/`,
    name: title,
    description: homepageSummary,
    inLanguage: 'zh-Hant-TW',
    dateModified: homepageSearchUpdatedDate,
    publisher: { '@id': `${origin}/#clinic` },
    isPartOf: { '@id': `${origin}/#website` },
    about: { '@id': `${origin}/#clinic` }
  }
}
