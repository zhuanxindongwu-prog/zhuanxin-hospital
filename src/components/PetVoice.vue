<template>
    <main class="petvoice-page">
        <section class="pv-hero">
            <div class="container">
                <div class="row align-items-center g-5">
                    <div class="col-lg-6">
                        <p class="pv-kicker">PetVoice Smart Health</p>
                        <h1>PetVoice 犬貓居家生理監測</h1>
                        <p class="pv-lead">
                            專心動物醫院導入日本 PetVoice，從心率、安靜時呼吸數、活動與睡眠趨勢，
                            協助飼主看見回診之外的變化，讓犬貓心臟病與慢性病照護更連續。
                        </p>
                        <p class="pv-supporting-text">輕量感測器、居家同步裝置與手機 App，共同建立毛孩的長期健康紀錄。</p>

                        <div class="pv-actions">
                            <a href="#features" class="pv-btn primary">了解監測功能</a>
                            <a href="#reports" class="pv-btn secondary">查看媒體報導</a>
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <div class="hero-image-card">
                            <img src="/imgs/petvoice宣傳.png" alt="PetVoice 智慧健康監測系統" />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="pv-section official-section">
            <div class="container">
                <div class="official-panel">
                    <div>
                        <p class="pv-kicker">Official Partner Page</p>
                        <h2>專心動物醫院的 PetVoice 導入與照護說明</h2>
                    </div>
                    <p>
                        這個頁面整理專心動物醫院導入 PetVoice 居家生理監測的臨床定位、適用族群、
                        監測項目與常見問題。若你正在搜尋「PetVoice 專心動物醫院」或「PetVoice 犬貓健康監測」，
                        可從這裡了解裝置如何輔助心臟病、心衰竭出院後與高齡慢性病毛孩的日常觀察。
                    </p>
                    <div class="official-links">
                        <RouterLink to="/articles/media/petvoice-home-monitoring">PetVoice 媒體報導整理</RouterLink>
                        <RouterLink to="/articles/media/monet-home-monitoring">居家監測案例</RouterLink>
                        <RouterLink to="/petvoice-guide">PetVoice 完整指南</RouterLink>
                        <a href="https://www.petvoice.co.jp/#cont3" target="_blank" rel="noopener noreferrer">
                            PetVoice 日本官方資訊
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <section class="pv-section">
            <div class="container">
                <div class="section-heading">
                    <p>Core Value</p>
                    <h2>不只是監測，而是陪伴與安心</h2>
                </div>

                <div class="value-grid">
                    <div v-for="item in values" :key="item.title" class="value-card">
                        <div class="icon-circle">
                            <i :class="item.icon"></i>
                        </div>
                        <h3>{{ item.title }}</h3>
                        <p>{{ item.text }}</p>
                    </div>
                </div>
            </div>
        </section>

        <section id="features" class="pv-section soft">
            <div class="container">
                <div class="section-heading">
                    <p>Health Monitoring</p>
                    <h2>16 項健康趨勢，掌握日常異常訊號</h2>
                    <span>依照裝置蒐集的活動與環境資料，透過系統整理為可持續觀察的健康趨勢。</span>
                </div>

                <div class="monitor-group-grid">
                    <section v-for="group in monitoringGroups" :key="group.title" class="monitor-group">
                        <div class="monitor-group-heading">
                            <i :class="group.icon"></i>
                            <h3>{{ group.title }}</h3>
                        </div>

                        <div class="monitor-grid">
                            <span v-for="item in group.items" :key="item" class="monitor-pill">
                                {{ item }}
                            </span>
                        </div>
                    </section>
                </div>

                <div class="monitor-note">
                    <i class="bi bi-info-circle"></i>
                    <p>
                        PetVoice 用於居家趨勢觀察與照護輔助，不取代獸醫師診斷。
                        若毛孩出現呼吸困難、昏倒或明顯不適，請儘快就醫。
                    </p>
                </div>
            </div>
        </section>

        <section class="pv-section use-case-section">
            <div class="container">
                <div class="section-heading">
                    <p>Recommended For</p>
                    <h2>適合需要持續觀察的毛孩</h2>
                    <span>當回診之間需要掌握變化，居家監測可以提供更完整的趨勢參考。</span>
                </div>

                <div class="row g-4">
                    <div v-for="item in useCases" :key="item.title" class="col-md-4">
                        <div class="case-card">
                            <p>{{ item.label }}</p>
                            <h3>{{ item.title }}</h3>
                            <span>{{ item.text }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="pv-section dark">
            <div class="container">
                <div class="row align-items-center g-5">
                    <div class="col-lg-6">
                        <p class="pv-kicker">Veterinary Review</p>
                        <h2>心臟病照護中，安靜時呼吸次數很重要</h2>
                        <p>
                            對心臟病、肺水腫風險、慢性病或高齡毛孩而言，單次回診只能看到當下狀態；
                            連續居家監測則能幫助我們觀察趨勢，提早發現可能惡化的訊號。
                        </p>
                    </div>

                    <div class="col-lg-6">
                        <div class="review-card">
                            <h3>適合優先導入族群</h3>
                            <ul>
                                <li>MMVD 心臟病犬</li>
                                <li>CHF 出院後監測</li>
                                <li>高齡犬貓</li>
                                <li>癌症治療或術後恢復期</li>
                                <li>慢性病長期追蹤</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="pv-section">
            <div class="container">
                <div class="section-heading">
                    <p>How It Works</p>
                    <h2>從配戴到雲端分析，讓照護更連續</h2>
                </div>

                <div class="flow-grid">
                    <div v-for="step in steps" :key="step.title" class="flow-card">
                        <span>{{ step.no }}</span>
                        <h3>{{ step.title }}</h3>
                        <p>{{ step.text }}</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="pv-section soft">
            <div class="container">
                <div class="section-heading">
                    <p>Product Spec</p>
                    <h2>產品組成</h2>
                </div>

                <div class="table-responsive spec-card">
                    <table class="table align-middle">
                        <thead>
                            <tr>
                                <th>項目</th>
                                <th>PetVoice CORE</th>
                                <th>PetVoice HOME</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>重量</td>
                                <td>約 5g</td>
                                <td>約 50g</td>
                            </tr>
                            <tr>
                                <td>通訊方式</td>
                                <td>BLE</td>
                                <td>BLE、Wi-Fi</td>
                            </tr>
                            <tr>
                                <td>主要功能</td>
                                <td>9 軸感測器、溫度感測器、活動資料取得</td>
                                <td>CORE 充電、資料上傳、室溫濕度測量</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="mobile-spec-grid">
                    <article v-for="product in productSpecs" :key="product.name" class="mobile-spec-card">
                        <h3>{{ product.name }}</h3>
                        <dl>
                            <div v-for="item in product.items" :key="item.label">
                                <dt>{{ item.label }}</dt>
                                <dd>{{ item.value }}</dd>
                            </div>
                        </dl>
                    </article>
                </div>
            </div>
        </section>

        <section id="reports" class="pv-section media-section">
            <div class="container">
                <div class="media-callout">
                    <div>
                        <p class="pv-kicker">Media Coverage</p>
                        <h2>從診間延伸到日常：認識 PetVoice 居家監測</h2>
                        <p>
                            閱讀專心動物醫院整理的媒體報導，了解台日心臟專家交流與居家生理監測在長期照護中的定位。
                        </p>
                    </div>

                    <RouterLink to="/articles/media/petvoice-home-monitoring" class="pv-btn secondary">
                        閱讀媒體報導整理
                    </RouterLink>
                </div>

                <div class="report-grid">
                    <RouterLink
                        v-for="report in reports"
                        :key="report.path"
                        :to="report.path"
                        class="report-card"
                    >
                        <span>{{ report.label }}</span>
                        <h3>{{ report.title }}</h3>
                        <p>{{ report.text }}</p>
                    </RouterLink>
                </div>
            </div>
        </section>

        <section class="pv-section soft">
            <div class="container">
                <div class="section-heading">
                    <p>FAQ</p>
                    <h2>PetVoice 常見問題</h2>
                </div>

                <div class="faq-grid">
                    <details v-for="item in faqs" :key="item.question" class="faq-item">
                        <summary>{{ item.question }}</summary>
                        <p>{{ item.answer }}</p>
                    </details>
                </div>
            </div>
        </section>

        <section class="pv-cta">
            <div class="container">
                <div class="cta-card">
                    <p class="pv-kicker">Taiwan Partner</p>
                    <h2>專心動物醫院 × PetVoice</h2>
                    <p>
                        結合臨床心臟專業與智慧監測科技，協助更多心臟病犬貓在家中也能被持續守護。
                    </p>

                    <div class="pv-actions justify-content-center">
                        <a href="tel:0223633016" class="pv-btn primary">電話洽詢 PetVoice</a>
                        <a href="https://www.petvoice.co.jp/#cont3" target="_blank" rel="noopener noreferrer"
                            class="pv-btn secondary">
                            前往 PetVoice 官方網站
                        </a>
                    </div>
                    <a href="tel:0223633016" class="pv-phone">02-2363-3016</a>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { productSeo } from '../data/productSeo'

const faqs = productSeo['/petvoice'].faqs

const reports = [
    {
        label: '媒體報導',
        title: '專心動物醫院導入 PetVoice 居家生理監測',
        text: '整理台日心臟專家交流與 PetVoice 在長期照護中的定位。',
        path: '/articles/media/petvoice-home-monitoring',
    },
    {
        label: '完整指南',
        title: 'PetVoice 是什麼？犬貓居家生理監測完整指南',
        text: '從監測項目、適用族群到心臟病居家觀察，一次整理清楚。',
        path: '/petvoice-guide',
    },
    {
        label: '真實案例',
        title: '14 歲老犬 Monet 的居家監測案例',
        text: '從體溫與生活趨勢理解個別化基礎資料的價值。',
        path: '/articles/media/monet-home-monitoring',
    },
]

const values = [
    {
        title: '提早發現',
        icon: 'bi bi-activity',
        text: '透過呼吸、活動、睡眠與日常趨勢，觀察毛孩身體正在發出的訊號。',
    },
    {
        title: '醫療連結',
        icon: 'bi bi-hospital',
        text: '不只是數據紀錄，而是能與獸醫師合作判讀，讓追蹤更有臨床意義。',
    },
    {
        title: '居家安心',
        icon: 'bi bi-house-heart',
        text: '讓飼主在日常生活中掌握變化，降低疾病惡化卻未被察覺的風險。',
    },
]

const monitoringGroups = [
    {
        title: '生命徵象趨勢',
        icon: 'bi bi-heart-pulse',
        items: ['安靜時心率', '安靜時呼吸數', '呼吸變化率'],
    },
    {
        title: '日常行為觀察',
        icon: 'bi bi-activity',
        items: ['活動量', '休息量', '睡眠狀態', '飲水', '進食', '如廁', '理毛'],
    },
    {
        title: '居家環境',
        icon: 'bi bi-house-heart',
        items: ['室溫', '濕度'],
    },
    {
        title: '照護輔助',
        icon: 'bi bi-bell',
        items: ['異常通知', '日常趨勢', '健康評分', '雲端紀錄'],
    },
]

const useCases = [
    {
        label: 'Heart Disease',
        title: '心臟病犬貓',
        text: '適合需要長期追蹤呼吸次數、活動量與睡眠變化的犬貓。',
    },
    {
        label: 'CHF Follow-up',
        title: '心衰竭出院後',
        text: '協助飼主更早注意安靜時呼吸頻率變化，降低延誤就醫風險。',
    },
    {
        label: 'Senior Care',
        title: '高齡慢性病照護',
        text: '透過活動、睡眠與日常趨勢，觀察整體生活品質變化。',
    },
]

const steps = [
    {
        no: '01',
        title: '配戴 CORE',
        text: '將輕量化感測器安裝於項圈，讓毛孩在家中自然配戴。',
    },
    {
        no: '02',
        title: 'HOME 自動同步',
        text: 'HOME 接收 CORE 資料，並透過 Wi-Fi 上傳至雲端。',
    },
    {
        no: '03',
        title: 'App 查看趨勢',
        text: '飼主可查看健康狀態、趨勢變化與異常提醒。',
    },
    {
        no: '04',
        title: '必要時諮詢醫師',
        text: '若資料出現異常趨勢，可進一步諮詢動物醫院或安排回診。',
    },
]

const productSpecs = [
    {
        name: 'PetVoice CORE',
        items: [
            { label: '重量', value: '約 5g' },
            { label: '通訊方式', value: 'BLE' },
            { label: '主要功能', value: '9 軸感測器、溫度感測器、活動資料取得' },
        ],
    },
    {
        name: 'PetVoice HOME',
        items: [
            { label: '重量', value: '約 50g' },
            { label: '通訊方式', value: 'BLE、Wi-Fi' },
            { label: '主要功能', value: 'CORE 充電、資料上傳、室溫濕度測量' },
        ],
    },
]
</script>

<style scoped>
.petvoice-page {
    background: #f8fafc;
    color: #0f172a;
}

.pv-hero {
    padding: 6rem 0;
    background:
        linear-gradient(135deg, #ffffff, #eef7f6);
}

.pv-kicker,
.section-heading p {
    color: #14b8a6;
    font-size: 0.86rem;
    font-weight: 900;
    letter-spacing: 0.16em;
    text-transform: uppercase;
}

.pv-hero h1 {
    max-width: 620px;
    color: #0f172a;
    font-size: clamp(3rem, 6vw, 5.4rem);
    font-weight: 900;
    line-height: 1.08;
}

.pv-lead {
    max-width: 620px;
    margin-top: 1.5rem;
    color: #475569;
    font-size: 1.15rem;
    line-height: 1.9;
}

.pv-supporting-text {
    max-width: 620px;
    margin-top: 1rem;
    color: #64748b;
    line-height: 1.8;
}

.pv-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 2rem;
}

.pv-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.85rem 1.45rem;
    border-radius: 999px;
    font-weight: 900;
    text-decoration: none;
    transition: 0.25s ease;
}

