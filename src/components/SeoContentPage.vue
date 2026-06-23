<template>
  <main v-if="page" class="content-page">
    <section class="content-hero">
      <div class="container hero-layout">
        <div>
          <p class="eyebrow">{{ page.eyebrow }}</p>
          <h1>{{ page.title }}</h1>
          <p class="hero-summary">{{ page.summary }}</p>
          <div class="hero-actions">
            <a href="tel:0223633016" class="primary-action">電話洽詢</a>
            <RouterLink to="/doctor/hung-rong-wei" class="secondary-action">查看專業團隊</RouterLink>
          </div>
        </div>
        <img
          :src="page.image"
          :alt="page.title"
          width="1200"
          height="900"
          fetchpriority="high"
          decoding="async"
        />
      </div>
    </section>

    <section class="quick-facts">
      <div class="container facts-grid">
        <div v-for="highlight in page.highlights" :key="highlight">
          <span></span>
          <p>{{ highlight }}</p>
        </div>
      </div>
    </section>

    <section class="container main-layout">
      <article>
        <section v-for="section in page.sections" :key="section.title" class="content-section">
          <h2>{{ section.title }}</h2>
          <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
        </section>

        <section class="faq-section">
          <p class="eyebrow">Frequently Asked Questions</p>
          <h2>常見問題</h2>
          <details v-for="faq in page.faqs" :key="faq.question">
            <summary>{{ faq.question }}</summary>
            <p>{{ faq.answer }}</p>
          </details>
        </section>
      </article>

      <aside>
        <div class="side-panel">
          <p class="eyebrow">Related</p>
          <h2>延伸閱讀</h2>
          <RouterLink v-for="link in page.relatedLinks" :key="link.path" :to="link.path">
            <span>{{ link.label }}</span>
            {{ link.title }}
          </RouterLink>
        </div>
      </aside>
    </section>

    <section class="container trust-panel">
      <div>
        <p class="eyebrow">Medical Review</p>
        <h2>專業審閱</h2>
        <p>
          本頁由
          <RouterLink :to="page.reviewer.path">{{ page.reviewer.name }}｜{{ page.reviewer.title }}</RouterLink>
          審閱。內容提供飼主理解與就醫溝通使用，不能取代獸醫師診斷。
        </p>
        <small>最後更新：{{ page.modifiedDate }}</small>
      </div>
      <div>
        <p class="eyebrow">References</p>
        <h2>參考來源</h2>
        <a v-for="source in page.sources" :key="source.url" :href="source.url" target="_blank" rel="noopener noreferrer">
          <strong>{{ source.title }}</strong>
          <span>{{ source.publisher }} · {{ source.date }}</span>
        </a>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { getSeoContentPage } from '../data/seoContentPages'

const route = useRoute()
const page = computed(() => getSeoContentPage(route.path))
</script>

<style scoped>
.content-page {
  color: #112a27;
  background: #f7faf9;
}

.container {
  width: min(1180px, calc(100% - 32px));
}

.content-hero {
  padding: 9rem 0 5rem;
  background: linear-gradient(135deg, #e8f4f0 0%, #f8fbfa 58%, #eef4f3 100%);
}

.hero-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(320px, 0.85fr);
  gap: 4rem;
  align-items: center;
}

.hero-layout img {
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 8px;
  object-fit: cover;
}

.eyebrow {
  margin-bottom: 0.75rem;
  color: #006b70;
  font-size: 0.75rem;
  font-weight: 850;
  text-transform: uppercase;
}

.content-hero h1 {
  max-width: 820px;
  margin-bottom: 1.5rem;
  font-size: clamp(2.6rem, 6vw, 5.4rem);
  font-weight: 900;
  line-height: 1.05;
}

.hero-summary,
.content-section p,
.faq-section p,
.trust-panel p {
  color: #526a66;
  font-size: 1.05rem;
  line-height: 1.9;
}

.hero-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 2rem;
}

.hero-actions a {
  padding: 0.85rem 1.2rem;
  border: 1px solid #006b70;
  text-decoration: none;
  font-weight: 750;
}

.primary-action {
  background: #006b70;
  color: #fff;
}

.secondary-action {
  color: #006b70;
}

.quick-facts {
  padding: 1.75rem 0;
  background: #102a27;
  color: white;
}

.facts-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.facts-grid div {
  display: flex;
  gap: 0.65rem;
  align-items: flex-start;
}

.facts-grid span {
  width: 7px;
  height: 7px;
  margin-top: 0.5rem;
  border-radius: 50%;
  background: #a7cbc8;
  flex: none;
}

.facts-grid p {
  margin: 0;
}

.main-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 300px;
  gap: 5rem;
  padding: 5rem 0;
}

.content-section {
  padding: 0 0 3rem;
  border-bottom: 1px solid #dce8e5;
  margin-bottom: 3rem;
}

.content-section h2,
.faq-section h2,
.side-panel h2,
.trust-panel h2 {
  margin-bottom: 1.25rem;
  font-size: clamp(1.7rem, 3vw, 2.5rem);
  font-weight: 850;
}

.side-panel {
  position: sticky;
  top: 7rem;
  padding: 1.5rem;
  border: 1px solid #dce8e5;
  background: #fff;
}

.side-panel a {
  display: grid;
  gap: 0.25rem;
  padding: 1rem 0;
  border-top: 1px solid #dce8e5;
  color: #183c37;
  text-decoration: none;
  font-weight: 750;
}

.side-panel span {
  color: #006b70;
  font-size: 0.72rem;
  text-transform: uppercase;
}

.faq-section details {
  border-top: 1px solid #dce8e5;
  padding: 1.1rem 0;
}

.faq-section summary {
  cursor: pointer;
  font-weight: 800;
}

.faq-section details p {
  margin: 1rem 0 0;
}

.trust-panel {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  padding: 2.5rem;
  margin-bottom: 5rem;
  border: 1px solid #cfe1dd;
  background: #edf6f3;
}

.trust-panel a {
  display: grid;
  gap: 0.25rem;
  margin-bottom: 1rem;
  color: #004f53;
  text-decoration: none;
}

.trust-panel span,
.trust-panel small {
  color: #607973;
  font-size: 0.8rem;
}

@media (max-width: 900px) {
  .hero-layout,
  .main-layout,
  .trust-panel {
    grid-template-columns: 1fr;
  }

  .facts-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .side-panel {
    position: static;
  }
}

@media (max-width: 560px) {
  .content-hero {
    padding-top: 7rem;
  }

  .hero-actions,
  .facts-grid {
    grid-template-columns: 1fr;
    flex-direction: column;
  }

  .hero-actions a {
    text-align: center;
  }
}
</style>
