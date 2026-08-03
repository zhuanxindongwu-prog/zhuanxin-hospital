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
                            五份已公開的生物相容性評估報告可供查閱，
                            讓使用者依原始資料了解各項試驗的條件與結果。
                        </p>

                        <dl class="hero-stat-grid" aria-label="賴瓦特 LikeWater 產品重點">
                            <div v-for="stat in heroStats" :key="stat.label">
                                <dt>{{ stat.value }}</dt>
                                <dd>{{ stat.label }}</dd>
                            </div>
                        </dl>

                        <div class="hero-actions">
                            <a href="#evidence-dossier" class="product-btn primary">
                                查看報告資料
                                <span aria-hidden="true"><i class="bi bi-shield-check"></i></span>
                            </a>
                            <a href="#use-and-limits" class="product-btn secondary">
                                使用與限制
                                <span aria-hidden="true"><i class="bi bi-file-earmark-text"></i></span>
                            </a>
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <div class="product-visual-shell">
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
                            <div class="floating-proof-card top">
                                <span><i class="bi bi-droplet"></i></span>
                                <div>
                                    <strong>Daily Surface Care</strong>
                                    <small>生活空間與用品清潔</small>
                                </div>
                            </div>
                            <div class="floating-proof-card bottom">
                                <span><i class="bi bi-clipboard2-check"></i></span>
                                <div>
                                    <strong>Biocompatibility</strong>
                                    <small>完整生物相容性檢驗組合</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="design-section">
            <div class="container">
                <div class="section-heading">
                    <p>Product Use</p>
                    <h2>日常環境清潔與氣味管理</h2>
                </div>

                <div class="info-card">
                    <p>
                        LikeWater 可用於犬貓生活環境的常接觸表面、外出與日常用品清潔，並作為異味管理的輔助選擇。
                        使用噴霧產品時請保持通風，並避免直接噴入動物的眼睛、鼻子或口腔。
                    </p>
                </div>
            </div>
        </section>

        <section id="evidence-dossier" class="report-section">
            <div class="container">
                <div class="evidence-dossier-layout">
                    <aside class="evidence-summary">
                        <p class="section-kicker">Evidence Dossier</p>
                        <h2>五份公開生物相容性報告</h2>
                        <p>
                            每份報告評估特定生物反應，結果限於各自載明的試驗條件、模型與觀察時間。
                        </p>
                        <a href="#use-and-limits">查看報告可支持與不能代表的範圍</a>
                    </aside>

                    <div class="report-records">
                        <article v-for="report in reports" :key="report.reportNumber" class="report-record">
                            <p class="report-sequence">{{ report.sequence }}</p>
                            <div>
                                <h3>{{ report.name }}</h3>
                                <p>{{ report.englishName }}</p>
                            </div>
                            <dl>
                                <div>
                                    <dt>報告編號</dt>
                                    <dd>{{ report.reportNumber }}</dd>
                                </div>
                                <div>
                                    <dt>標準</dt>
                                    <dd>{{ report.standard }}</dd>
                                </div>
                                <div>
                                    <dt>模型與方法</dt>
                                    <dd>{{ report.model }}</dd>
                                </div>
                            </dl>
                            <div class="report-result">
                                <strong>報告結果</strong>
                                <p>{{ report.finding }}</p>
                            </div>
                            <a :href="report.link" target="_blank" rel="noopener noreferrer"
                                :aria-label="`開啟 ${report.name}（${report.englishName}）PDF 報告`">
                                開啟 {{ report.name }} PDF 報告
                            </a>
                        </article>
                    </div>
                </div>
            </div>
        </section>

        <section id="use-and-limits" class="evidence-section">
            <div class="container">
                <div class="evidence-boundary-grid">
                    <div>
                        <h2>報告可以支持</h2>
                        <ul>
                            <li v-for="claim in supportedClaims" :key="claim">{{ claim }}</li>
                        </ul>
                    </div>
                    <div>
                        <h2>報告不能代表</h2>
                        <ul>
                            <li v-for="claim in unsupportedClaims" :key="claim">{{ claim }}</li>
                        </ul>
                    </div>
                </div>
                <p>頁面摘要如與原始 PDF 報告不同，以原始 PDF 報告為準。</p>
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
                        <span aria-hidden="true"><i class="bi bi-arrow-right"></i></span>
                    </RouterLink>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup>