.pv-btn.primary {
    background: #14b8a6;
    color: #fff;
}

.pv-btn.secondary {
    background: #fff;
    color: #0f172a;
    box-shadow: 0 0.8rem 2rem rgba(15, 23, 42, 0.08);
}

.pv-btn:hover {
    transform: translateY(-2px);
}

.hero-image-card {
    padding: 1rem;
    border-radius: 1.25rem;
    background: #fff;
    box-shadow: 0 1.2rem 2.6rem rgba(15, 23, 42, 0.09);
}

.hero-image-card img {
    width: 100%;
    display: block;
    border-radius: 0.9rem;
}

.pv-section {
    padding: 5rem 0;
}

.pv-section.soft {
    background: #eef7f6;
}

.official-section {
    padding-top: 3.5rem;
    padding-bottom: 3.5rem;
    background: #fff;
}

.official-panel {
    display: grid;
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.25fr);
    gap: 2rem;
    align-items: start;
    padding: 2rem;
    border: 1px solid rgba(20, 184, 166, 0.24);
    border-radius: 1rem;
    background: linear-gradient(135deg, rgba(20, 184, 166, 0.08), #ffffff);
}

.official-panel h2 {
    margin: 0;
    color: #0f172a;
    font-size: clamp(1.65rem, 3vw, 2.3rem);
    font-weight: 900;
    line-height: 1.25;
}

