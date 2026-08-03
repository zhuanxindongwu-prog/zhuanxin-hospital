# LikeWater 五份生物相容性報告更新設計

## 目標

將 LikeWater 頁面的生物相容性報告由三份更新為五份，僅新增實際未上架的報告，避免重複 PDF 與既有連結失效。

## 重複判定

以下三份使用 SHA-256 比對後，與 `public/reports` 現有檔案完全相同，因此不重新複製：

- 急性全身毒性研究
- 皮膚致敏測試
- 兔子熱原研究

新增兩份唯一報告：

- 體外細胞毒性試驗，報告編號 `23S186CE-01-R01`
- 兔子皮內刺激研究，研究編號 `TW025-23020L01`

## 呈現方式

- 保留現有三張報告卡與 PDF 網址。
- 新增「體外細胞毒性試驗」與「兔子皮內刺激研究」兩張卡。
- 報告總數由 3 更新為 5。
- 區塊說明列出五項檢驗，不宣稱超出原始報告結論的產品功效。
- 體外細胞毒性摘要使用「測試條件下呈零反應，未見體外細胞毒性」。
- 皮內刺激摘要使用「測試條件下反應分類為可忽略」。
- 所有卡片仍直接開啟本站保存的原始 PDF，並保留 `noopener noreferrer`。

## 檔案與網址

- `public/reports/relano-in-vitro-cytotoxicity.pdf`
- `public/reports/relano-intracutaneous-irritation-rabbits.pdf`

## 驗證

- 自動檢查要求畫面存在五張唯一報告卡與五個唯一 PDF 網址。
- 五份 PDF 必須存在、以 `%PDF-` 開頭且大小合理。
- 五份公開 PDF 的 SHA-256 必須互不重複。
- Vite production build 必須成功。
- 瀏覽器驗證 `/ohtrust#reports` 顯示五張卡，連結可開啟且沒有 console error。
