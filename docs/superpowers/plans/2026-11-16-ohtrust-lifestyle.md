# LikeWater 第 2 張提案實作計畫
依據：docs/superpowers/specs/2026-11-16-ohtrust-lifestyle-design.md。

1. 保存原 OHTrust.vue 與 Navbar.vue，確認乾淨起點；並行生成四張獨立照片，以選定圖與使用者實拍鎖定產品外觀。
2. src/components/OHTrust.vue：依序實作情境首屏、雙圖使用章節、報告插頁、細節/使用提醒、完整原生報告展開、證據範圍、FAQ、聯絡。原報告資料與 FAQ 不改寫。
3. src/components/Navbar.vue 與 src/components/editorial/navbar.css：只針對 /ohtrust 使用產品頁錨點與聯絡 CTA，沿用既有手機選單、焦點與 Escape 行為。
4. public/imgs/likewater/：產生不同寬度 WebP，首圖優先，其餘延遲；完整提示詞及原始生成圖保存在 output/product-design/ohtrust-20261116/。
5. 執行報告保留檢查、build、單元與 SEO 檢查。啟動本機 Vite；以內建瀏覽器測試主要互動、375/768/1440 排版、照片載入與主控台。
6. 同尺寸捕捉與選定圖並排比較，修正 P0-P2；寫入根目錄 design-qa.md，通過後保留預覽供使用者檢視。這輪不提交、推送或部署。

檢查重點：報告內容完整；30 分鐘抗菌條件未省略；手機無橫向溢出、首圖焦點正確；錨點不被固定導覽遮住；只變更產品路由的導覽。
