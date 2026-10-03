# 第一批分頁編輯式改版 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 將新版首頁的視覺延伸至公開分頁導覽／頁尾及五個專科／疾病指南，提供本機預覽，不部署。

**Architecture:** 保留首頁與舊頁面資料，在現有 Navbar／Footer 加入向下相容的新版變體。SeoContentPage 以明確的五條路由清單選用共用新版呈現元件，另外 16 個衛教指南保持原內文；新版 CSS 限定作用域，不覆寫全站元素。原 SEO 管線維持不變。

**Tech Stack:** 現有 Vue 3、Vue Router、Vite、scoped CSS、Bootstrap Icons、node:test、Vue SSR；不新增套件。

**Spec:** `docs/superpowers/specs/2026-10-03-editorial-subpages-phase-one-design.md`（已確認）

**Status:** 計畫待審閱；所有實作步驟尚未開始。建議由目前助理在本任務依序實作，完成後另作獨立檢視。

## Global Constraints

- 僅做本機預覽；不推送、不部署、不變更正式站。
- 暖白 `#f7f6f0`、森林綠 `#233f35`、次要文字 `#5f6c61`、分隔線 `#d5dacd`、淺鼠尾草綠 `#e9ece2`。
- 標題沿用 Songti TC／Noto Serif TC／PMingLiU；內文沿用 PingFang TC／Noto Sans TC／Microsoft JhengHei。不新增字型請求。
- 容器最大 1280px；桌面／平板／手機左右留白 56／40／20px。H1 桌面 48–64px、手機 32–38px；正文 16–18px，行高約 1.8，閱讀欄最大 760px。
- 不修改醫療文字、標題、資料檔、原圖片、圖說、參考來源、canonical、sitemap 或結構化資料。不啟用已註解的審閱宣稱。
- 首頁畫面、八位獸醫師、小寵物與原圖片不變；管理登入、預約管理、急救遊戲維持舊外框。班表資料與月份不變。
- 新版 CSS 使用明確作用域；不新增全域 `h1`、`a`、`.container`、`.site-footer` 覆寫。不加套件、輪播、視差或捲動綁定動畫。
- 文字對比至少 4.5:1，操作目標至少 44×44px；固定導覽高度不超過 96px；支援鍵盤、手機安全區與 reduced motion。
- 保留 README 的使用者修改及未追蹤的 `public/imgs/guides/mmvd-chordal-rupture.webp`；提交只包含本任務檔案。

## Review Focus

1. 共享入口誤傷非本批頁面：16 條 `/guides/*` 的內文應仍是原版。由 Task 3 的路由矩陣渲染測試與抽查證明。
2. 從首頁進入分頁再返回：不能出現雙導覽、首頁字體被覆蓋或小寵物失效。由 Task 1 的 App 渲染測試與 Task 3 的實際往返測試證明。
3. 長標題、200% 文字縮放及短手機螢幕：標題完整、選單可捲動，焦點不被導覽／底部工具列遮住。由 Task 1、2、3 的瀏覽器檢查證明。
4. 手機選單內捲動、按 Escape 與換頁：不能誤關閉、遺失焦點或殘留展開狀態。由 Task 1 的瀏覽器互動檢查證明。
5. 無資料、空選填欄位或圖片讀取失敗：應有返回入口，不呈現空卡片或虛構內容。由 Task 3 的空資料渲染測試與圖片降級檢查證明。

## File Structure and Interfaces

| 檔案 | 責任 |
| --- | --- |
| `src/editorialRoutes.js`（新增） | 集中定義新版內容路由與公開外框例外 |
| `src/styles/editorial-brand.css`（新增） | `.editorial-brand` 內的品牌 CSS 變數，不重設全站樣式 |
| `src/App.vue` | 按路由傳遞外框變體；首頁既有顯示條件保留 |
| `src/components/Navbar.vue` | 新舊導覽變體與手機開關／焦點行為 |
| `src/components/editorial/navbar.css`（新增） | 導覽新版限定樣式，透過 scoped style 載入 |
| `src/components/Footer.vue` | 新舊頁尾變體，保留既有聯絡與 LINE 行為 |
| `src/components/editorial/footer.css`（新增） | 頁尾新版限定樣式，透過 scoped style 載入 |
| `src/components/SeoContentPage.vue` | 五條指定路由進新版；其餘保留原版；無資料提供返回入口 |
| `src/components/editorial/EditorialContentPage.vue`（新增） | 單一資料驅動的服務／疾病指南閱讀版型 |
| `src/components/editorial/content-page.css`（新增） | 五頁專用的 scoped 響應式樣式 |
| `src/editorialSubpages.test.js`（新增） | 真實 Vue 渲染、路由邊界及內容保留測試 |
| `scripts/seo-phases-1-3.test.js` | 補充五頁初始 HTML 的內容與 SEO 保留測試 |
| `docs/design-qa/2026-10-03-editorial-subpages-phase-one.md`（新增） | 實作後的實際驗收結果，不預填通過 |

