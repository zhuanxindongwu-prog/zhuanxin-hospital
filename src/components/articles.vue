<template>
    <main class="articles-page">
        <section class="articles-hero py-5">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-10">
                        <nav class="breadcrumb small mb-4">
                            <RouterLink to="/" class="text-decoration-none">首頁</RouterLink>
                            <span class="mx-2 text-muted">/</span>
                            <span class="text-muted">專心快訊</span>
                        </nav>

                        <div class="hero-card rounded-4 p-4 p-md-5 shadow-sm">
                            <span class="badge rounded-pill text-bg-danger mb-3">News & Insights</span>
                            <h1 class="display-6 fw-bold mb-3">專心快訊</h1>
                            <p class="lead text-muted mb-0">
                                整理犬貓心臟疾病、腫瘤照護、症狀判讀與真實案例，
                                讓飼主能用更容易理解的方式，認識毛孩的健康變化。
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="py-5">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-10">
                        <div class="filter-card rounded-4 p-3 p-md-4 mb-4 shadow-sm">
                            <div class="row g-3 align-items-center">
                                <div class="col-lg-5">
                                    <label class="form-label small text-muted mb-1">搜尋文章</label>
                                    <input v-model="searchText" type="search" class="form-control rounded-pill px-4"
                                        placeholder="搜尋：咳嗽、MMVD、心衰竭、貓咪喘氣..." />
                                </div>

                                <div class="col-lg-7">
                                    <label class="form-label small text-muted mb-1">文章分類</label>
                                    <div class="category-scroll">
                                        <button v-for="category in categories" :key="category" type="button"
                                            class="category-btn" :class="{ active: selectedCategory === category }"
                                            @click="selectedCategory = category">
                                            {{ category }}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="d-flex justify-content-between align-items-end mb-3">
                            <div>
                                <h2 class="h4 fw-bold mb-1">{{ selectedCategoryTitle }}</h2>
                                <p class="text-muted mb-0">共 {{ filteredArticles.length }} 篇文章</p>
                            </div>

                            <RouterLink to="/"
                                class="btn btn-outline-secondary rounded-pill px-4 d-none d-md-inline-flex">
                                回首頁
                            </RouterLink>
                        </div>

                        <div v-if="filteredArticles.length" class="article-grid">
                            <RouterLink v-for="article in filteredArticles" :key="article.slug" :to="article.link"
                                class="article-card text-decoration-none">
                                <div class="article-image-wrap">
                                    <img :src="article.image" :alt="article.title" class="article-image" />
                                    <span class="article-category">{{ article.category }}</span>
                                </div>

                                <div class="article-body">
                                    <div class="d-flex align-items-center gap-2 small text-muted mb-2">
                                        <span>{{ article.date }}</span>
                                        <span>•</span>
                                        <span>{{ article.readTime }}</span>
                                    </div>

                                    <h3>{{ article.title }}</h3>
                                    <p>{{ article.excerpt }}</p>

                                    <div class="tag-list">
                                        <span v-for="tag in article.tags" :key="tag">#{{ tag }}</span>
                                    </div>
                                </div>
                            </RouterLink>
                        </div>

                        <div v-else class="empty-state rounded-4 p-5 text-center">
                            <h3 class="fw-bold mb-2">目前沒有符合的文章</h3>
                            <p class="text-muted mb-4">可以換一個關鍵字，或切換到其他分類。</p>
                            <button class="btn btn-danger rounded-pill px-4" @click="resetFilters">
                                清除篩選
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'

const searchText = ref('')
const selectedCategory = ref('全部')

const categories = [
    '全部',
    '飼主教育',
    '症狀判讀',
    '疾病知識',
    '真實案例',
    '醫療觀點',
    '居家照護',
    '腫瘤照護'
]

