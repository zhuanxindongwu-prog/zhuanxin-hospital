<template>
  <main class="care-library">
    <section class="library-masthead">
      <div class="container masthead-layout">
        <div class="masthead-copy">
          <p class="eyebrow">CardioSpecial Care Library</p>
          <h1>專心照護指南</h1>
          <p class="masthead-lead">
            依照毛孩的症狀、檢查需求與疾病階段，找到由專心動物醫院整理的照護資訊。
          </p>
        </div>

        <p class="trust-line">
          <i class="bi bi-shield-check" aria-hidden="true"></i>
          <span>內容由專心動物醫院醫療團隊審閱</span>
          <time v-if="latestArticle?.date" :datetime="latestArticle.date">
            更新日期 {{ formatDate(latestArticle.date) }}
          </time>
        </p>
      </div>
    </section>

    <section class="library-tools" aria-label="照護指南搜尋與分類">
      <div class="container tools-layout">
        <label class="search-field">
          <i class="bi bi-search" aria-hidden="true"></i>
          <span class="visually-hidden">搜尋照護指南</span>
          <input
            v-model.trim="query"
            type="search"
            placeholder="搜尋症狀、疾病或檢查，例如：咳嗽、MMVD、心臟超音波"
          />
        </label>

        <nav class="category-nav" aria-label="照護指南分類">
          <button
            v-for="category in categories"
            :key="category"
            type="button"
            :class="{ active: selectedCategory === category }"
            :aria-pressed="selectedCategory === category"
            @click="selectedCategory = category"
          >
            {{ category }}
          </button>
        </nav>
      </div>
    </section>

    <section v-if="latestArticle" class="editorial-overview" aria-labelledby="latest-article-heading">
      <div class="container editorial-layout">
        <div class="latest-story">
          <p class="section-kicker">最新文章</p>
          <RouterLink :to="latestArticle.link" class="editorial-feature">
            <div class="feature-media">
              <img
                :src="latestArticle.image"
                :alt="latestArticle.title"
                width="720"
                height="480"
                fetchpriority="high"
                decoding="async"
              />
            </div>
            <div class="feature-copy">
              <div class="article-meta">
                <span>{{ latestArticle.category }}</span>
                <time v-if="latestArticle.date" :datetime="latestArticle.date">
                  {{ formatDate(latestArticle.date) }}
                </time>
              </div>
              <h2 id="latest-article-heading">{{ latestArticle.title }}</h2>
              <p>{{ latestArticle.description }}</p>
              <span class="text-link">閱讀文章 <i class="bi bi-arrow-right" aria-hidden="true"></i></span>
            </div>
          </RouterLink>
        </div>

        <aside class="monthly-focus" aria-labelledby="monthly-focus-heading">
          <p id="monthly-focus-heading" class="section-kicker">本月重點</p>
          <RouterLink v-for="(article, index) in monthlyFocus" :key="article.link" :to="article.link">
            <div class="focus-image">
              <img
                :src="article.image"
                :alt="article.title"
                width="180"
                height="120"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div class="focus-copy">
              <h3>{{ article.title }}</h3>
              <div class="article-meta">
                <span>{{ article.category }}</span>
                <time v-if="article.date" :datetime="article.date">{{ formatDate(article.date) }}</time>
              </div>
            </div>
            <span class="focus-number" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
          </RouterLink>
        </aside>
      </div>
    </section>

    <section class="reading-path-section" aria-labelledby="reading-paths-heading">
      <div class="container reading-paths">
        <header>
          <p class="section-kicker">Browse by need</p>
          <h2 id="reading-paths-heading">依照需求閱讀</h2>
        </header>

        <button
          v-for="path in readingPaths"
          :key="path.category"
          type="button"
          class="reading-path"
          @click="selectReadingPath(path.category)"
        >
          <i :class="path.icon" aria-hidden="true"></i>
          <span>
            <strong>{{ path.title }}</strong>
            <small>{{ path.description }}</small>
          </span>
          <i class="bi bi-arrow-right path-arrow" aria-hidden="true"></i>
        </button>
      </div>
    </section>

    <section id="article-library" class="guide-section" aria-labelledby="article-library-heading">
      <div class="container">
        <header class="section-heading">
          <div>
            <p class="section-kicker">Care Guides</p>
            <h2 id="article-library-heading" tabindex="-1">
              {{ selectedCategory === '全部' ? '照護文章' : selectedCategory }}
            </h2>
          </div>
          <p>共 {{ filteredArticles.length }} 篇照護內容</p>
        </header>

        <div v-if="filteredArticles.length" class="article-list">
          <RouterLink v-for="article in filteredArticles" :key="article.link" :to="article.link" class="article-row">
            <div class="article-thumb">
              <img
                :src="article.image"
                :alt="article.title"
                width="300"
                height="200"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div class="article-row-copy">
              <div class="article-meta">
                <span>{{ article.category }}</span>
                <time v-if="article.date" :datetime="article.date">{{ formatDate(article.date) }}</time>
              </div>
              <h3>{{ article.title }}</h3>
              <p>{{ article.description }}</p>
            </div>
            <i class="bi bi-arrow-up-right" aria-hidden="true"></i>
          </RouterLink>
        </div>

        <div v-else class="empty-state">
          <h3>找不到符合的照護內容</h3>
          <p>請嘗試其他關鍵字，或選擇不同分類。</p>
          <button type="button" @click="resetFilters">清除搜尋條件</button>
        </div>
      </div>
    </section>

    <section class="media-section" aria-labelledby="media-heading">
      <div class="container">
        <header class="section-heading media-heading">
          <div>
            <p class="section-kicker">Media Coverage</p>
            <h2 id="media-heading">媒體報導與人物專題</h2>
          </div>
          <p>保留可查核的公開來源，延伸閱讀專科醫療、居家監測與真實案例。</p>
        </header>

        <div class="media-list">
          <RouterLink
            v-for="article in sortedMediaArticles"
            :key="article.slug"
            :to="`/articles/media/${article.slug}`"
          >
            <div class="media-image">
              <img
                :src="article.image"
                :alt="article.title"
                width="300"
                height="200"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div class="media-copy">
              <div class="article-meta">
                <span>{{ article.category }}</span>
                <time :datetime="article.date">{{ formatDate(article.date) }}</time>
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
import { computed, nextTick, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { mediaArticles } from '../data/mediaArticles'
import { careArticles, getArticlePath } from '../data/careArticles'
import { cardiologyGuideCards } from '../data/cardiologyGuidePages'
import { sortArticlesByDateDesc } from '../data/articleSorting'

const query = ref('')
const selectedCategory = ref('全部')

const categories = ['全部', '常見警訊', '心臟檢查', '心律不整', '心臟疾病', '貓咪心臟疾病', '治療與照護', '居家監測', '真實案例']

const readingPaths = [
  {
    category: '常見警訊',
    title: '症狀與警訊',
    description: '咳嗽、喘氣、昏倒與活動力改變',
    icon: 'bi bi-stethoscope'
  },
  {
    category: '心臟疾病',
    title: '疾病與治療',
    description: '疾病分期、風險與治療選擇',
    icon: 'bi bi-heart-pulse'
  },
  {
    category: '心臟檢查',
    title: '檢查與監測',
    description: '超音波、心電圖與影像檢查',
    icon: 'bi bi-activity'
  },
  {
    category: '居家監測',
    title: '居家照護指南',
    description: '用藥、飲食、活動與健康趨勢',
    icon: 'bi bi-house-heart'
  }
]

const guides = [
  {
    title: '狗狗 MMVD 二尖瓣黏液樣變性完整指南',
    category: '心臟疾病',
    date: '2026-06-12',
    image: '/imgs/guides/mmvd-overview.jpg',
    link: '/topics/mmvd',
    description: '從 B1、B2、C 到 D 期，理解 MMVD 的分期、檢查、治療與居家照護。'
  },
  {
    title: '犬貓心臟病有哪些常見警訊？',
    category: '常見警訊',
    date: '2026-06-05',
    image: '/imgs/dejiang.webp',
    link: '/articles/pet-heart-disease-warning-signs',
    description: '從咳嗽、喘氣、昏倒與活動力下降，判斷什麼時候應安排心臟評估。'
  },
  {
    title: '狗狗 MMVD 內科治療與外科手術怎麼選？',
    category: '治療與照護',
    date: '2026-06-05',
    image: '/imgs/guides/mmvd-treatment.jpg',
    link: '/articles/dog-mmvd-treatment-options',
    description: '理解內科藥物與外科手術的適應症、風險，以及個別化治療選擇。'
  },
  {
    title: '狗狗 MMVD Stage C 心衰竭照護重點',
    category: '治療與照護',
    date: '2026-06-05',
    image: '/imgs/guides/mmvd-stage-c.jpg',
    link: '/articles/dog-mmvd-stage-c-care',
    description: '掌握穩定用藥、睡眠呼吸速率監測與定期追蹤的照護原則。'
  },
  {
    title: 'PetVoice 犬貓居家生理監測完整指南',
    category: '居家監測',
    date: '2026-06-05',
    image: '/imgs/optimized/petvoice宣傳.webp',
    link: '/petvoice-guide',
    description: '認識心率、安靜時呼吸數、活動與睡眠趨勢如何輔助長期照護。'
  },
  {
    title: 'Still Beating：不曾停止的心跳',
    category: '真實案例',
    date: '2026-06-05',
    image: '/imgs/optimized/converted_image.webp',
    link: '/articles/still-beating-veterinary-cardiology',
    description: '從病例故事理解心臟疾病治療過程中的風險、選擇與陪伴。'
  }
]

const careArticleGuides = careArticles.map((article) => ({
  title: article.title,
  category: article.category,
  date: article.date,
  updatedDate: article.updatedDate,
  image: article.image,
  link: getArticlePath(article),
  description: article.description
}))

const sortedMediaArticles = computed(() =>
  sortArticlesByDateDesc(mediaArticles.filter((article) => article.label !== 'Facebook Care Guide'))
)

const mediaArticleCards = computed(() =>
  sortedMediaArticles.value.map((article) => ({
    title: article.title,
    category: article.category,
    date: article.date,
    updatedDate: article.updatedDate,
    image: article.image,
    link: `/articles/media/${article.slug}`,
    description: article.description
  }))
)

const dedupeByLink = (articles) => {
  const seen = new Set()

  return articles.filter((article) => {
    if (!article.link || seen.has(article.link)) return false
    seen.add(article.link)
    return true
  })
}

const allCareArticles = computed(() =>
  sortArticlesByDateDesc(dedupeByLink([...guides, ...careArticleGuides, ...cardiologyGuideCards]))
)

const editorialArticles = computed(() =>
  sortArticlesByDateDesc(dedupeByLink([...mediaArticleCards.value, ...allCareArticles.value]))
)

const latestArticle = computed(() => editorialArticles.value[0] || null)
const monthlyFocus = computed(() => editorialArticles.value.slice(1, 4))

const filteredArticles = computed(() => {
  const keyword = query.value.toLocaleLowerCase('zh-TW')

  return allCareArticles.value.filter((article) => {
    const matchesCategory = selectedCategory.value === '全部' || article.category === selectedCategory.value
    const searchable = `${article.title} ${article.category} ${article.description}`.toLocaleLowerCase('zh-TW')
    return matchesCategory && (!keyword || searchable.includes(keyword))
  })
})

const selectReadingPath = async (category) => {
  selectedCategory.value = category
  query.value = ''
  await nextTick()
  document.getElementById('article-library')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  document.getElementById('article-library-heading')?.focus({ preventScroll: true })
}

const resetFilters = () => {
  query.value = ''
  selectedCategory.value = '全部'
}

const formatDate = (date) => date?.replaceAll('-', '.') || ''
</script>

<style scoped>
.care-library {
  --ink: var(--brand-ink);
  --muted: var(--brand-muted);
  --line: var(--brand-line);
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

.care-library a {
  color: inherit;
  text-decoration: none;
}

.library-masthead {
  padding: 2.65rem 0 2rem;
  border-bottom: 1px solid var(--line);
}

.masthead-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 3rem;
  align-items: end;
}

.masthead-copy {
  max-width: 760px;
}

.eyebrow,
.section-kicker {
  margin: 0 0 0.55rem;
  color: var(--brand-secondary);
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 0;
  text-transform: uppercase;
}

.library-masthead h1 {
  margin: 0;
  font-size: clamp(2.45rem, 5vw, 3.65rem);
  font-weight: 900;
  line-height: 1.08;
}

.masthead-lead {
  max-width: 700px;
  margin: 0.85rem 0 0;
  color: var(--muted);
  font-size: 0.98rem;
  line-height: 1.75;
}

.trust-line {
  display: grid;
  grid-template-columns: 20px auto;
  gap: 0.2rem 0.65rem;
  align-items: center;
  margin: 0;
  color: var(--muted);
  font-size: 0.78rem;
  line-height: 1.5;
}

.trust-line i {
  grid-row: 1 / span 2;
  color: var(--brand-primary-dark);
  font-size: 1.05rem;
}

.trust-line time {
  grid-column: 2;
}

.library-tools {
  border-bottom: 1px solid var(--line);
  background: rgba(255, 255, 255, 0.98);
}

.tools-layout {
  display: grid;
  grid-template-columns: minmax(320px, 0.75fr) minmax(0, 1.25fr);
  gap: 2rem;
  align-items: center;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}

.search-field {
  display: flex;
  gap: 0.7rem;
  align-items: center;
  min-height: 44px;
  padding: 0 0.9rem;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: #fff;
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
  font-size: 0.87rem;
}

.category-nav {
  display: flex;
  gap: 0.2rem;
  justify-content: flex-end;
  overflow-x: auto;
  scrollbar-width: none;
}

.category-nav::-webkit-scrollbar {
  display: none;
}

.category-nav button {
  flex: 0 0 auto;
  padding: 0.58rem 0.72rem;
  border: 1px solid transparent;
  border-radius: 8px;
  background: transparent;
  color: var(--muted);
  font-size: 0.8rem;
  font-weight: 800;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}

.category-nav button:hover,
.category-nav button.active {
  border-color: var(--line);
  background: var(--brand-primary-soft);
  color: var(--brand-secondary-dark);
}

.editorial-overview {
  padding: 2.4rem 0 2rem;
}

.editorial-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.45fr) minmax(330px, 0.65fr);
  gap: 2.5rem;
}

