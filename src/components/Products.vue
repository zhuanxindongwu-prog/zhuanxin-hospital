<template>
    <main class="products-page">
        <section class="products-hero">
            <div class="container">
                <p class="section-label">Products</p>

                <h1>照護產品</h1>

                <p class="hero-subtitle">
                    提供犬貓日常環境清潔、氣味管理與照護輔助產品，
                    以安全性檢測為基礎，作為醫療之外的輔助選擇。
                </p>
            </div>
        </section>

        <section class="products-section py-5">
            <div class="container">
                <div class="row g-4">
                    <div class="col-lg-6">
                        <RouterLink to="/ohtrust" class="product-card">
                            <div class="product-image-wrap">
                                <!-- <img src="/imgs/ohtrust.png" alt="賴瓦特產品" class="product-image" /> -->

                                <span class="product-badge">環境清潔輔助</span>
                            </div>

                            <div class="product-body">
                                <p class="product-label">OH Trust</p>

                                <h2>賴瓦特</h2>

                                <p>
                                    抗菌、除臭與環境清潔輔助產品，
                                    通過多項安全性測試，適用於犬貓日常環境管理。
                                </p>

                                <span class="product-link">
                                    查看產品
                                </span>
                            </div>
                        </RouterLink>
                    </div>

                    <div class="col-lg-6">
                        <RouterLink to="/petvoice" class="product-card petvoice-card">
                            <div class="product-image-wrap">

                                <img src="/imgs/petvoice.png" alt="PetVoice 智慧健康監測" class="product-image" />

                                <span class="product-badge">
                                    智慧健康監測
                                </span>
                            </div>

                            <div class="product-body">
                                <p class="product-label">PetVoice</p>

                                <h2>PetVoice</h2>

                                <p>
                                    透過智慧項圈持續監測毛孩的呼吸、活動量、
                                    睡眠與日常健康趨勢，協助飼主與獸醫師
                                    更早發現異常變化，提供居家健康照護支援。
                                </p>

                                <ul class="product-features">
                                    <li>16 項健康監測</li>
                                    <li>居家呼吸監測</li>
                                    <li>心臟病照護應用</li>
                                    <li>動物醫院合作平台</li>
                                </ul>

                                <span class="product-link">
                                    查看產品
                                    <i class="bi bi-arrow-right"></i>
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

                <div class="products-note mt-5">
                    <div>
                        <p class="note-label">Care Reminder</p>
                        <h3>照護產品不能取代醫療診斷</h3>
                        <p>
                            若毛孩出現咳嗽、喘氣、昏倒、活動力下降或食慾異常，
                            建議優先安排獸醫師評估。
                        </p>
                    </div>

                    <RouterLink to="/appointment" class="note-btn">
                        安排專科評估
                    </RouterLink>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.products-page {
    padding-top: 96px;
    background: #f8fafc;
}

.products-hero {
    position: relative;
    overflow: hidden;
    padding: 5rem 0 4rem;
    background:
        radial-gradient(circle at 15% 20%, rgba(37, 99, 235, 0.18), transparent 32%),
        linear-gradient(135deg, #0f172a, #1e3a8a);
    color: #ffffff;
}

.products-hero::after {
    content: "";
    position: absolute;
    right: -120px;
    bottom: -120px;
    width: 320px;
    height: 320px;
    border-radius: 50%;
    background: rgba(96, 165, 250, 0.18);
    filter: blur(8px);
}

.section-label {
    display: inline-block;
    margin-bottom: 0.8rem;
    color: #bfdbfe;
    font-size: 0.85rem;
    font-weight: 900;
    letter-spacing: 0.14em;
    text-transform: uppercase;
}

.products-hero h1 {
    font-size: clamp(2.4rem, 5vw, 4.2rem);
    font-weight: 900;
    letter-spacing: -0.04em;
    margin-bottom: 1rem;
}

.hero-subtitle {
    max-width: 760px;
    color: #dbeafe;
    font-size: 1.1rem;
    line-height: 1.9;
    margin-bottom: 0;
}

.products-section {
    background:
        linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
}

.product-card,
.coming-card {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    border-radius: 1.8rem;
    background: #ffffff;
    border: 1px solid rgba(148, 163, 184, 0.22);
    box-shadow: 0 18px 45px rgba(15, 23, 42, 0.08);
}

.product-card {
    color: inherit;
    text-decoration: none;
    transition:
        transform 0.28s ease,
        box-shadow 0.28s ease,
        border-color 0.28s ease;
}

.product-card:hover {
    transform: translateY(-8px);
    border-color: rgba(37, 99, 235, 0.35);
    box-shadow:
        0 28px 70px rgba(15, 23, 42, 0.14),
        0 0 24px rgba(37, 99, 235, 0.12);
}

.product-image-wrap {
    position: relative;
    aspect-ratio: 16 / 10;
    overflow: hidden;
    background: #e2e8f0;
}

.product-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.55s ease;
}

