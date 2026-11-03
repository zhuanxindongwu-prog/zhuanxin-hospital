# GeoReady 重測與公開資訊入口

使用者要求由 https://geoready.dev/ 重測、分析並優化，延續正式部署授權。

## 稽核與取捨

從首頁送出實際正式網址；第一次看到舊83分快取，使用站內 Re-run 入口後顯示85分、Google AI20/20。匯出 JSON 的時間另行記錄，以引擎時間為準，不把網頁重新產生時間當作新掃描。

採用自動產生的公開機器讀取介面、明確但不放寬原政策的爬蟲規則、以及實際文章清單語意。這些是其他 AI 程式的相容性功能，不是 Google 收錄要求。不新增假 Wikipedia／Wikidata 身分、搜尋或預約操作，不為裝飾圖片加錯誤描述。

## 規格

- 從原有頁面與資料產生 `/.well-known/ai.txt`、`/ai/summary.json`、`/ai/faq.json`、`/ai/service.json`，只提供現有院址、電話、LINE、服務、四則首頁FAQ及來源連結。宣告使用 robots.txt 作為爬蟲規則來源；不另授權訓練或提供可執行操作。
- 產生 `/index.md`（首頁公開主要內容文字版）與 `/llms-full.txt`（首頁及44篇文章／指南公開主要內容，保留標題、引用、原作者及原日期）。不匯出後台、班表或遊戲資料。
- 只有首頁收到精確 `Accept: text/markdown` 時以 Vercel 條件 rewrite 回傳首頁文字版，其他請求維持HTML。正確 MIME、Vary: Accept及 direct Markdown canonical Link；正式站交錯測試HTML／Markdown以檢查快取。
- 明確列出現有已允許的五個搜尋爬蟲：OAI-SearchBot、Claude-SearchBot、PerplexityBot、Googlebot、Applebot。具名群組及萬用群組皆保留 `/adminLogin` 與 `/adminAppointments` 的禁止規則；不新增 Crawl-delay。
- 將首頁「更多照護文章」的兩篇並列卡片改為真正的無序清單；維持原圖、文字、連結及視覺。
- 保留44篇臨床正文／日期／原圖、8位醫師、小寵物與電話／LINE流程。

## 驗收

完整verify、獨立robots解析器、Markdown保留標題／段落／清單／圖片及引用連結且排除隱藏元素、所有JSON可解析、44篇輸出核對、手機互動、獨立審查。備份並部署後核對正式HTTP與協商行為，重跑GeoReady並區分快取與新分數。