共用契約：

- `editorialContentPaths: readonly string[]`：只含規格中的三個 `/services/*` 與兩個 `/topics/*` 完整路徑，不使用 `/guides/` 萬用規則。
- `usesEditorialChrome(path: string): boolean`：首頁、`/adminLogin`、`/adminAppointments`、`/pet-cpr-game` 回傳 false；其餘公開分頁回傳 true。
- `isEditorialContentPath(path: string): boolean`：僅上述五條路徑回傳 true。
- `Navbar` 新增 `variant: 'legacy' | 'editorial'` prop，預設 `legacy`。
- `Footer` 同上，原 `hideMobileCta: boolean = false` 保持相容。
- `EditorialContentPage` 接收 `page: object`（必要），直接使用 `getSeoContentPage()` 回傳的資料形狀；不做資料取得、不新增第二份內容。
- 測試檔內 `renderComponentAt(modulePath, routePath, props = {}): Promise<string>`：用 Vite SSR、memory router、head 渲染真實元件；於 before／after 建立及關閉 server。
- 測試檔內 `renderAppAt(routePath): Promise<string>`：使用真實 App、Navbar、Footer；首頁使用真實 Home，五頁使用真實 SeoContentPage，其他路由用簡單主內容佔位以隔離登入／網路副作用。
- 測試可使用渲染出的 DOM／HTML，不以搜尋原始碼字串代替行為驗證；手機互動與計算樣式透過瀏覽器實測。

---

### Task 1: 新版公開分頁導覽與路由邊界

**Files:** 新增路由政策、品牌變數、Navbar 專用 CSS、渲染測試；修改 `src/App.vue`、`src/components/Navbar.vue`。

**Interfaces:** 提供上述兩個路由函式、路徑清單、Navbar variant 與測試渲染工具，供 Task 2／3 沿用。App 在此任務只改 Navbar 的變體傳遞，Footer 留至 Task 2。

- [ ] **1. 建立隔離實作環境並記錄基準。** 執行 using-git-worktrees 流程；不複製或修改無關的未提交檔案。確認已有依賴可用，先執行 `npm run verify`，記錄實際結果與本機預覽入口。
- [ ] **2. 寫路由政策與導覽渲染測試。** 包含以下獨立預期，並在每個例外路由確認舊導覽仍存在：

```js
assert.equal(usesEditorialChrome('/articles'), true)
assert.equal(usesEditorialChrome('/adminLogin'), false)
assert.equal(usesEditorialChrome('/adminAppointments'), false)
assert.equal(usesEditorialChrome('/pet-cpr-game'), false)
assert.equal(usesEditorialChrome('/'), false)
assert.equal(isEditorialContentPath('/guides/dog-cough'), false)
assert.equal(isEditorialContentPath('/topics/mmvd'), true)
const html = await renderComponentAt('/src/components/Navbar.vue', '/articles', { variant: 'editorial' })
assert.match(html, /獸醫師團隊/)
assert.match(html, /href="\/doctor-schedule"/)
assert.match(html, /aria-expanded="false"/)
```

  同一測試檔確認產品、電話以外的現有主要導覽目的地未遺失；`aria-controls` 對應展開區域的穩定 ID；實際首頁只渲染一次導覽、一次頁尾與八位獸醫師。
- [ ] **3. 執行 `node --test src/editorialSubpages.test.js`。** 確認因尚未提供的新版路由／導覽契約而失敗；排除工具或匯入路徑設定錯誤。
- [ ] **4. 實作路由政策與 `.editorial-brand`。** 路由集合採明確清單；CSS 變數以 `--ed-` 前綴提供 paper、forest、muted、line、sage、serif、sans，不在此檔案設定通用元素或重設 body。
- [ ] **5. 實作 Navbar 新版變體。** 以暖白、首頁同款文字品牌、細底線、原目的地與門診入口呈現；legacy 模板與樣式效果保留。固定導覽在 96px 內，空間不足時切到手機選單，選單最大高度扣除導覽高度並允許自身捲動。
- [ ] **6. 實作新版手機選單行為。** 展開／收起名稱、ARIA 狀態一致；Escape 關閉並復原開關焦點，換頁關閉；移除新版由一般捲動觸發的誤關閉，不改 legacy 分支。展開區域使用 v-show 維持 controls 目標，收起內容不可取得焦點。
- [ ] **7. 在 App 傳入 Navbar variant。** 首頁仍不顯示 App 的外層 Navbar；導入品牌變數，不讓字型繼承至其他尚未改版的主內容。
- [ ] **8. 執行渲染測試及 `npm test`。** 全部通過；不得刪除首頁／舊外框保留測試以換取通過。
- [ ] **9. 瀏覽器驗證手機導覽。** 在 375px 寬及短高度視窗開選單、捲動、Tab、Escape、換頁；確認無誤關閉、無隱藏焦點、無水平溢出。200% 文字縮放後入口仍可使用。
- [ ] **10. 檢視差異並只提交本任務檔案。** 使用訊息 `feat: extend editorial navigation to public subpages`；不 push。

