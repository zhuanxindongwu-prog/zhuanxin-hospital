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
    --lw-green: #69964a;
    --lw-green-dark: #527a37;
    --lw-green-soft: #f1f6ed;
    --lw-teal: #006b70;
    --lw-teal-dark: #004f53;
    --lw-teal-soft: #eaf4f4;
    --lw-ink: #173433;
    --lw-muted: #536c68;
    --lw-line: #d6e2dd;
    --lw-line-strong: #b9cec5;
    --lw-surface: #f6f8f6;
    --lw-white: #ffffff;
    overflow-x: clip;
    background: var(--lw-white);
    color: var(--lw-ink);
    text-align: left;
}

.ohtrust-page,
.ohtrust-page * {
    box-sizing: border-box;
}

.ohtrust-page :is(h1, h2, h3, p, dl, dd, ul) {
    margin-top: 0;
}

.ohtrust-page :is(a, summary) {
    -webkit-tap-highlight-color: transparent;
}

.product-hero {
    position: relative;
    padding: 8.5rem 0 6rem;
    border-bottom: 1px solid var(--lw-line);
    background: var(--lw-white);
}

.section-kicker,
.section-heading p {
    margin-bottom: 0.75rem;
    color: var(--lw-green-dark);
    font-size: 0.78rem;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
}

.product-hero h1 {
    margin-bottom: 0.75rem;
    color: var(--lw-teal);
    font-size: clamp(3.25rem, 6vw, 5rem);
    font-weight: 800;
    letter-spacing: 0;
    line-height: 1.08;
}

.product-hero h2 {
    margin-bottom: 0;
    color: var(--lw-ink);
    font-size: clamp(1.5rem, 2.7vw, 2.15rem);
    font-weight: 750;
    letter-spacing: 0;
    line-height: 1.35;
}

.hero-text {
    max-width: 34rem;
    margin: 1.5rem 0 0;
    color: var(--lw-muted);
    font-size: 1.05rem;
    line-height: 1.8;
}

.hero-stat-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    max-width: 38rem;
    margin: 2rem 0 0;
    border-top: 1px solid var(--lw-line);
    border-bottom: 1px solid var(--lw-line);
}

.hero-stat-grid div {
    min-width: 0;
    padding: 1rem 1.15rem;
    border-left: 1px solid var(--lw-line);
}

.hero-stat-grid div:first-child {
    border-left: 0;
    padding-left: 0;
}

.hero-stat-grid dt {
    color: var(--lw-teal);
    font-size: 1.65rem;
    font-weight: 800;
    line-height: 1.15;
}

.hero-stat-grid dd {
    margin: 0.4rem 0 0;
    color: var(--lw-muted);
    font-size: 0.82rem;
    font-weight: 700;
    line-height: 1.45;
}

.hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 2rem;
}

.product-btn,
.cta-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.65rem;
    min-height: 50px;
    padding: 0.55rem 0.65rem 0.55rem 1.1rem;
    border: 1px solid transparent;
    border-radius: 6px;
    font-weight: 750;
    line-height: 1.2;
    text-decoration: none;
    transition:
        transform 240ms cubic-bezier(0.22, 1, 0.36, 1),
        background-color 240ms cubic-bezier(0.22, 1, 0.36, 1),
        border-color 240ms cubic-bezier(0.22, 1, 0.36, 1);
}

.product-btn span,
.cta-button span {
    display: grid;
    place-items: center;
    width: 34px;
    height: 34px;
    border-radius: 4px;
    transition: transform 240ms cubic-bezier(0.22, 1, 0.36, 1);
}

.product-btn.primary,
.cta-button {
    background: var(--lw-teal);
    color: var(--lw-white);
}

.product-btn.primary span,
.cta-button span {
    background: rgba(255, 255, 255, 0.14);
}

.product-btn.secondary {
    border-color: var(--lw-line);
    background: var(--lw-white);
    color: var(--lw-ink);
}

.product-btn.secondary span {
    background: var(--lw-teal-soft);
    color: var(--lw-teal);
}

.product-btn.primary:hover,
.cta-button:hover {
    background: var(--lw-teal-dark);
    transform: translateY(-2px);
}