import { productSeo } from '../data/productSeo'

const faqs = productSeo['/ohtrust'].faqs

const heroStats = [
    {
        value: '5',
        label: '份原始報告',
    },
    {
        value: '5',
        label: '項生物相容性評估',
    },
    {
        value: 'PDF',
        label: '完整內容可查閱',
    },
]

const reports = [
    {
        sequence: '01',
        name: '體外細胞毒性試驗',
        englishName: 'In Vitro Cytotoxicity Test',
        reportNumber: '23S186CE-01-R01',
        standard: 'ISO 10993-5:2009 and EN ISO 10993-5:2009',
        model: 'mouse fibroblast L929 cells; qualitative morphology assessment and quantitative MTT assay after 24-hour treatment with the test article extract.',
        finding: '定性與定量結果均為零反應，未觀察到體外細胞毒性；在研究條件下，測試品萃取液未觀察到體外細胞毒性。',
        link: '/reports/relano-in-vitro-cytotoxicity.pdf',
    },
    {
        sequence: '02',
        name: '兔子皮內刺激研究',
        englishName: 'Intracutaneous Irritation Study in Rabbits',
        reportNumber: 'TW025-23020L01',
        standard: 'ISO 10993-23:2021',
        model: 'three rabbits; polar and non-polar extracts injected intracutaneously, with erythema and edema assessed at 24, 48, and 72 hours.',
        finding: '未觀察到紅斑或水腫，反應評定為可忽略；試驗組與對照組平均分數差異為 0.0。',
        link: '/reports/relano-intracutaneous-irritation-rabbits.pdf',
    },
    {
        sequence: '03',
        name: '急性全身毒性研究',
        englishName: 'Acute Systemic Toxicity Study',
        reportNumber: '23S186T04-01-R01',
        standard: 'ISO 10993-11:2017',
        model: 'mice receiving polar and non-polar test article extracts, with systemic responses assessed through 72 hours.',
        finding: '在研究條件下，測試品萃取液未造成毒性反應或死亡；處置動物未顯示高於對照組的生物反應。',
        link: '/reports/relano-acute-systemic-toxicity.pdf',
    },
    {
        sequence: '04',
        name: '皮膚致敏測試',
        englishName: 'Skin Sensitisation Test (Guinea Pig Maximisation Test)',
        reportNumber: 'TW025-23021L01',
        standard: 'ISO 10993-10:2021',
        model: 'guinea pig maximisation test using polar and non-polar extracts, with dermal reactions scored 24 and 48 hours after challenge-patch removal.',
        finding: '在研究條件下，兩種萃取液均未產生皮膚致敏反應；本試驗中測試品未被視為致敏劑。',
        link: '/reports/relano-skin-sensitisation.pdf',
    },
    {
        sequence: '05',
        name: '兔子熱原研究',
        englishName: 'Pyrogen Study in Rabbits',
        reportNumber: '23S186T09-01-R01',
        standard: 'USP 45/NF40:2022 <151> and ISO/TR 21582:2021',
        model: 'three New Zealand White rabbits receiving a single intravenous dose of the test article extract; body temperature measured five times after dosing.',
        finding: '體溫上升分別為 0.12°C、0.04°C 與 0.09°C；熱原反應為陰性，且萃取液符合報告所列無熱原要求。',
        link: '/reports/relano-pyrogen-study-rabbits.pdf',
    },
]

const supportedClaims = [
    '五份報告分別評估特定生物反應，且結果限於各自報告所載的試驗條件。',
    '原始 PDF 可用於查核試驗方法、模型、觀察時間與報告結論。',
]

const unsupportedClaims = [
    '不代表疾病治療效果或可取代獸醫診療。',
    '不代表醫療級消毒、所有接觸部位或所有暴露途徑皆適用。',
    '不代表每一隻動物在任何情境下皆為零風險。',
]
</script>

