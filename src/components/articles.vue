<template>
  <main class="care-library">
    <section class="library-hero">
      <div class="container hero-layout simple">
        <div>
          <p class="eyebrow">CardioSpecial Care Library</p>
          <h1>專心照護指南</h1>
          <p class="hero-lead">
            依照毛孩的症狀、檢查需求與疾病階段，找到由專心動物醫院整理的照護資訊。
          </p>
        </div>
      </div>
    </section>

    <section class="library-tools" aria-label="照護指南搜尋與分類">
      <div class="container">
        <label class="search-field">
          <i class="bi bi-search" aria-hidden="true"></i>
          <span class="visually-hidden">搜尋照護指南</span>
          <input v-model.trim="query" type="search" placeholder="搜尋症狀、疾病或檢查，例如：咳嗽、MMVD、心臟超音波" />
        </label>

        <nav class="category-nav" aria-label="照護指南分類">
          <button v-for="category in categories" :key="category" type="button"
            :class="{ active: selectedCategory === category }" @click="selectedCategory = category">
            {{ category }}
          </button>
        </nav>
      </div>
    </section>

    <section class="guide-section">
      <div class="container">
        <header class="section-heading">
          <div>
            <p class="eyebrow">Care Guides</p>
            <h2>{{ selectedCategory === '全部' ? '照護文章' : selectedCategory }}</h2>
          </div>
          <p>共 {{ filteredGuides.length }} 篇照護內容</p>
        </header>

        <div v-if="filteredGuides.length" class="guide-grid">
          <RouterLink v-for="guide in filteredGuides" :key="guide.title" :to="guide.link" class="guide-card">
            <div class="guide-thumb">
              <img :src="guide.image" :alt="guide.title" width="480" height="320" loading="lazy" decoding="async" />
            </div>
            <div class="guide-card-copy">
              <span>{{ guide.category }}</span>
              <h3>{{ guide.title }}</h3>
              <p>{{ guide.description }}</p>
            </div>
          </RouterLink>
        </div>

        <div v-else class="empty-state">
          <h3>找不到符合的照護內容</h3>
          <p>請嘗試其他關鍵字，或選擇不同分類。</p>
          <button type="button" @click="resetFilters">清除搜尋條件</button>
        </div>
      </div>
    </section>

    <section class="social-section">
      <div class="container">
        <header class="section-heading">
          <div>
            <p class="eyebrow">Social Care Notes</p>
            <h2>社群照護精選文章</h2>
          </div>
          <p>收錄專心動物醫院 Facebook 發布的照護提醒、臨床觀點與衛教內容。</p>
        </header>

        <div class="social-list">
          <RouterLink v-for="(item, index) in socialPosts" :key="item.slug" :to="`/articles/media/${item.slug}`">
            <span class="social-index">{{ String(index + 1).padStart(2, '0') }}</span>
            <div>
              <small>{{ item.category }}</small>
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
            </div>
            <span class="social-action" aria-hidden="true"><i class="bi bi-arrow-right"></i></span>
          </RouterLink>
        </div>
      </div>
    </section>

    <section class="media-section">
      <div class="container">
        <header class="section-heading">
          <div>
            <p class="eyebrow">Media Coverage</p>
            <h2>媒體報導與人物專題</h2>
          </div>
          <p>保留可查核的公開來源，延伸閱讀專科醫療、居家監測與真實案例。</p>
        </header>

        <div class="media-list">
          <RouterLink v-for="article in sortedMediaArticles" :key="article.slug"
            :to="`/articles/media/${article.slug}`">
            <div class="media-image">
              <img :src="article.image" :alt="article.title" width="480" height="320" loading="lazy" decoding="async" />
            </div>
            <div class="media-copy">
              <div class="meta-line">
                <span>{{ article.category }}</span>
                <time :datetime="article.date">{{ article.date }}</time>
              </div>
              <h3>{{ article.title }}</h3>
              <p>{{ article.description }}</p>
            </div>
            <i class="bi bi-arrow-up-right" aria-hidden="true"></i>
          </RouterLink>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { mediaArticles } from '../data/mediaArticles'
