<template>
    <main class="ohtrust-page">
        <section class="product-hero">
            <div class="container">
                <div class="row align-items-center g-5">
                    <div class="col-lg-6">
                        <p class="section-kicker">Products</p>
                        <h1>賴瓦特 LikeWater</h1>
                        <h2>寵物專用全效清潔防護液</h2>

                        <p class="hero-text">
                            以安全性檢測為基礎，結合溫和配方、抗菌防護與除臭淨味，
                            提供犬貓日常環境清潔與氣味管理的輔助選擇。
                        </p>

                        <div class="hero-badges">
                            <span v-for="item in featureIcons" :key="item.title">
                                {{ item.title }}
                            </span>
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <div class="product-visual-card">
                            <img
                              src="/imgs/optimized/laiwate.webp"
                              alt="賴瓦特 LikeWater 寵物專用全效清潔防護液"
                              width="1280"
                              height="905"
                              fetchpriority="high"
                              decoding="async"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="design-section">
            <div class="container">
                <div class="section-heading">
                    <p>Why LikeWater</p>
                    <h2>為犬貓日常生活打造的溫和清潔防護</h2>
                </div>

                <div class="row g-4">
                    <div class="col-md-4">
                        <div class="info-card">
                            <h3>日常環境清潔</h3>
                            <p>
                                適合用於犬貓生活空間、外出用品、籠舍、睡墊與常接觸表面，
                                協助維持居家環境清爽潔淨。
                            </p>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <div class="info-card">
                            <h3>降低氣味困擾</h3>
                            <p>
                                針對寵物日常生活中常見的環境異味，作為清潔與氣味管理輔助，
                                讓毛孩與家人共享更舒適的生活空間。
                            </p>
                        </div>
                    </div>

                    <div class="col-md-4">
                        <div class="info-card">
                            <h3>安心照護輔助</h3>
                            <p>
                                產品通過多項安全性測試，可作為日常照護中的清潔輔助選擇。
                                使用噴霧類產品時，仍建議保持通風並避免直接噴入口鼻。
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="features-section">
            <div class="container">
                <div class="section-heading">
                    <p>Product Features</p>
                    <h2>產品特色</h2>
                </div>

                <div class="feature-grid">
                    <div v-for="item in featureIcons" :key="item.title" class="feature-card">
                        <div class="feature-icon">
                            <i :class="item.icon"></i>
                        </div>
                        <h3>{{ item.title }}</h3>
                        <p>{{ item.desc }}</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="test-section">
            <div class="container">
                <div class="section-heading">
                    <p>Safety Tests</p>
                    <h2>基本五項安全性測試</h2>
                </div>

                <div class="row g-4">
                    <div v-for="item in basicTests" :key="item.title" class="col-md-6 col-lg-4">
                        <div class="test-card">
                            <div class="test-icon">
                                <i :class="item.icon"></i>
                            </div>
                            <h3>{{ item.title }}</h3>
                            <p>{{ item.description }}</p>
                            <div class="clinical-note">
                                {{ item.meaning }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="target-section">
            <div class="container">
                <div class="target-card">
                    <div>
                        <p class="section-kicker">Suitable For</p>
                        <h2>適用對象</h2>
                        <p>
                            適合犬貓生活環境、籠舍、外出用品、睡墊與日常接觸表面清潔使用。
                        </p>
                    </div>

                    <div class="target-icons">
                        <div>
                            <span class="animal-icon">🐶</span>
                            <strong>全犬種適用</strong>
                        </div>
                        <div>
                            <span class="animal-icon">🐱</span>
                            <strong>全貓種適用</strong>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="report-section">
            <div class="container">
                <div class="section-heading">
                    <p>Safety Reports</p>
                    <h2>檢驗報告</h2>
                </div>

                <div class="report-grid">
                    <a v-for="report in reports" :key="report.name" :href="report.link" target="_blank"
                        rel="noopener noreferrer" class="report-card">
                        <i class="bi bi-file-earmark-pdf"></i>
                        <div>
                            <strong>{{ report.name }}</strong>
                            <span>{{ report.desc }}</span>
                        </div>
                    </a>
                </div>
            </div>
        </section>

        <section class="evidence-section">
            <div class="container">
                <div class="evidence-box">
                    <h2>檢測結果的臨床解讀</h2>

                    <div class="table-responsive">
                        <table class="table align-middle">
                            <thead>
                                <tr>
                                    <th>檢測項目</th>
                                    <th>主要目的</th>
                                    <th>可支持的說法</th>
                                    <th>不宜延伸為</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr v-for="row in evidenceRows" :key="row.test">
                                    <td class="fw-bold">{{ row.test }}</td>
                                    <td>{{ row.purpose }}</td>
                                    <td>{{ row.support }}</td>
                                    <td class="limit-text">{{ row.limit }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>

        <section class="notice-section">
            <div class="container">
                <div class="row g-4">
                    <div class="col-lg-6">
                        <div class="notice-card">
                            <h2>產品定位</h2>
                            <p>
                                LikeWater 較適合定位為
                                <strong>環境清潔、抗菌除臭與日常照護輔助產品</strong>。
                                安全性報告可支持一般接觸情境下的使用安全。
                            </p>
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <div class="notice-card warning">
                            <h2>專業使用提醒</h2>
                            <ul>
                                <li>可作為環境與氣味管理輔助，不可取代醫療級消毒。</li>
                                <li>抗菌或抗病毒實驗多屬實驗室條件，不等於臨床治療效果。</li>
                                <li>貓、幼齡動物、呼吸道疾病或心肺功能不佳個體，使用氣霧產品仍建議保持通風。</li>
                                <li>若動物已有皮膚病、咳嗽、喘鳴或感染問題，仍應由獸醫師診斷治療。</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="faq-section">
            <div class="container">
                <div class="section-heading">
                    <p>FAQ</p>
                    <h2>賴瓦特 LikeWater 常見問題</h2>
                </div>

                <div class="faq-grid">
                    <details v-for="item in faqs" :key="item.question" class="faq-item">
                        <summary>{{ item.question }}</summary>
                        <p>{{ item.answer }}</p>
                    </details>
                </div>
            </div>
        </section>

        <section class="cta-section">
            <div class="container">
                <div class="cta-box">
                    <p class="section-kicker">Safe Daily Care</p>
                    <h2>用更安心的方式，維持犬貓生活環境品質</h2>
                    <p>
                        LikeWater 可作為日常環境清潔與氣味管理的輔助工具，
                        搭配正確通風、環境清潔與獸醫師專業評估，讓照護更完整。
                    </p>

                    <RouterLink to="/#contact" class="cta-button">
                        詢問產品使用方式
                    </RouterLink>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup>
import { productSeo } from '../data/productSeo'

const faqs = productSeo['/ohtrust'].faqs

const featureIcons = [
    {
        title: '溫和配方',
        icon: 'bi bi-droplet',
        desc: '適合日常清潔使用，降低刺激疑慮。',
    },
    {
        title: '抗菌防護',
        icon: 'bi bi-shield-plus',
        desc: '協助維持犬貓生活環境潔淨。',
    },
    {
        title: '除臭淨味',
        icon: 'bi bi-wind',
        desc: '減少異味累積，提升居家舒適度。',
    },
    {
        title: '安心使用',
        icon: 'bi bi-heart',
        desc: '作為日常照護輔助，使用時仍建議保持通風。',
    },
]

const basicTests = [
    {
        title: '皮膚刺激性測試',
        icon: 'bi bi-shield-check',
        description: '評估產品接觸皮膚後是否造成紅腫、刺激或發炎反應。',
        meaning: '可支持日常皮膚接觸安全性，但不代表可治療皮膚疾病。',
    },
    {
        title: '皮膚過敏性測試',
        icon: 'bi bi-droplet-half',
        description: '評估是否可能誘發延遲型接觸性過敏反應。',
        meaning: '有助於判斷長期或反覆接觸時的安全性基礎。',
    },
    {
        title: '急性吸入毒性測試',
        icon: 'bi bi-wind',
        description: '評估短時間吸入噴霧或氣霧後是否造成急性毒性反應。',
        meaning: '可支持一般噴霧情境下的急性安全性，但仍建議通風使用。',
    },
    {
        title: '口服毒性測試',
        icon: 'bi bi-cup-straw',
        description: '評估少量誤食或舔舐後是否具有急性毒性風險。',
        meaning: '可降低誤舔疑慮，但不代表產品可被主動餵食。',
    },
    {
        title: '安定性測試',
        icon: 'bi bi-box-seam',
        description: '評估產品在保存、運輸與一定時間後是否維持穩定。',
        meaning: '可支持產品品質保存與使用期限的合理性。',
    },
]

const reports = [
    {
        name: '皮膚刺激性測試',
        desc: 'Skin irritation SGS report',
        link: 'https://drive.google.com/file/d/1DxXCFqtIUb3kNcN5yknzkyUfM8jjZLNY/preview',
    },
    {
        name: '皮膚過敏性測試',
        desc: 'Delay dermal contact SGS report',
        link: 'https://drive.google.com/file/d/1zYgCZhgxEaGKIF7MkZuv7Xg_R5Vo_Mbx/preview',
    },
    {
        name: '急性吸入毒性測試',
        desc: 'Acute inhalation SGS report',
        link: 'https://drive.google.com/file/d/1ENAhZt2kjeKO7c7NKL9ImoHss-Gn0Gkj/preview',
    },
    {
        name: '口服毒性測試',
        desc: 'Oral toxicity SGS report',
        link: 'https://drive.google.com/file/d/1DrwisT6LICiQDiNBWe8_rnNYFs8iWL32/preview',
    },
    {
        name: '防蟎試驗報告',
        desc: 'Anti-mite test report',
        link: 'https://drive.google.com/file/d/1D-o8HR10fZoSNZD_mXjBPDm5o8LolQRE/preview',
    },
    {
        name: '中文版皮膚刺激性報告',
        desc: '中文皮膚刺激性測試報告',
        link: 'https://drive.google.com/file/d/1p76FPjFWkQuXqQtjnLwmKeL9RNdgAUtA/preview',
    },
]

const evidenceRows = [
    {
        test: '皮膚刺激',
        purpose: '確認接觸皮膚後是否刺激',
        support: '皮膚接觸安全性',
        limit: '治療皮膚病',
    },
    {
        test: '皮膚過敏',
        purpose: '確認是否誘發接觸性過敏',
        support: '反覆接觸安全性',
        limit: '改善過敏體質',
    },
    {
        test: '急性吸入',
        purpose: '確認短期吸入是否有毒性',
        support: '噴霧使用安全性',
        limit: '治療呼吸道疾病',
    },
    {
        test: '口服毒性',
        purpose: '確認誤舔或誤食風險',
        support: '降低誤食毒性疑慮',
        limit: '可食用或可內服',
    },
    {
        test: '安定性',
        purpose: '確認產品保存期間品質穩定',
        support: '保存與品質管理',
        limit: '長期臨床療效',
    },
]
</script>

<style scoped>
.ohtrust-page {
    background: #f8fbff;
    color: #07599d;
}

.product-hero {
    padding: 6rem 0;
    background:
        radial-gradient(circle at top right, rgba(255, 241, 138, 0.55), transparent 34%),
        radial-gradient(circle at bottom left, rgba(42, 167, 225, 0.16), transparent 30%),
        linear-gradient(135deg, #ffffff, #eef9ff);
}

.section-kicker {
    margin-bottom: 0.75rem;
    color: #2aa7e1;
    font-weight: 900;
    letter-spacing: 0.16em;
    text-transform: uppercase;
}

.product-hero h1 {
    margin-bottom: 0.75rem;
    color: #07599d;
    font-size: clamp(3rem, 7vw, 5.2rem);
    font-weight: 900;
    line-height: 1;
}

.product-hero h2 {
    color: #07599d;
    font-size: clamp(1.7rem, 3vw, 2.3rem);
    font-weight: 900;
}

.hero-text {
    max-width: 560px;
    margin-top: 1.5rem;
    color: #246f9f;
    font-size: 1.1rem;
    line-height: 1.9;
}

.hero-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    margin-top: 2rem;
}

.hero-badges span {
    padding: 0.65rem 1rem;
    border-radius: 999px;
    background: #fff18a;
    color: #07599d;
    font-weight: 900;
}

.product-visual-card {
    padding: 2rem;
    border-radius: 2rem;
    background: #fff;
    box-shadow: 0 1.5rem 3rem rgba(7, 89, 157, 0.15);
    text-align: center;
}

.product-visual-card img {
    max-width: 100%;
    border-radius: 1.5rem;
}

.design-section,
.features-section,
.test-section,
.target-section,
.report-section,
.evidence-section,
.notice-section,
.faq-section,
.cta-section {
    padding: 5rem 0;
}

.section-heading {
    margin-bottom: 2.5rem;
    text-align: center;
}

.section-heading p {
    margin-bottom: 0.5rem;
    color: #2aa7e1;
    font-weight: 900;
    letter-spacing: 0.16em;
    text-transform: uppercase;
}

.section-heading h2 {
    color: #07599d;
    font-weight: 900;
}

.info-card,
.feature-card,
.test-card,
.target-card,
.report-card,
.evidence-box,
.notice-card,
.cta-box {
    background: #fff;
    box-shadow: 0 1rem 2.5rem rgba(7, 89, 157, 0.08);
}

.info-card,
.feature-card,
.test-card {
    height: 100%;
    padding: 2rem;
    border-radius: 1.5rem;
}

.info-card h3,
.feature-card h3,
.test-card h3,
.notice-card h2,
.evidence-box h2,
.cta-box h2 {
    color: #07599d;
    font-weight: 900;
}

.info-card p,
.feature-card p,
.test-card p,
.target-card p,
.notice-card p,
.notice-card li,
.cta-box p {
    color: #3f789f;
    line-height: 1.8;
}

.faq-grid {
    display: grid;
    gap: 1rem;
    max-width: 920px;
    margin: 0 auto;
}

.faq-item {
    padding: 1.25rem 1.4rem;
    border: 1px solid #e3f0f8;
    border-radius: 1rem;
    background: #fff;
    box-shadow: 0 1rem 2.5rem rgba(7, 89, 157, 0.06);
}

.faq-item summary {
    color: #07599d;
    cursor: pointer;
    font-weight: 900;
}

.faq-item p {
    margin: 0.9rem 0 0;
    color: #3f789f;
    line-height: 1.8;
}

.feature-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
}

.feature-card {
    text-align: center;
    transition: 0.25s ease;
}

.feature-card:hover,
.test-card:hover,
.report-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 1.3rem 3rem rgba(7, 89, 157, 0.13);
}

