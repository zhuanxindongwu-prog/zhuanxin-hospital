<template>
    <section class="ohtrust-page">
        <div class="container py-5">
            <!-- Hero -->
            <div class="product-hero rounded-5 p-4 p-md-5 mb-5">
                <p class="section-kicker mb-2">Products</p>
                <h1 class="fw-bold mb-3">賴瓦特</h1>
                <p class="lead mb-0">
                    以安全性檢測為基礎，結合抗菌、除臭與環境照護應用，提供犬貓日常環境清潔與氣味管理的輔助選擇。
                </p>
            </div>

            <!-- 基本五項 -->
            <div class="mb-5">
                <h2 class="fw-bold mb-3">基本五項安全性測試</h2>
                <p class="text-muted mb-4">
                    基本五項檢測主要用來評估產品在皮膚接觸、誤舔、吸入與保存穩定性上的安全基礎。
                </p>

                <div class="row g-4">
                    <div v-for="item in basicTests" :key="item.title" class="col-md-6 col-lg-4">
                        <div class="test-card h-100 rounded-4 p-4">
                            <div class="icon-circle mb-3">
                                <i :class="item.icon"></i>
                            </div>
                            <h5 class="fw-bold">{{ item.title }}</h5>
                            <p class="small text-muted mb-2">{{ item.description }}</p>
                            <p class="clinical-note mb-0">{{ item.meaning }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 檢驗報告連結 -->
            <div class="report-section rounded-4 p-4 mb-5">
                <h3 class="fw-bold mb-4">檢驗報告</h3>

                <div class="row g-3">
                    <div v-for="report in reports" :key="report.name" class="col-md-6 col-lg-4">
                        <a :href="report.link" target="_blank" rel="noopener noreferrer"
                            class="report-card d-block p-3 rounded-3 text-decoration-none">
                            <div class="d-flex align-items-center">
                                <i class="bi bi-file-earmark-pdf fs-3 me-3 text-danger"></i>

                                <div>
                                    <div class="fw-semibold text-dark">
                                        {{ report.name }}
                                    </div>
                                    <small class="text-muted">
                                        {{ report.desc }}
                                    </small>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>

            <!-- 臨床解讀 -->
            <div class="evidence-box rounded-4 p-4 mb-5">
                <h3 class="fw-bold mb-4">檢測結果的臨床解讀</h3>

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
                                <td class="fw-semibold">{{ row.test }}</td>
                                <td>{{ row.purpose }}</td>
                                <td>{{ row.support }}</td>
                                <td class="text-danger">{{ row.limit }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- 提醒 -->
            <div class="row g-4 mb-5">
                <div class="col-lg-6">
                    <div class="info-panel rounded-4 p-4 h-100">
                        <h3 class="fw-bold mb-3">產品定位</h3>
                        <p>
                            歐舒特較適合定位為
                            <strong>環境清潔、抗菌除臭與日常照護輔助產品</strong>。
                            安全性報告可支持一般接觸情境下的使用安全，但不應直接延伸為疾病治療效果。
                        </p>
                        <p class="mb-0">
                            建議文案使用「輔助環境管理」、「降低異味」、「日常清潔照護」等表述，
                            避免宣稱可治療皮膚病、感染症、呼吸道疾病或牙周疾病。
                        </p>
                    </div>
                </div>

                <div class="col-lg-6">
                    <div class="warning-panel rounded-4 p-4 h-100">
                        <h3 class="fw-bold mb-3">專業使用提醒</h3>
                        <ul class="mb-0">
                            <li>可作為環境與氣味管理輔助，不可取代醫療級消毒。</li>
                            <li>抗菌或抗病毒實驗多屬實驗室條件，不等於臨床治療效果。</li>
                            <li>貓、幼齡動物、呼吸道疾病或心肺功能不佳個體，使用氣霧產品仍建議保持通風。</li>
                            <li>若動物已有皮膚病、咳嗽、喘鳴或感染問題，仍應由獸醫師診斷治療。</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- CTA -->
            <div class="cta-box rounded-5 p-4 p-md-5 text-center">
                <p class="section-kicker mb-2">Safe Daily Care</p>
                <h2 class="fw-bold mb-3">用更安心的方式，維持犬貓生活環境品質</h2>
                <p class="text-muted mb-4">
                    歐舒特可作為日常環境清潔與氣味管理的輔助工具，搭配正確通風、環境清潔與獸醫師專業評估，讓照護更完整。
                </p>
                <RouterLink to="/#contact" class="btn btn-primary btn-lg rounded-pill px-4">
                    詢問產品使用方式
                </RouterLink>
            </div>
        </div>
    </section>
</template>

<script setup>
const basicTests = [
    {
        title: '皮膚刺激性測試',
        icon: 'bi bi-shield-check',
        description: '評估產品接觸皮膚後是否造成紅腫、刺激或發炎反應。',
        meaning: '可支持日常皮膚接觸安全性，但不代表可治療皮膚疾病。',
    },
    {
        title: '皮膚過敏性測試',
        icon: 'bi bi-droplet',
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
    background: #f7f8fa;
    color: #24313f;
}

.product-hero {
    background:
        linear-gradient(rgba(20, 45, 65, 0.72), rgba(20, 45, 65, 0.72)),
        url('/imgs/ohtrust-hero.webp');
    background-size: cover;
    background-position: center;
    color: white;
}

.section-kicker {
    color: #3aa6b9;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
}

.test-card,
.report-section,
.info-panel,
.warning-panel,
.evidence-box,
.cta-box {
    background: white;
    box-shadow: 0 12px 30px rgba(30, 45, 60, 0.08);
}

.test-card,
.report-card {
    transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.test-card:hover,
.report-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 18px 36px rgba(30, 45, 60, 0.12);
}

.report-card {
    background: #ffffff;
    border: 1px solid #edf1f4;
}

.icon-circle {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: #e8f6f8;
    color: #16889a;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.4rem;
}

.clinical-note {
    font-size: 0.92rem;
    color: #2f6f7a;
    font-weight: 600;
}

.warning-panel {
    border-left: 5px solid #f0ad4e;
}

.table th {
    color: #2f6f7a;
    white-space: nowrap;
}

.cta-box {
    background: linear-gradient(135deg, #ffffff, #eaf8fa);
}

.btn-primary {
    background-color: #16889a;
    border-color: #16889a;
}

.btn-primary:hover {
    background-color: #0f6f7e;
    border-color: #0f6f7e;
}

@media (max-width: 768px) {
    .product-hero {
        text-align: center;
    }

    .table {
        font-size: 0.9rem;
    }
}
</style>