.latest-story>.section-kicker,
.monthly-focus>.section-kicker {
  margin-bottom: 0.8rem;
}

.editorial-feature {
  display: grid;
  grid-template-columns: minmax(300px, 0.96fr) minmax(0, 1.04fr);
  gap: 1.55rem;
  align-items: center;
}

.feature-media,
.focus-image,
.article-thumb,
.media-image {
  overflow: hidden;
  border-radius: 8px;
  background: var(--brand-primary-soft);
}

.feature-media {
  aspect-ratio: 3 / 2;
}

.feature-media img,
.focus-image img,
.article-thumb img,
.media-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.25s ease;
}

.editorial-feature:hover img,
.monthly-focus a:hover img,
.article-row:hover img,
.media-list a:hover img {
  transform: scale(1.025);
}

.article-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem 0.8rem;
  align-items: center;
  color: var(--muted);
  font-size: 0.73rem;
  line-height: 1.35;
}

.article-meta span {
  color: var(--brand-secondary);
  font-weight: 900;
}

.feature-copy h2 {
  margin: 0.65rem 0 0;
  font-size: clamp(1.45rem, 2.6vw, 2rem);
  font-weight: 900;
  line-height: 1.35;
}

.feature-copy p {
  margin: 0.8rem 0 0;
  color: var(--muted);
  line-height: 1.7;
}