.feature-icon,
.test-icon {
    display: grid;
    place-items: center;
    border-radius: 50%;
    color: #07599d;
}

.feature-icon {
    width: 104px;
    height: 104px;
    margin: 0 auto 1.5rem;
    border: 3px solid #2aa7e1;
    background:
        radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.95), transparent 35%),
        linear-gradient(135deg, rgba(42, 167, 225, 0.12), rgba(255, 241, 138, 0.25));
    box-shadow:
        0 14px 28px rgba(42, 167, 225, 0.14),
        inset 0 1px 0 rgba(255, 255, 255, 0.9);
    font-size: 2.6rem;
    transition: 0.3s ease;
}

.feature-card:hover .feature-icon {
    transform: translateY(-4px) scale(1.05);
}

.test-icon {
    width: 56px;
    height: 56px;
    margin: 0 0 1.2rem;
    border: 2px solid rgba(42, 167, 225, 0.35);
    background: #eef9ff;
    font-size: 1.5rem;
}

.clinical-note {
    margin-top: 1rem;
    padding: 0.9rem 1rem;
    border-radius: 1rem;
    background: #eef9ff;
    color: #07599d;
    font-size: 0.95rem;
    font-weight: 800;
    line-height: 1.7;
}

.target-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    padding: 2.5rem;
    border-radius: 2rem;
}

