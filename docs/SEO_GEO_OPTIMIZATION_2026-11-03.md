# 首頁與全文章 SEO / GEO 優化紀錄

## 完成範圍

首頁 `/`、文章索引 `/articles`，以及 44 篇文章與疾病指南：6 篇獨立文章元件、20 篇資料型文章、16 篇疾病指南、2 篇主題中心。服務頁另行保留原有內容。

## 實作結果

- 共用文章資料契約：搜尋標題／摘要、發布與更新日期、作者、原始圖片、參考來源及延伸閱讀由相同資料取得。
- 補強 4 篇原先僅有短標語的搜尋描述；5 篇使用較精簡的搜尋標題，原本醫療正文與文章主標題保留。
- 文章新增可見摘要或內容資訊；資料型文章與指南有可跳轉章節目錄。原有日期與醫師介紹已存在的版面，不再重複顯示。
- 16 篇疾病指南改用對應主題的相關文章，涵蓋 ECG、昏厥、HCM、血栓、呼吸困難、心絲蟲及用藥等關聯。
- 引用使用保守且正確的 WebPage 類型，不再將指南、製造商網頁等全部標示為新聞。保留來源原有日期精度。
- 更新日期不再推導成審閱日期；指南／主題版面未顯示的審閱聲明不另發布為 schema 審閱聲明。
- 首頁增加可見院址／服務摘要與 4 則就診 FAQ，問答內容和 FAQPage schema 一致。
- 文章索引 CollectionPage 的 ItemList 包含全部 44 篇；llms.txt 從同一資料自動產生完整文章連結。
- 開放大型圖片預覽與摘要擷取；保留正式網域、自我標準網址、現有路由與網站地圖。
- 修正一篇舊文章的手機橫向溢出，以及問答文章的主要內容與標題層級。

## 經使用者確認的內容修正

`/articles/dog-mmvd-medication-safety` 的兩則用藥 FAQ 原先與同頁正文相衝突。已依現有正文統一為核對具體藥品、處方及當下狀態，取得個別指示；移除通用補服時間／間隔。發布日仍為 2026-10-26，內容更新日記為 2026-11-03，不新增審閱日期或審閱者。

## 驗證與可重現方式

- `npm run verify`：建置、17 項靜態內容檢查、53 項單元／渲染測試、51 項原有 SEO 稽核、首頁與 44 篇逐篇輸出檢查、網站名稱訊號，全部通過。
- 逐篇輸出涵蓋 title、description、canonical、單一 H1、摘要、日期、作者、引用類型、目錄目標、相關連結與 sitemap／llms.txt 發現性。
- 實際瀏覽器：44 篇 × 375／768／1440px，共 132 組。比對載入後 title／description／canonical，確認單一 H1、唯一 Article schema、靜態 schema 清除、目錄目標及無水平溢出。
- 首頁另檢查 4 則 FAQ 可展開、8 位獸醫師及 8 個小寵物按鈕。
- 實際確認小寵物按鈕可開啟與關閉，不會跳離首頁；文章目錄可跳至章節，且標題不被固定導覽列遮住。
- 獨立差異審查指出的靜態審閱署名、摘要來源與正文連結驗證問題均已修正；複查未發現剩餘阻擋項。
- 機器可讀報告：`output/seo-geo/article-coverage.json`、`output/seo-geo/browser-article-checks.json`（檢查成品，未納入版本控制）。

## 搜尋實況與界線

Search Console 本次讀到的網頁索引報表更新日為 2026-10-23：41 個已收錄，17 個「已找到－目前尚未建立索引」；另有正常轉址與 noindex 頁。這不是 2026-11-03 全站的即時收錄數。

本機技術驗證不能保證收錄、排名、點擊或 AI 引用。優化沿用 Google 的搜尋與生成式搜尋建議，沒有虛構「AI 專用」schema，也沒有為 SEO 新增醫療結論、研究、作者資格或審閱紀錄。

依據：[Google 生成式搜尋指南](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)、[AI 搜尋功能與網站](https://developers.google.com/search/docs/appearance/ai-features)、[文章結構化資料](https://developers.google.com/search/docs/appearance/structured-data/article)。

## GeoReady 報告後續實作與發佈

使用者已指示依建議順序執行並上線。本次發佈整合前述本機成果及以下後續項目：

- 首頁 H1 僅保留院名，標語改為相鄰段落，沿用原本樣式。
- 顯示網站維護單位與真實首頁資訊更新日，WebPage.publisher／dateModified 使用同一資料。
- 全站機構 sameAs 加入既有 Facebook、LINE 與維基百科網址，首頁提供對應可見連結。
- `/feed.xml`、`/atom.xml` 從相同 44 篇清單自動產生，保留發布及更新日期，提供 head 宣告、頁尾入口與正確 MIME 類型。
- noindex 班表等路由由載入後程式移除首頁靜態訂閱宣告；已實際重現問題並確認修正。
- 手機 375px、平板 768px 與原桌面尺寸檢查：標語、頁尾及問答正常，沒有水平溢出。8 位獸醫師、8 個小寵物按鈕與 LINE 既有導向處理保留。
- 獨立審查未發現 Critical／Important 問題；唯一 Minor（新增 LINE 身分連結缺少既有手機導向處理）已接上原有 handler。
- 正式站舊版 commit：`ff888587031d5eb18ca229365216b18f7b425af7`；備份標記：`backup/seo-geo-before-20261103`。
- 原部署：https://vercel.com/zhuanxins-projects/zhuanxin-hospital/CfkcixLdRuiNMRxA9SpDsdoZiG2S。

外部核對：[維基百科](https://zh.wikipedia.org/wiki/專心動物醫院)、[臺北市獸醫師公會](https://www.tpvma.org.tw/client/中正區?p=1)。Wikidata Q10957427 仍列舊大安區，這次沒有加入，也沒有修改外部帳號或條目。Facebook 直接抓取有限制，其身分網址另由既有維基百科與 Wikidata 互相連結確認。

正式發佈後的 HTTP、44 篇文章與訂閱檢查結果存於 `output/seo-geo/production-release-checks.json`；GeoReady 的時間、分數及快取狀態另存於 `output/seo-geo/geoready-after-release.json`。這些為本機驗證產物，不納入版本控制。