.product-btn.secondary:hover {
    border-color: var(--lw-green);
    background: var(--lw-green-soft);
    transform: translateY(-2px);
}

.product-btn:hover span,
.cta-button:hover span {
    transform: translateX(2px);
}

.product-btn:active,
.cta-button:active {
    transform: translateY(0);
}

.product-btn:focus-visible,
.cta-button:focus-visible,
.evidence-summary a:focus-visible,
.report-link:focus-visible,
.report-record > a:focus-visible,
.faq-item summary:focus-visible {
    outline: 3px solid var(--lw-green);
    outline-offset: 3px;
}

.product-visual-shell {
    position: relative;
    max-width: 38rem;
    margin-left: auto;
}

.product-visual-card {
    overflow: hidden;
    border: 1px solid var(--lw-line);
    border-radius: 8px;
    background: var(--lw-white);
}

.product-visual-card img {
    display: block;
    width: 100%;
    max-width: 100%;
    height: auto;
    border-radius: 7px;
}

.floating-proof-card {
    position: absolute;
    right: -0.75rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    width: min(17.5rem, 60%);
    padding: 0.85rem;
    border: 1px solid var(--lw-line);
    border-radius: 6px;
    background: var(--lw-white);
    box-shadow: 0 10px 28px rgba(0, 79, 83, 0.08);
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
    border-radius: 4px;
    background: var(--lw-green-soft);
    color: var(--lw-green-dark);
    font-size: 1.2rem;
}

.floating-proof-card strong,
.floating-proof-card small {
    display: block;
}

.floating-proof-card strong {
    color: var(--lw-ink);
    font-size: 0.92rem;
    font-weight: 750;
}

.floating-proof-card small {
    margin-top: 0.2rem;
    color: var(--lw-muted);
    font-size: 0.8rem;
    font-weight: 600;
}

.design-section,
.report-section,
.evidence-section,
.notice-section,
.faq-section,
.cta-section {
    padding: clamp(4.5rem, 7vw, 6.5rem) 0;
}

.design-section,
.evidence-section,
.faq-section {
    background: var(--lw-white);
}

.report-section,
.notice-section,
.cta-section {
    background: var(--lw-surface);
}

.section-heading {
    max-width: 48rem;
    margin: 0 0 2.5rem;
    text-align: left;
}

.section-heading h2 {
    margin: 0;
    color: var(--lw-teal);
    font-size: clamp(1.9rem, 4vw, 2.8rem);
    font-weight: 800;
    letter-spacing: 0;
    line-height: 1.25;
}

.info-card {
    max-width: 58rem;
    padding: 1.5rem 1.75rem;
    border-left: 4px solid var(--lw-green);
    border-radius: 0 6px 6px 0;
    background: var(--lw-green-soft);
}

.info-card p {
    margin-bottom: 0;
    color: var(--lw-ink);
    font-size: 1.05rem;
    line-height: 1.85;
}

.evidence-dossier-layout {
    display: grid;
    grid-template-columns: minmax(240px, 0.7fr) minmax(0, 1.8fr);
    gap: clamp(2.5rem, 6vw, 5.5rem);
    align-items: start;
}

.evidence-summary {
    position: sticky;
    top: 112px;
    padding-top: 0.35rem;
}

.evidence-summary h2 {
    margin-bottom: 1rem;
    color: var(--lw-teal);
    font-size: clamp(1.75rem, 3vw, 2.35rem);
    font-weight: 800;
    letter-spacing: 0;
    line-height: 1.3;
}

.evidence-summary > p:not(.section-kicker) {
    margin-bottom: 1.5rem;
    color: var(--lw-muted);
    line-height: 1.8;
}

.evidence-summary a {
    display: inline-block;
    padding-bottom: 0.25rem;
    border-bottom: 2px solid var(--lw-green);
    color: var(--lw-teal-dark);
    font-weight: 750;
    line-height: 1.6;
    text-decoration: none;
    transition:
        transform 240ms cubic-bezier(0.22, 1, 0.36, 1),
        background-color 240ms cubic-bezier(0.22, 1, 0.36, 1),
        border-color 240ms cubic-bezier(0.22, 1, 0.36, 1);
}

.evidence-summary a:hover {
    border-color: var(--lw-teal);
    transform: translateX(3px);
}

