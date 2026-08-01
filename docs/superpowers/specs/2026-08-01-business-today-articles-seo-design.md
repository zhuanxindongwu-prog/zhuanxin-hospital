# 今周學堂文章收錄與 SEO 設計

## 目標

將專心動物醫院於今周學堂「不曾停止的心跳」專欄發布的指定內容整理成本站可直接閱讀的文章，保留原始來源、醫療審閱資訊與查核依據，同時強化文章索引、內部連結及結構化資料。不得收錄使用者指定排除的兩篇文章。

## 收錄範圍

本站最終應呈現以下六篇文章，並依來源發布日期由新到舊排序：

| 日期 | 本站處理方式 | 本站 slug | 今周學堂來源 |
| --- | --- | --- | --- |
| 2026-07-31 | 新增 | `dog-cough-pulmonary-edema-home-monitoring` | `https://school.businesstoday.com.tw/posts/zhuanxinhospital07312026` |
| 2026-07-17 | 新增 | `asia-animal-physiological-database` | `https://school.businesstoday.com.tw/posts/zhuanxinhospital07172026` |
| 2026-06-30 | 整併既有 Digital Health 文章並保留網址 | `digital-health-veterinary-care-2026` | `https://school.businesstoday.com.tw/posts/zhuanxinhospital06302026-1` |
| 2026-06-29 | 保留並補強 | `taiwan-japan-cardiology-forum-continuous-monitoring` | `https://school.businesstoday.com.tw/posts/zhuanxinhospital06292026` |
| 2026-05-29 | 保留並補強 | `monet-home-monitoring` | `https://school.businesstoday.com.tw/posts/zhuanxinhospital05292026` |
| 2026-05-25 | 保留並補強 | `hung-rong-wei-thirty-years` | `https://school.businesstoday.com.tw/posts/zhuanxinhospital05252026` |

以下兩篇不得出現在 `mediaArticles`、文章列表、首頁最新文章、靜態 SEO 頁面或 sitemap：

- `https://school.businesstoday.com.tw/posts/zhuanxinhospital07092026`
- `https://school.businesstoday.com.tw/posts/zhuanxinhospital07022026`

## 內容策略

- 文章以本站可直接閱讀的重新整理版本呈現，不只是外部連結卡片，也不逐字複製來源全文。
- 每篇文章包含唯一標題、摘要、導言、至少三項重點、至少三個內容段落與至少三題 FAQ。
- 醫療警訊、研究假說與產品監測功能須使用審慎語氣，不將居家監測描述為診斷工具，也不將尚未完成驗證的指標描述為已證實的預測工具。
- 六篇文章均標示內容審閱者為「專心動物醫院醫療團隊」，職稱為「犬貓心臟專科醫療團隊」，連結至 `/services/veterinary-cardiology`。
- 每篇文章的來源側欄至少保留對應的今周學堂原文；涉及肺水腫、MMVD、呼吸率或心衰竭判讀的內容，再加入適用的同儕審查文獻。
- 每篇文章加入二至四個相關站內連結，優先連至心臟專科、心臟超音波、MMVD、CHF、PetVoice 與其他相關專題。

## 資料與元件設計

### 文章資料

- 將既有 `digital-health-veterinary-care-2026` 從 `careArticles` 移至 `mediaArticles`，保留原 slug，避免建立內容相近的第二個網址。
- 在 `mediaArticles` 新增肺積水與亞洲動物生理資料庫兩篇資料。
- 六篇資料均補齊 `tags`、`reviewer`、`sources`、`faqs` 與 `relatedLinks`。
- 日期排序繼續使用 `sortArticlesByDateDesc`，不在元件內硬編碼顯示順序。

### 文章頁

- 沿用 `MediaArticle.vue` 的單一文章模板。
- 在文章正文後、來源區塊前加入「延伸閱讀」區塊，渲染 `relatedLinks`，使用站內 `RouterLink`。
- 來源與審閱者仍由既有信任側欄呈現，不建立第二套作者或來源元件。

### 圖片

- 新增三張與文章主題一致的本機 WebP 封面：
  - `/imgs/media/dog-cough-pulmonary-edema.webp`
  - `/imgs/media/asia-animal-physiological-database.webp`
  - `/imgs/media/nangang-pet-expo-digital-health.webp`
- 三張新封面均沿用各自今周學堂文章所使用的原始主圖，不另外生成替代圖片。
- 圖片取自已獲授權的今周學堂／專心動物醫院原始素材，下載後轉為 WebP，不以遠端 URL 熱連結。
- 圖片需保留具體 `alt`、圖說與來源標示，列表圖維持既有固定寬高，文章首圖維持固定比例以降低 CLS。

### 首頁彈窗

- 完整移除 `Home.vue` 的 PetVoice 宣傳彈窗，不在進入或刷新首頁時自動開啟任何覆蓋視窗。
- 移除彈窗的 `Teleport` 模板、開關狀態、關閉及鍵盤事件、body 捲動鎖定、LINE 彈窗處理函式與所有 `petvoice-promo-*` 樣式。
- 保留首頁既有 PetVoice 居家監測入口、照護文章卡片、LINE 導航及其他正常頁面內容。

## SEO 與 GEO

- 每篇文章使用唯一、符合搜尋意圖的 H1、title 與 meta description；肺積水文章優先涵蓋「狗狗咳嗽」「狗狗喘氣」「肺積水」「心臟病警訊」，資料庫文章優先涵蓋「亞洲動物生理資料庫」「連續生理監測」「智慧寵物醫療」。
- `src/seo.js` 與 `scripts/generate-static-seo.mjs` 優先採用文章自訂 `tags`，再合併分類、標籤與品牌詞，避免 Schema 關鍵字只剩通用分類。
- 每篇輸出 canonical、Open Graph、Article、MedicalWebPage、FAQPage 與 BreadcrumbList；`reviewedBy` 指向醫療團隊，`citation` 指向原始報導與醫學來源。
- 靜態 HTML 必須包含文章導言、重點、各段落、FAQ 問答與相關站內連結，確保未執行 JavaScript 時仍可被搜尋引擎理解。
- sitemap 自動納入六篇文章，只保留單一 canonical URL；既有 Digital Health slug 不另做第二個近似網址。
- 首頁最新三篇應依日期顯示：肺積水、亞洲動物生理資料庫、南港寵物展 Digital Health。

## 驗證

- 新增資料回歸檢查，確認六篇來源存在、兩篇排除來源不存在、slug 唯一、日期正確，且每篇具備圖片、審閱者、FAQ、來源、標籤與內部連結。
- 先執行回歸檢查並確認因新文章尚未實作而失敗，再加入 production 內容使其通過。
- 更新首頁最新文章測試，使預期順序與新日期一致。
- 首頁回歸檢查必須確認 `showPetVoicePromo`、`petvoice-promo-overlay`、`petvoice-promo-open` 與首頁彈窗 Teleport 均已移除。
- 執行 production build，確認六篇靜態 HTML 與 sitemap URL 生成，排除兩篇不會出現在 `dist`。
- 以瀏覽器檢查文章列表與至少一篇新文章的桌機及手機排版、圖片載入、內部連結、來源連結，以及 console warning／error。

## 不在本次範圍

- 不新增使用者留言、分享計數或文章後台。
- 不建立被排除文章的空白頁、noindex 頁或轉址。
- 不改動既有醫療服務頁與產品頁的主要內容。