<style scoped>
.ohtrust-page {
    background: #f8fbff;
    color: #006b70;
}

.product-hero {
    padding: 6rem 0;
    background:
        radial-gradient(circle at top right, rgba(255, 241, 138, 0.55), transparent 34%),
        radial-gradient(circle at bottom left, rgba(105, 150, 74, 0.16), transparent 30%),
        linear-gradient(135deg, #ffffff, #e8f3f3);
}

.section-kicker {
    margin-bottom: 0.75rem;
    color: #69964a;
    font-weight: 900;
    letter-spacing: 0.16em;
    text-transform: uppercase;
}

.product-hero h1 {
    margin-bottom: 0.75rem;
    color: #006b70;
    font-size: clamp(3rem, 7vw, 5.2rem);
    font-weight: 900;
    line-height: 1;
}

.product-hero h2 {
    color: #006b70;
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
    color: #006b70;
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
    color: #69964a;
    font-weight: 900;
    letter-spacing: 0.16em;
    text-transform: uppercase;
}

.section-heading h2 {
    color: #006b70;
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
    color: #006b70;
    font-weight: 900;
}

.info-card p,
.feature-card p,
.test-card p,
.target-card p,
.notice-card p,
.notice-card li,
.cta-box p {
    color: #006b70;
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
    border: 1px solid #e8f3f3;
    border-radius: 1rem;
    background: #fff;
    box-shadow: 0 1rem 2.5rem rgba(7, 89, 157, 0.06);
}

.faq-item summary {
    color: #006b70;
    cursor: pointer;
    font-weight: 900;
}

.faq-item p {
    margin: 0.9rem 0 0;
    color: #006b70;
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
    color: #006b70;
}

.feature-icon {
    width: 104px;
    height: 104px;
    margin: 0 auto 1.5rem;
    border: 3px solid #69964a;
    background:
        radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.95), transparent 35%),
        linear-gradient(135deg, rgba(105, 150, 74, 0.12), rgba(255, 241, 138, 0.25));
    box-shadow:
        0 14px 28px rgba(105, 150, 74, 0.14),
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
    border: 2px solid rgba(105, 150, 74, 0.35);
    background: #e8f3f3;
    font-size: 1.5rem;
}

.clinical-note {
    margin-top: 1rem;
    padding: 0.9rem 1rem;
    border-radius: 1rem;
    background: #e8f3f3;
    color: #006b70;
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
    background: #e8f3f3;
    text-align: center;
}

.animal-icon {
    display: block;
    margin-bottom: 0.5rem;
    font-size: 3rem;
}

.target-icons strong {
    color: #006b70;
}

.report-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
}

.report-section-intro {
    max-width: 860px;
    margin: -1rem auto 2.5rem;
    color: #3f6768;
    text-align: center;
}

.report-section-intro p {
    margin-bottom: 0.5rem;
    font-size: 1.05rem;
    font-weight: 700;
    line-height: 1.8;
}

.report-section-intro small {
    color: #6f8889;
    line-height: 1.6;
}

.report-card {
    display: flex;
    align-items: center;
    gap: 1rem;
    min-height: 132px;
    padding: 1.5rem;
    border: 1px solid #e8f3f3;
    border-radius: 8px;
    color: #006b70;
    text-decoration: none;
    transition: 0.25s ease;
}

.report-card i {
    flex: 0 0 auto;
    color: #69964a;
    font-size: 2rem;
}

.report-card strong {
    display: block;
    color: #006b70;
    font-weight: 900;
}

.report-card span {
    display: block;
    margin-top: 0.35rem;
    color: #6f94aa;
    font-size: 0.9rem;
    line-height: 1.5;
}

.report-card:hover {
    background: #fff;
}

.evidence-box,
.notice-card,
.cta-box {
    padding: 2.5rem;
    border-radius: 2rem;
}

.table th {
    color: #006b70;
    white-space: nowrap;
}