.report-records {
    min-width: 0;
    border-top: 1px solid var(--lw-line-strong);
}

.report-record {
    display: grid;
    grid-template-columns: 3.5rem minmax(0, 1fr);
    gap: 0 1.5rem;
    padding: 2rem 1.25rem 2.25rem;
    border-bottom: 1px solid var(--lw-line-strong);
    background: transparent;
    transition:
        transform 240ms cubic-bezier(0.22, 1, 0.36, 1),
        background-color 240ms cubic-bezier(0.22, 1, 0.36, 1),
        border-color 240ms cubic-bezier(0.22, 1, 0.36, 1);
}

.report-record:hover {
    background: var(--lw-white);
}

.report-sequence {
    grid-column: 1;
    grid-row: 1 / span 4;
    margin-bottom: 0;
    color: var(--lw-green-dark);
    font-size: 0.86rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    line-height: 1.5;
}

.report-record > div:not(.report-result) {
    grid-column: 2;
    min-width: 0;
}

.report-record h3 {
    margin-bottom: 0.3rem;
    color: var(--lw-teal);
    font-size: clamp(1.35rem, 2.5vw, 1.75rem);
    font-weight: 800;
    letter-spacing: 0;
    line-height: 1.35;
}

.report-record > div:not(.report-result) > p {
    margin-bottom: 0;
    color: var(--lw-muted);
    font-size: 0.9rem;
    line-height: 1.6;
}

.report-meta-grid,
.report-record > dl {
    display: grid;
    grid-column: 2;
    grid-template-columns: minmax(8.5rem, 0.8fr) minmax(11rem, 1.1fr) minmax(0, 2fr);
    gap: 0;
    margin: 1.35rem 0 0;
    border-top: 1px solid var(--lw-line);
    border-bottom: 1px solid var(--lw-line);
}

.report-meta-grid > div,
.report-record > dl > div {
    min-width: 0;
    padding: 1rem 1.1rem;
    border-left: 1px solid var(--lw-line);
}

.report-meta-grid > div:first-child,
.report-record > dl > div:first-child {
    border-left: 0;
    padding-left: 0;
}

.report-meta-grid dt,
.report-record > dl dt {
    margin-bottom: 0.35rem;
    color: var(--lw-green-dark);
    font-size: 0.75rem;
    font-weight: 800;
    letter-spacing: 0.04em;
    line-height: 1.4;
}

.report-meta-grid dd,
.report-record > dl dd {
    margin-bottom: 0;
    color: var(--lw-ink);
    font-size: 0.88rem;
    line-height: 1.65;
    overflow-wrap: anywhere;
}

.report-result {
    grid-column: 2;
    margin-top: 1.25rem;
    padding: 1rem 1.15rem;
    border-left: 4px solid var(--lw-green);
    border-radius: 0 6px 6px 0;
    background: var(--lw-green-soft);
}

.report-result strong {
    display: block;
    margin-bottom: 0.35rem;
    color: var(--lw-teal-dark);
    font-size: 0.78rem;
    font-weight: 800;
}

.report-result p {
    margin-bottom: 0;
    color: var(--lw-ink);
    line-height: 1.75;
}

.report-link,
.report-record > a {
    display: inline-flex;
    grid-column: 2;
    align-items: center;
    justify-content: center;
    justify-self: start;
    min-height: 46px;
    margin-top: 1.25rem;
    padding: 0.7rem 1rem;
    border: 1px solid var(--lw-teal);
    border-radius: 6px;
    background: var(--lw-white);
    color: var(--lw-teal-dark);
    font-weight: 750;
    line-height: 1.35;
    text-align: center;
    text-decoration: none;
    transition:
        transform 240ms cubic-bezier(0.22, 1, 0.36, 1),
        background-color 240ms cubic-bezier(0.22, 1, 0.36, 1),
        border-color 240ms cubic-bezier(0.22, 1, 0.36, 1);
}

.report-link:hover,
.report-record > a:hover {
    border-color: var(--lw-green-dark);
    background: var(--lw-green-soft);
    transform: translateY(-2px);
}

.evidence-boundary-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    border: 1px solid var(--lw-line-strong);
    border-radius: 8px;
    background: var(--lw-white);
}

