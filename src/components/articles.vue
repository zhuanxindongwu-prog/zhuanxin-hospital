<template>
    <main class="articles-page">
        <section class="articles-hero">
            <div class="container">
                <p class="section-kicker">News & Insights</p>
                <h1>專心快訊</h1>
                <p>
                    整理犬貓心臟疾病、腫瘤照護、日常觀察與醫療觀點，
                    幫助飼主更理解症狀、疾病與就醫時機。
                </p>
            </div>
        </section>

        <section class="articles-section">
            <div class="container">
                <div class="article-list">
                    <RouterLink v-for="article in articles" :key="article.title" :to="article.link"
                        class="article-item">
                        <div class="article-thumb-wrap">
                            <img :src="article.image" :alt="article.title" class="article-thumb" />
                        </div>

                        <div class="article-content">
                            <div class="article-meta">
                                <span class="article-category">{{ article.category }}</span>
                                <span class="article-label">{{ article.label }}</span>
                            </div>

                            <h2>{{ article.title }}</h2>

                            <p>{{ article.description }}</p>

                            <span class="article-link">
                                閱讀文章
                                <span>→</span>
                            </span>
                        </div>
                    </RouterLink>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup>
const articles = [
    {
        title: '飼主大會考－答案公布',
        label: 'Owner Education',
        category: '飼主教育',
        image: '/imgs/dejiang.webp',
        link: '/post-article-3',
        description:
            '透過問答方式整理常見心臟病觀念，幫助飼主理解日常觀察與就醫時機。',
    },
    {
        title: 'Still Beating ～ 不曾停止的心跳',
        label: 'Case Story',
        category: '真實案例',
        image: '/imgs/converted_image.png',
        link: '/post-article-2',
        description:
            '從病例故事出發，了解心臟疾病治療過程中的風險、選擇與陪伴。',
    },
    {
        title: '狗狗 MMVD 內科 vs 外科治療？',
        label: 'Medical Insight',
        category: '醫療觀點',
        image: '/imgs/converted_image_2.png',
        link: '/post-article',
        description:
            '面對二尖瓣膜疾病，內科藥物與外科手術各有適應症，治療選擇需要個別評估。',
    },
    {
        title: '毛孩的心臟，正在默默承受你看不見的壓力',
        label: 'Heart Disease Awareness',
        category: '心臟疾病',
        image: '/imgs/毛孩的心臟.png',
        link: '/heart-pressure',
        description:
            '咳嗽、喘氣、活動力下降，可能不是單純老化，而是心臟正在承受壓力。從日常細節了解犬貓心臟病早期可能出現的變化。',
    },
]
</script>

<style scoped>
.articles-page {
    background: #f7f9fc;
    color: #172033;
}

.articles-hero {
    padding: 6rem 0 4rem;
    background:
        radial-gradient(circle at top right, rgba(56, 103, 255, 0.14), transparent 35%),
        linear-gradient(135deg, #ffffff, #eef3fb);
}

.section-kicker {
    margin-bottom: 0.75rem;
    color: #6f7d95;
    font-size: 0.86rem;
    font-weight: 900;
    letter-spacing: 0.16em;
    text-transform: uppercase;
}

.articles-hero h1 {
    margin-bottom: 1rem;
    color: #18223a;
    font-size: clamp(2.8rem, 6vw, 5rem);
    font-weight: 900;
}

.articles-hero p {
    max-width: 720px;
    color: #64748b;
    font-size: 1.12rem;
    line-height: 1.9;
}

.articles-section {
    padding: 4rem 0 5rem;
}

.article-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.article-item {
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 2rem;
    align-items: stretch;
    padding: 1.2rem;
    border-radius: 1.8rem;
    background: #fff;
    color: inherit;
    text-decoration: none;
    box-shadow: 0 1rem 2.6rem rgba(20, 35, 60, 0.08);
    transition: 0.3s ease;
}

.article-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 1.4rem 3rem rgba(20, 35, 60, 0.13);
}

.article-thumb-wrap {
    width: 100%;
    height: 190px;
    overflow: hidden;
    border-radius: 1.3rem;
    background: #eef3fb;
}

.article-thumb {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: 0.45s ease;
}

.article-item:hover .article-thumb {
    transform: scale(1.04);
}

.article-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0.6rem 0.6rem 0.6rem 0;
}

.article-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.7rem;
    margin-bottom: 0.8rem;
}

.article-category {
    padding: 0.42rem 0.85rem;
    border-radius: 999px;
    background: #172033;
    color: #fff;
    font-size: 0.78rem;
    font-weight: 900;
}

.article-label {
    display: inline-flex;
    align-items: center;
    color: #6f7d95;
    font-size: 0.8rem;
    font-weight: 900;
    letter-spacing: 0.12em;
    text-transform: uppercase;
}

.article-content h2 {
    margin-bottom: 0.8rem;
    color: #172033;
    font-size: 1.55rem;
    font-weight: 900;
    line-height: 1.35;
}

.article-content p {
    max-width: 760px;
    margin-bottom: 1.1rem;
    color: #64748b;
    line-height: 1.85;
}

.article-link {
    width: fit-content;
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    margin-top: auto;
    color: #3867ff;
    font-weight: 900;
}

.article-item:hover .article-link {
    color: #172033;
}

@media (max-width: 768px) {
    .article-item {
        grid-template-columns: 1fr;
        gap: 1.2rem;
    }

    .article-content {
        padding: 0;
    }

    .article-thumb-wrap {
        height: 220px;
    }
}

@media (max-width: 576px) {
    .articles-hero {
        padding: 4.5rem 0 3rem;
    }

    .articles-section {
        padding: 3rem 0 4rem;
    }

    .article-item {
        padding: 1rem;
        border-radius: 1.4rem;
    }

    .article-thumb-wrap {
        height: 200px;
    }

    .article-content h2 {
        font-size: 1.3rem;
    }
}
</style>