.official-panel p {
    margin: 0;
    color: #475569;
    line-height: 1.9;
}

.official-links {
    grid-column: 2;
    display: flex;
    flex-wrap: wrap;
    gap: 0.65rem;
}

.official-links a {
    display: inline-flex;
    align-items: center;
    min-height: 40px;
    padding: 0.45rem 0.8rem;
    border-radius: 999px;
    background: #fff;
    color: #0f766e;
    font-weight: 900;
    text-decoration: none;
    border: 1px solid rgba(20, 184, 166, 0.28);
}

.section-heading {
    margin-bottom: 2.5rem;
    text-align: center;
}

.section-heading h2 {
    color: #0f172a;
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 900;
}

.section-heading span {
    display: block;
    max-width: 760px;
    margin: 0.75rem auto 0;
    color: #64748b;
    line-height: 1.8;
}

.value-grid,
.flow-grid {
    display: grid;
    gap: 1.5rem;
}

.value-grid {
    grid-template-columns: repeat(3, 1fr);
}

.flow-grid {
    grid-template-columns: repeat(4, 1fr);
}

.value-card,
.case-card,
.flow-card,
.spec-card,
.review-card,
.cta-card {
    background: #fff;
    border-radius: 1.1rem;
    border: 1px solid rgba(148, 163, 184, 0.2);
    box-shadow: 0 0.8rem 2rem rgba(15, 23, 42, 0.06);
}