.evidence-boundary-grid > div {
    min-width: 0;
    padding: clamp(1.75rem, 4vw, 2.75rem);
}

.evidence-boundary-grid > div + div {
    border-left: 1px solid var(--lw-line-strong);
    background: var(--lw-surface);
}

.evidence-boundary-grid h2 {
    margin-bottom: 1.25rem;
    color: var(--lw-teal);
    font-size: 1.55rem;
    font-weight: 800;
    letter-spacing: 0;
}

.evidence-boundary-grid ul,
.notice-card ul {
    margin-bottom: 0;
    padding-left: 1.25rem;
}

.evidence-boundary-grid li,
.notice-card li {
    padding-left: 0.35rem;
    color: var(--lw-ink);
    line-height: 1.8;
}

.evidence-boundary-grid li + li,
.notice-card li + li {
    margin-top: 0.7rem;
}

.evidence-section > .container > p {
    margin: 1.25rem 0 0;
    color: var(--lw-muted);
    font-size: 0.9rem;
    line-height: 1.7;
}

.use-and-limits,
#use-and-limits {
    scroll-margin-top: 96px;
}

.use-card,
.notice-card {
    height: 100%;
    padding: 2rem;
    border: 1px solid var(--lw-line);
    border-radius: 8px;
    background: var(--lw-white);
}

.notice-card.warning {
    border-left: 4px solid var(--lw-green);
}

.notice-card h2 {
    margin-bottom: 1rem;
    color: var(--lw-teal);
    font-size: 1.5rem;
    font-weight: 800;
    letter-spacing: 0;
}

.notice-card p,
.notice-card li {
    color: var(--lw-muted);
}

.notice-card p {
    margin-bottom: 0;
    line-height: 1.8;
}

.notice-card strong {
    color: var(--lw-ink);
}

.faq-grid {
    max-width: 58rem;
    border-top: 1px solid var(--lw-line-strong);
}

.faq-item {
    padding: 0;
    border-bottom: 1px solid var(--lw-line-strong);
    background: transparent;
}

.faq-item summary {
    padding: 1.35rem 2.5rem 1.35rem 0;
    color: var(--lw-teal-dark);
    cursor: pointer;
    font-weight: 750;
    line-height: 1.6;
    transition:
        transform 240ms cubic-bezier(0.22, 1, 0.36, 1),
        background-color 240ms cubic-bezier(0.22, 1, 0.36, 1),
        border-color 240ms cubic-bezier(0.22, 1, 0.36, 1);
}

.faq-item summary:hover {
    transform: translateX(3px);
}

.faq-item p {
    max-width: 48rem;
    margin: 0;
    padding: 0 2.5rem 1.5rem 0;
    color: var(--lw-muted);
    line-height: 1.8;
}

.cta-box {
    padding: clamp(2rem, 5vw, 3.75rem);
    border: 1px solid var(--lw-line-strong);
    border-radius: 8px;
    background: var(--lw-white);
    text-align: left;
}

.cta-box h2 {
    max-width: 44rem;
    margin-bottom: 1rem;
    color: var(--lw-teal);
    font-size: clamp(1.9rem, 4vw, 2.8rem);
    font-weight: 800;
    letter-spacing: 0;
    line-height: 1.3;
}

.cta-box > p:not(.section-kicker) {
    max-width: 48rem;
    margin-bottom: 0;
    color: var(--lw-muted);
    line-height: 1.8;
}

.cta-button {
    margin-top: 1.5rem;
}

@media (max-width: 991px) {
    .product-hero {
        padding: 7.5rem 0 4.75rem;
        text-align: left;
    }

    .hero-text {
        max-width: 42rem;
    }

    .product-visual-shell {
        margin-right: auto;
        margin-left: 0;
    }

    .evidence-dossier-layout {
        gap: 2.5rem;
    }

    .report-meta-grid,
    .report-record > dl {
        grid-template-columns: minmax(7rem, 0.8fr) minmax(9rem, 1fr) minmax(0, 1.5fr);
    }
}