### Task 2: 同款聯絡頁尾與手機操作列

**Files:** 修改 `src/components/Footer.vue`、`src/App.vue`、`src/editorialSubpages.test.js`；新增 `src/components/editorial/footer.css`。

**Interfaces:** 消費 Task 1 路由政策、CSS 變數與渲染工具；提供向下相容的 Footer variant。沿用 `siteContact.js`、`createLineAddFriendClickHandler()` 及 `hideMobileCta`。

- [ ] **1. 寫新版 Footer 渲染測試。** 真實渲染 editorial／legacy，以及 hideMobileCta true／false；驗證以下聯絡資料與三個行動入口，並確認緊急提醒、營業時間、QR Code、快速連結存在：

```js
const html = await renderComponentAt('/src/components/Footer.vue', '/articles', { variant: 'editorial' })
assert.ok(html.includes('台北市中正區東門里仁愛路一段47號1樓'))
assert.ok(html.includes('href="tel:0223633016"'))
assert.ok(html.includes('@921gquih'))
const hidden = await renderComponentAt('/src/components/Footer.vue', '/ai-search-veterinary-cardiology', {
  variant: 'editorial', hideMobileCta: true
})
assert.doesNotMatch(hidden, /aria-label="行動聯絡工具"/)
```

  新版工具列具 `aria-label="行動聯絡工具"`，對其內容確認只有電話／LINE／導航三個目的地；legacy 不被新版樣式接管。補充 App 矩陣，確認管理、遊戲及原隱藏條件均保留。
- [ ] **2. 執行 `node --test src/editorialSubpages.test.js`。** 確認缺少新版頁尾／工具列契約而失敗，不接受僅因測試用 selector 拼寫錯誤造成的失敗。
- [ ] **3. 實作 Footer variant。** 淺鼠尾草綠聯絡區、暖白收尾、細線分組；保留所有目前公開資訊、連結與 LINE 點擊處理，不更動營業時間或地址。新版特殊樣式只落在 variant 類別。
- [ ] **4. 實作新版手機工具列。** 只保留三入口，森林綠單色，每格至少 44px 高；預留 `env(safe-area-inset-bottom)` 與頁尾底部間距，鍵盤聚焦的聯絡／來源連結可滾入未遮擋區域。
- [ ] **5. App 使用同一政策傳入 Footer variant。** 首頁仍不渲染此外層 Footer，原 hideMobileCta 條件原樣保留。
- [ ] **6. 執行 `npm test`，再做瀏覽器檢查。** 在 375／768／1024／1440px 檢查排版；手機 Tab 至頁尾與主內容末端確認可見，電話／LINE／地圖只檢查目的地，不實際傳訊或撥號。
- [ ] **7. 檢視並提交本任務檔案。** 使用訊息 `feat: align public subpage footer with editorial branding`；不 push。

### Task 3: 五頁內容版型、範圍隔離與完整驗收

**Files:** 修改 `src/components/SeoContentPage.vue`、`src/editorialSubpages.test.js`、`scripts/seo-phases-1-3.test.js`；新增 EditorialContentPage、其 scoped CSS 與實際 QA 記錄。

**Interfaces:** 消費 Task 1 路由清單、CSS 變數與渲染工具；EditorialContentPage 接收既有 `page`。主要章節 ID 為 `section-1`、`section-2`、`section-3`，其餘為 `page-faq`、`page-references`；與來源標題無關，不因重複標題衝突。

- [ ] **1. 寫五頁真實渲染及範圍隔離測試。** 對五條路由逐一確認單一 H1、原標題、三段章節、三題 FAQ、所有原段落／來源／圖說與圖片路徑，資料只作為呈現內容的獨立輸入，不複製 renderer 演算法。每個目錄 href 均有唯一對應 ID。

