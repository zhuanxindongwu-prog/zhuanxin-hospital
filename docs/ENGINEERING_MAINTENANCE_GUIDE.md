# 專心動物醫院官網工程維護手冊

最後更新：2026-06-12  
正式網址：<https://cardiospecialvh.tw>  
舊網址：<https://zhuanxin-hospital.vercel.app>，應永久轉址至正式網址

## 1. 文件目的

本文件提供接手工程師維護專心動物醫院官網所需的技術資訊，涵蓋專案架構、部署、內容更新、SEO、GEO、Firebase、品質控管與故障排查。

本專案屬於醫療資訊網站。所有醫療內容、醫師資歷、產品敘述、營業時間及聯絡資訊，在上線前都必須由院方確認。

## 2. 專案概覽

### 2.1 技術堆疊

| 類別 | 技術 |
| --- | --- |
| 前端框架 | Vue 3，Single File Components 與 `<script setup>` |
| 建置工具 | Vite 8 |
| 路由 | Vue Router |
| Metadata | `@vueuse/head` |
| UI | Bootstrap 5、Bootstrap Icons、元件內 scoped CSS |
| 驗證與資料庫 | Firebase Authentication、Cloud Firestore |
| 部署 | Vercel |
| 正式網域 | `cardiospecialvh.tw` |
| SEO 架構 | SPA runtime metadata + 建置後靜態 SEO HTML |

### 2.2 重要目錄

```text
zhuanxin-hospital/
├── public/
│   ├── imgs/                         # 公開圖片與最佳化圖片
│   ├── llms.txt                      # AI/LLM 可讀的官方資訊摘要
│   ├── robots.txt                    # 搜尋引擎爬取規則
│   └── sitemap.xml                   # 原始 sitemap；建置時會在 dist 重新產生
├── scripts/
│   ├── generate-static-seo.mjs       # 建置後產生各路由靜態 SEO HTML
│   └── seo-audit.mjs                 # SEO/GEO 規則檢查
├── src/
│   ├── components/                   # 頁面與共用元件
│   ├── data/
│   │   ├── articleSeo.js             # 一般文章 SEO 資料
│   │   ├── doctors.js                # 醫師資料
│   │   ├── mediaArticles.js          # 媒體報導整理資料
│   │   └── productSeo.js             # 產品 SEO、FAQ 與 schema 資料
│   ├── firebase/firebaseConfig.js     # Firebase 用戶端設定
│   ├── pages/Home.vue                # 首頁組合
│   ├── router/index.js               # 路由、route meta、後台驗證
│   ├── seo.js                        # SPA 執行期 SEO 與 JSON-LD
│   ├── App.vue
│   └── main.js
├── index.html                        # 首頁初始 metadata 與 Vite 入口
├── vercel.json                       # 舊網域轉址、SPA rewrite、快取 headers
└── package.json
```

### 2.3 核心頁面

| 路由 | 用途 | 搜尋索引 |
| --- | --- | --- |
| `/` | 首頁、品牌與服務入口 | Index |
| `/taipei-zhongzheng-veterinary-hospital` | 台北中正區在地 SEO 服務頁 | Index |
| `/ai-search-veterinary-cardiology` | AI 搜尋/GEO 事實摘要頁 | Index |
| `/articles` | 專心快訊與媒體內容中心 | Index |
| `/articles/media/:slug` | 媒體報導整理頁 | Index |
| `/doctor/:id` | 醫師專業資料頁 | Index |
| `/petvoice`、`/petvoice-guide` | PetVoice 主頁與指南 | Index |
| `/products`、`/ohtrust` | 產品總覽與 LikeWater 頁面 | Index |
| `/adminLogin`、`/adminAppointments` | 舊預約資料管理後台 | Noindex |
| `/doctor-schedule`、`/pet-cpr-game` | 班表與互動遊戲 | Noindex |

公開網站目前沒有線上預約入口。`AdminAppointments.vue` 仍可讀取既有 Firestore `appointments` collection，屬於保留的舊後台功能。