const articles = [
    {
        slug: 'mmvd-stage-c-survival',
        title: 'MMVD 心臟病狗狗進入心衰竭 C 期後，還有多久時間？',
        category: '疾病知識',
        tags: ['MMVD', '心衰竭', 'C期'],
        excerpt: 'C 期不是馬上沒有時間，而是代表狗狗已經發生過心衰竭，需要長期管理與規律追蹤。',
        image: '/imgs/converted_image_2.png',
        date: '2026-05-15',
        readTime: '約 6 分鐘',
        link: '/post-mmvd-stage-c'
    },
    {
        slug: 'owner-quiz-answer',
        title: '飼主大會考－答案公布',
        category: '飼主教育',
        tags: ['心臟病觀念', '飼主教育'],
        excerpt: '透過問答方式整理常見心臟病觀念，幫助飼主更理解日常觀察與就醫時機。',
        image: '/imgs/dejiang.webp',
        date: '2026-05-10',
        readTime: '約 4 分鐘',
        link: '/post-article-3'
    },
    {
        slug: 'still-beating',
        title: 'Still Beating ～ 不曾停止的心跳',
        category: '真實案例',
        tags: ['病例故事', '心臟病', '長期照護'],
        excerpt: '從病例故事出發，了解心臟疾病治療過程中的風險、選擇與陪伴。',
        image: '/imgs/converted_image.png',
        date: '2026-05-01',
        readTime: '約 5 分鐘',
        link: '/post-article-2'
    },
    {
        slug: 'mmvd-medical-vs-surgery',
        title: '狗狗 MMVD 內科 vs 外科治療？',
        category: '醫療觀點',
        tags: ['MMVD', '內科治療', '外科治療'],
        excerpt: '面對二尖瓣膜疾病，內科藥物與外科手術各有適應症，治療選擇需要個別評估。',
        image: '/imgs/converted_image_2.png',
        date: '2026-04-20',
        readTime: '約 7 分鐘',
        link: '/post-article'
    },
    {
        slug: 'dog-cough-heart-disease',
        title: '狗狗一直咳嗽，一定是心臟病嗎？',
        category: '症狀判讀',
        tags: ['咳嗽', '心臟病', '氣管'],
        excerpt: '狗狗咳嗽不一定都來自心臟，也可能與氣管、支氣管或肺部問題有關。',
        image: '/imgs/all.webp',
        date: '準備中',
        readTime: '約 5 分鐘',
        link: '/articles'
    },
    {
        slug: 'sleeping-respiratory-rate',
        title: '睡眠呼吸速率怎麼算？多少算危險？',
        category: '居家照護',
        tags: ['睡眠呼吸速率', '肺水腫', '居家監測'],
        excerpt: '睡眠呼吸速率是心衰竭狗狗非常重要的居家監測指標，能幫助及早發現惡化。',
        image: '/imgs/all.webp',
        date: '準備中',
        readTime: '約 4 分鐘',
        link: '/articles'
    },
    {
        slug: 'cat-open-mouth-breathing',
        title: '貓咪張嘴喘氣很危險嗎？',
        category: '症狀判讀',
        tags: ['貓咪', '喘氣', '急診警訊'],
        excerpt: '貓咪張嘴呼吸通常不是單純疲累，可能代表嚴重呼吸或心血管問題。',
        image: '/imgs/all.webp',
        date: '準備中',
        readTime: '約 4 分鐘',
        link: '/articles'
    },
    {
        slug: 'tumor-first-visit',
        title: '毛孩發現腫塊後，第一次腫瘤門診會做什麼？',
        category: '腫瘤照護',
        tags: ['腫瘤', '腫塊', '初診'],
        excerpt: '從問診、觸診、細胞學到影像檢查，說明腫瘤初診常見流程。',
        image: '/imgs/all.webp',
        date: '準備中',
        readTime: '約 5 分鐘',
        link: '/articles'
    }
]

const selectedCategoryTitle = computed(() => {
    return selectedCategory.value === '全部' ? '全部文章' : selectedCategory.value
})

const filteredArticles = computed(() => {
    const keyword = searchText.value.trim().toLowerCase()

    return articles.filter((article) => {
        const matchCategory = selectedCategory.value === '全部' || article.category === selectedCategory.value

        const searchableText = [
            article.title,
            article.category,
            article.excerpt,
            ...article.tags
        ]
            .join(' ')
            .toLowerCase()

        const matchKeyword = !keyword || searchableText.includes(keyword)

        return matchCategory && matchKeyword
    })
})

function resetFilters() {
    searchText.value = ''
    selectedCategory.value = '全部'
}
</script>

<style scoped>
.articles-page {
    background: linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%);
    min-height: 100vh;
}

.articles-hero {
    background:
        radial-gradient(circle at top left, rgba(220, 53, 69, 0.1), transparent 34%),
        linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%);
}

.hero-card,
.filter-card,
.empty-state {
    background: rgba(255, 255, 255, 0.92);
    border: 1px solid rgba(0, 0, 0, 0.06);
}

.category-scroll {
    display: flex;
    gap: 0.5rem;
    overflow-x: auto;
    padding-bottom: 0.15rem;
}

.category-btn {
    border: 1px solid rgba(220, 53, 69, 0.2);
    background: #ffffff;
    color: #dc3545;
    border-radius: 999px;
    padding: 0.55rem 1rem;
    white-space: nowrap;
    font-weight: 700;
    transition: all 0.2s ease;
}

.category-btn:hover,
.category-btn.active {
    background: #dc3545;
    color: #ffffff;
    transform: translateY(-1px);
}

.article-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.25rem;
}

.article-card {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-radius: 1.5rem;
    background: #ffffff;
    color: inherit;
    border: 1px solid rgba(0, 0, 0, 0.06);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.05);
    transition: all 0.25s ease;
}

.article-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 18px 44px rgba(220, 53, 69, 0.13);
}

.article-image-wrap {
    position: relative;
    aspect-ratio: 16 / 10;
    overflow: hidden;
    background: #f1f3f5;
}

.article-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.35s ease;
}

.article-card:hover .article-image {
    transform: scale(1.05);
}

.article-category {
    position: absolute;
    left: 1rem;
    top: 1rem;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.92);
    color: #dc3545;
    padding: 0.35rem 0.75rem;
    font-size: 0.85rem;
    font-weight: 800;
}

.article-body {
    padding: 1.25rem;
}

.article-body h3 {
    font-size: 1.12rem;
    line-height: 1.45;
    font-weight: 800;
    margin-bottom: 0.65rem;
}

.article-body p {
    color: #6c757d;
    line-height: 1.75;
    margin-bottom: 1rem;
}

.tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
}

.tag-list span {
    color: #868e96;
    font-size: 0.85rem;
}

@media (max-width: 992px) {
    .article-grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (max-width: 576px) {
    .article-grid {
        grid-template-columns: 1fr;
    }

    .display-6 {
        font-size: 2rem;
    }

    .category-scroll {
        padding-bottom: 0.5rem;
    }
}
</style>