.value-card,
.case-card,
.flow-card,
.review-card {
    height: 100%;
    padding: 2rem;
}

.icon-circle {
    width: 72px;
    height: 72px;
    display: grid;
    place-items: center;
    margin-bottom: 1.3rem;
    border-radius: 50%;
    background: rgba(20, 184, 166, 0.1);
    color: #14b8a6;
    font-size: 2rem;
}

.value-card h3,
.case-card h3,
.flow-card h3,
.review-card h3 {
    color: #0f172a;
    font-weight: 900;
}

.value-card p,
.case-card span,
.flow-card p,
.review-card li,
.dark p,
.cta-card p {
    color: #475569;
    line-height: 1.8;
}

.monitor-group-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
}

.monitor-group {
    padding: 1.25rem;
    border: 1px solid rgba(148, 163, 184, 0.18);
    border-radius: 1rem;
    background: rgba(255, 255, 255, 0.75);
}

.monitor-group-heading {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin-bottom: 0.85rem;
}

.monitor-group-heading i {
    color: #0f766e;
    font-size: 1.1rem;
}

.monitor-group-heading h3 {
    margin: 0;
    color: #0f172a;
    font-size: 1.05rem;
    font-weight: 900;
}

.monitor-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.55rem;
}

.monitor-pill {
    padding: 0.45rem 0.75rem;
    border-radius: 999px;
    background: #fff;
    color: #334155;
    font-size: 0.92rem;
    font-weight: 800;
    text-align: center;
    border: 1px solid rgba(148, 163, 184, 0.2);
}