.table td {
    color: #006b70;
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
        linear-gradient(135deg, #ffffff, #e8f3f3);
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
    background: #006b70;
    color: #fff;
    font-weight: 900;
    text-decoration: none;
    transition: 0.25s ease;
}

.cta-button:hover {
    background: #69964a;
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

/* Refined product-page system */
.ohtrust-page {
    --lw-ink: #102838;
    --lw-muted: #567184;
    --lw-blue: #176ba0;
    --lw-blue-dark: #0e4e78;
    --lw-aqua: #dff4f1;
    --lw-silver: #f4f8fa;
    --lw-line: rgba(16, 40, 56, 0.12);
    --lw-shadow: 0 18px 46px rgba(16, 40, 56, 0.09);
    overflow-x: clip;
    background: #f7fafb;
    color: var(--lw-ink);
    text-align: left;
}

.ohtrust-page,
.ohtrust-page * {
    box-sizing: border-box;
}

.product-hero {
    position: relative;
    overflow: hidden;
    padding: 6.5rem 0 5.5rem;
    background:
        linear-gradient(120deg, rgba(255, 255, 255, 0.97), rgba(232, 246, 248, 0.92)),
        repeating-linear-gradient(90deg, rgba(16, 40, 56, 0.035) 0 1px, transparent 1px 96px);
}

.product-hero::after {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(16, 40, 56, 0.18), transparent);
    content: "";
}

.section-kicker,
.section-heading p {
    margin-bottom: 0.7rem;
    color: var(--lw-blue);
    font-size: 0.84rem;
    font-weight: 900;
    text-transform: uppercase;
}

.product-hero h1 {
    margin: 0;
    color: var(--lw-ink);
    font-size: 5rem;
    font-weight: 900;
    line-height: 1.05;
}

.product-hero h2 {
    margin-top: 0.8rem;
    color: var(--lw-blue-dark);
    font-size: 2.2rem;
    font-weight: 900;
    line-height: 1.25;
}

.hero-text {
    max-width: 600px;
    margin-top: 1.4rem;
    color: #365a70;
    font-size: 1.12rem;
    line-height: 1.9;
}

.hero-stat-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.75rem;
    max-width: 620px;
    margin: 1.8rem 0 0;
}

.hero-stat-grid div {
    min-height: 90px;
    padding: 1rem;
    border: 1px solid var(--lw-line);
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.76);
}

.hero-stat-grid dt {
    color: var(--lw-blue-dark);
    font-size: 1.75rem;
    font-weight: 900;
    line-height: 1;
}

.hero-stat-grid dd {
    margin: 0.55rem 0 0;
    color: var(--lw-muted);
    font-size: 0.88rem;
    font-weight: 800;
}

.hero-badges {
    gap: 0.55rem;
    margin-top: 1.3rem;
}

.hero-badges span {
    padding: 0.45rem 0.75rem;
    border: 1px solid rgba(23, 107, 160, 0.18);
    border-radius: 999px;
    background: #fff;
    color: var(--lw-blue-dark);
    font-size: 0.86rem;
    font-weight: 900;
}

.hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.85rem;
    margin-top: 1.8rem;
}

.product-btn,
.cta-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.7rem;
    min-height: 52px;
    padding: 0.55rem 0.7rem 0.55rem 1.2rem;
    border: 1px solid transparent;
    border-radius: 999px;
    font-weight: 900;
    text-decoration: none;
    transition:
        transform 0.55s cubic-bezier(0.32, 0.72, 0, 1),
        box-shadow 0.55s cubic-bezier(0.32, 0.72, 0, 1),
        background-color 0.55s cubic-bezier(0.32, 0.72, 0, 1);
}

.product-btn span,
.cta-button span {
    display: grid;
    place-items: center;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    transition: transform 0.55s cubic-bezier(0.32, 0.72, 0, 1);
}

.product-btn.primary,
.cta-button {
    background: var(--lw-blue-dark);
    color: #fff;
    box-shadow: 0 16px 34px rgba(14, 78, 120, 0.2);
}