## 3. 本機開發與部署

### 3.1 環境需求

- Node.js：使用目前 Vite 8 支援的 Node.js LTS
- npm
- Git

專案目前未鎖定 `.nvmrc` 或 `.node-version`。建議新增並在 CI/Vercel 固定 Node.js 版本，避免建置環境漂移。

### 3.2 安裝與啟動

```bash
cd zhuanxin-hospital
npm install
cp .env.example .env.local
npm run dev
```

`.env.local` 至少應包含：

```dotenv
VITE_SITE_URL=https://cardiospecialvh.tw
```

`VITE_SITE_URL` 會影響 canonical、Open Graph URL、JSON-LD URL、sitemap 與 robots.txt。正式環境不可設為 Vercel preview 網址。

### 3.3 建置與最低驗證

```bash
npm run build
node scripts/seo-audit.mjs
npm run preview
```

`npm run build` 執行：

1. `vite build`：產生 SPA assets。
2. `node scripts/generate-static-seo.mjs`：產生各路由靜態 HTML、`dist/sitemap.xml` 與 `dist/robots.txt`。

只執行 `vite build` 會缺少靜態 SEO 頁面。正式部署必須執行完整 `npm run build`。

上線前另需人工檢查：

- 首頁、文章、醫師、PetVoice 頁的桌機與手機版
- `dist/sitemap.xml`、`dist/robots.txt`
- 重要頁面 `dist/<route>/index.html` 的 title、description、canonical 與 JSON-LD
- 正式網域與舊 Vercel 網域的 redirect

### 3.4 Vercel

Vercel Build Command 應保持：

```text
npm run build
```

正式環境變數：

```text
VITE_SITE_URL=https://cardiospecialvh.tw
```

修改環境變數後必須重新部署。`vercel.json` 負責舊網域永久轉址、特定 SPA/noindex 頁 rewrite 與快取 headers。

不要新增全域 SPA rewrite：

```json
{ "source": "/(.*)", "destination": "/index.html" }
```

這會蓋掉靜態產生器輸出的 route HTML，降低 SEO 效果。

## 4. 架構與資料流

### 4.1 Vue 與路由

`src/App.vue` 固定載入 Navbar、當前 `router-view`、Footer 與全站 `useSeo()`。首頁由 `src/pages/Home.vue` 組合各區塊。

所有路由元件在 `src/router/index.js` 使用動態 import，形成 route-level code splitting：

```js
component: () => import('../components/SomePage.vue')
```

新增頁面時應延續此模式。

### 4.2 SEO 雙層架構

本專案不是 SSR/Nuxt，而是以兩層方式降低純 SPA 的 SEO 限制。

#### 執行期 SEO

`src/seo.js` 搭配 `@vueuse/head`，在路由切換時更新：

- title、description、canonical、robots
- Open Graph、Twitter Card、Article metadata
- JSON-LD structured data

#### 靜態 SEO HTML

`scripts/generate-static-seo.mjs` 在建置後，針對可索引路由產生：

```text
dist/<route>/index.html
dist/<route>.html
```

靜態 HTML 內含 metadata、JSON-LD、H1、摘要文字與重要站內連結。前端 hydrate 後，`src/seo.js` 會移除帶有 `data-static-seo-schema` 的靜態 schema，避免重複 JSON-LD。

### 4.3 雙層 SEO 維護原則

以下資訊目前在 `src/seo.js` 與 `scripts/generate-static-seo.mjs` 都有定義，修改時必須同步：

- 醫院名稱、別名、地址、電話、營業時間
- LocalBusiness/VeterinaryCare schema
- Local SEO FAQ
- AI GEO FAQ、主題實體與可信來源
- 特殊頁面的 schema 與靜態 route

若只更新其中一處，可能造成瀏覽器顯示、Google 初次抓取與 JSON-LD 不一致。

長期改善建議：把醫院基本資料、FAQ、GEO entities、route SEO 統一抽到 `src/data/`，讓 runtime 與 static generator 共用單一資料來源。

## 5. 內容維護標準流程