.monitor-note {
    display: flex;
    align-items: flex-start;
    gap: 0.7rem;
    max-width: 820px;
    margin: 1.2rem auto 0;
    padding: 1rem 1.1rem;
    border-left: 3px solid #14b8a6;
    background: rgba(255, 255, 255, 0.7);
}

.monitor-note i {
    color: #0f766e;
}

.monitor-note p {
    margin: 0;
    color: #475569;
    font-size: 0.92rem;
    line-height: 1.7;
}

.case-card p {
    color: #14b8a6;
    font-weight: 900;
    letter-spacing: 0.12em;
    text-transform: uppercase;
}

.pv-section.dark {
    background: #0f172a;
}

.dark h2 {
    color: #fff;
    font-size: clamp(2rem, 4vw, 3.2rem);
    font-weight: 900;
}

.dark p {
    color: #cbd5e1;
}

.review-card ul {
    margin-bottom: 0;
    padding-left: 1.2rem;
}

.flow-card span {
    color: #14b8a6;
    font-size: 2rem;
    font-weight: 900;
}

.spec-card {
    padding: 1.5rem;
}

.mobile-spec-grid {
    display: none;
}

.table th {
    color: #0f172a;
}

.table td {
    color: #475569;
}

.pv-cta {
    padding: 5rem 0;
    background: #f8fafc;
}

.cta-card {
    padding: 4rem 2rem;
    text-align: center;
    background:
        linear-gradient(135deg, #ffffff, #eef7f6);
}

.cta-card h2 {
    color: #0f172a;
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 900;
}

.cta-card p {
    max-width: 760px;
    margin-right: auto;
    margin-left: auto;
}

.pv-phone {
    display: inline-block;
    margin-top: 1.25rem;
    color: #0f766e;
    font-size: 1.1rem;
    font-weight: 900;
    text-decoration: none;
}

.media-callout {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    padding: 2rem;
    border: 1px solid rgba(148, 163, 184, 0.2);
    border-radius: 1rem;
    background: #0f172a;
    box-shadow: 0 0.8rem 2rem rgba(15, 23, 42, 0.1);
}

.media-callout h2 {
    color: #fff;
    font-weight: 900;
}

.media-callout p:not(.pv-kicker) {
    max-width: 760px;
    margin-bottom: 0;
    color: #cbd5e1;
    line-height: 1.8;
}

.media-callout .pv-btn {
    flex: 0 0 auto;
}

.report-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin-top: 1.25rem;
}

