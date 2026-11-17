# 1117 八篇文章發布

使用者授權將「小品 1117」全部八份修訂稿與依標題製作的圖片發布至官網。八篇均為新增的完整稿件，沒有覆蓋既有同主題文章。發表日期為 2026-11-17。

| 主題 | 專業版網址 | 飼主專欄網址 |
| --- | --- | --- |
| 咳嗽鑑別 | /articles/dog-cough-differential-diagnosis | /articles/dog-recurrent-cough-heart-or-airway |
| 麻醉與牙科 | /articles/cardiac-pets-preoperative-anesthesia-care | /articles/cardiac-pets-anesthesia-assessment |
| 活動與日常照護 | /articles/dog-heart-disease-activity-assessment | /articles/dog-heart-disease-daily-life |
| 肺水腫與腱索斷裂 | /articles/dog-mmvd-acute-decompensation-chordal-rupture | /articles/dog-sudden-pulmonary-edema |

封面沿用既有 MMVD 醫學水彩風格，共八張獨立 WebP；原本使用者提供的圖片不變。來源、文字整理、圖片提示詞與驗證記錄分別見 `docs/media/2026-11-17-eight-article-sources.json`、`docs/image-prompts/2026-11-17-eight-care-articles.json` 與 `docs/design-qa/2026-11-17-eight-articles.md`。

發布前完整 verify 通過，原稿 324 段皆出現在建置後內容，23 則 FAQ、27 筆引用與作者資訊完整。文章列表、首頁最新文章、站內搜尋、sitemap、RSS/Atom 及 AI discovery 索引同步更新，全站文章由 44 增為 52 篇。

## 回復點

- 前版 commit：`f10ecc4990da0081715201be92c0612dd699928b`，包含已上線的 LikeWater 改版。
- 備份標記：`backup/eight-articles-before-20261117`。
- 前版正式部署：https://vercel.com/zhuanxins-projects/zhuanxin-hospital/9fFDH2VgxpqnaKJ9kMQwuzxdT8h3 。

以既有 main 分支與 Vercel Git 整合發布。需要回復時，可在 Vercel 回復前版部署，或從備份標記另建工作目錄重建。不得覆蓋尚有未提交變更的工作目錄。