### 5.1 新增一般文章

1. 建立 Vue 頁面，例如 `src/components/PostArticle_NewTopic.vue`。
2. 在 `src/router/index.js` 新增 route 與基本 meta。
3. 在 `src/data/articleSeo.js` 新增同一路徑的完整 SEO 資料。
4. 在文章中心、相關文章或主題頁加入內部連結。
5. 執行完整建置與 SEO audit。

`articleSeo.js` 必填格式：

```js
'/new-article-slug': {
  title: '清楚回答搜尋意圖的文章標題',
  description: '約 80 至 150 個中文字的摘要。',
  image: '/imgs/optimized/example.webp',
  category: '疾病照護',
  publishedDate: 'YYYY-MM-DD',
  modifiedDate: 'YYYY-MM-DD',
  tags: ['主題詞', '疾病詞', '照護詞'],
  reviewer: {
    name: '醫師姓名',
    title: '專業職稱',
    path: '/doctor/doctor-id'
  }
}
```

醫療文章應優先加入 `reviewer`，並在頁面可見內容中呈現審閱者與更新日期，強化 E-E-A-T。

### 5.2 新增媒體報導整理

媒體報導集中維護於 `src/data/mediaArticles.js`。新增後會自動：

- 產生 `/articles/media/<slug>` 頁面
- 顯示於 `/articles`
- 在建置時產生靜態 HTML並加入 sitemap
- 產生 Article、MedicalWebPage、BreadcrumbList 與 citation schema

必要資料包括 `slug`、分類、日期、標題、摘要、圖片與授權標註、intro、highlights、sections、gallery、sources。

來源規則：

- 每個來源 URL 必須唯一；`seo-audit.mjs` 會阻止單篇文章中重複 URL。
- 保留 publisher、日期、原始標題與 URL。
- 只能使用已獲授權的圖片，並保留 credit。
- 摘要必須重新整理，不應大量複製來源文章。
- 外部來源作為查核與 citation，不應取代站內原創觀點。

### 5.3 新增醫師

在 `src/data/doctors.js` 新增資料。靜態產生器會自動建立 `/doctor/<id>`。

至少應包含穩定的英文 `id`、姓名、職稱、形象照、簡介、專長、經歷與認證。`credentials` 會輸出為 `EducationalOccupationalCredential` schema；`specialties` 或 `tags` 會輸出為 `knowsAbout`。

醫師資歷不得由工程師自行推測，必須取得院方核准文字。

### 5.4 新增產品

1. 建立產品 Vue 頁面。
2. 在 `src/router/index.js` 新增 route。
3. 在 `src/data/productSeo.js` 新增產品、品牌、功能與 FAQ。
4. 在 `Products.vue` 加入產品入口。
5. 在 `scripts/generate-static-seo.mjs` 的靜態 routes 加入產品頁。

產品敘述不得包含無證據的治療效果，亦不得將輔助產品描述為可取代獸醫診斷。

### 5.5 更新醫院基本資料

至少同步檢查：

- `src/seo.js`
- `scripts/generate-static-seo.mjs`
- `src/components/Footer.vue`
- `src/components/LocalVetPage.vue`
- `src/components/AiSearchOptimizationPage.vue`
- `public/llms.txt`
- `index.html`
- Google Business Profile 與外部品牌頁

更新營業時間、地址或電話後，必須同步更新畫面文字與 JSON-LD。

## 6. SEO 維護指南

### 6.1 搜尋策略

網站應建立以下搜尋意圖的權威度：

- 品牌詞：專心動物醫院、CardioSpecial
- 在地詞：台北動物醫院、中正區動物醫院、東門動物醫院
- 專科詞：犬貓心臟專科、犬貓腫瘤門診、心臟超音波
- 疾病詞：MMVD、CHF、肺高壓、DCM、HCM、心律不整
- 照護詞：安靜時呼吸數、心衰竭照護、PetVoice、居家生理監測

Google 對「動物醫院」等在地搜尋的排序同時受到距離、相關性與知名度影響。程式碼 SEO 無法保證泛用詞第一名，也無法控制使用者所在地造成的 Local Pack 排序。

