<template>
    <main class="articles-page">
        <section class="articles-hero">
            <div class="container">
                <div class="hero-grid">
                    <div class="hero-copy">
                        <p class="eyebrow">CardioSpecial Journal</p>
                        <h1>專心快訊</h1>
                        <p class="hero-lead">
                            從心臟專科、腫瘤照護到居家健康監測，
                            用清楚可信的內容，協助飼主理解變化並掌握就醫時機。
                        </p>
                    </div>

                    <aside class="editorial-note">
                        <span>Editorial Standard</span>
                        <strong>臨床觀點、真實案例、媒體來源。</strong>
                        <p>每篇內容都保留清楚的主題脈絡與引用來源，讓重要資訊更容易被理解與查核。</p>
                    </aside>
                </div>
            </div>
        </section>

        <section class="featured-section">
            <div class="container">
                <div class="section-bar">
                    <div>
                        <p class="eyebrow">Featured Story</p>
                        <h2>本期焦點</h2>
                    </div>
                    <span>{{ featuredArticle.date }} · {{ featuredArticle.category }}</span>
                </div>

                <RouterLink :to="`/articles/media/${featuredArticle.slug}`" class="featured-shell">
                    <article class="featured-core">
                        <div class="featured-image">
                            <img
                                :src="featuredArticle.image"
                                :alt="featuredArticle.title"
                                width="1280"
                                height="853"
                                fetchpriority="high"
                                decoding="async"
                            />
                            <span>{{ featuredArticle.label }}</span>
                        </div>

                        <div class="featured-content">
                            <p class="eyebrow">Latest Media Coverage</p>
                            <h2>{{ featuredArticle.title }}</h2>
                            <p>{{ featuredArticle.description }}</p>

                            <dl class="featured-facts">
                                <div>
                                    <dt>內容類型</dt>
                                    <dd>{{ featuredArticle.category }}</dd>
                                </div>
                                <div>
                                    <dt>引用來源</dt>
                                    <dd>{{ featuredArticle.sources?.length || 0 }} 家媒體</dd>
                                </div>
                            </dl>

                            <span class="read-button">
                                閱讀焦點報導
                                <span aria-hidden="true"><i class="bi bi-arrow-up-right"></i></span>
                            </span>
                        </div>
                    </article>
                </RouterLink>
            </div>
        </section>

        <section class="media-section">
            <div class="container">
                <div class="section-heading">
                    <div>
                        <p class="eyebrow">Media Coverage</p>
                        <h2>媒體報導</h2>
                    </div>
                    <p>整理專科醫療、居家監測與真實照護案例，並保留可查核的公開媒體來源。</p>
                </div>

                <div class="media-grid">
                    <RouterLink
                        v-for="article in remainingMediaArticles"
                        :key="article.slug"
                        :to="`/articles/media/${article.slug}`"
                        class="media-card-shell"
                    >
                        <article class="media-card">
                            <div class="media-image">
                                <img
                                    :src="article.image"
                                    :alt="article.title"
                                    width="1280"
                                    height="853"
                                    loading="lazy"
                                    decoding="async"
                                />
                                <span>{{ article.category }}</span>
                            </div>

                            <div class="media-content">
                                <div class="meta-line">
                                    <span>{{ article.label }}</span>
                                    <time :datetime="article.date">{{ article.date }}</time>
                                </div>
                                <h3>{{ article.title }}</h3>
                                <p>{{ article.description }}</p>
                                <span class="text-link">
                                    閱讀整理
                                    <i class="bi bi-arrow-up-right" aria-hidden="true"></i>
                                </span>
                            </div>
                        </article>
                    </RouterLink>
                </div>
            </div>
        </section>

        <section class="petvoice-bridge">
            <div class="container">
                <div class="bridge-panel">
                    <div>
                        <p class="eyebrow">PetVoice Knowledge Hub</p>
                        <h2>從媒體報導，進一步理解居家監測。</h2>
                        <p>
                            了解 PetVoice 如何整理心率、安靜時呼吸數、活動與睡眠趨勢，
                            以及這些資料如何輔助犬貓心臟病與慢性病照護。
                        </p>
                    </div>
                    <div class="bridge-actions">
                        <RouterLink to="/petvoice" class="read-button primary">
                            PetVoice 產品頁
                            <span aria-hidden="true"><i class="bi bi-arrow-up-right"></i></span>
                        </RouterLink>
                        <RouterLink to="/petvoice-guide" class="read-button secondary">
                            完整指南
                            <span aria-hidden="true"><i class="bi bi-book"></i></span>
                        </RouterLink>
                    </div>
                </div>
            </div>
        </section>

        <section class="insights-section">
            <div class="container">
                <div class="section-heading">
                    <div>
                        <p class="eyebrow">Hospital Insights</p>
                        <h2>院內文章</h2>
                    </div>
                    <p>從疾病分期、常見警訊到真實病例，提供可持續閱讀的專科照護資訊。</p>
                </div>

                <div class="insights-list">
                    <RouterLink v-for="(article, index) in articles" :key="article.title" :to="article.link" class="insight-row">
                        <span class="row-number">0{{ index + 1 }}</span>
                        <div class="insight-image">
                            <img
                                :src="article.image"
                                :alt="article.title"
                                width="1280"
                                height="853"
                                loading="lazy"
                                decoding="async"
                            />
                        </div>
                        <div class="insight-copy">
                            <div class="meta-line">
                                <span>{{ article.category }}</span>
                                <span>{{ article.label }}</span>
                            </div>
                            <h3>{{ article.title }}</h3>
                            <p>{{ article.description }}</p>
                        </div>
                        <span class="row-action" aria-hidden="true"><i class="bi bi-arrow-up-right"></i></span>
                    </RouterLink>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup>
