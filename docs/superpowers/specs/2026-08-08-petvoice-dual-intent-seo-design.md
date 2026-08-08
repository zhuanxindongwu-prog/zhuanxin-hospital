# PetVoice 雙頁搜尋意圖 SEO 設計

## 目標

提升下列兩個頁面各自被 Google 搜尋與生成式搜尋系統理解、索引與引用的機會，而不是將其中一頁轉址或 canonical 至另一頁：

- `/petvoice`：PetVoice 台灣產品與服務主頁。
- `/articles/media/petvoice-home-monitoring`：專心動物醫院導入 PetVoice 的媒體與台日合作報導。

排名由搜尋引擎決定，本次工作不承諾名次或同時顯示兩筆結果；可控制的目標是消除內容過薄、搜尋意圖混雜與品牌訊號不一致。

## 搜尋意圖分工

### PetVoice 產品主頁

主要回答「PetVoice 是什麼、台灣如何購買、台灣版本限制、監測項目、產品規格、保固與適用族群」。標題、H1、摘要與內文以 `PetVoice`、`PetVoice 台灣`、`犬貓居家生理監測`、`購買`、`保固` 為自然語意，不堆疊關鍵字。

### PetVoice 媒體文章

主要回答「專心動物醫院為何導入 PetVoice、台日專家交流、居家監測如何補充診間資料、媒體如何報導」。保留 Article 定位、發布日期、媒體來源與原有新聞脈絡，不改成產品銷售頁。

### PetVoice 完整指南

`/petvoice-guide` 繼續承接使用方式、健康數據與照護教育，並以描述清楚的錨點連結到產品主頁與媒體文章。

## 技術設計

1. 讓 `/petvoice` 的部署初始 HTML 包含完整語意內容、H2/H3、FAQ、可信來源與至少三個相關站內連結，不再只輸出兩段摘要。
2. 擴充 `productSeo['/petvoice']`，集中管理更新日期、審閱者、官方來源、相關頁面與台灣購買資訊，供畫面、runtime schema 與 static schema 共用。
3. Product schema 保留產品實體；WebPage schema補上 `dateModified`、`reviewedBy` 與官方 `citation`；FAQPage 與 BreadcrumbList 保持獨立且不重複。
4. 媒體文章保持 self-canonical 和 Article schema，加入獨立 FAQ 與更明確的產品主頁連結；不使用跨頁 canonical。
5. `/petvoice` 與媒體文章使用不同 title、H1、description 和主要段落，避免被判定為近似重複頁。
6. sitemap 使用各頁真實更新日期；所有 canonical、OG URL 與 sitemap URL 統一使用 `https://cardiospecialvh.tw`。

## 網站名稱保護

首頁唯一首選網站名稱是「專心動物醫院」。以下訊號必須保持一致：

- `<title>` 以「專心動物醫院」起始。
- `application-name`、`apple-mobile-web-app-title`、`og:site_name` 均為「專心動物醫院」。
- 首頁 H1 包含「專心動物醫院」。
- WebSite.name 與 Organization.name 均為「專心動物醫院」。
- WebSite 與 Organization 不輸出 `alternateName`，避免 Google 再選擇「專心動物」或網域名稱。

## 驗證標準

- `/petvoice` 初始 HTML 正文至少 1,200 個去標記字元，具有至少 5 個 H2 與 3 個站內連結。
- 兩頁具有不同 title、H1、description，且各自 canonical 指向自己。
- `/petvoice` static 與 runtime schema 皆包含 Product、WebPage、FAQPage、BreadcrumbList。
- 媒體文章包含 Article、FAQPage、來源、審閱者與產品主頁連結。
- 首頁網站名稱檢查維持全數通過，且 metadata 不重複。