### 6.2 每頁 On-page SEO 標準

每個可索引頁面必須具備：

- 唯一 title、description、canonical 與 H1
- 合理的 H2/H3 層級
- 首段直接回答搜尋意圖
- 描述性圖片 alt
- 相關站內連結
- 可見的更新日期、審閱者或來源
- 正確 Open Graph image
- 與可見內容一致的 JSON-LD

避免關鍵字堆疊、多頁使用相同 metadata、內容薄弱的近似頁，以及 schema 宣稱頁面上看不到的資訊。

### 6.3 Canonical、舊網域與 QR Code

唯一正式網域是：

```text
https://cardiospecialvh.tw
```

`vercel.json` 已將舊網址 `https://zhuanxin-hospital.vercel.app/:path*` 永久轉址至正式網域的相同 path。不要移除此轉址，否則既有搜尋訊號與使用舊網址的 QR Code 會失效。

所有 canonical、sitemap、schema URL、Open Graph URL 必須使用正式網域。

### 6.4 Sitemap 與 robots

原始檔在 `public/`，正式建置輸出在 `dist/`。部署後確認：

```text
https://cardiospecialvh.tw/sitemap.xml
https://cardiospecialvh.tw/robots.txt
```

可索引頁面應出現在 sitemap；後台與不需搜尋曝光的頁面應設定 `noindex`。

### 6.5 結構化資料

目前使用：

- `VeterinaryCare`、`LocalBusiness`、`MedicalBusiness`、`Organization`
- `WebSite`、`WebPage`、`Service`
- `Article`、`MedicalWebPage`
- `ProfilePage`、`Person`
- `Product`、`FAQPage`、`BreadcrumbList`
- `DefinedTermSet`、`ItemList`

使用 Google Rich Results Test 與 Schema.org Validator 驗證。結構化資料必須與可見內容一致；FAQ schema 只能描述頁面實際顯示的 FAQ。

### 6.6 圖片與 Core Web Vitals

現有做法：

- 首屏重要圖片使用 `fetchpriority="high"`
- 非首屏圖片使用 `loading="lazy"`
- 最佳化圖片存於 `/public/imgs/optimized/*.webp`
- Vercel 設定 assets 與 images cache headers

目前 `public/` 約 61 MB，且多個舊 PNG 為 1 MB 至 19 MB。新增圖片應優先使用 WebP/AVIF；Hero 建議小於約 300 KB，內容圖小於約 200 KB；設定合理尺寸或 aspect-ratio，避免 CLS。

持續監控：

- LCP < 2.5 秒
- CLS < 0.1
- INP < 200 毫秒

### 6.7 Search Console

每次新增重要頁面或大幅更新後：

1. 完成部署。
2. 開啟 `cardiospecialvh.tw` Search Console 資源。
3. 確認 sitemap 成功讀取。
4. 使用網址審查檢查新 URL。
5. 確認 Google 選取的 canonical 是正式網域。
6. 對重要新頁要求建立索引。
7. 觀察 2 至 8 週的曝光、CTR、平均排名與查詢詞。

每月檢查 Indexing、Core Web Vitals、structured data、品牌詞、在地詞、專科詞與內容詞表現，以及舊 Vercel URL 是否逐步退出索引。

### 6.8 Local SEO

泛用搜尋「動物醫院」通常優先顯示 Google Maps/Local Pack。網站之外還必須維護：

- Google Business Profile 名稱、類別、地址、電話、營業時間
- 官網連結使用正式網域
- Google 商家貼文與真實照片
- 真實評論與院方回覆
- 媒體、協會、學校、合作院所引用
- 所有平台 NAP（Name、Address、Phone）一致

不可購買垃圾 backlink、假評論或使用 script 製造流量。

## 7. GEO / AI 搜尋最佳化

### 7.1 GEO 目標

GEO 的目的是讓生成式搜尋與問答系統更容易：