.product-btn.primary span,
.cta-button span {
    background: rgba(255, 255, 255, 0.15);
}

.product-btn.secondary {
    border-color: var(--lw-line);
    background: #fff;
    color: var(--lw-ink);
    box-shadow: 0 12px 30px rgba(16, 40, 56, 0.06);
}

.product-btn.secondary span {
    background: var(--lw-aqua);
    color: var(--lw-blue-dark);
}

.product-btn:hover,
.cta-button:hover {
    background: var(--lw-blue);
    color: #fff;
    transform: translateY(-2px);
}

.product-btn:hover span,
.cta-button:hover span {
    transform: translateX(2px);
}

.product-visual-shell {
    position: relative;
    max-width: 620px;
    margin-left: auto;
}

.product-visual-card {
    overflow: hidden;
    padding: 0;
    border: 1px solid var(--lw-line);
    border-radius: 8px;
    background: #fff;
    box-shadow: var(--lw-shadow);
}

.product-visual-card img {
    display: block;
    width: 100%;
    max-width: 100%;
    height: auto;
    border-radius: 0;
}

.floating-proof-card {
    position: absolute;
    right: -1rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: min(285px, 58%);
    padding: 0.85rem;
    border: 1px solid var(--lw-line);
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.94);
    box-shadow: 0 16px 40px rgba(16, 40, 56, 0.13);
}

.floating-proof-card.top {
    top: 1.2rem;
}

.floating-proof-card.bottom {
    bottom: 1.2rem;
}

.floating-proof-card > span {
    display: grid;
    flex: 0 0 auto;
    place-items: center;
    width: 42px;
    height: 42px;
    border-radius: 8px;
    background: var(--lw-aqua);
    color: var(--lw-blue-dark);
    font-size: 1.2rem;
}

.floating-proof-card strong,
.floating-proof-card small {
    display: block;
}

.floating-proof-card strong {
    color: var(--lw-ink);
    font-size: 0.92rem;
    font-weight: 900;
}

.floating-proof-card small {
    margin-top: 0.2rem;
    color: var(--lw-muted);
    font-size: 0.8rem;
    font-weight: 700;
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
    padding: 5.5rem 0;
}