import { mediaArticles } from '../data/mediaArticles'

const sortedMediaArticles = [...mediaArticles].sort((a, b) => b.date.localeCompare(a.date))
const featuredArticle = sortedMediaArticles[0]
const remainingMediaArticles = sortedMediaArticles.slice(1)

const articles = [
    {
        title: '狗狗 MMVD 二尖瓣黏液樣變性完整指南',
        label: 'Topic Hub',
        category: '疾病主題中心',
        image: '/imgs/optimized/converted_image_2.webp',
        link: '/topics/mmvd',
        description:
            '從 B1、B2、C 到 D 期，理解 MMVD 的分期、檢查、治療與居家照護。',
    },
    {
        title: '犬貓鬱血性心衰竭 CHF',
        label: 'Topic Hub',
        category: '疾病主題中心',
        image: '/imgs/optimized/毛孩的心臟.webp',
        link: '/topics/congestive-heart-failure',
        description:
            '整理呼吸警訊、急性處置、長期用藥與居家監測的重要原則。',
    },
    {
        title: 'PetVoice 是什麼？犬貓居家生理監測完整指南',
        label: 'PetVoice Guide',
        category: '居家監測',
        image: '/imgs/optimized/petvoice宣傳.webp',
        link: '/petvoice-guide',
        description:
            '完整認識 PetVoice 如何觀察心率、安靜時呼吸數、活動與睡眠趨勢，輔助心臟病與慢性病毛孩照護。',
    },
    {
        title: '飼主大會考－答案公布',
        label: 'Owner Education',
        category: '飼主教育',
        image: '/imgs/dejiang.webp',
        link: '/articles/pet-heart-disease-warning-signs',
        description:
            '透過問答方式整理常見心臟病觀念，幫助飼主理解日常觀察與就醫時機。',
    },
    {
        title: 'Still Beating ～ 不曾停止的心跳',
        label: 'Case Story',
        category: '真實案例',
        image: '/imgs/optimized/converted_image.webp',
        link: '/articles/still-beating-veterinary-cardiology',
        description:
            '從病例故事出發，了解心臟疾病治療過程中的風險、選擇與陪伴。',
    },
    {
        title: '狗狗 MMVD 內科 vs 外科治療？',
        label: 'Medical Insight',
        category: '醫療觀點',
        image: '/imgs/optimized/converted_image_2.webp',
        link: '/articles/dog-mmvd-treatment-options',
        description:
            '面對二尖瓣膜疾病，內科藥物與外科手術各有適應症，治療選擇需要個別評估。',
    },
    {
        title: '毛孩的心臟，正在默默承受你看不見的壓力',
        label: 'Heart Disease Awareness',
        category: '心臟疾病',
        image: '/imgs/optimized/毛孩的心臟.webp',
        link: '/articles/pet-heart-disease-screening',
        description:
            '咳嗽、喘氣、活動力下降，可能不是單純老化，而是心臟正在承受壓力。從日常細節了解犬貓心臟病早期可能出現的變化。',
    },
]
</script>

<style scoped>
.articles-page {
    --ink: #10202b;
    --muted: #5d707d;
    --teal: #0b756d;
    --teal-dark: #07544f;
    --soft: #edf6f4;
    --line: rgba(16, 32, 43, 0.12);
    overflow-x: clip;
    background: #f7f9f9;
    color: var(--ink);
    text-align: left;
}

.articles-page,
.articles-page * {
    box-sizing: border-box;
    min-width: 0;
}

.articles-hero {
    padding: 6rem 0 5.5rem;
    background:
        linear-gradient(120deg, rgba(255, 255, 255, 0.98), rgba(237, 246, 244, 0.94)),
        repeating-linear-gradient(90deg, rgba(16, 32, 43, 0.035) 0 1px, transparent 1px 96px);
}