.text-link {
  display: inline-flex;
  gap: 0.55rem;
  align-items: center;
  margin-top: 1rem;
  color: var(--brand-secondary);
  font-size: 0.84rem;
  font-weight: 900;
}

.monthly-focus {
  padding-left: 2rem;
  border-left: 1px solid var(--line);
}

.monthly-focus a {
  display: grid;
  grid-template-columns: 104px minmax(0, 1fr) 28px;
  gap: 0.85rem;
  align-items: center;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--line);
}

.focus-image {
  aspect-ratio: 3 / 2;
}

.focus-copy h3 {
  display: -webkit-box;
  overflow: hidden;
  margin: 0 0 0.5rem;
  font-size: 0.96rem;
  font-weight: 900;
  line-height: 1.4;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.focus-number {
  align-self: start;
  color: rgba(105, 150, 74, 0.58);
  font-size: 1.2rem;
  font-weight: 700;
}

.reading-path-section {
  padding: 0.2rem 0 2rem;
}

.reading-paths {
  display: grid;
  grid-template-columns: 175px repeat(4, minmax(0, 1fr));
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.reading-paths header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1.1rem 1rem 1.1rem 0;
}

.reading-paths header h2 {
  margin: 0;
  font-size: 1rem;
  font-weight: 900;
}

.reading-path {
  display: grid;
  grid-template-columns: 28px minmax(0, 1fr) 18px;
  gap: 0.75rem;
  align-items: center;
  padding: 1.1rem;
  border: 0;
  border-left: 1px solid var(--line);
  background: transparent;
  color: var(--ink);
  text-align: left;
  transition: background 0.2s ease, color 0.2s ease;
}

.reading-path:hover,
.reading-path:focus-visible {
  background: var(--brand-primary-soft);
  color: var(--brand-secondary-dark);
}

.reading-path>i:first-child {
  color: var(--brand-secondary);
  font-size: 1.3rem;
}

.reading-path strong,
.reading-path small {
  display: block;
}

.reading-path strong {
  font-size: 0.87rem;
  font-weight: 900;
}

.reading-path small {
  margin-top: 0.25rem;
  color: var(--muted);
  font-size: 0.72rem;
  line-height: 1.45;
}

.path-arrow {
  color: var(--brand-primary-dark);
  font-size: 0.8rem;
}

.guide-section,
.media-section {
  padding: 2rem 0 3.6rem;
  scroll-margin-top: 1rem;
}

.section-heading {
  display: flex;
  gap: 2rem;
  align-items: end;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  padding-bottom: 0.85rem;
  border-bottom: 1px solid var(--line);
}

.section-heading h2 {
  margin: 0;
  font-size: clamp(1.7rem, 3vw, 2.35rem);
  font-weight: 900;
  line-height: 1.2;
}

.section-heading>p {
  max-width: 510px;
  margin: 0 0 0.15rem;
  color: var(--muted);
  line-height: 1.6;
}

.article-list,
.media-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 2.5rem;
}

