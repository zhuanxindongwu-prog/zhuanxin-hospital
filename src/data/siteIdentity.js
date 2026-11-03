import { lineAddFriendUrl } from '../siteContact.js'

// Existing identities checked on 2026-11-03; map searches and directory lists
// describe locations but do not uniquely identify the hospital itself.
export const hospitalIdentityLinks = [
  { label: 'Facebook 粉絲專頁', url: 'https://www.facebook.com/cardiospecial/' },
  { label: 'LINE 官方帳號', url: lineAddFriendUrl },
  { label: '維基百科', url: 'https://zh.wikipedia.org/wiki/專心動物醫院' }
]
