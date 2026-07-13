# Products Equal Comparison Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the oversized editorial `/products` layout with a compact, equal-weight comparison of PetVoice and 賴瓦特 LikeWater that remains accessible, crawlable, and responsive.

**Architecture:** `Products.vue` owns page structure and static product data. A new `ProductComparisonCard.vue` owns the repeated product presentation so both products always share the same image slot, fact rows, CTA, and responsive behavior. A focused Node source check protects the agreed information hierarchy and routes without adding a new test framework.

**Tech Stack:** Vue 3 SFCs, Vue Router, scoped CSS, Bootstrap Icons, Node.js source checks, Vite.

## Global Constraints

- Keep the existing navbar, footer, `/products`, `/petvoice`, and `/ohtrust` routes unchanged.
- PetVoice and 賴瓦特 LikeWater must have equal column width, image slot height, fact structure, and CTA treatment.
- Use exactly one H1: `精選照護產品`.
- Keep the shared visible reminder: `產品協助觀察與管理，不取代獸醫師診斷。`
- Use `#69964A` and `#006B70` through the existing variables in `src/theme.css`.
- Use white and cool neutral surfaces, corner radii no greater than 8px, and no nested cards.
- Preserve the approved image paths and product claims; do not add pricing, checkout, reservation, ordering, or new medical claims.
- Product images must have explicit dimensions, fixed visual slots, `loading="eager"`, and `decoding="async"`.
- At widths below 768px, stack both product cards with full-width CTAs and no horizontal overflow.

---

### Task 1: Build The Shared Product Comparison Card

**Files:**
- Create: `scripts/check-products-redesign.mjs`
- Create: `src/components/products/ProductComparisonCard.vue`

**Interfaces:**
- Consumes: a `product` object with `label`, `title`, `theme`, `image`, `alt`, `width`, `height`, `description`, `facts`, and `link`.
- Produces: `<ProductComparisonCard :product="product" />`, rendering one semantic article with one H2, image, description, facts, and RouterLink CTA.

- [ ] **Step 1: Write the failing component structure check**

Create `scripts/check-products-redesign.mjs`:

```js
import { existsSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const root = resolve(__dirname, '..')
const cardPath = resolve(root, 'src/components/products/ProductComparisonCard.vue')

if (!existsSync(cardPath)) {
  console.error('Products redesign check failed. Missing ProductComparisonCard.vue')
  process.exit(1)
}

const cardSource = readFileSync(cardPath, 'utf8')
const requiredCardSnippets = [
  'product-comparison-card',
  '<article',
  '<h2>{{ product.title }}</h2>',
  '<dl class="product-facts">',
  '<RouterLink',
  '查看產品詳情',
  'loading="eager"',
  'decoding="async"',
  ':width="product.width"',
  ':height="product.height"',
  '@media (max-width: 767.98px)'
]

const missingCardSnippets = requiredCardSnippets.filter(
  (snippet) => !cardSource.includes(snippet)
)

if (missingCardSnippets.length > 0) {
  console.error(
    `Products redesign check failed. Product card missing: ${missingCardSnippets.join(', ')}`
  )
  process.exit(1)
}

console.log('Products comparison card check passed.')
```

- [ ] **Step 2: Run the check and confirm the intended failure**

Run:

```bash
node scripts/check-products-redesign.mjs
```

Expected: exit code `1` and `Missing ProductComparisonCard.vue`.

- [ ] **Step 3: Create the shared product card**

Create `src/components/products/ProductComparisonCard.vue`:

