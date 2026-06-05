# 產品頁 SEO 完整優化設計

## 目標

讓搜尋引擎能清楚辨識「賴瓦特 LikeWater」與「PetVoice」為兩個獨立產品頁，同時保留現有網址與視覺結構。

## 設計

- `/ohtrust` 對外名稱統一為「賴瓦特 LikeWater」，正文與 meta description 使用一致名稱。
- `/petvoice` 保留既有產品介紹，新增常見問題與媒體報導站內連結。
- 兩頁新增可見 FAQ，回答只使用現有頁面已能支持的產品定位與使用限制。
- `src/seo.js` 依路由輸出 `Product` 與 `FAQPage` JSON-LD，並與既有診所結構化資料合併。
- `/products` 卡片名稱與圖片替代文字同步統一，避免站內命名不一致。

## 驗證

- 執行 `npm run build` 與 `git diff --check`。
- 以瀏覽器檢查兩個產品頁 H1、FAQ、canonical、description、JSON-LD 與手機寬度。