.report-card {
    display: block;
    height: 100%;
    padding: 1.25rem;
    border-radius: 1rem;
    border: 1px solid rgba(148, 163, 184, 0.2);
    background: #fff;
    text-decoration: none;
    box-shadow: 0 0.8rem 2rem rgba(15, 23, 42, 0.05);
}

.report-card span {
    color: #14b8a6;
    font-size: 0.82rem;
    font-weight: 900;
    letter-spacing: 0.12em;
}

.report-card h3 {
    margin: 0.7rem 0 0.45rem;
    color: #0f172a;
    font-size: 1.08rem;
    font-weight: 900;
    line-height: 1.45;
}

.report-card p {
    margin: 0;
    color: #64748b;
    line-height: 1.75;
}

.faq-grid {
    display: grid;
    gap: 1rem;
    max-width: 920px;
    margin: 0 auto;
}

.faq-item {
    padding: 1.25rem 1.4rem;
    border: 1px solid rgba(148, 163, 184, 0.22);
    border-radius: 1rem;
    background: #fff;
}

.faq-item summary {
    color: #0f172a;
    cursor: pointer;
    font-weight: 900;
}

.faq-item p {
    margin: 0.9rem 0 0;
    color: #475569;
    line-height: 1.8;
}

@media (max-width: 992px) {
    .pv-hero {
        padding: 4.5rem 0;
        text-align: center;
    }

    .pv-lead,
    .pv-hero h1,
    .pv-supporting-text {
        margin-right: auto;
        margin-left: auto;
    }

    .pv-actions {
        justify-content: center;
    }

    .value-grid,
    .flow-grid,
    .report-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    .official-panel {
        grid-template-columns: 1fr;
    }

    .official-links {
        grid-column: auto;
    }

    .media-callout {
        align-items: flex-start;
        flex-direction: column;
    }
}

@media (max-width: 576px) {
    .pv-hero {
        padding: 3.75rem 0 3rem;
    }

    .pv-hero h1 {
        font-size: 2.45rem;
        line-height: 1.14;
    }

    .pv-section,
    .pv-cta {
        padding: 3.5rem 0;
    }

    .value-grid,
    .flow-grid,
    .report-grid {
        grid-template-columns: 1fr;
    }

    .monitor-group-grid {
        grid-template-columns: 1fr;
    }

    .monitor-group {
        padding: 1rem;
    }

    .monitor-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .monitor-pill {
        display: grid;
        place-items: center;
        min-height: 42px;
        padding: 0.35rem 0.45rem;
        border-radius: 0.65rem;
        font-size: 0.86rem;
    }

    .value-card,
    .case-card,
    .flow-card,
    .review-card {
        padding: 1.5rem;
    }

    .cta-card {
        padding: 2.5rem 1.5rem;
    }

    .spec-card {
        display: none;
    }

    .mobile-spec-grid {
        display: grid;
        gap: 1rem;
    }

    .mobile-spec-card {
        padding: 1.25rem;
        border: 1px solid rgba(148, 163, 184, 0.2);
        border-radius: 1rem;
        background: #fff;
        box-shadow: 0 0.8rem 2rem rgba(15, 23, 42, 0.06);
    }

    .mobile-spec-card h3 {
        margin-bottom: 1rem;
        color: #0f172a;
        font-weight: 900;
    }

    .mobile-spec-card dl,
    .mobile-spec-card dd {
        margin: 0;
    }

    .mobile-spec-card dl > div {
        padding: 0.75rem 0;
        border-top: 1px solid rgba(148, 163, 184, 0.2);
    }

    .mobile-spec-card dt {
        margin-bottom: 0.25rem;
        color: #0f766e;
        font-size: 0.86rem;
    }

    .mobile-spec-card dd {
        color: #475569;
        line-height: 1.7;
    }
}
</style>
