# 2026-09-22 首頁改版

## 新版

- 採用經確認的暖白、森林綠與宋體編輯式版面。
- 8 位獸醫師完整展示，沿用原始肖像／代表照片與小寵物配對。
- 小寵物支援滑鼠移入、鍵盤與「小夥伴」按鈕，保留降低動態效果設定。
- 只有首頁使用新導覽、頁尾與隔離樣式；其他頁面維持原有版面。
- 建置時從同一個首頁元件產生完整靜態 HTML，配對正式 CSS，保留 SEO metadata 與結構化資料。
- 本機提案入口仍為 `/index-preview.html`，不包含在正式建置輸出中。

## 舊版備份與回復

- 舊版 commit：`00ce9420a4257d463276d8e918c1ba0392e0b9db`
- 備份標記：`backup/homepage-before-2026-09-22`
- 舊首頁元件：`src/pages/LegacyHome.vue`
- 專案外完整備份目錄：`../backup-before-homepage-20260922-ujv2Me/`，包含原始碼、舊站建置成品、SHA-256 與回復說明。
- 舊正式部署：https://vercel.com/zhuanxins-projects/zhuanxin-hospital/DT4yU2X5FyNEiaz6EaXWCTZSmcWm

需要回復整站時，可在 Vercel 回復上述部署，或從備份標記建立獨立工作目錄重新建置。不要覆蓋尚有未提交變更的工作目錄。

## 發布前驗證

`npm run verify` 包含完整建置、14 項靜態 SEO 測試、24 項單元／渲染測試及 51 項 SEO audit。另以正式建置進行電腦、手機、獸醫師／小寵物及服務頁往返檢查。