```vue
<template>
  <article
    class="product-comparison-card"
    :class="`product-comparison-card--${product.theme}`"
  >
    <header class="product-heading">
      <p class="product-label">{{ product.label }}</p>
      <h2>{{ product.title }}</h2>
    </header>

    <div class="product-image-stage">
      <img
        :src="product.image"
        :alt="product.alt"
        :width="product.width"
        :height="product.height"
        loading="eager"
        decoding="async"
      />
    </div>

    <p class="product-description">{{ product.description }}</p>

    <dl class="product-facts">
      <div v-for="fact in product.facts" :key="fact.label">
        <dt>{{ fact.label }}</dt>
        <dd>{{ fact.value }}</dd>
      </div>
    </dl>

    <RouterLink
      :to="product.link"
      class="product-detail-link"
      :aria-label="`查看 ${product.title} 產品詳情`"
    >
      查看產品詳情
      <i class="bi bi-arrow-right" aria-hidden="true"></i>
    </RouterLink>
  </article>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.product-comparison-card {
  display: flex;
  min-width: 0;
  height: 100%;
  flex-direction: column;
  padding: clamp(1.5rem, 3vw, 2.5rem);
  background: #fff;
}

.product-heading {
  min-height: 96px;
}

.product-label {
  margin: 0 0 0.55rem;
  color: var(--brand-secondary);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0;
}

.product-heading h2 {
  margin: 0;
  color: var(--brand-ink);
  font-size: clamp(2rem, 3.3vw, 3.25rem);
  font-weight: 900;
  line-height: 1.08;
  letter-spacing: 0;
  overflow-wrap: anywhere;
}

.product-image-stage {
  display: grid;
  width: 100%;
  aspect-ratio: 4 / 3;
  margin: 1.25rem 0 1.4rem;
  overflow: hidden;
  place-items: center;
  border-radius: 6px;
  background: #eef4f4;
}

.product-comparison-card--likewater .product-image-stage {
  background: #f4f7f1;
}

.product-image-stage img {
  display: block;
  width: min(84%, 520px);
  height: 84%;
  object-fit: contain;
  transition: transform 180ms ease;
}

.product-comparison-card--likewater .product-image-stage img {
  width: min(88%, 560px);
  height: 88%;
}

.product-description {
  margin: 0;
  color: var(--brand-muted);
  font-size: 1rem;
  line-height: 1.8;
}

.product-facts {
  margin: 1.4rem 0 1.6rem;
}

.product-facts > div {
  display: grid;
  grid-template-columns: 96px minmax(0, 1fr);
  gap: 1rem;
  padding: 0.8rem 0;
  border-top: 1px solid var(--brand-line);
}

.product-facts > div:last-child {
  border-bottom: 1px solid var(--brand-line);
}

.product-facts dt {
  color: var(--brand-secondary);
  font-size: 0.82rem;
  font-weight: 800;
}

.product-facts dd {
  margin: 0;
  color: var(--brand-ink);
  font-weight: 700;
  overflow-wrap: anywhere;
}

.product-detail-link {
  display: inline-flex;
  width: 100%;
  min-height: 48px;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  margin-top: auto;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  background: var(--brand-secondary);
  color: #fff;
  font-weight: 800;
  text-decoration: none;
  transition: background-color 180ms ease, transform 180ms ease;
}

.product-detail-link:hover {
  background: var(--brand-secondary-dark);
  transform: translateY(-2px);
}

.product-detail-link:focus-visible {
  outline: 3px solid rgba(105, 150, 74, 0.42);
  outline-offset: 3px;
}

@media (max-width: 767.98px) {
  .product-comparison-card {
    padding: 1.35rem 0;
  }

  .product-heading {
    min-height: 0;
  }

  .product-heading h2 {
    font-size: clamp(2rem, 10vw, 2.65rem);
  }

  .product-image-stage {
    aspect-ratio: 4 / 3;
    margin-block: 1rem 1.2rem;
  }

  .product-facts > div {
    grid-template-columns: 1fr;
    gap: 0.25rem;
  }

  .product-detail-link {
    min-height: 48px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .product-image-stage img,
  .product-detail-link {
    transition: none;
  }
}
</style>
```

- [ ] **Step 4: Run the focused component check**

Run:

```bash
node scripts/check-products-redesign.mjs
```

Expected: `Products comparison card check passed.`

- [ ] **Step 5: Commit the component and its check**

```bash
git add scripts/check-products-redesign.mjs src/components/products/ProductComparisonCard.vue
git commit -m "feat: add shared product comparison card"
```

---

### Task 2: Replace Products.vue With The Equal Comparison Layout

**Files:**
- Modify: `scripts/check-products-redesign.mjs`
- Modify: `src/components/Products.vue`

**Interfaces:**
- Consumes: `ProductComparisonCard` from Task 1 and the existing global tokens in `src/theme.css`.
- Produces: `/products` with one H1, a two-item `products` array, equal desktop columns, stacked mobile cards, one shared medical reminder, a compact care framework, and unchanged product routes.

- [ ] **Step 1: Extend the source check for the page contract**

Add the following after the card checks and replace the final success message in `scripts/check-products-redesign.mjs`:

```js
const productsPath = resolve(root, 'src/components/Products.vue')
const productsSource = readFileSync(productsPath, 'utf8')

const requiredPageSnippets = [
  "import ProductComparisonCard from './products/ProductComparisonCard.vue'",
  '<h1 id="products-title">精選照護產品</h1>',
  'products-comparison-grid',
  '<ProductComparisonCard',
  'products-care-boundary',
  '產品協助觀察與管理，不取代獸醫師診斷。',
  "link: '/petvoice'",
  "link: '/ohtrust'",
  'width: 1000',
  'height: 804',
  'width: 1280',
  'height: 905',
  '@media (max-width: 767.98px)'
]

const forbiddenPageSnippets = [
  '把專業照護，延伸到每天的生活。',
  'hero-index',
  'product-stack',
  'product-shell'
]

const missingPageSnippets = requiredPageSnippets.filter(
  (snippet) => !productsSource.includes(snippet)
)
const remainingOldSnippets = forbiddenPageSnippets.filter((snippet) =>
  productsSource.includes(snippet)
)
const h1Count = (productsSource.match(/<h1(?:\s|>)/g) || []).length

if (missingPageSnippets.length > 0 || remainingOldSnippets.length > 0 || h1Count !== 1) {
  console.error(
    [
      `Products page missing: ${missingPageSnippets.join(', ') || 'none'}`,
      `Products page still contains old layout: ${remainingOldSnippets.join(', ') || 'none'}`,
      `Products page H1 count: ${h1Count}`
    ].join('\n')
  )
  process.exit(1)
}

console.log('Products equal comparison redesign check passed.')
```

- [ ] **Step 2: Run the extended check and confirm it fails against the old page**

Run:

```bash
node scripts/check-products-redesign.mjs
```

Expected: exit code `1`, reporting missing `ProductComparisonCard`, comparison grid, and reminder classes, plus old layout snippets.

- [ ] **Step 3: Replace the Products.vue template and data**

Replace `src/components/Products.vue` with this page structure and product data:

```vue
<template>
  <main class="products-page">
    <section class="products-intro" aria-labelledby="products-title">
      <div class="container products-intro-inner">
        <div>
          <p class="section-kicker">Selected care products</p>
          <h1 id="products-title">精選照護產品</h1>
        </div>
        <p class="products-intro-copy">
          專心動物醫院選擇能回應真實照護需求的產品，從居家健康趨勢到環境清潔，
          讓診間之外的每一天，也有清楚、可信的照護依據。
        </p>
      </div>
    </section>

    <section class="products-comparison" aria-label="照護產品比較">
      <div class="container">
        <div class="products-comparison-grid">
          <ProductComparisonCard
            v-for="product in products"
            :key="product.title"
            :product="product"
          />
        </div>

        <aside class="products-care-boundary" aria-label="產品使用提醒">
          <i class="bi bi-shield-check" aria-hidden="true"></i>
          <p>產品協助觀察與管理，不取代獸醫師診斷。</p>
        </aside>
      </div>
    </section>

    <section class="care-framework" aria-labelledby="care-framework-title">
      <div class="container">
        <div class="framework-heading">
          <p class="section-kicker">Care framework</p>
          <h2 id="care-framework-title">照護前，先確認</h2>
        </div>

        <ol class="framework-list">
          <li v-for="item in framework" :key="item.no">
            <span>{{ item.no }}</span>
            <div>
              <h3>{{ item.title }}</h3>
              <p>{{ item.text }}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <section class="care-reminder-section" aria-labelledby="care-reminder-title">
      <div class="container">
        <div class="care-reminder">
          <div>
            <p class="section-kicker">Care reminder</p>
            <h2 id="care-reminder-title">異常症狀，請優先安排醫療評估</h2>
            <p>若毛孩出現咳嗽、喘氣、昏倒、活動力下降或食慾異常，請直接與獸醫師聯繫。</p>
          </div>
          <a href="tel:0223633016" aria-label="致電專心動物醫院 02-2363-3016">
            <i class="bi bi-telephone" aria-hidden="true"></i>
            02-2363-3016
          </a>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import ProductComparisonCard from './products/ProductComparisonCard.vue'

const products = [
  {
    label: '犬貓居家生理監測',
    title: 'PetVoice',
    theme: 'petvoice',
    image: '/imgs/optimized/petvoice.webp',
    alt: 'PetVoice 犬貓居家生理監測項圈與感測器',
    width: 1000,
    height: 804,
    link: '/petvoice',
    description:
      '持續整理心率、安靜時呼吸數、活動與睡眠趨勢，協助飼主與獸醫師看見回診之外的變化。',
    facts: [
      { label: '監測項目', value: '心率・安靜時呼吸數' },
      { label: '觀察趨勢', value: '活動・睡眠' }
    ]
  },
  {
    label: '日常清潔與環境管理',
    title: '賴瓦特 LikeWater',
    theme: 'likewater',
    image: '/imgs/optimized/laiwate.webp',
    alt: '賴瓦特 LikeWater 犬貓生活環境清潔插圖',
    width: 1280,
    height: 905,
    link: '/ohtrust',
    description:
      '以安全性檢測為基礎的清潔、除臭與環境管理輔助產品，適用於犬貓生活空間與日常用品。',
    facts: [
      { label: '主要用途', value: '清潔・除臭輔助' },
      { label: '適用情境', value: '犬貓生活空間與日常用品' }
    ]
  }
]

const framework = [
  {
    no: '01',
    title: '先理解需求',
    text: '先釐清毛孩的疾病階段、生活環境與真正需要改善的問題。'
  },
  {
    no: '02',
    title: '建立日常紀錄',
    text: '用容易持續的方法觀察變化，讓回診時的溝通更有依據。'
  },
  {
    no: '03',
    title: '異常時回到醫療',
    text: '症狀、數據或生活狀態出現異常時，應由獸醫師進一步評估。'
  }
]
</script>

<style scoped>
.products-page {
  overflow-x: clip;
  background: #f6f8f7;
  color: var(--brand-ink);
  text-align: left;
}

.products-page,
.products-page * {
  box-sizing: border-box;
  min-width: 0;
  letter-spacing: 0;
}

.products-page .container {
  max-width: 1240px;
}

.products-intro {
  padding: 8rem 0 2.75rem;
  background: #fff;
}

.products-intro-inner {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(320px, 1.1fr);
  gap: clamp(2rem, 7vw, 6rem);
  align-items: end;
}

.section-kicker {
  margin: 0 0 0.55rem;
  color: var(--brand-secondary);
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
}

.products-intro h1 {
  margin: 0;
  font-size: clamp(2.6rem, 5vw, 4.5rem);
  font-weight: 900;
  line-height: 1.08;
}

.products-intro-copy {
  max-width: 620px;
  margin: 0;
  color: var(--brand-muted);
  font-size: 1.05rem;
  line-height: 1.9;
}

.products-comparison {
  padding: 2.5rem 0 4.75rem;
}

.products-comparison-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  overflow: hidden;
  border: 1px solid var(--brand-line);
  border-radius: 8px;
  background: #fff;
}

.products-comparison-grid :deep(.product-comparison-card + .product-comparison-card) {
  border-left: 1px solid var(--brand-line);
}

.products-care-boundary {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 1rem;
  border: 1px solid var(--brand-line);
  border-top: 0;
  border-radius: 0 0 8px 8px;
  background: var(--brand-secondary-soft);
  color: var(--brand-secondary-dark);
}

.products-care-boundary i {
  font-size: 1.2rem;
}

.products-care-boundary p {
  margin: 0;
  font-weight: 700;
}

.care-framework {
  padding: 4.5rem 0;
  background: #fff;
}

.framework-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 2rem;
}

.framework-heading h2,
.care-reminder h2 {
  margin: 0;
  font-size: clamp(2rem, 3.6vw, 3.25rem);
  font-weight: 900;
  line-height: 1.14;
}

.framework-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin: 0;
  padding: 0;
  border-top: 1px solid var(--brand-line);
  list-style: none;
}

.framework-list li {
  display: grid;
  grid-template-columns: 36px minmax(0, 1fr);
  gap: 0.8rem;
  padding: 1.5rem clamp(1rem, 2vw, 1.75rem);
}

.framework-list li + li {
  border-left: 1px solid var(--brand-line);
}

.framework-list span {
  color: var(--brand-secondary);
  font-size: 0.82rem;
  font-weight: 800;
}

.framework-list h3 {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 900;
}

.framework-list p {
  margin: 0.45rem 0 0;
  color: var(--brand-muted);
  line-height: 1.75;
}

.care-reminder-section {
  padding: 4rem 0 5rem;
}

.care-reminder {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding: clamp(1.75rem, 4vw, 3rem);
  border-radius: 8px;
  background: #164543;
  color: #fff;
}

.care-reminder .section-kicker {
  color: #b9d8c6;
}

.care-reminder h2 {
  color: #fff;
}

.care-reminder p:not(.section-kicker) {
  max-width: 720px;
  margin: 0.8rem 0 0;
  color: #d9e7e4;
  line-height: 1.75;
}

.care-reminder a {
  display: inline-flex;
  min-height: 48px;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  background: #fff;
  color: var(--brand-ink);
  font-weight: 800;
  text-decoration: none;
}

@media (max-width: 991.98px) {
  .products-page .container {
    max-width: calc(100% - 32px);
  }

  .products-intro-inner {
    grid-template-columns: minmax(0, 0.8fr) minmax(300px, 1.2fr);
    gap: 2rem;
  }

  .care-reminder {
    align-items: flex-start;
    flex-direction: column;
  }
}

@media (max-width: 767.98px) {
  .products-page .container {
    width: auto;
    max-width: none;
    margin-inline: 16px;
    padding-inline: 0;
  }

  .products-intro {
    padding: 6.75rem 0 2rem;
  }

  .products-intro-inner,
  .products-comparison-grid,
  .framework-list {
    grid-template-columns: 1fr;
  }

  .products-intro-inner {
    gap: 1rem;
  }

  .products-intro h1 {
    font-size: clamp(2.45rem, 12vw, 3.25rem);
  }

  .products-intro-copy {
    font-size: 1rem;
  }

  .products-comparison {
    padding: 1.5rem 0 3.5rem;
  }

  .products-comparison-grid {
    padding-inline: 1.25rem;
  }

  .products-comparison-grid :deep(.product-comparison-card + .product-comparison-card) {
    border-top: 1px solid var(--brand-line);
    border-left: 0;
  }

  .products-care-boundary {
    align-items: flex-start;
    justify-content: flex-start;
  }

  .care-framework {
    padding: 3.5rem 0;
  }

  .framework-heading {
    display: block;
  }

  .framework-list li {
    padding-inline: 0;
  }

  .framework-list li + li {
    border-top: 1px solid var(--brand-line);
    border-left: 0;
  }

  .care-reminder-section {
    padding: 3rem 0 4rem;
  }

  .care-reminder {
    padding: 1.5rem;
  }

  .care-reminder a {
    width: 100%;
  }
}
</style>
```