.hero-grid,
.section-heading,
.bridge-panel {
    display: grid;
    grid-template-columns: minmax(0, 1.12fr) minmax(320px, 0.88fr);
    gap: 4rem;
    align-items: end;
}

.eyebrow {
    margin: 0 0 0.8rem;
    color: var(--teal);
    font-size: 0.78rem;
    font-weight: 900;
    text-transform: uppercase;
}

.hero-copy h1 {
    margin: 0;
    font-size: clamp(4rem, 9vw, 8rem);
    font-weight: 900;
    line-height: 0.96;
}

.hero-lead {
    max-width: 720px;
    margin: 1.5rem 0 0;
    color: #3c515e;
    font-size: 1.12rem;
    line-height: 1.9;
}

.editorial-note {
    padding-top: 1.5rem;
    border-top: 1px solid var(--line);
}

.editorial-note span,
.editorial-note strong {
    display: block;
}

.editorial-note span {
    color: var(--teal);
    font-size: 0.78rem;
    font-weight: 900;
    text-transform: uppercase;
}

.editorial-note strong {
    margin-top: 0.5rem;
    font-size: 1.35rem;
    line-height: 1.5;
}

.editorial-note p,
.section-heading > p,
.bridge-panel p {
    margin: 0.8rem 0 0;
    color: var(--muted);
    line-height: 1.8;
}

.featured-section,
.media-section,
.insights-section {
    padding: 6rem 0;
}

.section-bar {
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: 2rem;
    margin-bottom: 2rem;
}

.section-bar h2,
.section-heading h2,
.bridge-panel h2 {
    margin: 0;
    font-size: clamp(2.4rem, 5vw, 4rem);
    font-weight: 900;
    line-height: 1.12;
}

.section-bar > span {
    color: var(--muted);
    font-size: 0.85rem;
    font-weight: 800;
}

.featured-shell,
.media-card-shell {
    display: block;
    padding: 7px;
    border: 1px solid rgba(16, 32, 43, 0.08);
    border-radius: 16px;
    background: rgba(16, 32, 43, 0.04);
    color: inherit;
    text-decoration: none;
    transition:
        transform 0.7s cubic-bezier(0.32, 0.72, 0, 1),
        box-shadow 0.7s cubic-bezier(0.32, 0.72, 0, 1);
}

.featured-shell:hover,
.media-card-shell:hover {
    transform: translateY(-4px);
    box-shadow: 0 26px 70px rgba(16, 32, 43, 0.1);
}

.featured-core {
    display: grid;
    grid-template-columns: minmax(0, 1.2fr) minmax(360px, 0.8fr);
    min-height: 580px;
    overflow: hidden;
    border-radius: 10px;
    background: #fff;
}

.featured-image,
.media-image,
.insight-image {
    position: relative;
    overflow: hidden;
}

.featured-image img,
.media-image img,
.insight-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.8s cubic-bezier(0.32, 0.72, 0, 1);
}

.featured-shell:hover img,
.media-card-shell:hover img,
.insight-row:hover img {
    transform: scale(1.035);
}

.featured-image > span,
.media-image > span {
    position: absolute;
    right: 1.2rem;
    bottom: 1.2rem;
    padding: 0.45rem 0.75rem;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.92);
    color: var(--teal-dark);
    font-size: 0.78rem;
    font-weight: 900;
}

.featured-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: clamp(2rem, 5vw, 4.5rem);
}

.featured-content h2 {
    margin: 0;
    font-size: clamp(2.3rem, 4.5vw, 4rem);
    font-weight: 900;
    line-height: 1.13;
}

.featured-content > p:not(.eyebrow) {
    margin: 1.3rem 0 0;
    color: var(--muted);
    line-height: 1.85;
}

.featured-facts {
    margin: 2rem 0;
}

.featured-facts div {
    display: grid;
    grid-template-columns: 95px 1fr;
    gap: 1rem;
    padding: 0.85rem 0;
    border-top: 1px solid var(--line);
}

.featured-facts div:last-child {
    border-bottom: 1px solid var(--line);
}

.featured-facts dt {
    color: var(--teal);
    font-size: 0.82rem;
    font-weight: 900;
}

.featured-facts dd {
    margin: 0;
    color: #354b57;
    font-weight: 800;
}

.read-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    width: fit-content;
    min-height: 52px;
    margin-top: auto;
    padding: 0.55rem 0.65rem 0.55rem 1.2rem;
    border-radius: 999px;
    background: var(--soft);
    color: var(--teal-dark);
    font-weight: 900;
    text-decoration: none;
}

.read-button span {
    display: grid;
    place-items: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: #fff;
}

.media-section {
    background: var(--soft);
}

.section-heading {
    margin-bottom: 2.5rem;
}

.section-heading > p {
    max-width: 600px;
    justify-self: end;
}

.media-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.5rem;
}