```js
const html = await renderComponentAt('/src/components/SeoContentPage.vue', '/topics/mmvd')
assert.ok(html.includes('狗狗 MMVD 二尖瓣黏液樣變性完整指南'))
assert.match(html, /aria-label="本頁目錄"/)
assert.match(html, /href="#section-1"/)
assert.match(html, /id="section-1"/)
assert.equal((html.match(/<details\b/g) || []).length, 3)
```

  對 16 條 `/guides/*` 逐一確認無新增目錄、原內文與 FAQ 仍在；不存在的資料路徑應出現「找不到頁面」及返回首頁。額外以 page fixture 缺少圖說、空的延伸閱讀／來源陣列驗證無空標題或空卡片；失效圖片路徑的 fixture 仍須渲染替代文字、width／height 與完整正文，不提供虛構替代圖片。
- [ ] **2. 執行 `node --test src/editorialSubpages.test.js`。** 確認新版目錄與空資料呈現尚未實作的失敗，先記錄再開始改產品程式。
- [ ] **3. 建立 EditorialContentPage 的標題／摘要／圖片與重點區。** 服務頁雙欄，topic 給長標題較寬文字欄；圖片與圖說保留、首圖預留正確比例並優先載入。按鈕維持原電話與 `/doctor/hung-rong-wei` 目的地，本批不藉設計改寫醫療內容或連結策略。
- [ ] **4. 建立正文、章節目錄、FAQ、來源與延伸閱讀。** 桌面目錄在正文側邊；手機目錄在正文前、延伸閱讀在正文後。優先同一份 DOM 透過 grid 排列，避免重複 ID。原生 details 保留全部答案；清除空的 Medical Review 顯示但不啟用隱藏審閱宣稱。
- [ ] **5. 加入 scoped 響應式樣式。** 桌面 96px 導覽下仍留足空間，配合 router 既有錨點偏移避免雙重扣除。長標題自然換行、圖片不裁圖解標籤、手機單欄；hover／focus 清楚，reduced-motion 下無平滑捲動或非必要過渡。
- [ ] **6. SeoContentPage 依五條清單渲染新版。** 其他 page 沿用原有模板與 scoped CSS；缺少 page 時顯示返回入口。不得以無條件替換共用元件造成 16 篇指南一併改版。
- [ ] **7. 執行渲染測試與 `npm test`。** 全數通過且原首頁測試仍保留八位獸醫師、九個寵物素材、原相片及單一外框的驗證。
- [ ] **8. 補充五頁建置輸出保留測試。** 在 `scripts/seo-phases-1-3.test.js` 讀取各自 dist HTML，驗證全部原章節、FAQ 答案、參考 URL、canonical 及原結構化資料型別。此為保護原契約的測試，不要求既有正確輸出故意失敗。
- [ ] **9. 執行 `npm run verify`。** 需完整建置、所有既有與新增測試、SEO audit 均通過；將失敗修復到原因，而非降低斷言標準。
- [ ] **10. 以實際 production preview 做視覺與互動驗收。** 五頁各檢查 375／768／1024／1440px：完整標題、目錄錨點、FAQ、原圖片、無水平溢出、無主控台錯誤；200% 文字縮放與 reduced-motion 均可閱讀。保留原照片／插畫比例，確認正文不依賴圖片完成載入，不修改真實資產。
- [ ] **11. 驗證跨頁回歸。** 首頁 → 專科 → 首頁：無重複外框、樣式污染，寵物按鈕與原八位獸醫師正常；抽查 `/articles`、一篇 `/guides/*`、獸醫師頁、產品頁、班表及登入頁；遊戲僅檢查外框與進入畫面，不提交遊戲／管理操作。
- [ ] **12. 完成獨立檢視與 QA 紀錄。** 審查所有變更及受影響路由，修復阻擋項後重跑驗證；紀錄實際頁面、視窗尺寸、通過／未驗證項目與本機入口，不宣稱未測項目通過。
- [ ] **13. 檢視並提交本任務檔案，交付預覽。** 使用訊息 `feat: restyle specialty services and topic guides`；只作本機提交，不 push、不部署。提供可點開的五頁預覽連結與簡短完成摘要。

## Plan Self-Review

- 三個任務依序交付導覽、頁尾與五頁內容，各自具失敗→實作→驗證流程；共用介面名稱一致。
- 規格的圖片、醫療內容、SEO、首頁效果及例外路由均有保留條款與對應驗證。
- 五條新版路由與另外 16 篇指南明確隔離；未要求全站預渲染重構或新依賴。
- 本文沒有實作結果；核准本計畫及執行方式後才開始實作。