import { careArticles } from '../data/careArticles'
import { cardiologyGuideCards } from '../data/cardiologyGuidePages'

const query = ref('')
const selectedCategory = ref('全部')

const categories = ['全部', '常見警訊', '心臟檢查', '心律不整', '心臟疾病', '貓咪心臟疾病', '治療與照護', '居家監測', '真實案例']

const guides = [
  {
    title: '狗狗 MMVD 二尖瓣黏液樣變性完整指南',
    category: '心臟疾病',
    image: '/imgs/guides/mmvd-overview.jpg',
    link: '/topics/mmvd',
    description: '從 B1、B2、C 到 D 期，理解 MMVD 的分期、檢查、治療與居家照護。'
  },
  {
    title: '犬貓心臟病有哪些常見警訊？',
    category: '常見警訊',
    image: '/imgs/dejiang.webp',
    link: '/articles/pet-heart-disease-warning-signs',
    description: '從咳嗽、喘氣、昏倒與活動力下降，判斷什麼時候應安排心臟評估。'
  },
  {
    title: '犬貓心臟超音波：檢查什麼、何時需要安排？',
    category: '心臟檢查',
    image: '/imgs/guides/congestive-heart-failure.jpg',
    link: '/services/echocardiography',
    description: '了解心臟超音波如何評估心臟結構、血流、疾病分期與治療方向。'
  },
  {
    title: '犬貓鬱血性心衰竭 CHF',
    category: '心臟疾病',
    image: '/imgs/optimized/毛孩的心臟.webp',
    link: '/topics/congestive-heart-failure',
    description: '整理呼吸警訊、急性處置、長期用藥與居家監測的重要原則。'
  },
  {
    title: '狗狗 MMVD 內科治療與外科手術怎麼選？',
    category: '治療與照護',
    image: '/imgs/guides/mmvd-treatment.jpg',
    link: '/articles/dog-mmvd-treatment-options',
    description: '理解內科藥物與外科手術的適應症、風險，以及個別化治療選擇。'
  },
  {
    title: '狗狗 MMVD Stage C 心衰竭照護重點',
    category: '治療與照護',
    image: '/imgs/guides/mmvd-stage-c.jpg',
    link: '/articles/dog-mmvd-stage-c-care',
    description: '掌握穩定用藥、睡眠呼吸速率監測與定期追蹤的照護原則。'
  },
  {
    title: 'PetVoice 犬貓居家生理監測完整指南',
    category: '居家監測',
    image: '/imgs/optimized/petvoice宣傳.webp',
    link: '/petvoice-guide',
    description: '認識心率、安靜時呼吸數、活動與睡眠趨勢如何輔助長期照護。'
  },
  {
    title: 'Still Beating：不曾停止的心跳',
    category: '真實案例',
    image: '/imgs/optimized/converted_image.webp',
    link: '/articles/still-beating-veterinary-cardiology',
    description: '從病例故事理解心臟疾病治療過程中的風險、選擇與陪伴。'
  }
]

const socialPosts = careArticles

const careArticleGuides = careArticles.map((article) => ({
  title: article.title,
  category: article.category,
  image: article.image,
  link: `/articles/media/${article.slug}`,
  description: article.description
}))

const sortedMediaArticles = mediaArticles
  .filter((article) => article.label !== 'Facebook Care Guide')
  .sort((a, b) => b.date.localeCompare(a.date))

const filteredGuides = computed(() => {
  const keyword = query.value.toLocaleLowerCase('zh-TW')

  return [...guides, ...cardiologyGuideCards, ...careArticleGuides].filter((guide) => {
    const matchesCategory = selectedCategory.value === '全部' || guide.category === selectedCategory.value
    const searchable = `${guide.title} ${guide.category} ${guide.description}`.toLocaleLowerCase('zh-TW')
    return matchesCategory && (!keyword || searchable.includes(keyword))
  })
})

