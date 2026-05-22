<template>
    <main class="petvoice-page">
        <section class="pv-hero">
            <div class="container">
                <div class="row align-items-center g-5">
                    <div class="col-lg-6">
                        <p class="pv-kicker">PetVoice Smart Health</p>
                        <h1>守護那些你看不見的變化</h1>
                        <p class="pv-lead">
                            PetVoice 不是單純的智慧項圈，而是結合居家健康監測、手機 App 與獸醫醫療合作的犬貓遠距健康管理平台。
                        </p>

                        <div class="pv-actions">
                            <a href="#features" class="pv-btn primary">了解監測功能</a>
                            <RouterLink to="/appointment" class="pv-btn secondary">預約諮詢</RouterLink>
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
                </div>

                <div class="monitor-grid">
                    <div v-for="item in monitoringItems" :key="item" class="monitor-pill">
                        {{ item }}
                    </div>
                </div>
            </div>
        </section>

        <section class="pv-section">
            <div class="container">
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
                        <RouterLink to="/appointment" class="pv-btn primary">預約諮詢</RouterLink>
                        <a href="https://www.petvoice.co.jp/#cont3" target="_blank" rel="noopener noreferrer"
                            class="pv-btn secondary">
                            了解更多
                        </a>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup>
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

const monitoringItems = [
    '安靜時心率',
    '安靜時呼吸數',
    '呼吸變化率',
    '活動量',
    '休息量',
    '睡眠狀態',
    '飲水',
    '進食',
    '如廁',
    '理毛',
    '室溫',
    '濕度',
    '異常通知',
    '日常趨勢',
    '健康評分',
    '雲端紀錄',
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
</script>

<style scoped>
.petvoice-page {
    background: #f8fafc;
    color: #0f172a;
}

.pv-hero {
    padding: 6rem 0;
    background:
        radial-gradient(circle at top right, rgba(20, 184, 166, 0.14), transparent 35%),
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
    border-radius: 2rem;
    background: #fff;
    box-shadow: 0 1.4rem 3rem rgba(15, 23, 42, 0.1);
}

.hero-image-card img {
    width: 100%;
    display: block;
    border-radius: 1.4rem;
}

.pv-section {
    padding: 5rem 0;
}

.pv-section.soft {
    background: #eef7f6;
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
    border-radius: 1.5rem;
    box-shadow: 0 1rem 2.5rem rgba(15, 23, 42, 0.08);
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

.monitor-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.9rem;
}

.monitor-pill {
    padding: 1rem;
    border-radius: 999px;
    background: #fff;
    color: #0f172a;
    font-weight: 800;
    text-align: center;
    box-shadow: 0 0.8rem 2rem rgba(15, 23, 42, 0.06);
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
        radial-gradient(circle at top right, rgba(249, 115, 22, 0.12), transparent 30%),
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

@media (max-width: 992px) {
    .pv-hero {
        padding: 4.5rem 0;
        text-align: center;
    }

    .pv-lead,
    .pv-hero h1 {
        margin-right: auto;
        margin-left: auto;
    }

    .pv-actions {
        justify-content: center;
    }

    .value-grid,
    .flow-grid,
    .monitor-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 576px) {

    .pv-section,
    .pv-cta {
        padding: 3.5rem 0;
    }

    .value-grid,
    .flow-grid,
    .monitor-grid {
        grid-template-columns: 1fr;
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
}
</style>