- [ ] **Step 4: Run the focused redesign check**

Run:

```bash
node scripts/check-products-redesign.mjs
```

Expected: `Products equal comparison redesign check passed.`

- [ ] **Step 5: Run the production build**

Run:

```bash
npm run build
```

Expected: Vite build, static SEO generation, and asset pruning complete with exit code `0`.

- [ ] **Step 6: Verify the desktop implementation in the in-app browser**

Start or reuse the Vite server:

```bash
npm run dev -- --host 0.0.0.0
```

Open `http://localhost:5173/products` in the in-app browser at 1440px width. Confirm:

- the navbar does not cover the H1;
- both columns have equal width and equal image height;
- both CTAs align on the same baseline;
- the product names, images, facts, and CTAs are visible without overlap;
- the shared reminder spans both products;
- the console contains no new errors.

- [ ] **Step 7: Verify the mobile implementation in the in-app browser**

Set the in-app browser viewport to 390px width. Confirm:

- PetVoice and LikeWater stack in the same component structure;
- both CTAs are full width and at least 44px high;
- neither product name is clipped;
- the page has no horizontal overflow;
- the care framework and medical reminder remain readable.

Reset the viewport override after verification.

- [ ] **Step 8: Re-run checks after any visual corrections**

```bash
node scripts/check-products-redesign.mjs
npm run build
git diff --check -- src/components/Products.vue src/components/products/ProductComparisonCard.vue scripts/check-products-redesign.mjs
```

Expected: the focused check passes, the build exits `0`, and `git diff --check` prints no output.

- [ ] **Step 9: Commit the completed Products page redesign**

```bash
git add src/components/Products.vue scripts/check-products-redesign.mjs
git commit -m "feat: redesign products comparison page"
```
