# 第二輪 SEO / GEO：醫院資料與作者身分

基準版本：`1095a1fdee8ea2b855bb33cc5c4b445a96962dad`，前次 GeoReady 83 分。使用者已授權繼續優化與部署。

## 變更

- 醫院、WebSite 資料由 `createClinicSchema` 共用；初始 HTML 現在也包含原本只在載入後出現的門診時間，避免搜尋端資料不一致。
- 首頁可見門診時間與 schema 使用同一個週間資料；週日休診及當月班表提醒保留。
- 首頁清楚標示「首頁資訊整理與網站維護：專心動物醫院」，機構署名連到醫院介紹。WebPage.author 為同一機構，沒有指定個別醫師、增加審閱紀錄或把首頁標為醫療文章。
- 文章原作者使用與既有醫師介紹相同的 Person ID，保留原姓名及職銜。只有同站且在現有醫師清單中的人物加入 worksFor；外部作者不套用醫院任職資訊。
- RSS dc:creator 與 Atom 每篇作者一致；未列原作者的文章維持機構整理，審閱者不轉成作者。未新增 email、醫師資格或臨床結論。
- 全部 44 篇文章的臨床正文、原圖、網址與原發布／更新日保留。8 位獸醫師、小寵物及聯繫流程保留。

## 驗證

- 完整 verify：18 項靜態 SEO 測試、59 項單元／渲染測試、51 項原有稽核、首頁＋44／44 篇輸出檢查。
- Python XML 實際解析兩種 feed，44 篇對應作者完全一致；日期未改成建置時間。
- 瀏覽器比對首頁初始／載入後完整機構與 WebPage graph，完全一致；代表文章作者資訊也一致。
- 375px 手機首頁及文章沒有橫向溢出；署名、FAQ 與小寵物按鈕正常。班表維持 noindex，載入後沒有殘留搜尋 schema／feed 宣告。
- 獨立審查未發現阻擋問題。原本只檢查兩個程式碼檔案中類型字串的舊稽核，已改成核對真正產出的首頁與服務頁 JSON-LD。

## 發佈與成效界線

上線前備份標記：`backup/search-trust-before-20261103`，指向上述基準版本。

正式站檢查產物：`output/seo-geo/trust-production-release-checks.json`；GeoReady 重測：`output/seo-geo/trust-geoready-after-release.json`。這些為本機檢查產物，沒有納入版本控制。若報告時間早於這次部署，視為快取，不能宣稱是這次優化的新分數。

依據：[Google 原創內容與署名指引](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)、[機構結構化資料](https://developers.google.com/search/docs/appearance/structured-data/organization)、[Article 作者資訊](https://developers.google.com/search/docs/appearance/structured-data/article)。網站技術檢查分數不代表收錄、排名或 AI 引用率。