.media-card {
    height: 100%;
    overflow: hidden;
    border-radius: 10px;
    background: #fff;
}

.media-image {
    aspect-ratio: 16 / 9;
}

.media-content {
    display: flex;
    flex-direction: column;
    min-height: 310px;
    padding: 1.6rem;
}

.meta-line {
    display: flex;
    flex-wrap: wrap;
    gap: 0.65rem;
    color: var(--teal);
    font-size: 0.78rem;
    font-weight: 900;
    text-transform: uppercase;
}

.media-content h3,
.insight-copy h3 {
    margin: 0.8rem 0 0;
    color: var(--ink);
    font-size: 1.45rem;
    font-weight: 900;
    line-height: 1.4;
}

.media-content p,
.insight-copy p {
    margin: 0.85rem 0 0;
    color: var(--muted);
    line-height: 1.8;
}

.text-link {
    display: inline-flex;
    align-items: center;
    gap: 0.45rem;
    margin-top: auto;
    padding-top: 1.2rem;
    color: var(--teal-dark);
    font-weight: 900;
}

.petvoice-bridge {
    padding: 5rem 0;
    background: #10202b;
}

.bridge-panel {
    align-items: center;
}

.bridge-panel h2 {
    color: #fff;
}

.bridge-panel p {
    max-width: 760px;
    color: #cbd8de;
}

.petvoice-bridge .eyebrow {
    color: #8de0d8;
}

.bridge-actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 0.8rem;
}

.read-button.primary {
    background: #fff;
    color: var(--ink);
}

.read-button.primary span {
    background: var(--soft);
    color: var(--teal);
}

.read-button.secondary {
    border: 1px solid rgba(255, 255, 255, 0.16);
    background: rgba(255, 255, 255, 0.08);
    color: #fff;
}

.read-button.secondary span {
    background: rgba(255, 255, 255, 0.1);
}

.insights-list {
    border-top: 1px solid var(--line);
}

.insight-row {
    display: grid;
    grid-template-columns: 56px 180px minmax(0, 1fr) 46px;
    gap: 1.5rem;
    align-items: center;
    padding: 1.4rem 0;
    border-bottom: 1px solid var(--line);
    color: inherit;
    text-decoration: none;
}

.row-number {
    color: var(--teal);
    font-weight: 900;
}

.insight-image {
    aspect-ratio: 4 / 3;
    border-radius: 8px;
    background: var(--soft);
}

.insight-copy h3 {
    font-size: 1.35rem;
}

.insight-copy p {
    max-width: 760px;
}

.row-action {
    display: grid;
    place-items: center;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: var(--soft);
    color: var(--teal);
    transition: transform 0.6s cubic-bezier(0.32, 0.72, 0, 1);
}

.insight-row:hover .row-action {
    transform: translate(2px, -2px);
}

@media (max-width: 992px) {
    .hero-grid,
    .section-heading,
    .bridge-panel,
    .featured-core {
        grid-template-columns: 1fr;
        gap: 2rem;
    }

    .featured-image {
        min-height: 420px;
    }

    .section-heading > p {
        justify-self: start;
    }

    .bridge-actions {
        justify-content: flex-start;
    }
}

@media (max-width: 768px) {
    .media-grid {
        grid-template-columns: 1fr;
    }

    .insight-row {
        grid-template-columns: 42px minmax(0, 1fr) 42px;
        gap: 0.8rem;
    }

    .insight-image {
        display: none;
    }
}

@media (max-width: 576px) {
    .articles-page .container {
        width: 366px;
        max-width: calc(100% - 24px);
        margin-right: 12px;
        margin-left: 12px;
        padding-right: 12px;
        padding-left: 12px;
    }

    .articles-hero {
        padding: 5.75rem 0 4rem;
    }

    .hero-copy h1 {
        font-size: 3.6rem;
    }

    .featured-section,
    .media-section,
    .insights-section {
        padding: 4rem 0;
    }

    .section-bar {
        align-items: flex-start;
        flex-direction: column;
        gap: 0.5rem;
    }

    .featured-shell,
    .media-card-shell {
        padding: 5px;
        border-radius: 12px;
    }

    .featured-core,
    .media-card {
        border-radius: 8px;
    }

    .featured-image {
        min-height: 280px;
    }

    .featured-content {
        padding: 1.5rem;
    }

    .featured-content h2 {
        font-size: 2rem;
    }

    .featured-facts div {
        grid-template-columns: 1fr;
        gap: 0.3rem;
    }

    .bridge-actions,
    .read-button {
        width: 100%;
    }

    .petvoice-bridge {
        padding: 4rem 0;
    }

    .insight-row {
        grid-template-columns: 32px minmax(0, 1fr) 38px;
    }

    .insight-copy h3 {
        font-size: 1.15rem;
    }

    .insight-copy p {
        display: none;
    }
}
</style>
