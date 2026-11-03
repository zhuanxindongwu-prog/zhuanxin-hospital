# 首頁與全文章 SEO / GEO 優化

目標：讓飼主、搜尋引擎及生成式搜尋能從相同的可見內容理解專心動物醫院及每篇文章，取得正確摘要、署名、日期、原始參考來源與延伸閱讀。

範圍：首頁、文章索引及目前 44 篇文章／疾病指南（6 篇獨立元件、20 篇資料型文章、18 篇指南及主題）。沿用 Vue/Vite、既有路由與圖片。

## 現況與選擇

- 已有完整靜態 HTML、canonical、網站地圖和 Article schema，不需重新架站。
- 採共用文章資料契約，改善既有內容與輸出的一致性；不建立大量重複的關鍵字頁。
- 部分 description 只是短標語；用原文已有資訊補足搜尋摘要，正文與醫療結論不改寫。
- 引用目前全部標示 NewsArticle，並以更新日推導審閱日；改為保守的 WebPage 引用及只採明示的審閱日期。
- Search Console 於本次查閱顯示 41 個已收錄、17 個已找到未收錄；資料更新日為 2026-10-23，不代表今日完整索引狀態。

## 驗收

1. 全部文章共用可查詢資料，靜態與瀏覽器的 SEO 標題、摘要及日期相同。
2. 每篇有可見摘要／內容資訊及原有內容、作者、參考來源與延伸閱讀；資料型文章／指南有可靠的章節目錄。
3. 首頁有明確的所在地、主要服務與可見 FAQ；FAQ schema 逐字對應可見問答。
4. 文章目錄具有涵蓋全部文章的 ItemList；llms.txt 的文章連結由同一份資料生成。
5. 不改網址、不替換使用者圖片、不新增虛構作者／審閱／文獻，不將重新建置日當醫療審閱日。使用者於本次工作明確同意將兩則用藥 FAQ 與既有正文統一；該篇保留原發布日，內容更新日記為 2026-11-03，並不代表新增醫療審閱。
6. 完成單元、渲染、全站建置及逐篇輸出檢查，抽查桌機與手機。先交付本機預覽，部署依使用者後續指示。

## 依據

- https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- https://developers.google.com/search/docs/appearance/ai-features
- https://developers.google.com/search/docs/appearance/structured-data/article

Google 的 AI 搜尋沿用搜尋收錄與品質原則，不需要特殊 AI schema；本工作以可索引、具來源、可直接理解及內容一致為核心，不承諾排名或 AI 引用。
