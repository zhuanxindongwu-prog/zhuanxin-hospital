<template>
    <main class="products-page">
        <section class="products-hero">
            <div class="container">
                <p class="section-kicker">Products</p>
                <h1>照護產品</h1>
                <p>
                    提供犬貓日常環境清潔、氣味管理與居家健康監測輔助產品，
                    以安全性檢測與臨床照護需求為基礎，作為醫療之外的照護支援。
                </p>
            </div>
        </section>

        <section class="products-section">
            <div class="container">
                <div class="row g-4 align-items-stretch">
                    <div v-for="product in products" :key="product.title" class="col-lg-6">
                        <RouterLink :to="product.link" class="product-card">
                            <div class="product-image-wrap">
                                <img
                                    :src="product.image"
                                    :alt="product.alt"
                                    class="product-image"
                                    loading="lazy"
                                    decoding="async"
                                />

                                <span class="product-badge">
                                    {{ product.badge }}
                                </span>
                            </div>

                            <div class="product-body">
                                <p class="product-label">{{ product.label }}</p>

                                <h2>{{ product.title }}</h2>

                                <p>{{ product.description }}</p>

                                <span class="product-link">
                                    查看產品
                                    <span>→</span>
                                </span>
                            </div>
                        </RouterLink>
                    </div>

                    <div class="col-lg-6">
                        <div class="coming-card">
                            <p class="product-label">Coming Soon</p>
                            <h2>更多照護產品規劃中</h2>
                            <p>
                                未來可依照不同照護需求，新增營養、環境、居家監測或慢性病照護相關產品。
                            </p>
                        </div>
                    </div>
                </div>

                <div class="care-reminder">
                    <div>
                        <p class="section-kicker">Care Reminder</p>
                        <h2>照護產品不能取代醫療診斷</h2>
                        <p>
                            若毛孩出現咳嗽、喘氣、昏倒、活動力下降或食慾異常，
                            建議優先安排獸醫師評估。
                        </p>
                    </div>

                    <a href="tel:0223633016" class="reminder-button">
                        電話洽詢
                    </a>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup>
const products = [
    {
        label: 'Pet Care Cleaning',
        title: '賴瓦特 LikeWater',
        badge: '環境清潔輔助',
        image: '/imgs/optimized/laiwate.webp',
        alt: '賴瓦特 LikeWater 寵物專用全效清潔防護液',
        link: '/ohtrust',
        description:
            '抗菌、除臭與環境清潔輔助產品，通過多項安全性測試，適用於犬貓日常環境管理。',
    },
    {
        label: 'PetVoice',
        title: 'PetVoice',
        badge: '智慧健康監測',
        image: '/imgs/optimized/petvoice.webp',
        alt: 'PetVoice 智慧健康監測',
        link: '/petvoice',
        description:
            '透過智慧項圈持續監測毛孩的呼吸、活動量、睡眠與日常健康趨勢，協助飼主與獸醫師更早發現異常變化。',
    },
]
</script>

<style scoped>
.products-page {
    background: #f7f9fc;
    color: #172033;
}

.products-hero {
    padding: 6rem 0 4rem;
    background:
        radial-gradient(circle at top right, rgba(89, 126, 247, 0.14), transparent 35%),
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

.products-hero h1 {
    margin-bottom: 1rem;
    color: #18223a;
    font-size: clamp(2.8rem, 6vw, 5rem);
    font-weight: 900;
}

.products-hero p {
    max-width: 680px;
    color: #64748b;
    font-size: 1.12rem;
    line-height: 1.9;
}

.products-section {
    padding: 4rem 0 5rem;
}

.product-card,
.coming-card {
    height: 100%;
    min-height: 620px;
    border-radius: 2rem;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 1.2rem 3rem rgba(20, 35, 60, 0.08);
}

.product-card {
    display: flex;
    flex-direction: column;
    color: inherit;
    text-decoration: none;
    transition: 0.3s ease;
}

.product-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 1.6rem 3.4rem rgba(20, 35, 60, 0.13);
}

.product-image-wrap {
    position: relative;
    height: 260px;
    background: #eef3fb;
    overflow: hidden;
}

.product-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: 0.45s ease;
}

.product-card:hover .product-image {
    transform: scale(1.04);
}

.product-badge {
    position: absolute;
    top: 1.2rem;
    left: 1.2rem;
    z-index: 2;
    padding: 0.55rem 1rem;
    border-radius: 999px;
    background: rgba(24, 34, 58, 0.86);
    color: #fff;
    font-size: 0.86rem;
    font-weight: 900;
}

.product-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 2rem;
}

.product-label {
    margin-bottom: 0.75rem;
    color: #6f7d95;
    font-size: 0.86rem;
    font-weight: 900;
    letter-spacing: 0.14em;
    text-transform: uppercase;
}

.product-body h2,
.coming-card h2,
.care-reminder h2 {
    margin-bottom: 1rem;
    color: #172033;
    font-weight: 900;
}

.product-body p,
.coming-card p,
.care-reminder p {
    color: #64748b;
    line-height: 1.9;
}

.product-link {
    width: fit-content;
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    margin-top: auto;
    padding: 0.75rem 1.15rem;
    border-radius: 999px;
    background: #eef3ff;
    color: #3867ff;
    font-weight: 900;
    transition: 0.25s ease;
}

.product-card:hover .product-link {
    background: #3867ff;
    color: #fff;
}

.coming-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 2rem;
    border: 1px dashed rgba(100, 116, 139, 0.28);
    background:
        radial-gradient(circle at top right, rgba(89, 126, 247, 0.08), transparent 35%),
        #fff;
}

.care-reminder {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    margin-top: 4rem;
    padding: 2.5rem;
    border-radius: 2rem;
    background: linear-gradient(135deg, #172033, #243554);
    color: #fff;
    box-shadow: 0 1.4rem 3rem rgba(20, 35, 60, 0.16);
}

.care-reminder h2,
.care-reminder p {
    color: #fff;
}

.care-reminder p {
    max-width: 760px;
    opacity: 0.82;
}

.reminder-button {
    flex-shrink: 0;
    padding: 0.85rem 1.4rem;
    border-radius: 999px;
    background: #fff;
    color: #172033;
    font-weight: 900;
    text-decoration: none;
    transition: 0.25s ease;
}

.reminder-button:hover {
    transform: translateY(-2px);
    background: #eef3ff;
}

@media (max-width: 992px) {

    .product-card,
    .coming-card {
        min-height: auto;
    }

    .care-reminder {
        flex-direction: column;
        align-items: flex-start;
    }
}

@media (max-width: 576px) {
    .products-hero {
        padding: 4.5rem 0 3rem;
    }

    .products-section {
        padding: 3rem 0 4rem;
    }

    .product-image-wrap {
        height: 220px;
    }

    .product-body,
    .coming-card,
    .care-reminder {
        padding: 1.5rem;
    }
}
</style>