- 正確認出專心動物醫院與 CardioSpecial 是同一實體
- 抽取正確地址、電話、專科與醫師資歷
- 將內容與 MMVD、心臟超音波、腫瘤門診、PetVoice 等主題連結
- 引用具來源與審閱者的內容

### 7.2 現有 GEO 實作

`/ai-search-veterinary-cardiology` 提供可抽取的核心事實、主題實體、FAQ、站內可信來源與醫師審閱者。

`public/llms.txt` 包含官方身份、地址、電話、專業領域、權威頁面與引用指引。它不是所有 AI 平台承諾採用的正式排名標準，但可作為清晰的機器可讀摘要，內容必須與網站及 Google Business Profile 一致。

GEO structured data 使用 `WebPage`、`FAQPage`、`DefinedTermSet`、`DefinedTerm`、`ItemList`、`reviewedBy` 與 `citation`。

### 7.3 GEO 內容標準

每篇權威內容應盡量具備：

1. 首段直接回答問題。
2. 明確定義疾病、檢查或照護術語。
3. 區分一般資訊、風險警訊與就醫建議。
4. 顯示作者或醫師審閱者。
5. 顯示發布與更新日期。
6. 引用可靠來源。
7. 將相關主題連至站內專題頁。
8. 使用表格、清單、FAQ 或簡短定義，方便抽取。
9. 保留「不能取代獸醫診斷」等醫療界線。
10. 避免沒有證據的最高級、保證或絕對化宣稱。

### 7.4 主題叢集策略

以「犬貓心臟專科」作為 pillar，持續建立：

| 主題 | 建議內容 |
| --- | --- |
| MMVD | 分期、Stage B1/B2/C/D、藥物、手術、居家監測 |
| CHF | 症狀、急性警訊、出院後照護、呼吸數 |
| 肺高壓 | 原因、症狀、超音波評估、追蹤 |
| DCM / HCM | 犬貓差異、風險族群、檢查與照護 |
| 心臟超音波 | 適應症、檢查流程、常見數值與限制 |
| 心律不整 | 常見表現、ECG/Holter、何時需就醫 |
| VHS / LA/Ao | 定義、用途、限制、不可自行診斷提醒 |
| NT-proBNP | 檢測用途、限制、與超音波的關係 |
| Pimobendan | 使用情境、需由獸醫處方與追蹤 |
| PetVoice | 居家趨勢、適用對象、案例與限制 |

每個 cluster 應互相連結至核心 pillar、相關疾病、醫師專業頁、在地服務頁與必要的就醫資訊。

### 7.5 GEO 成效衡量

- Search Console 中的長尾問句與非品牌曝光
- GA4 referral/source 變化
- Vercel logs 中 AI crawler 行為
- 定期以一致問題測試 Google AI Overview、ChatGPT、Perplexity、Gemini
- 記錄是否引用正確網域、醫院名稱與資訊

測試應使用真實搜尋意圖，例如「台北哪裡可以做狗狗心臟超音波？」而不是只問品牌詞。

## 8. Firebase 與後台

Firebase 使用 Authentication 做管理員 Email/Password 登入，Firestore 用於讀取與管理 `appointments` collection。`/adminAppointments` 由 router guard 保護。

Firebase Web API key 出現在前端 bundle 是 Firebase 用戶端架構的正常情況；真正的安全邊界是 Firestore Security Rules、Authentication 帳號與 authorized domains。

目前 repo 中沒有 `firestore.rules` 或 Firebase deployment config。維護工程師必須在 Firebase Console 確認：

- 未驗證使用者不可讀寫 `appointments`
- 只有授權管理員可更新或刪除資料
- 不需要的登入方式已停用
- 離職或不再使用的管理帳號已移除

若確定不再使用舊預約功能，應先備份與取得院方確認，再移除 route、元件、Firebase 依賴與資料。不要直接刪除 Firestore collection。

## 9. 測試與品質控管

### 9.1 現有自動檢查

```bash
npm run build
node scripts/seo-audit.mjs
```