.product-card:hover .product-image {
    transform: scale(1.06);
}

.product-badge {
    position: absolute;
    left: 1rem;
    top: 1rem;
    padding: 0.42rem 0.78rem;
    border-radius: 999px;
    background: rgba(15, 23, 42, 0.76);
    color: #ffffff;
    font-size: 0.82rem;
    font-weight: 800;
    backdrop-filter: blur(8px);
}

.product-body,
.coming-card {
    padding: 1.7rem;
}

.product-label {
    margin-bottom: 0.55rem;
    color: #2563eb;
    font-size: 0.82rem;
    font-weight: 900;
    letter-spacing: 0.12em;
    text-transform: uppercase;
}

.product-body h2,
.coming-card h2 {
    color: #0f172a;
    font-size: 1.6rem;
    font-weight: 900;
    margin-bottom: 0.8rem;
}

.product-body p,
.coming-card p {
    color: #64748b;
    line-height: 1.85;
}

.product-link {
    display: inline-flex;
    width: fit-content;
    margin-top: 0.8rem;
    padding: 0.75rem 1.1rem;
    border-radius: 999px;
    background: #eff6ff;
    color: #2563eb;
    font-weight: 900;
    transition:
        background 0.25s ease,
        color 0.25s ease,
        transform 0.25s ease;
}

.product-card:hover .product-link {
    background: #2563eb;
    color: #ffffff;
    transform: translateY(-2px);
}

.coming-card {
    justify-content: center;
    min-height: 100%;
    background:
        radial-gradient(circle at 80% 20%, rgba(37, 99, 235, 0.12), transparent 30%),
        #ffffff;
}

.products-note {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    padding: 2rem;
    border-radius: 1.8rem;
    background:
        linear-gradient(135deg, #0f172a, #1e3a8a);
    color: #ffffff;
    box-shadow: 0 24px 70px rgba(15, 23, 42, 0.22);
}

.note-label {
    margin-bottom: 0.5rem;
    color: #bfdbfe;
    font-size: 0.85rem;
    font-weight: 900;
    letter-spacing: 0.12em;
    text-transform: uppercase;
}

.products-note h3 {
    font-weight: 900;
    margin-bottom: 0.75rem;
}

.products-note p {
    color: #dbeafe;
    line-height: 1.8;
    margin-bottom: 0;
}

.note-btn {
    flex-shrink: 0;
    padding: 0.85rem 1.4rem;
    border-radius: 999px;
    background: #ffffff;
    color: #1e3a8a;
    font-weight: 900;
    text-decoration: none;
    transition:
        transform 0.25s ease,
        box-shadow 0.25s ease;
}

.note-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 30px rgba(255, 255, 255, 0.25);
}

@media (max-width: 768px) {
    .products-page {
        padding-top: 86px;
    }

    .products-hero {
        padding: 4rem 0 3rem;
    }

    .products-note {
        flex-direction: column;
        align-items: flex-start;
    }

    .note-btn {
        width: 100%;
        text-align: center;
    }
}
</style>