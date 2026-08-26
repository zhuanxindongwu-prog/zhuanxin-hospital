<template>
  <main v-if="article" class="media-article-page">
    <section class="media-hero">
      <div class="container">
        <RouterLink to="/articles" class="back-link">
          <i class="bi bi-arrow-left"></i>
          返回專心犬貓心臟病照護秘笈
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

            <h1 :class="{ 'long-title': article.title.length > 38 }">{{ article.title }}</h1>
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
      <div class="container article-layout" :class="{ 'single-column': !hasArticleTrustPanel }">
        <article>
          <p class="lead">{{ article.intro }}</p>

          <section class="highlight-panel">
            <p class="panel-label">Key Points</p>
            <h2>重點整理</h2>
            <ul>
              <li v-for="item in article.highlights" :key="item">{{ item }}</li>
            </ul>
          </section>

          <section v-if="article.pathway?.length" class="pathway-section" aria-labelledby="pathway-heading">
            <p class="panel-label">Acute Progression</p>
            <h2 id="pathway-heading">急性惡化可能如何發生？</h2>
            <p class="section-intro">慢性退化的結構，可能在腱索斷裂後形成一連串急性血流動力變化。</p>
            <ol class="pathway-list">
              <li v-for="(step, index) in article.pathway" :key="step.title">
                <span class="pathway-number">{{ String(index + 1).padStart(2, '0') }}</span>
                <strong>{{ step.title }}</strong>
                <small>{{ step.term }}</small>
                <i
                  v-if="index < article.pathway.length - 1"
                  class="bi bi-arrow-right pathway-arrow"
                  aria-hidden="true"
                ></i>
              </li>
            </ol>
          </section>

          <section
            v-if="article.evidenceBoundary?.length"
            class="evidence-section"
            aria-labelledby="evidence-heading"
          >
            <p class="panel-label">Evidence Boundary</p>
            <h2 id="evidence-heading">緊迫與腱索斷裂：證據要說到哪裡？</h2>
            <div class="evidence-grid">
              <article
                v-for="item in article.evidenceBoundary"
                :key="item.label"
                class="evidence-item"
                :class="getEvidenceClass(item.label)"
              >
                <span>{{ item.label }}</span>
                <h3>{{ item.title }}</h3>
                <p>{{ item.text }}</p>
              </article>
            </div>
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

          <template v-for="section in article.sections" :key="section.title">
            <section class="article-section">
              <h2>{{ section.title }}</h2>
              <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
            </section>

            <section v-if="section.media?.length" class="scene-story" aria-labelledby="scene-story-heading">
              <header class="scene-story-heading">
                <p class="scene-label">日常生活影像</p>
                <h2 id="scene-story-heading">正常生活，不等於忽略風險</h2>
                <p>依狗狗當下狀態與個體反應調整活動和照護，保留生活品質，也持續留意安靜時的變化。</p>
              </header>

              <div class="scene-grid">
                <figure
                  v-for="media in section.media"
                  :key="media.src"
                  class="scene-item"
                  :class="{
                    'scene-featured': media.featured,
                    'scene-video': media.type === 'video'
                  }"
                >
                  <video
                    v-if="media.type === 'video'"
                    :poster="media.poster"
                    :aria-label="media.alt"
                    :width="media.width"
                    :height="media.height"
                    controls
                    playsinline
                    preload="none"
                  >
                    <source :src="media.src" type="video/mp4" />
                    您的瀏覽器目前不支援影片播放。
                  </video>
                  <img
                    v-else
                    :src="media.src"
                    :alt="media.alt"
                    :width="media.width"
                    :height="media.height"
                    loading="lazy"
                    decoding="async"
                  />
                  <figcaption>{{ media.title }}</figcaption>
                </figure>
              </div>
            </section>
          </template>

          <aside v-if="article.pullQuote" class="pull-quote">
            <i class="bi bi-compass" aria-hidden="true"></i>
            <div>
              <p class="panel-label">Clinical Perspective</p>
              <h2>{{ article.pullQuote.title }}</h2>
              <p>{{ article.pullQuote.text }}</p>
            </div>
          </aside>

          <section v-if="article.faqs?.length" class="faq-section">
            <p class="panel-label">FAQ</p>
            <h2>常見問題</h2>
            <div class="faq-list">
              <article v-for="item in article.faqs" :key="item.question" class="faq-item">
                <h3>{{ item.question }}</h3>
                <p>{{ item.answer }}</p>
              </article>
            </div>
          </section>

          <section v-if="article.relatedLinks?.length" class="related-reading">
            <p class="panel-label">Related Reading</p>
            <h2>延伸閱讀</h2>
            <div class="related-reading-list">
              <RouterLink v-for="link in article.relatedLinks" :key="link.path" :to="link.path">
                <span>{{ link.title }}</span>
                <i class="bi bi-arrow-right" aria-hidden="true"></i>
              </RouterLink>
            </div>
          </section>

          <section class="notice-panel">
            <i class="bi bi-info-circle"></i>
            <p>
              {{ article.disclaimer || (isCareArticle
                ? '本頁由專心動物醫院整理為照護文章，協助飼主理解資訊，不取代獸醫師診斷。'
                : '本頁為專心動物醫院依公開媒體報導整理的摘要內容，完整資訊與原始報導請參考下方來源。') }}
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

        <aside v-if="hasArticleTrustPanel" class="source-panel">
          <p class="panel-label">{{ isCareArticle ? 'Article Trust' : 'Media Sources' }}</p>
          <h2>{{ isCareArticle ? '內容審閱與原始資料' : '媒體引用來源' }}</h2>
          <div v-if="article.reviewer" class="reviewer-block">
            <span>內容審閱</span>
            <RouterLink :to="article.reviewer.path" class="reviewer-link">
              {{ article.reviewer.name }}
            </RouterLink>
            <p>{{ article.reviewer.title }}</p>
          </div>
          <p v-if="hasArticleSources" class="source-summary">
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
const articleSlug = computed(() => route.meta.articleSlug || route.params.slug)
const article = computed(() => getMediaArticle(articleSlug.value))
const isPetVoiceArticle = computed(() => article.value?.label?.toLowerCase().includes('petvoice'))
const isCareArticle = computed(() => article.value?.sourceType === 'care' || article.value?.label === 'Facebook Care Guide')
const hasArticleSources = computed(() => (article.value?.sources?.length || 0) > 0)
const hasArticleTrustPanel = computed(() => Boolean(article.value?.reviewer || hasArticleSources.value))
const getEvidenceClass = (label) => ({
  已知: 'evidence-known',
  合理機轉: 'evidence-plausible',
  尚未證實: 'evidence-unproven'
}[label] || '')
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

