<template>
  <section id="news" class="care-guide">
    <div class="container">
      <header class="guide-heading">
        <p class="section-label">Care Guide</p>
        <h2>專心照護指南</h2>
        <p>
          從症狀辨識、心臟檢查到疾病照護，依照毛孩目前的需要找到可信、可查核的專科資訊。
        </p>
      </header>

      <nav class="guide-category-links" aria-label="照護指南分類">
        <RouterLink v-for="category in categories" :key="category.label" :to="category.link">
          {{ category.label }}
        </RouterLink>
      </nav>

      <div class="guide-grid">
        <RouterLink v-for="article in guideCards" :key="article.title" :to="article.link" class="guide-card">
          <div class="guide-image">
            <img :src="article.image" :alt="article.title" width="640" height="480" loading="lazy" decoding="async" />
          </div>
          <div class="guide-card-copy">
            <span>{{ article.category }}</span>
            <h3>{{ article.title }}</h3>
            <p>{{ article.description }}</p>
            <strong>閱讀文章 <i class="bi bi-arrow-right" aria-hidden="true"></i></strong>
          </div>
        </RouterLink>
      </div>

      <footer class="guide-footer">
        <p>所有醫療內容皆標示審閱者與參考來源，協助飼主理解資訊，不取代獸醫師診斷。</p>
        <RouterLink to="/articles">
          查看全部專心衛教照護
          <i class="bi bi-arrow-right" aria-hidden="true"></i>
        </RouterLink>
      </footer>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { mediaArticles } from '../data/mediaArticles'
import { sortArticlesByDateDesc } from '../data/articleSorting'

const categories = [
  {
    index: '01',
    label: '常見警訊',
    description: '喘、咳嗽、昏倒與呼吸變化',
    link: '/articles/pet-heart-disease-warning-signs'
  },
  {
    index: '02',
    label: '心臟檢查',
    description: '心臟超音波與疾病評估',
    link: '/services/echocardiography'
  },
  {
    index: '03',
    label: '心臟疾病',
    description: 'MMVD、CHF 與疾病分期',
    link: '/topics/mmvd'
  },
  {
    index: '04',
    label: '治療與照護',
    description: '用藥、追蹤與居家監測',
    link: '/topics/congestive-heart-failure'
  }
]

const guideCards = sortArticlesByDateDesc(mediaArticles).slice(0, 3).map((article) => ({
  title: article.title,
  category: article.category,
  description: article.description,
  image: article.image,
  link: `/articles/media/${article.slug}`
}))
</script>

<style scoped>
.care-guide {
  padding: var(--section-space) 0;
  background: #fff;
}

.guide-heading {
  max-width: 720px;
  margin: 0 auto 1.75rem;
  text-align: center;
}

.section-label {
  margin-bottom: 0.65rem;
  color: var(--brand-primary);
  font-size: 0.75rem;
  font-weight: 900;
  text-transform: uppercase;
}

.guide-heading h2 {
  margin: 0;
  color: var(--brand-ink);
  font-size: clamp(2rem, 4vw, 3.3rem);
  font-weight: 900;
  line-height: 1.15;
}

.guide-heading>p {
  margin: 1rem 0 0;
  color: var(--brand-muted);
  line-height: 1.8;
}

.guide-category-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.65rem;
  margin-bottom: 2rem;
}

.guide-category-links a {
  padding: 0.55rem 0.9rem;
  border: 1px solid var(--brand-line);
  border-radius: 999px;
  color: var(--brand-secondary);
  font-size: 0.9rem;
  font-weight: 800;
  text-decoration: none;
  transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
}

.guide-category-links a:hover {
  border-color: var(--brand-primary);
  background: var(--brand-primary-soft);
  color: var(--brand-primary-dark);
}

.guide-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.2rem;
}

.guide-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--brand-line);
  border-radius: 14px;
  background: #fff;
  color: var(--brand-ink);
  text-decoration: none;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
}

.guide-card:hover {
  transform: translateY(-4px);
  border-color: rgba(105, 150, 74, 0.45);
  box-shadow: 0 18px 40px rgba(0, 79, 83, 0.1);
}

.guide-image {
  aspect-ratio: 4 / 3;
  overflow: hidden;
  background: var(--brand-secondary-soft);
}

.guide-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.guide-card:hover .guide-image img {
  transform: scale(1.03);
}

.guide-card-copy {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 1.2rem;
}

.guide-card-copy>span {
  color: var(--brand-secondary);
  font-size: 0.75rem;
  font-weight: 900;
}

.guide-card h3 {
  margin: 0.65rem 0 0;
  color: var(--brand-ink);
  font-size: 1.15rem;
  font-weight: 850;
  line-height: 1.45;
}

.guide-card p,
.guide-footer p {
  color: var(--brand-muted);
  line-height: 1.7;
}

.guide-card p {
  margin: 0.7rem 0 1.2rem;
  font-size: 0.94rem;
}

.guide-card strong {
  display: inline-flex;
  gap: 0.45rem;
  align-items: center;
  margin-top: auto;
  color: var(--brand-primary-dark);
  font-size: 0.9rem;
}

.guide-footer {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  align-items: center;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--brand-line);
}

.guide-footer p {
  max-width: 680px;
  margin: 0;
  font-size: 0.9rem;
}

.guide-footer a {
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
  flex: none;
  padding: 0.75rem 1rem;
  border: 1px solid var(--brand-secondary);
  border-radius: 999px;
  color: var(--brand-secondary);
  text-decoration: none;
  font-weight: 850;
}

.guide-footer a:hover {
  background: var(--brand-secondary);
  color: #fff;
}

@media (max-width: 992px) {
  .guide-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 560px) {
  .guide-grid {
    grid-template-columns: 1fr;
  }

  .guide-footer {
    align-items: stretch;
    flex-direction: column;
  }

  .guide-footer a {
    justify-content: center;
  }
}
</style>