.article-row,
.media-list a {
  position: relative;
  display: grid;
  grid-template-columns: 142px minmax(0, 1fr) 20px;
  gap: 1rem;
  align-items: center;
  min-height: 140px;
  padding: 1.05rem 0;
  border-bottom: 1px solid var(--line);
}

.article-thumb,
.media-image {
  aspect-ratio: 3 / 2;
}

.article-row-copy h3,
.media-copy h3 {
  display: -webkit-box;
  overflow: hidden;
  margin: 0.45rem 0 0;
  font-size: 1.02rem;
  font-weight: 900;
  line-height: 1.4;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.article-row-copy p,
.media-copy p {
  display: -webkit-box;
  overflow: hidden;
  margin: 0.45rem 0 0;
  color: var(--muted);
  font-size: 0.84rem;
  line-height: 1.55;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.article-row>i,
.media-list>a>i {
  color: var(--brand-secondary);
  font-size: 0.9rem;
}

.empty-state {
  padding: 3rem 0;
  text-align: center;
}

.empty-state h3 {
  margin: 0;
  font-size: 1.3rem;
}

.empty-state p {
  margin: 0.55rem 0 0;
  color: var(--muted);
}

.empty-state button {
  margin-top: 1rem;
  padding: 0.7rem 1rem;
  border: 1px solid var(--brand-secondary);
  border-radius: 8px;
  background: #fff;
  color: var(--brand-secondary);
  font-weight: 900;
}

.media-section {
  border-top: 1px solid var(--line);
  background: #f7f9f6;
}

.media-heading {
  margin-bottom: 0.55rem;
}

@media (max-width: 1100px) {
  .tools-layout,
  .editorial-layout {
    grid-template-columns: 1fr;
  }

  .category-nav {
    justify-content: flex-start;
  }

  .monthly-focus {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
    padding: 1.4rem 0 0;
    border-top: 1px solid var(--line);
    border-left: 0;
  }

  .monthly-focus>.section-kicker {
    grid-column: 1 / -1;
    margin: 0;
  }

  .monthly-focus a {
    grid-template-columns: 84px minmax(0, 1fr);
    align-items: start;
  }

  .focus-number {
    display: none;
  }

  .reading-paths {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .reading-paths header {
    grid-column: 1 / -1;
    padding: 1rem 0;
  }

  .reading-path:nth-of-type(odd) {
    border-left: 0;
  }
}

@media (max-width: 780px) {
  .masthead-layout {
    grid-template-columns: 1fr;
    gap: 1.2rem;
  }

  .trust-line {
    justify-self: start;
  }

  .editorial-feature {
    grid-template-columns: 1fr;
  }

  .feature-copy h2 {
    font-size: 1.5rem;
  }

  .monthly-focus {
    grid-template-columns: 1fr;
  }

  .article-list,
  .media-list {
    grid-template-columns: 1fr;
  }

  .section-heading {
    align-items: start;
    flex-direction: column;
    gap: 0.65rem;
  }

  .section-heading>p {
    margin: 0;
  }
}

@media (max-width: 520px) {
  .library-masthead {
    padding: 1.7rem 0 1.45rem;
  }

  .library-masthead h1 {
    font-size: 2.35rem;
  }

  .masthead-lead {
    font-size: 0.92rem;
    line-height: 1.65;
  }

  .tools-layout {
    gap: 0.65rem;
    padding-top: 0.65rem;
    padding-bottom: 0.65rem;
  }

  .search-field {
    min-height: 46px;
  }

  .category-nav {
    margin-right: calc(var(--bs-gutter-x) * -0.5);
    padding-right: calc(var(--bs-gutter-x) * 0.5);
  }

  .editorial-overview {
    padding: 1.7rem 0 1.4rem;
  }

  .feature-copy p {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }

  .monthly-focus a {
    grid-template-columns: 92px minmax(0, 1fr);
    padding: 0.75rem 0;
  }

  .reading-path-section {
    padding-bottom: 1.4rem;
  }

  .reading-paths {
    grid-template-columns: 1fr;
  }

  .reading-path {
    border-top: 1px solid var(--line);
    border-left: 0;
  }

  .reading-paths header {
    padding-bottom: 0.85rem;
  }

  .guide-section,
  .media-section {
    padding: 1.6rem 0 3rem;
  }

  .article-row,
  .media-list a {
    grid-template-columns: 108px minmax(0, 1fr) 16px;
    gap: 0.75rem;
    min-height: 118px;
    padding: 0.9rem 0;
  }

  .article-row-copy h3,
  .media-copy h3 {
    font-size: 0.94rem;
  }

  .article-row-copy p,
  .media-copy p {
    display: none;
  }

  .article-meta {
    font-size: 0.68rem;
  }
}
</style>