.target-icons {
    display: flex;
    gap: 1rem;
}

.target-icons div {
    min-width: 150px;
    padding: 1.5rem;
    border-radius: 1.2rem;
    background: #eef9ff;
    text-align: center;
}

.animal-icon {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 3rem;
}

.target-icons strong {
    color: #07599d;
}

.report-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
}

.report-card {
    display: flex;
    gap: 1rem;
    align-items: center;
    padding: 1.2rem;
    border: 1px solid #e3f0f8;
    border-radius: 1.2rem;
    color: #07599d;
    text-decoration: none;
    transition: 0.25s ease;
}

.report-card i {
    color: #2aa7e1;
    font-size: 2rem;
}

.report-card strong {
    display: block;
    color: #07599d;
}

.report-card span {
    color: #6f94aa;
    font-size: 0.9rem;
}

.report-card:hover {
    background: #fff18a;
}

.evidence-box,
.notice-card,
.cta-box {
    padding: 2.5rem;
    border-radius: 2rem;
}

.table th {
    color: #07599d;
    white-space: nowrap;
}

.table td {
    color: #3f789f;
}

.limit-text {
    color: #d9534f !important;
    font-weight: 800;
}

.notice-card.warning {
    border-left: 6px solid #fff18a;
}

.notice-card ul {
    padding-left: 1.2rem;
    margin-bottom: 0;
}

