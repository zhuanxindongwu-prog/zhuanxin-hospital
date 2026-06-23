<template>
  <main v-if="article" class="media-article-page">
    <section class="media-hero">
      <div class="container">
        <RouterLink to="/articles" class="back-link">
          <i class="bi bi-arrow-left"></i>
          返回專心照護指南
        </RouterLink>

        <div class="media-hero-grid">
          <div>
            <div class="article-meta">
              <span>{{ article.category }}</span>
              <time :datetime="article.date">{{ article.date }}</time>
              <time
                v-if="article.updatedDate && article.updatedDate !== article.date"
                :datetime="article.updatedDate"
                class="updated-date"
              >
                更新於 {{ article.updatedDate }}
              </time>
            </div>

            <h1>{{ article.title }}</h1>
            <p class="hero-description">{{ article.description }}</p>
          </div>

          <figure class="hero-image-wrap">
            <img :src="article.image" :alt="article.title" fetchpriority="high" decoding="async" />
            <figcaption>
              <span>{{ article.imageCaption }}</span>
              <small>{{ article.imageCredit }}</small>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>

    <section class="media-content">
      <div class="container article-layout">
        <article>
          <p class="lead">{{ article.intro }}</p>

          <section class="highlight-panel">
            <p class="panel-label">Key Points</p>
            <h2>重點整理</h2>
            <ul>
              <li v-for="item in article.highlights" :key="item">{{ item }}</li>
            </ul>
          </section>

          <section v-if="article.gallery?.length" class="media-gallery" aria-label="報導圖片">
            <figure v-for="image in article.gallery" :key="image.src" class="gallery-item">
              <img :src="image.src" :alt="image.alt" loading="lazy" />
              <figcaption>
                <span>{{ image.caption }}</span>
                <small>{{ image.credit }}</small>
              </figcaption>
            </figure>
          </section>

          <section v-for="section in article.sections" :key="section.title" class="article-section">
            <h2>{{ section.title }}</h2>
            <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
          </section>

          <section class="notice-panel">
            <i class="bi bi-info-circle"></i>
            <p>
              {{ isCareArticle
                ? '本頁由專心動物醫院依原始衛教貼文重新編輯為照護文章，協助飼主理解資訊，不取代獸醫師診斷。'
                : '本頁為專心動物醫院依公開媒體報導整理的摘要內容，完整資訊與原始報導請參考下方來源。' }}
            </p>
          </section>

          <section v-if="isPetVoiceArticle" class="product-link-panel">
            <p class="panel-label">PetVoice Official Page</p>
            <h2>了解專心動物醫院導入 PetVoice 居家生理監測</h2>
            <p>
              前往 PetVoice 主頁，查看監測項目、適用族群、產品組成與常見問題。
            </p>
            <RouterLink to="/petvoice" class="product-link">
              PetVoice 犬貓居家生理監測
              <i class="bi bi-arrow-right"></i>
            </RouterLink>
          </section>
        </article>

        <aside class="source-panel">
          <p class="panel-label">{{ isCareArticle ? 'Article Trust' : 'Media Sources' }}</p>
          <h2>{{ isCareArticle ? '內容審閱與原始資料' : '媒體引用來源' }}</h2>
          <div v-if="article.reviewer" class="reviewer-block">
            <span>內容審閱</span>
            <strong>{{ article.reviewer.name }}</strong>
            <p>{{ article.reviewer.title }}</p>
          </div>
          <p class="source-summary">
            共 {{ article.sources.length }} 筆{{ isCareArticle ? '原始資料與參考來源' : '公開媒體報導' }}，作為本頁內容整理與查核依據。
          </p>

          <a
            v-for="source in article.sources"
            :key="source.url"
            :href="source.url"
            target="_blank"
            rel="noopener noreferrer"
            class="source-link"
          >
            <strong>{{ source.publisher }}</strong>
            <span v-if="source.date">{{ source.date }}</span>
            <p>{{ source.title }}</p>
            <small>
              前往 {{ source.publisher }} 閱讀{{ isCareArticle ? '原始內容' : '原始報導' }}
              <i class="bi bi-box-arrow-up-right"></i>
            </small>
          </a>
        </aside>
      </div>
    </section>
  </main>

  <main v-else class="not-found-page">
    <div class="container">
      <h1>找不到這篇文章</h1>
      <RouterLink to="/articles" class="back-link">返回專心快訊</RouterLink>
    </div>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { getMediaArticle } from '../data/mediaArticles'

const route = useRoute()
const article = computed(() => getMediaArticle(route.params.slug))
const isPetVoiceArticle = computed(() => article.value?.label?.toLowerCase().includes('petvoice'))
const isCareArticle = computed(() => article.value?.label === 'Facebook Care Guide')
</script>

<style scoped>
.media-article-page,
.not-found-page {
  color: #16312f;
  background: #f7f9fc;
}

.media-hero {
  padding: 7.5rem 0 4rem;
  background: linear-gradient(135deg, #ffffff, #e8f3f3);
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  margin-bottom: 2rem;
  color: #69964a;
  font-weight: 900;
  text-decoration: none;
}

.media-hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(360px, 0.85fr);
  gap: 3rem;
  align-items: center;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  margin-bottom: 1rem;
}