.features-section,
.target-section,
.evidence-section,
.faq-section {
    background: linear-gradient(180deg, #edf7f7, #f8fbfb);
}

.section-heading {
    max-width: 760px;
    margin: 0 auto 2.75rem;
    text-align: center;
}

.section-heading h2 {
    margin: 0;
    color: var(--lw-ink);
    font-size: 3rem;
    font-weight: 900;
    line-height: 1.18;
}

.info-card,
.feature-card,
.test-card,
.target-card,
.report-card,
.evidence-box,
.notice-card,
.cta-box,
.faq-item {
    border: 1px solid var(--lw-line);
    border-radius: 8px;
    background: #fff;
    box-shadow: 0 14px 34px rgba(16, 40, 56, 0.055);
}

.info-card,
.feature-card,
.test-card,
.report-card {
    padding: 1.75rem;
}

.info-card h3,
.feature-card h3,
.test-card h3,
.notice-card h2,
.evidence-box h2,
.cta-box h2,
.target-card h2 {
    color: var(--lw-ink);
    font-weight: 900;
}

.info-card p,
.feature-card p,
.test-card p,
.target-card p,
.notice-card p,
.notice-card li,
.cta-box p,
.faq-item p {
    color: var(--lw-muted);
}

.feature-card,
.test-card {
    transition:
        transform 0.55s cubic-bezier(0.32, 0.72, 0, 1),
        border-color 0.55s cubic-bezier(0.32, 0.72, 0, 1),
        box-shadow 0.55s cubic-bezier(0.32, 0.72, 0, 1);
}

.feature-card:hover,
.test-card:hover,
.report-card:hover {
    border-color: rgba(23, 107, 160, 0.3);
    background: #fff;
    box-shadow: 0 22px 46px rgba(16, 40, 56, 0.1);
    transform: translateY(-3px);
}

.feature-icon,
.test-icon {
    border: 0;
    border-radius: 8px;
    background: var(--lw-aqua);
    color: var(--lw-blue-dark);
    box-shadow: none;
}

.feature-icon {
    width: 64px;
    height: 64px;
    margin: 0 auto 1.25rem;
    font-size: 1.65rem;
}

.feature-card:hover .feature-icon {
    transform: translateY(-2px);
}

.test-icon {
    width: 54px;
    height: 54px;
}

.clinical-note {
    border-radius: 8px;
    background: var(--lw-silver);
    color: var(--lw-blue-dark);
}

.target-card,
.evidence-box,
.notice-card,
.cta-box {
    padding: 2.25rem;
    border-radius: 8px;
}

.target-icons div {
    min-width: 150px;
    padding: 1.4rem;
    border: 1px solid rgba(23, 107, 160, 0.12);
    border-radius: 8px;
    background: var(--lw-silver);
}

.animal-icon {
    display: grid;
    place-items: center;
    width: 54px;
    height: 54px;
    margin: 0 auto 0.75rem;
    border-radius: 8px;
    background: var(--lw-aqua);
    color: var(--lw-blue-dark);
    font-size: 1.5rem;
}

.target-icons strong,
.report-card,
.report-card strong,
.faq-item summary,
.table th {
    color: var(--lw-ink);
}

.report-card {
    border-color: var(--lw-line);
}

.report-card i {
    color: var(--lw-blue);
}

.report-card span,
.table td {
    color: var(--lw-muted);
}

.notice-card.warning {
    border-left: 4px solid #d0a24a;
}

.cta-box {
    background:
        linear-gradient(120deg, #fff, #e8f6f8);
}

.cta-button {
    margin-top: 1.2rem;
}

@media (max-width: 992px) {
    .product-hero {
        padding: 4.5rem 0 4rem;
    }

    .product-hero h1 {
        font-size: 4rem;
    }

    .hero-stat-grid {
        margin-right: auto;
        margin-left: auto;
    }

    .hero-actions {
        justify-content: center;
    }

    .product-visual-shell {
        margin-right: auto;
        margin-left: auto;
    }

    .section-heading h2,
    .cta-box h2 {
        font-size: 2.35rem;
    }
}

@media (max-width: 576px) {
    .ohtrust-page .container {
        width: 366px;
        max-width: calc(100% - 24px);
        margin-right: 12px;
        margin-left: 12px;
        padding-right: 12px;
        padding-left: 12px;
    }

    .product-hero {
        padding: 3.75rem 0 3rem;
    }

    .product-hero h1 {
        max-width: 100%;
        font-size: 2.25rem;
        line-height: 1.14;
        overflow-wrap: anywhere;
    }

    .product-hero h2 {
        font-size: 1.45rem;
    }

    .hero-text {
        font-size: 1rem;
        line-height: 1.75;
    }

    .hero-stat-grid,
    .hero-actions {
        grid-template-columns: 1fr;
    }

    .hero-stat-grid,
    .hero-actions {
        display: grid;
        width: 100%;
    }

    .hero-stat-grid div {
        min-height: 76px;
    }

    .product-btn {
        width: 100%;
    }

    .floating-proof-card {
        position: static;
        width: auto;
        margin-top: 0.75rem;
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
        padding: 3.5rem 0;
    }

    .section-heading h2,
    .cta-box h2 {
        font-size: 1.82rem;
    }

    .target-card,
    .evidence-box,
    .notice-card,
    .cta-box {
        padding: 1.35rem;
    }

    .cta-button {
        width: 100%;
    }
}

@media (prefers-reduced-motion: reduce) {
    .product-btn,
    .product-btn span,
    .cta-button,
    .cta-button span,
    .feature-card,
    .test-card,
    .report-card,
    .feature-icon {
        transition: none;
    }

    .product-btn:hover,
    .product-btn:hover span,
    .cta-button:hover,
    .cta-button:hover span,
    .feature-card:hover,
    .test-card:hover,
    .report-card:hover,
    .feature-card:hover .feature-icon {
        transform: none;
    }
}
</style>