.cta-box {
    text-align: center;
    background:
        radial-gradient(circle at top right, rgba(255, 241, 138, 0.5), transparent 32%),
        linear-gradient(135deg, #ffffff, #eef9ff);
}

.cta-box p {
    max-width: 760px;
    margin-right: auto;
    margin-left: auto;
}

.cta-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-top: 1rem;
    padding: 0.85rem 1.6rem;
    border-radius: 999px;
    background: #07599d;
    color: #fff;
    font-weight: 900;
    text-decoration: none;
    transition: 0.25s ease;
}

.cta-button:hover {
    background: #2aa7e1;
    transform: translateY(-2px);
}

@media (max-width: 992px) {
    .product-hero {
        padding: 4.5rem 0;
        text-align: center;
    }

    .hero-text {
        margin-right: auto;
        margin-left: auto;
    }

    .hero-badges {
        justify-content: center;
    }

    .feature-grid,
    .report-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .target-card {
        flex-direction: column;
        align-items: flex-start;
    }
}

@media (max-width: 576px) {

    .design-section,
    .features-section,
    .test-section,
    .target-section,
    .report-section,
    .evidence-section,
    .notice-section,
    .faq-section,
    .cta-section {
        padding: 3.5rem 0;
    }

    .feature-grid,
    .report-grid {
        grid-template-columns: 1fr;
    }

    .target-icons {
        width: 100%;
        flex-direction: column;
    }

    .target-icons div {
        width: 100%;
    }

    .evidence-box,
    .notice-card,
    .cta-box {
        padding: 1.5rem;
    }

    .table {
        font-size: 0.9rem;
    }
}
</style>
