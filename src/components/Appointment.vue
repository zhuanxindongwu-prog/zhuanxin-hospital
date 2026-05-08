<template>
    <main class="appointment-page">
        <section class="appointment-hero">
            <div class="container">
                <p class="eyebrow">Online Appointment</p>
                <h1>線上預約</h1>
                <p class="lead">
                    請先填寫基本資料與就診需求，院內人員將於營業時間內與您電話聯繫，
                    協助確認適合的檢查項目與可預約時段。
                </p>
            </div>
        </section>

        <section class="appointment-section">
            <div class="container">
                <div class="row g-4">
                    <div class="col-lg-7">
                        <form class="appointment-card" @submit.prevent="submitForm">
                            <h2>預約資料</h2>

                            <div class="mb-3">
                                <label class="form-label">飼主姓名</label>
                                <input v-model="form.ownerName" type="text" class="form-control" required />
                            </div>

                            <div class="mb-3">
                                <label class="form-label">聯絡電話</label>
                                <input v-model="form.phone" type="tel" class="form-control" required />
                            </div>

                            <div class="mb-3">
                                <label class="form-label">毛孩姓名</label>
                                <input v-model="form.petName" type="text" class="form-control" required />
                            </div>

                            <div class="mb-3">
                                <label class="form-label">種類</label>
                                <select v-model="form.species" class="form-select" required>
                                    <option value="">請選擇</option>
                                    <option value="dog">狗狗</option>
                                    <option value="cat">貓咪</option>
                                </select>
                            </div>

                            <div class="mb-3">
                                <label class="form-label">想預約的服務</label>
                                <select v-model="form.service" class="form-select" required>
                                    <option value="">請選擇</option>
                                    <option>心臟超音波檢查</option>
                                    <option>心電圖檢查</option>
                                    <option>Holter 24小時心電圖</option>
                                    <option>麻醉術前心臟評估</option>
                                    <option>腫瘤門診</option>
                                    <option>其他</option>
                                </select>
                            </div>

                            <div class="mb-3">
                                <label class="form-label">目前主要症狀或想諮詢的問題</label>
                                <textarea v-model="form.message" class="form-control" rows="5"
                                    placeholder="例如：最近咳嗽、喘、心雜音、想做麻醉前評估等"></textarea>
                            </div>

                            <div class="mb-3">
                                <label class="form-label">方便聯絡時段</label>
                                <select v-model="form.contactTime" class="form-select">
                                    <option value="">請選擇</option>
                                    <option>上午</option>
                                    <option>下午</option>
                                    <option>晚上</option>
                                    <option>皆可</option>
                                </select>
                            </div>

                            <div class="form-check mb-4">
                                <input id="urgent" v-model="form.urgent" class="form-check-input" type="checkbox" />
                                <label class="form-check-label" for="urgent">
                                    毛孩目前有喘、呼吸費力、昏倒、後肢突然無力等急迫狀況
                                </label>
                            </div>

                            <button type="submit" class="btn-submit">
                                送出預約需求
                            </button>

                            <p v-if="submitted" class="success-message">
                                已收到您的預約需求，我們將於營業時間內與您聯繫。
                            </p>
                        </form>
                    </div>

                    <div class="col-lg-5">
                        <aside class="info-card">
                            <h3>提醒您</h3>
                            <p>
                                線上表單送出後不代表已完成預約，實際時間需由院內人員確認。
                            </p>

                            <div class="notice-box urgent">
                                <h4>若出現急症</h4>
                                <p>
                                    若毛孩有明顯呼吸困難、張口喘氣、昏倒、癱瘓等狀況，
                                    建議立即就近急診，不建議等待線上回覆。
                                </p>
                            </div>

                            <div class="notice-box">
                                <h4>聯絡資訊</h4>
                                <p>02-2363-3016 / 02-2358-3056</p>
                                <p>台北市中正區仁愛路一段47號1樓</p>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup>
import { reactive, ref } from 'vue'

const submitted = ref(false)

const form = reactive({
    ownerName: '',
    phone: '',
    petName: '',
    species: '',
    service: '',
    message: '',
    contactTime: '',
    urgent: false
})

function submitForm() {
    console.log('預約資料：', { ...form })
    submitted.value = true

    Object.keys(form).forEach((key) => {
        form[key] = typeof form[key] === 'boolean' ? false : ''
    })
}
</script>

<style scoped>
.appointment-page {
    background: #f8f5ef;
    color: #2f2a24;
}

.appointment-hero {
    padding: 120px 0 70px;
    background: linear-gradient(135deg, #3f2f24, #7a5a3a);
    color: white;
}

.eyebrow {
    letter-spacing: 0.15em;
    text-transform: uppercase;
    font-size: 0.85rem;
    opacity: 0.8;
}

.appointment-hero h1 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 1rem;
}

.appointment-hero .lead {
    max-width: 720px;
    line-height: 1.9;
}

.appointment-section {
    padding: 70px 0;
}

.appointment-card,
.info-card {
    background: white;
    border-radius: 24px;
    padding: 36px;
    box-shadow: 0 18px 45px rgba(55, 38, 22, 0.08);
}

.appointment-card h2,
.info-card h3 {
    font-weight: 700;
    margin-bottom: 24px;
}

.form-label {
    font-weight: 600;
    color: #4a3a2c;
}

.form-control,
.form-select {
    border-radius: 14px;
    padding: 12px 14px;
    border: 1px solid #ddd2c4;
}

.form-control:focus,
.form-select:focus {
    border-color: #9b7650;
    box-shadow: 0 0 0 0.2rem rgba(155, 118, 80, 0.18);
}

.btn-submit {
    width: 100%;
    border: none;
    border-radius: 999px;
    padding: 14px 24px;
    background: #7a5a3a;
    color: white;
    font-weight: 700;
    transition: 0.25s ease;
}

.btn-submit:hover {
    background: #5c422a;
    transform: translateY(-2px);
}

.success-message {
    margin-top: 18px;
    color: #2f7d46;
    font-weight: 600;
}

.info-card {
    position: sticky;
    top: 100px;
}

.info-card p {
    line-height: 1.8;
}

.notice-box {
    margin-top: 24px;
    padding: 20px;
    border-radius: 18px;
    background: #f8f1e8;
}

.notice-box h4 {
    font-size: 1.1rem;
    font-weight: 700;
}

.notice-box.urgent {
    background: #fff0ec;
    border-left: 5px solid #c85b42;
}

@media (max-width: 768px) {
    .appointment-hero {
        padding: 90px 0 50px;
    }

    .appointment-hero h1 {
        font-size: 2.3rem;
    }

    .appointment-card,
    .info-card {
        padding: 24px;
    }

    .info-card {
        position: static;
    }
}
</style>