@media (min-width: 768px) and (max-width: 879px) {
    .report-meta-grid,
    .report-record > dl {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .report-meta-grid > div:last-child,
    .report-record > dl > div:last-child {
        grid-column: 1 / -1;
        padding-left: 0;
        border-top: 1px solid var(--lw-line);
        border-left: 0;
    }
}

@media (max-width: 767px) {
    .ohtrust-page .container {
        width: 100%;
        max-width: 100%;
        padding-right: 1rem;
        padding-left: 1rem;
    }

    .product-hero {
        padding: 7rem 0 3.5rem;
    }

    .product-hero h1 {
        max-width: 100%;
        font-size: clamp(2.4rem, 13vw, 3.25rem);
        overflow-wrap: anywhere;
    }

    .product-hero h2 {
        font-size: 1.4rem;
    }

    .hero-text {
        font-size: 1rem;
        line-height: 1.75;
    }

    .hero-stat-grid {
        grid-template-columns: 1fr;
    }

    .hero-stat-grid div,
    .hero-stat-grid div:first-child {
        padding: 0.85rem 0;
        border-left: 0;
        border-top: 1px solid var(--lw-line);
    }

    .hero-stat-grid div:first-child {
        border-top: 0;
    }

    .hero-actions {
        display: grid;
        grid-template-columns: 1fr;
        width: 100%;
    }

    .product-btn,
    .cta-button {
        width: 100%;
    }

    .product-visual-shell {
        width: 100%;
        max-width: 100%;
    }

    .floating-proof-card {
        position: static;
        width: 100%;
        max-width: 100%;
        margin-top: 0.75rem;
        box-shadow: none;
    }

    .design-section,
    .report-section,
    .evidence-section,
    .notice-section,
    .faq-section,
    .cta-section {
        padding: 3rem 0;
    }

    .section-heading {
        margin-bottom: 2rem;
    }

    .section-heading h2,
    .cta-box h2 {
        font-size: 1.8rem;
    }

    .info-card {
        padding: 1.25rem;
    }

    .evidence-dossier-layout {
        grid-template-columns: 1fr;
        gap: 2.25rem;
    }

    .evidence-summary {
        position: static;
        width: 100%;
        max-width: 100%;
        padding-top: 0;
    }

    .report-record {
        grid-template-columns: 1fr;
        gap: 0;
        padding: 1.5rem 0 1.75rem;
    }

    .report-sequence,
    .report-record > div:not(.report-result),
    .report-meta-grid,
    .report-record > dl,
    .report-result,
    .report-link,
    .report-record > a {
        grid-column: 1;
    }

    .report-sequence {
        grid-row: auto;
        margin-bottom: 0.5rem;
    }

    .report-meta-grid,
    .report-record > dl {
        grid-template-columns: 1fr;
    }

    .report-meta-grid > div,
    .report-record > dl > div,
    .report-meta-grid > div:first-child,
    .report-record > dl > div:first-child {
        padding: 0.85rem 0;
        border-top: 1px solid var(--lw-line);
        border-left: 0;
    }

    .report-meta-grid > div:first-child,
    .report-record > dl > div:first-child {
        border-top: 0;
    }

    .report-link,
    .report-record > a {
        width: 100%;
        min-height: 48px;
        justify-self: stretch;
    }

    .evidence-boundary-grid {
        grid-template-columns: 1fr;
    }

    .evidence-boundary-grid > div {
        padding: 1.5rem;
    }

    .evidence-boundary-grid > div + div {
        border-top: 1px solid var(--lw-line-strong);
        border-left: 0;
    }

    .use-card,
    .notice-card,
    .cta-box {
        padding: 1.5rem;
    }

    .faq-item summary {
        padding-right: 1.5rem;
    }

    .faq-item p {
        padding-right: 0;
    }
}

@media (prefers-reduced-motion: reduce) {
    .product-btn,
    .product-btn span,
    .cta-button,
    .cta-button span,
    .evidence-summary a,
    .report-record,
    .report-link,
    .report-record > a,
    .faq-item summary {
        transition: none;
    }

    .product-btn:hover,
    .product-btn:hover span,
    .cta-button:hover,
    .cta-button:hover span,
    .evidence-summary a:hover,
    .report-link:hover,
    .report-record > a:hover,
    .faq-item summary:hover {
        transform: none;
    }
}
</style>
