# GeoReady 重測、分析與公開資訊入口優化

基準版本：`22182eefe435d82461ac00033eaedd6d368f4f84`。

## 重測來源與快取

實際從 https://geoready.dev/ 首頁送出正式網址，初次收到舊83分結果；使用網站提供的 Re-run 入口後確認85分、Google AI20/20、Citability40。引擎v4.19.9、rubricv2。

匯出JSON的引擎時間為2026-11-03T09:07:07.458573+00:00，記錄於 `output/seo-geo/discovery-round/before.json`。GeoReady快取約一小時，頁面重新產生時間不等於重新抓取時間；上線後僅將引擎時間較新的結果列為新分數。

## 分析與處理

| 分類 | 基準 | 處理 |
|---|---:|---|
| Google AI Search |20/20|保留既有作者、日期、標準網址與索引設定。|
| Robots |11/14|明確列出五個原本已允許的搜尋爬蟲；每組保留兩個後台禁止路徑，不改訓練爬蟲政策。|
| Schema |12/14|首頁保持機構／WebPage／FAQPage，不為分數冒充Article。|
| Content |10/14|兩篇並列文章卡片使用真正清單；九張小寵物仍屬裝飾，保留空白alt。|
| Brand & Entity |10/12|只使用核實過的身分網址；不建立假LinkedIn／Crunchbase，暫不採用仍列舊行政區的Wikidata。|
| Meta |11/11|保留已通過項目。|
| llms |5/6|從已建置的首頁與44篇文章生成完整公開文字彙整，保留原文網址、署名、日期及參考來源。|
| Signals |6/6|保留RSS／Atom與真實更新資訊。|
| AI Discovery |0/3|新增自動生成的資訊入口及首頁Markdown表示法；屬其他AI程式相容性，不宣稱提升Google排名。|

首頁沒有表單；沒有提供對外搜尋API或線上預約操作，因此不增加假SearchAction／WebMCP工具。Crawl-delay未設定不是Google阻擋，不增加無用限制。

## 實作

- `/.well-known/ai.txt` 指向真正資訊來源與robots.txt；`/ai/summary.json`、`/ai/faq.json`、`/ai/service.json`皆由既有資料生成。
- `/index.md`是首頁公開主要內容文字版；`/llms-full.txt`彙整首頁與44篇文章／指南，沒有後台或班表資料。
- 僅明確首頁 `Accept: text/markdown` 請求回傳Markdown。一般訪客仍取得原HTML，`q=0`不符合此條件。direct Markdown提供canonical Link，Vary:Accept保留快取區分。
- 獨立審查指出一般rewrites晚於靜態檔案；改用目前Vercel文件支援的direct routes，將格式判斷及Content-Type放在同一規則，避免HTML被誤標Markdown。另排除舊vercel.app主機，保留既有正式網域轉址。
- 文章卡片、原圖、醫療正文、原日期、8位獸醫師、小寵物及電話／LINE流程保留。

## 驗證與發佈

完整verify包含19項靜態SEO測試、66項單元／渲染測試、51項原稽核及44篇逐篇檢查。另以獨立Python robots解析器確認五個具名搜尋爬蟲及一般訓練爬蟲仍只能讀公開頁；重複建置不會累加索引區塊。三種螢幕寬度1440／768／375px無水平溢出，清單語意與小寵物互動正常。

正式HTTP、格式交錯、舊主機、私有頁及44篇檢查結果存於 `output/seo-geo/discovery-round/production.json`；部署後GeoReady結果存於同目錄 `after.json`。這些為本機檢查產物，不納入版本控制。舊版備份標記：`backup/geoready-discovery-before-20261103`。

依據：[GeoReady評分](https://github.com/Auriti-Labs/geo-optimizer-skill/blob/main/docs/scoring-rubric.md)、[Google生成式搜尋指南](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)、[Vercel路由順序](https://vercel.com/docs/project-configuration/vercel-json#rewrites)、[Vercel快取與Vary](https://vercel.com/docs/caching/cdn-cache#vary-header)。技術分數不等於收錄、排名或實際AI引用率。