.article-meta span,
.panel-label {
  color: #69964a;
  font-size: 0.82rem;
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.article-meta time {
  color: #64748b;
  font-size: 0.9rem;
}

.article-meta .updated-date {
  padding-left: 0.85rem;
  border-left: 1px solid rgba(100, 116, 139, 0.35);
}

.media-hero h1 {
  color: #16312f;
  font-size: clamp(2.4rem, 5vw, 4.6rem);
  font-weight: 900;
  line-height: 1.15;
}

.hero-description {
  max-width: 760px;
  margin-top: 1.35rem;
  color: #475569;
  font-size: 1.12rem;
  line-height: 1.9;
}

.hero-image-wrap {
  margin: 0;
  overflow: hidden;
  border-radius: 1.2rem;
  background: #ffffff;
  box-shadow: 0 1rem 2.6rem rgba(20, 35, 60, 0.1);
}

.hero-image-wrap img {
  width: 100%;
  aspect-ratio: 16 / 11;
  display: block;
  object-fit: cover;
}

.hero-image-wrap figcaption,
.gallery-item figcaption {
  display: grid;
  gap: 0.3rem;
  padding: 0.8rem 0.9rem 0.9rem;
  color: #475569;
  font-size: 0.86rem;
  line-height: 1.55;
}

.hero-image-wrap small,
.gallery-item small {
  color: #7b8799;
  font-size: 0.76rem;
}

.media-content {
  padding: 4rem 0 5rem;
}

.article-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 3rem;
  align-items: start;
}

.lead {
  color: #334155;
  font-size: 1.22rem;
  font-weight: 700;
  line-height: 1.9;
}

.highlight-panel,
.notice-panel,
.source-panel {
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 1rem;
  background: #ffffff;
  box-shadow: 0 0.8rem 2rem rgba(20, 35, 60, 0.06);
}

.highlight-panel {
  margin: 2rem 0 3rem;
  padding: 1.5rem;
}

.highlight-panel h2,
.source-panel h2 {
  color: #16312f;
  font-size: 1.35rem;
  font-weight: 900;
}

.highlight-panel ul {
  margin: 1rem 0 0;
  padding-left: 1.2rem;
}

.highlight-panel li {
  margin-top: 0.65rem;
  color: #475569;
  line-height: 1.75;
}

.article-section {
  margin-top: 2.8rem;
}

.media-gallery {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.1rem;
  margin: 2.8rem 0;
}

.gallery-item {
  overflow: hidden;
  margin: 0;
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 0.8rem;
  background: #ffffff;
}

.gallery-item:first-child:nth-last-child(3) {
  grid-column: 1 / -1;
}

.gallery-item img {
  width: 100%;
  aspect-ratio: 16 / 11;
  display: block;
  object-fit: cover;
}

.article-section h2 {
  color: #16312f;
  font-size: 1.75rem;
  font-weight: 900;
  line-height: 1.4;
}

.article-section p {
  margin-top: 1rem;
  color: #475569;
  line-height: 1.95;
}

.notice-panel {
  display: flex;
  gap: 0.75rem;
  margin-top: 3rem;
  padding: 1rem;
}

.notice-panel i {
  color: #69964a;
}

.notice-panel p {
  margin: 0;
  color: #64748b;
  font-size: 0.9rem;
  line-height: 1.7;
}

.product-link-panel {
  margin-top: 1.5rem;
  padding: 1.5rem;
  border: 1px solid rgba(105, 150, 74, 0.2);
  border-radius: 1rem;
  background: linear-gradient(135deg, #ffffff, #e8f3f3);
}

.product-link-panel h2 {
  color: #16312f;
  font-size: 1.35rem;
  font-weight: 900;
}

.product-link-panel p:not(.panel-label) {
  color: #64748b;
  line-height: 1.75;
}

.product-link {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  margin-top: 0.4rem;
  color: #69964a;
  font-weight: 900;
  text-decoration: none;
}

.source-panel {
  position: sticky;
  top: 6rem;
  padding: 1.25rem;
}

.source-summary {
  margin: 0.7rem 0 0;
  color: #64748b;
  font-size: 0.88rem;
  line-height: 1.7;
}

.reviewer-block {
  display: grid;
  gap: 0.2rem;
  margin-top: 1rem;
  padding: 1rem;
  background: #edf6f4;
}

.reviewer-block span {
  color: #69964a;
  font-size: 0.76rem;
  font-weight: 900;
}

.reviewer-block strong {
  color: #16312f;
}

.reviewer-block p {
  margin: 0;
  color: #64748b;
  font-size: 0.84rem;
}

.source-link {
  display: block;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(148, 163, 184, 0.2);
  color: inherit;
  text-decoration: none;
}

.source-link strong,
.source-link span {
  display: block;
}

.source-link strong {
  color: #16312f;
}

.source-link span,
.source-link small {
  margin-top: 0.2rem;
  color: #69964a;
  font-size: 0.82rem;
  font-weight: 800;
}

.source-link p {
  margin: 0.55rem 0;
  color: #64748b;
  font-size: 0.9rem;
  line-height: 1.6;
}

.not-found-page {
  min-height: 65vh;
  padding: 9rem 0;
}

@media (max-width: 991px) {
  .media-hero-grid,
  .article-layout {
    grid-template-columns: 1fr;
  }

  .hero-image-wrap {
    max-width: 680px;
  }

  .source-panel {
    position: static;
  }
}

@media (max-width: 576px) {
  .media-hero {
    padding: 6rem 0 3rem;
  }

  .media-hero-grid {
    gap: 2rem;
  }

  .article-meta {
    flex-wrap: wrap;
  }

  .article-meta .updated-date {
    width: 100%;
    padding-left: 0;
    border-left: 0;
  }

  .media-hero h1 {
    font-size: 2.2rem;
  }

  .media-content {
    padding: 3rem 0 4rem;
  }

  .lead {
    font-size: 1.08rem;
  }

  .article-section h2 {
    font-size: 1.45rem;
  }

  .media-gallery {
    grid-template-columns: 1fr;
  }

  .gallery-item:first-child:nth-last-child(3) {
    grid-column: auto;
  }
}
</style>