const resetFilters = () => {
  query.value = ''
  selectedCategory.value = '全部'
}
</script>

<style scoped>
.care-library {
  --ink: #173230;
  --muted: #60716f;
  --line: rgba(0, 107, 112, 0.16);
  overflow-x: clip;
  background: #fff;
  color: var(--ink);
  text-align: left;
}

.care-library,
.care-library * {
  box-sizing: border-box;
  min-width: 0;
}

.library-hero {
  padding: 5.75rem 0 3.5rem;
  border-bottom: 1px solid var(--line);
  background: #ffffff;
}

.hero-layout,
.section-heading {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(280px, 0.55fr);
  gap: 4rem;
  align-items: end;
}

.hero-layout.simple {
  display: block;
}

.hero-layout.simple>div {
  max-width: 760px;
}

.eyebrow {
  margin: 0 0 0.75rem;
  color: var(--brand-secondary);
  font-size: 0.76rem;
  font-weight: 900;
  text-transform: uppercase;
}

.library-hero h1 {
  max-width: 680px;
  margin: 0;
  font-size: clamp(2.7rem, 6vw, 4.2rem);
  font-weight: 900;
  line-height: 1.12;
}

.hero-lead {
  max-width: 620px;
  margin: 1.1rem 0 0;
  color: var(--muted);
  font-size: 1rem;
  line-height: 1.85;
}

.trust-note {
  padding: 1rem 0 0;
  border-top: 1px solid var(--line);
}

.trust-note strong {
  font-size: 1rem;
}

.trust-note p,
.section-heading>p {
  margin: 0.65rem 0 0;
  color: var(--muted);
  line-height: 1.7;
}

.library-tools {
  position: relative;
  z-index: 10;
  border-bottom: 1px solid var(--line);
  background: #ffffff;
}

.library-tools .container {
  display: grid;
  grid-template-columns: minmax(260px, 0.45fr) minmax(0, 1fr);
  gap: 1rem;
  align-items: center;
  padding-top: 0.9rem;
  padding-bottom: 0.9rem;
}

.search-field {
  display: flex;
  gap: 0.7rem;
  align-items: center;
  min-height: 46px;
  padding: 0 0.95rem;
  border: 1px solid var(--line);
  background: #fff;
  border-radius: 999px;
}

.search-field i {
  color: var(--brand-secondary);
}

.search-field input {
  width: 100%;
  border: 0;
  outline: 0;
  background: transparent;
  color: var(--ink);
  font-size: 0.88rem;
}

.category-nav {
  display: flex;
  gap: 0.35rem;
  justify-content: flex-end;
  overflow-x: auto;
  scrollbar-width: none;
}

.category-nav::-webkit-scrollbar {
  display: none;
}

.category-nav button {
  flex: 0 0 auto;
  padding: 0.55rem 0.85rem;
  border: 1px solid transparent;
  border-radius: 999px;
  background: transparent;
  color: var(--muted);
  font-size: 0.86rem;
  font-weight: 800;
}

.category-nav button:hover,
.category-nav button.active {
  border-color: rgba(0, 107, 112, 0.15);
  background: #f6faf4;
  color: var(--brand-secondary);
}

.guide-section,
.social-section,
.media-section {
  padding: 4.5rem 0;
}

.section-heading {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--line);
}

.section-heading h2 {
  margin: 0;
  font-size: clamp(1.9rem, 4vw, 3rem);
  font-weight: 900;
  line-height: 1.15;
}

.section-heading>p {
  justify-self: end;
  max-width: 520px;
}

.guide-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.2rem;
}

.guide-card,
.social-list a,
.media-list a {
  color: inherit;
  text-decoration: none;
}

.guide-card {
  display: block;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: #ffffff;
  transition:
    transform 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;
}

