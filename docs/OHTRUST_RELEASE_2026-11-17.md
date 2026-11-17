# LikeWater 圖片與滾動敘事改版發布

使用者於 2026-11-17 檢視本機加長版預覽後指示「部署」。本次發布延續所選第二款居家風格，包含大幅首圖、三幕自然滾動情境、放大的包裝細節、通風居家全景，以及僅在 /ohtrust 啟用的產品導覽。

正式路徑：https://cardiospecialvh.tw/ohtrust

## 舊版回復點

- 原版本：`b56b7ba1c4e85752adcaee7cf72a14b34f586183`。
- 備份標記：`backup/ohtrust-before-20261117`。
- 原正式部署：https://vercel.com/zhuanxins-projects/zhuanxin-hospital/2ykC5uHiBnm6SGFHeXL2A5RoBc4H 。
- 需要回復時，可在既有 Vercel 專案回復上述部署，或以備份標記建立獨立工作目錄重新建置；不要覆蓋未提交的工作。

## 範圍與驗證

- 產品使用圖採用本次核准設計的暖白居家風格，響應式 WebP 共 14 份；未加入原始照片中的電腦畫面。
- 保留六份報告、原 FAQ 與證據適用限制；`reports`、`supportedClaims`、`unsupportedClaims` 與改版前完全相同。
- 桌面三幕可隨上下滾動切換；手機、矮螢幕及減少動態模式使用直式圖文。
- 完整 `npm run verify` 通過：19 項靜態 SEO 測試、66 項功能測試、51/51 SEO 稽核、首頁及 44/44 文章覆蓋與站名訊號檢查。
- `node scripts/check-ohtrust-report-section.mjs` 與 `git diff --check` 通過。
- 375、768、1024、1280 寬度及 540 高度分支已驗證；比較與互動證據見根目錄 `design-qa.md`。
- 經由既有 main 分支的 Vercel Git 整合發布，維持完整 `npm run build` 與原正式網域。

此記錄於推送前寫入；實際成功狀態另以 Vercel 狀態及正式網域回應核對。