.media-hero h1.long-title {
  font-size: clamp(2.2rem, 4vw, 3.6rem);
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

.article-layout.single-column {
  grid-template-columns: minmax(0, 820px);
  justify-content: center;
}

.lead {
  color: #334155;
  font-size: 1.22rem;
  font-weight: 700;
  line-height: 1.9;
}

.highlight-panel,
.notice-panel,
.source-panel,
.faq-item {
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

.pathway-section,
.evidence-section {
  margin: 3rem 0;
  padding-top: 2.4rem;
  border-top: 1px solid rgba(0, 107, 112, 0.16);
}

.pathway-section h2,
.evidence-section h2,
.pull-quote h2 {
  margin: 0.25rem 0 0;
  color: #16312f;
  font-size: 1.75rem;
  font-weight: 900;
  line-height: 1.4;
}

.section-intro {
  max-width: 700px;
  margin: 0.75rem 0 0;
  color: #64748b;
  line-height: 1.8;
}

.pathway-list {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 0.65rem;
  margin: 1.5rem 0 0;
  padding: 0;
  list-style: none;
}

.pathway-list li {
  position: relative;
  display: grid;
  min-height: 152px;
  align-content: start;
  gap: 0.45rem;
  padding: 1rem 0.8rem;
  border-top: 3px solid #006b70;
  background: #eef6f5;
}

.pathway-number {
  color: #69964a;
  font-size: 0.76rem;
  font-weight: 900;
  letter-spacing: 0.08em;
}

.pathway-list strong {
  color: #16312f;
  font-size: 0.93rem;
  line-height: 1.45;
}

.pathway-list small {
  color: #64748b;
  font-size: 0.72rem;
  line-height: 1.45;
}

.pathway-arrow {
  position: absolute;
  z-index: 1;
  top: 50%;
  right: -0.72rem;
  color: #69964a;
  font-size: 0.9rem;
  transform: translateY(-50%);
}

.evidence-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.evidence-item {
  padding: 1.3rem;
  border: 1px solid rgba(148, 163, 184, 0.22);
  border-top-width: 4px;
  background: #ffffff;
}

.evidence-item > span {
  display: inline-block;
  margin-bottom: 0.75rem;
  font-size: 0.78rem;
  font-weight: 900;
  letter-spacing: 0.08em;
}

.evidence-item h3 {
  margin: 0;
  color: #16312f;
  font-size: 1.02rem;
  font-weight: 900;
  line-height: 1.5;
}

.evidence-item p {
  margin: 0.7rem 0 0;
  color: #526260;
  line-height: 1.8;
}

.evidence-known {
  border-top-color: #69964a;
}

.evidence-known > span {
  color: #527a37;
}

.evidence-plausible {
  border-top-color: #006b70;
}

.evidence-plausible > span {
  color: #006b70;
}

.evidence-unproven {
  border-top-color: #9a6b2f;
}

.evidence-unproven > span {
  color: #875b24;
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

.scene-story {
  margin: 3rem 0;
  padding: 2.4rem 0;
  border-top: 1px solid rgba(0, 107, 112, 0.16);
  border-bottom: 1px solid rgba(0, 107, 112, 0.16);
}

.scene-story-heading {
  max-width: 680px;
  margin-bottom: 1.5rem;
}

.scene-label {
  margin: 0;
  color: #69964a;
  font-size: 0.82rem;
  font-weight: 900;
}

.scene-story-heading h2 {
  margin: 0.35rem 0 0;
  color: #16312f;
  font-size: 1.75rem;
  font-weight: 900;
  line-height: 1.4;
}

.scene-story-heading > p:last-child {
  margin: 0.75rem 0 0;
  color: #526260;
  line-height: 1.8;
}

.scene-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.scene-item {
  overflow: hidden;
  margin: 0;
  border: 1px solid rgba(0, 107, 112, 0.16);
  border-radius: 8px;
  background: #ffffff;
}

.scene-featured,
.scene-video {
  grid-column: 1 / -1;
}

.scene-item img,
.scene-item video {
  width: 100%;
  height: auto;
  aspect-ratio: 4 / 3;
  display: block;
  object-fit: cover;
  background: #e8f3f3;
}

.scene-featured img,
.scene-video video {
  aspect-ratio: 16 / 9;
}

.scene-featured img {
  object-position: center 54%;
}

.scene-item figcaption {
  padding: 0.95rem 1rem 1rem;
  color: #16312f;
  font-size: 1rem;
  font-weight: 900;
  line-height: 1.5;
}

.pull-quote {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 1.15rem;
  margin-top: 3rem;
  padding: 1.75rem;
  border-left: 5px solid #69964a;
  background: #e8f3f3;
}

.pull-quote > i {
  color: #006b70;
  font-size: 1.7rem;
}

.pull-quote h2 {
  font-size: 1.45rem;
}

.pull-quote p:not(.panel-label) {
  margin: 0.75rem 0 0;
  color: #3f5552;
  line-height: 1.9;
}

.faq-section {
  margin-top: 2.8rem;
  padding-top: 2.4rem;
  border-top: 1px solid rgba(105, 150, 74, 0.18);
}

.faq-section h2 {
  margin: 0.25rem 0 1.2rem;
  color: #16312f;
  font-size: 1.75rem;
  font-weight: 900;
}

.faq-list {
  display: grid;
  gap: 0.85rem;
}

.faq-item {
  padding: 1.2rem 1.35rem;
}

.faq-item h3 {
  margin: 0 0 0.55rem;
  color: #16312f;
  font-size: 1rem;
  font-weight: 900;
}

.faq-item p {
  margin: 0;
  color: #526260;
  line-height: 1.8;
}

.related-reading {
  margin-top: 2.8rem;
  padding-top: 2.4rem;
  border-top: 1px solid rgba(105, 150, 74, 0.18);
}

.related-reading h2 {
  margin: 0.25rem 0 1.2rem;
  color: #16312f;
  font-size: 1.75rem;
  font-weight: 900;
}

.related-reading-list {
  display: grid;
  border-top: 1px solid rgba(0, 107, 112, 0.16);
}

.related-reading-list a {
  display: flex;
  min-height: 58px;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.85rem 0;
  border-bottom: 1px solid rgba(0, 107, 112, 0.16);
  color: #16312f;
  font-weight: 850;
  line-height: 1.5;
  text-decoration: none;
}

.related-reading-list a:hover {
  color: #006b70;
}

.related-reading-list i {
  flex: 0 0 auto;
  color: #69964a;
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

.reviewer-link {
  display: block;
  color: #16312f;
  font-weight: 900;
  text-decoration: none;
}

.reviewer-link:hover {
  color: #006b70;
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

  .pathway-list {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .pathway-list li:nth-child(4) .pathway-arrow {
    display: none;
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

  .media-hero h1.long-title {
    font-size: 2rem;
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

  .scene-grid {
    grid-template-columns: 1fr;
  }

  .scene-featured,
  .scene-video {
    grid-column: auto;
  }

  .scene-featured img {
    aspect-ratio: 4 / 3;
  }

  .gallery-item:first-child:nth-last-child(3) {
    grid-column: auto;
  }

  .pathway-list,
  .evidence-grid {
    grid-template-columns: 1fr;
  }

  .pathway-list li {
    min-height: 0;
    padding: 1rem;
  }

  .pathway-arrow,
  .pathway-list li:nth-child(4) .pathway-arrow {
    display: block;
    top: auto;
    right: 50%;
    bottom: -0.85rem;
    transform: translateX(50%) rotate(90deg);
  }

  .pull-quote {
    grid-template-columns: 1fr;
    padding: 1.25rem;
  }
}
</style>
