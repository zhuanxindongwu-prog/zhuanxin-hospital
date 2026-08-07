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
    loading: 'eager',
    fetchpriority: 'high',
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
    loading: 'lazy',
    fetchpriority: 'auto',
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
  padding: 7rem 0 2.25rem;
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
  padding: 0.5rem 1rem;
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