`seo-audit.mjs` 會檢查 SEO/GEO 路由、Footer 連結、sitemap、runtime/static schema、citation、重複來源、lazy loading、WebP、品牌訊號、醫師資歷、canonical 與舊網域 redirect。

### 9.2 目前缺口與建議

目前沒有單元測試、元件測試、E2E、CI workflow、自動 Lighthouse budget、broken-link checker 或 schema validator。

建議依序新增：

1. GitHub Actions：build + SEO audit。
2. Playwright：首頁、文章、醫師、手機版 smoke test。
3. Lighthouse CI：LCP、CLS、INP、accessibility budget。
4. Link checker：站內與重要外部 citation。

### 9.3 人工發布檢查表

#### 功能

- [ ] 導覽、電話與 Google Maps 連結正確
- [ ] 手機底部 CTA 不遮擋內容
- [ ] 醫師頁與文章頁不存在 404
- [ ] 後台登入與權限符合預期

#### SEO / GEO

- [ ] title、description、H1 唯一
- [ ] canonical 使用正式網域
- [ ] 新頁已加入靜態 generator 與 sitemap
- [ ] JSON-LD 與可見內容一致
- [ ] 內容有直接答案、審閱者、更新日期與來源
- [ ] 相關站內頁互相連結
- [ ] `node scripts/seo-audit.mjs` 通過

#### 視覺與效能

- [ ] 桌機版無重疊、溢出
- [ ] 390px 寬手機版無水平捲動
- [ ] 圖片使用正確 alt 與 lazy loading
- [ ] 沒有 console error

## 10. 常見問題與故障排查

### Google 搜尋結果仍顯示 Vercel

檢查舊 URL 永久轉址、正式頁 canonical、sitemap、Search Console 與 Google 是否已重新抓取。Google 顯示的 site name 由 Google 最終決定；metadata 與 schema 是訊號，不是即時顯示保證。

### 新頁可開啟，但 Google 抓不到內容

常見原因：

- 只新增 Vue route，未加入 static generator。
- 未執行完整 `npm run build`。
- Vercel rewrite 蓋掉靜態 HTML。
- 新頁未加入 sitemap 或被設為 noindex。

### Metadata 正確，但靜態 HTML 錯誤

代表只修改了 `src/seo.js` 或 router meta，沒有同步更新 `scripts/generate-static-seo.mjs`。

### Firebase 後台無法讀取

檢查登入狀態、authorized domains、Firestore rules、`appointments` collection 與 Browser console 錯誤碼。

## 11. 已知風險與 Roadmap

### 高優先

1. 將重複的醫院資料、FAQ、GEO entities 與 route SEO 抽成單一資料來源。
2. 新增 CI，push 時強制執行 build 與 SEO audit。
3. 確認並版本化 Firestore Security Rules。
4. 盤點並移除未使用的大型原始圖片。
5. 為重要醫療文章補齊審閱者、參考來源與更新日期。

### 中優先

1. 新增 Playwright、Lighthouse CI、broken-link 與 citation 檢查。
2. 建立主要疾病 pillar/cluster。
3. 將 `/post-article-*` 改為語意化 URL；更改時保留永久轉址。
4. 補上 GA4 與 Search Console KPI 維護流程。

### 長期評估

若內容規模持續增加，可評估遷移至 Nuxt 3 或其他 SSG/SSR 架構，使 metadata、內容與 sitemap 共用資料來源。遷移時必須保留現有 URL 或建立逐頁永久轉址。

## 12. 工程師接手清單

- [ ] 可執行 `npm install`、`npm run dev`、`npm run build`
- [ ] `node scripts/seo-audit.mjs` 通過
- [ ] 理解 runtime SEO 與 static SEO 必須同步
- [ ] 已取得 Vercel、正式網域與環境變數權限
- [ ] 已取得 Google Search Console 與 Google Business Profile 權限
- [ ] 已取得 Firebase Console 與管理員帳號權限
- [ ] 已確認醫療內容與媒體圖片的審核/授權流程
- [ ] 已確認部署分支、code review 與緊急回滾流程
