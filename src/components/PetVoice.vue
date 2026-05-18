<template>
    <main class="petvoice-page">
        <!-- Hero -->
        <section class="pv-hero">
            <div class="container">
                <div class="row align-items-center g-5">
                    <div class="col-lg-6">
                        <span class="eyebrow">PetVoice 智慧項圈</span>
                        <h1>16 項健康監測，守護毛孩的每一天</h1>
                        <p>
                            PetVoice 是犬貓用智慧健康監測系統，透過輕量化感測器、居家裝置與
                            App，協助飼主與動物醫院追蹤毛孩的日常變化。
                        </p>

                        <div class="hero-actions">
                            <a href="#features" class="btn btn-primary">了解監測功能</a>
                            <a href="#contact" class="btn btn-outline">預約諮詢</a>
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <div class="hero-card">
                            <div class="device-circle">
                                <span>CORE</span>
                                <strong>僅 4.8g</strong>
                            </div>
                            <h3>輕巧、可拆卸、適合日常配戴</h3>
                            <p>
                                PetVoice CORE 內建 9 軸感測器與溫度感測器，可收集活動與健康相關資料，
                                並透過 HOME 上傳至雲端。
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Features -->
        <section id="features" class="section">
            <div class="container">
                <div class="section-heading">
                    <span>ADVANTAGE</span>
                    <h2>PetVoice 的三大特色</h2>
                    <p>從居家數據、輕量化設計，到動物醫院合作，讓健康監測更貼近日常生活。</p>
                </div>

                <div class="row g-4">
                    <div class="col-md-4" v-for="item in features" :key="item.title">
                        <div class="feature-card">
                            <div class="icon">{{ item.icon }}</div>
                            <h3>{{ item.title }}</h3>
                            <p>{{ item.text }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Monitoring -->
        <section class="section soft-bg">
            <div class="container">
                <div class="row align-items-center g-5">
                    <div class="col-lg-5">
                        <span class="eyebrow">Health Monitoring</span>
                        <h2>掌握毛孩看不見的變化</h2>
                        <p>
                            對心臟病、肺水腫風險、慢性病或高齡毛孩而言，
                            單次回診只能看到當下狀態；連續居家監測則能幫助我們觀察趨勢。
                        </p>
                    </div>

                    <div class="col-lg-7">
                        <div class="monitor-grid">
                            <div v-for="m in monitoringItems" :key="m" class="monitor-pill">
                                {{ m }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Cases -->
        <section class="section">
            <div class="container">
                <div class="section-heading">
                    <span>CASES</span>
                    <h2>適合使用 PetVoice 的情境</h2>
                </div>

                <div class="row g-4">
                    <div class="col-md-4" v-for="c in cases" :key="c.title">
                        <div class="case-card">
                            <div class="case-tag">{{ c.tag }}</div>
                            <h3>{{ c.title }}</h3>
                            <p>{{ c.text }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Specs -->
        <section class="section soft-bg">
            <div class="container">
                <div class="section-heading">
                    <span>SPEC</span>
                    <h2>產品組成</h2>
                </div>

                <div class="spec-table">
                    <table>
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
                                <td>連續運作</td>
                                <td>約 7 天</td>
                                <td>持續電源連接</td>
                            </tr>
                            <tr>
                                <td>通訊方式</td>
                                <td>BLE</td>
                                <td>BLE、Wi-Fi</td>
                            </tr>
                            <tr>
                                <td>功能</td>
                                <td>9 軸感測器、溫度感測器、活動資料取得</td>
                                <td>CORE 充電、資料上傳、室溫濕度測量</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>

        <!-- How to use -->
        <section class="section">
            <div class="container">
                <div class="section-heading">
                    <span>HOW TO USE</span>
                    <h2>使用流程</h2>
                </div>

                <div class="timeline">
                    <div class="step" v-for="(s, index) in steps" :key="s.title">
                        <div class="step-number">{{ index + 1 }}</div>
                        <div>
                            <h3>{{ s.title }}</h3>
                            <p>{{ s.text }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Vet Review -->
        <section class="section soft-bg">
            <div class="container">
                <div class="review-card">
                    <span class="eyebrow">Veterinary Review</span>
                    <h2>心臟病照護中，安靜時呼吸次數很重要</h2>
                    <p>
                        對患有心臟病的犬貓而言，安靜時呼吸次數是評估病情與預測心臟衰竭風險的重要資訊。
                        若能在居家環境中持續追蹤，將有助於更早發現異常。
                    </p>
                </div>
            </div>
        </section>

        <!-- Partner -->
        <section class="section">
            <div class="container">
                <div class="partner-box">
                    <span class="eyebrow">Taiwan Partner</span>
                    <h2>專心動物醫院 × PetVoice</h2>
                    <p>
                        專心動物醫院為台灣心臟專科動物醫院，結合臨床心臟專業與智慧監測科技，
                        協助更多心臟病犬貓在家中也能被持續守護。
                    </p>
                </div>
            </div>
        </section>

        <!-- CTA -->
        <section id="contact" class="cta-section">
            <div class="container">
                <h2>想了解 PetVoice 是否適合您的毛孩？</h2>
                <p>若您的狗狗或貓咪有心臟病、肺水腫病史、高齡慢性病，歡迎與我們討論。</p>
                <a href="https://www.petvoice.co.jp/#cont3" class="btn btn-light">了解更多</a>
            </div>
        </section>
    </main>
</template>

<script setup>
const features = [
    {
        icon: '📊',
        title: '健康數據一覽',
        text: '透過 App 追蹤毛孩日常狀態，讓飼主更容易掌握健康變化。',
    },
    {
        icon: '🪶',
        title: '輕巧設計',
        text: 'PetVoice CORE 約 5g，減少毛孩配戴負擔，適合長時間居家監測。',
    },
    {
        icon: '🏥',
        title: '動物醫院合作',
        text: '可與合作動物醫院共享資料，由獸醫師提供更專業的判讀與建議。',
    },
]

const monitoringItems = [
    '安靜時呼吸次數',
    '活動量',
    '睡眠狀態',
    '理毛時間',
    '室內溫度',
    '室內濕度',
    '日常趨勢',
    '異常通知',
]

const cases = [
    {
        tag: '心臟病',
        title: '二尖瓣閉鎖不全',
        text: '適合需要長期追蹤呼吸次數與活動變化的心臟病犬貓。',
    },
    {
        tag: '肺水腫',
        title: '反覆心衰竭病患',
        text: '幫助飼主更早注意呼吸頻率變化，降低延誤就醫風險。',
    },
    {
        tag: '慢性病',
        title: '高齡或腫瘤治療中',
        text: '透過活動、睡眠與日常趨勢，觀察整體生活品質變化。',
    },
]

const steps = [
    {
        title: '配戴 CORE 與 BELT',
        text: '將 PetVoice CORE 安裝於項圈，讓毛孩在家中自然配戴。',
    },
    {
        title: '設置 HOME 裝置',
        text: 'HOME 可接收 CORE 資料，並透過 Wi-Fi 上傳至雲端。',
    },
    {
        title: 'App 查看健康資料',
        text: '飼主可透過 App 查看毛孩的健康狀態與異常提醒。',
    },
    {
        title: '必要時諮詢獸醫師',
        text: '若資料出現異常趨勢，可進一步諮詢動物醫院或安排回診。',
    },
]
</script>

<style scoped>
.petvoice-page {
    color: #24313f;
    background: #ffffff;
}

.container {
    max-width: 1140px;
}

.pv-hero {
    padding: 96px 0;
    background:
        radial-gradient(circle at top right, rgba(77, 166, 255, 0.18), transparent 35%),
        linear-gradient(135deg, #f4fbff 0%, #ffffff 55%, #eef8f5 100%);
}

.eyebrow {
    display: inline-block;
    margin-bottom: 12px;
    color: #1d9a8a;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-size: 0.85rem;
}

h1 {
    font-size: clamp(2.2rem, 5vw, 4rem);
    font-weight: 800;
    line-height: 1.15;
    margin-bottom: 24px;
}

h2 {
    font-size: clamp(1.8rem, 3vw, 2.6rem);
    font-weight: 800;
    margin-bottom: 16px;
}

h3 {
    font-size: 1.25rem;
    font-weight: 800;
}

p {
    color: #5d6a75;
    line-height: 1.9;
}

.hero-actions {
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
    margin-top: 32px;
}

.btn {
    border-radius: 999px;
    padding: 12px 24px;
    font-weight: 700;
    text-decoration: none;
}

.btn-primary {
    background: #1d9a8a;
    border: 1px solid #1d9a8a;
    color: #fff;
}

.btn-outline {
    border: 1px solid #1d9a8a;
    color: #1d9a8a;
    background: transparent;
}

.btn-light {
    background: #fff;
    color: #1d9a8a;
}

.hero-card {
    background: rgba(255, 255, 255, 0.88);
    border: 1px solid rgba(29, 154, 138, 0.16);
    border-radius: 32px;
    padding: 40px;
    box-shadow: 0 24px 60px rgba(36, 49, 63, 0.1);
}

.device-circle {
    width: 170px;
    height: 170px;
    border-radius: 50%;
    background: linear-gradient(135deg, #1d9a8a, #6fc8bd);
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin-bottom: 28px;
}

.device-circle span {
    font-size: 0.9rem;
    opacity: 0.9;
}

.device-circle strong {
    font-size: 2rem;
}

.section {
    padding: 88px 0;
}

.soft-bg {
    background: #f5fbfa;
}

.section-heading {
    text-align: center;
    max-width: 720px;
    margin: 0 auto 48px;
}

.section-heading span {
    color: #1d9a8a;
    font-weight: 800;
    letter-spacing: 0.08em;
}

.feature-card,
.case-card,
.review-card,
.partner-box {
    height: 100%;
    background: #fff;
    border-radius: 28px;
    padding: 32px;
    border: 1px solid #edf2f5;
    box-shadow: 0 12px 36px rgba(36, 49, 63, 0.06);
}

.feature-card .icon {
    font-size: 2rem;
    margin-bottom: 18px;
}

.monitor-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
}

.monitor-pill {
    background: #fff;
    border: 1px solid #dcefeb;
    border-radius: 999px;
    padding: 16px 20px;
    font-weight: 700;
    text-align: center;
    color: #1d635b;
}

.case-tag {
    display: inline-block;
    padding: 6px 14px;
    border-radius: 999px;
    background: #e8f7f5;
    color: #1d9a8a;
    font-weight: 700;
    margin-bottom: 18px;
}

.spec-table {
    overflow-x: auto;
    background: #fff;
    border-radius: 28px;
    box-shadow: 0 12px 36px rgba(36, 49, 63, 0.06);
}

table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    padding: 20px;
    border-bottom: 1px solid #edf2f5;
    text-align: left;
    vertical-align: top;
}

th {
    background: #1d9a8a;
    color: #fff;
}

.timeline {
    display: grid;
    gap: 22px;
    max-width: 820px;
    margin: 0 auto;
}

.step {
    display: grid;
    grid-template-columns: 56px 1fr;
    gap: 20px;
    align-items: start;
    background: #fff;
    border: 1px solid #edf2f5;
    border-radius: 24px;
    padding: 24px;
    box-shadow: 0 10px 30px rgba(36, 49, 63, 0.05);
}

.step-number {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: #1d9a8a;
    color: #fff;
    display: grid;
    place-items: center;
    font-weight: 800;
    font-size: 1.2rem;
}

.review-card,
.partner-box {
    max-width: 860px;
    margin: 0 auto;
    text-align: center;
}

.cta-section {
    padding: 80px 0;
    text-align: center;
    background: linear-gradient(135deg, #1d9a8a, #56b8aa);
    color: #fff;
}

.cta-section p {
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 28px;
}

@media (max-width: 768px) {
    .pv-hero {
        padding: 72px 0;
    }

    .section {
        padding: 64px 0;
    }

    .hero-card {
        padding: 28px;
    }

    .monitor-grid {
        grid-template-columns: 1fr;
    }

    .step {
        grid-template-columns: 1fr;
    }

    th,
    td {
        padding: 14px;
        font-size: 0.9rem;
    }
}
</style>