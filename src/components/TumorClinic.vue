<template>
    <section id="tumor" class="oncology-section py-5">
        <div class="container">
            <div class="oncology-hero">
                <div class="row align-items-center g-5">
                    <div class="col-lg-6">
                        <p class="section-label">Oncology Service</p>

                        <h2 class="section-title">
                            腫瘤門診
                        </h2>

                        <p class="section-subtitle">
                            從腫塊評估、影像檢查、治療規劃到安寧照護，
                            依照腫瘤類型與毛孩狀態，提供個別化醫療建議。
                        </p>

                        <div class="oncology-actions">
                            <a href="/files/專心腫瘤轉診單(新版1).docx" class="primary-btn">
                                下載腫瘤轉診單
                            </a>
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <div class="warning-grid">
                            <div v-for="item in warnings" :key="item.title" class="warning-card">
                                <span>{{ item.icon }}</span>
                                <h3>{{ item.title }}</h3>
                                <p>{{ item.text }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row g-4 mt-4">
                <div v-for="service in oncologyServices" :key="service.title" class="col-md-4">
                    <div class="oncology-card h-100">
                        <div class="oncology-icon">{{ service.icon }}</div>
                        <h3>{{ service.title }}</h3>
                        <p>{{ service.text }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'

const warnings = [
    {
        icon: '🐶',
        title: '不明腫塊',
        text: '身體出現腫塊、持續變大，或外觀突然改變。'
    },
    {
        icon: '🐱',
        title: '食慾與體重變化',
        text: '食慾下降、體重減輕、精神變差或活動力降低。'
    },
    {
        icon: '⚠️',
        title: '慢性不適',
        text: '長期嘔吐、腹瀉、咳嗽、呼吸異常或反覆不舒服。'
    }
]

const oncologyServices = [
    {
        icon: '🔬',
        title: '腫瘤初步評估',
        text: '整合問診、理學檢查、細胞學或切片結果，判斷下一步診療方向。'
    },
    {
        icon: '🩻',
        title: '影像與分期檢查',
        text: '透過 X 光、超音波或其他影像檢查，評估腫瘤位置與擴散情形。'
    },
    {
        icon: '💊',
        title: '治療與生活品質照護',
        text: '依腫瘤類型規劃化療、標靶、節拍式治療或安寧照護。'
    }
]
</script>

<style scoped>
.oncology-section {
    background:
        linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
}

.oncology-hero {
    overflow: hidden;
    padding: 3rem;
    border-radius: 2rem;
    background:
        radial-gradient(circle at 15% 20%, rgba(37, 99, 235, 0.18), transparent 32%),
        linear-gradient(135deg, #0f172a, #1e3a8a);
    color: #ffffff;
    box-shadow: 0 28px 80px rgba(15, 23, 42, 0.22);
}

.section-label {
    display: inline-block;
    margin-bottom: 0.75rem;
    color: #bfdbfe;
    font-size: 0.85rem;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
}

.section-title {
    font-size: clamp(2.2rem, 5vw, 4rem);
    font-weight: 900;
    letter-spacing: -0.04em;
    margin-bottom: 1rem;
}

.section-subtitle {
    max-width: 620px;
    color: #dbeafe;
    font-size: 1.08rem;
    line-height: 1.9;
    margin-bottom: 2rem;
}

.oncology-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.primary-btn,
.secondary-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.85rem 1.4rem;
    border-radius: 999px;
    font-weight: 800;
    text-decoration: none;
    transition:
        transform 0.25s ease,
        box-shadow 0.25s ease,
        background 0.25s ease;
}

.primary-btn {
    background: #ffffff;
    color: #1e3a8a;
}

.secondary-btn {
    border: 1px solid rgba(255, 255, 255, 0.55);
    color: #ffffff;
}

.primary-btn:hover,
.secondary-btn:hover {
    transform: translateY(-2px);
}

.secondary-btn:hover {
    background: rgba(255, 255, 255, 0.12);
}

.warning-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
}

.warning-card {
    padding: 1.2rem;
    border-radius: 1.4rem;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.14);
    backdrop-filter: blur(10px);
}

.warning-card span {
    font-size: 1.6rem;
}

.warning-card h3 {
    margin: 0.6rem 0 0.4rem;
    font-size: 1.15rem;
    font-weight: 800;
}

.warning-card p {
    color: #dbeafe;
    line-height: 1.7;
    margin-bottom: 0;
}

.oncology-card {
    padding: 1.6rem;
    border-radius: 1.6rem;
    background: #ffffff;
    border: 1px solid rgba(148, 163, 184, 0.22);
    box-shadow: 0 18px 45px rgba(15, 23, 42, 0.07);
    transition:
        transform 0.28s ease,
        box-shadow 0.28s ease,
        border-color 0.28s ease;
}

.oncology-card:hover {
    transform: translateY(-7px);
    border-color: rgba(37, 99, 235, 0.35);
    box-shadow:
        0 28px 70px rgba(15, 23, 42, 0.13),
        0 0 24px rgba(37, 99, 235, 0.1);
}

.oncology-icon {
    width: 58px;
    height: 58px;
    display: grid;
    place-items: center;
    margin-bottom: 1.2rem;
    border-radius: 1rem;
    background: #eff6ff;
    font-size: 1.8rem;
}

.oncology-card h3 {
    color: #0f172a;
    font-size: 1.25rem;
    font-weight: 800;
    margin-bottom: 0.75rem;
}

.oncology-card p {
    color: #64748b;
    line-height: 1.8;
    margin-bottom: 0;
}

@media (max-width: 768px) {
    .oncology-hero {
        padding: 2rem 1.25rem;
    }

    .primary-btn,
    .secondary-btn {
        width: 100%;
    }
}
</style>