.guide-card:hover {
  transform: translateY(-3px);
  border-color: rgba(105, 150, 74, 0.35);
  box-shadow: 0 18px 38px rgba(0, 79, 83, 0.08);
}

.guide-thumb {
  overflow: hidden;
  aspect-ratio: 4 / 3;
  background: var(--brand-primary-soft);
}

.guide-thumb img,
.media-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.guide-card:hover img,
.media-list a:hover img {
  transform: scale(1.025);
}

.guide-card-copy {
  padding: 1.15rem;
}

.guide-card-copy span,
.social-list small,
.meta-line {
  color: var(--brand-secondary);
  font-size: 0.74rem;
  font-weight: 900;
  text-transform: uppercase;
}

.guide-card-copy h3 {
  margin: 0.55rem 0 0;
  font-size: 1.08rem;
  font-weight: 900;
  line-height: 1.45;
}

.guide-card-copy p,
.social-list p,
.media-copy p {
  margin: 0.7rem 0 0;
  color: var(--muted);
  line-height: 1.65;
}

.social-list h3,
.media-copy h3 {
  margin: 0.55rem 0 0;
  font-size: 1.22rem;
  font-weight: 900;
  line-height: 1.4;
}

.media-list>a>i {
  color: var(--brand-primary);
}

.empty-state {
  padding: 4rem 0;
  text-align: center;
}

.empty-state h3 {
  font-size: 1.5rem;
}

.empty-state p {
  color: var(--muted);
}

.empty-state button {
  margin-top: 1rem;
  padding: 0.7rem 1rem;
  border: 0;
  background: var(--brand-gradient);
  color: #fff;
  font-weight: 800;
}

.social-section {
  background: var(--brand-primary-soft);
}

.social-list,
.media-list {
  border-top: 1px solid var(--line);
}

.social-list a {
  display: grid;
  grid-template-columns: 54px minmax(0, 1fr) 44px;
  gap: 1.5rem;
  align-items: center;
  padding: 1.45rem 0;
  border-bottom: 1px solid var(--line);
}

.social-index {
  color: var(--brand-secondary);
  font-size: 0.8rem;
  font-weight: 900;
  font-variant-numeric: tabular-nums;
}

.social-action {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 999px;
  background: #fff;
  color: var(--brand-secondary);
}

.media-list a {
  display: grid;
  grid-template-columns: 190px minmax(0, 1fr) 34px;
  gap: 1.6rem;
  align-items: center;
  padding: 1.45rem 0;
  border-bottom: 1px solid var(--line);
}

.media-image {
  overflow: hidden;
  aspect-ratio: 3 / 2;
  border-radius: 16px;
  background: var(--brand-secondary-soft);
}

.meta-line {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

@media (max-width: 992px) {

  .hero-layout,
  .section-heading {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .guide-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .section-heading>p {
    justify-self: start;
  }

  .library-tools {
    position: static;
  }

  .library-tools .container {
    grid-template-columns: 1fr;
    gap: 0.8rem;
  }

  .category-nav {
    justify-content: flex-start;
  }
}

@media (max-width: 640px) {
  .library-hero {
    padding: 5rem 0 2.8rem;
  }

  .library-hero h1 {
    font-size: 2.7rem;
  }

  .guide-section,
  .social-section,
  .media-section {
    padding: 3.5rem 0;
  }

  .guide-grid {
    grid-template-columns: 1fr;
  }

  .social-list a {
    grid-template-columns: 34px minmax(0, 1fr) 36px;
    gap: 0.75rem;
  }

  .social-action {
    width: 34px;
    height: 34px;
  }

  .media-list a {
    grid-template-columns: 92px minmax(0, 1fr) 22px;
    gap: 0.8rem;
    align-items: start;
  }

  .media-copy p {
    display: none;
  }

  .media-copy h3,
  .guide-card-copy h3,
  .social-list h3 {
    font-size: 1rem;
  }
}
</style>
