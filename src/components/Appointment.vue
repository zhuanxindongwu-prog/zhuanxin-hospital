<template>

    <div class="appointment-page-wrapper">
        <!-- overlay -->
        <div class="coming-soon-overlay">
            <div class="coming-soon-card">
                <p class="small-title">Online Appointment</p>

                <h2>線上預約功能測試中</h2>

                <p>
                    線上預約系統目前仍在測試與優化階段，
                    暫時尚未正式開放使用。
                </p>

                <p>
                    如需預約門診，請直接來電與院內人員聯繫。
                </p>

                <div class="phone-number">
                    02-2363-3016
                </div>
            </div>
        </div>

    </div>

    <!-- 預約功能 -->
    <!-- <section class="appointment-section py-5">
        <div class="container">
            <div class="text-center mb-5">
                <p class="appointment-subtitle">Online Appointment</p>
                <h2 class="appointment-title">線上預約</h2>
                <p class="appointment-desc">
                    請先填寫基本資料與就診需求，院內人員將於營業時間內與您電話聯繫，
                    協助確認適合的檢查項目與可預約時段。
                </p>
            </div>

            <div class="row g-4">
                <div class="col-lg-8">
                    <div class="appointment-card">
                        <h4 class="section-title mb-4">預約資料</h4>

                        <div v-if="successMessage" class="alert alert-success">
                            {{ successMessage }}
                        </div>

                        <div v-if="errorMessage" class="alert alert-danger">
                            {{ errorMessage }}
                        </div>

                        <form @submit.prevent="submitForm">
                            <div class="mb-4">
                                <label class="form-label">飼主姓名 *</label>
                                <input v-model.trim="form.ownerName" type="text" class="form-control" required />
                            </div>

                            <div class="mb-4">
                                <label class="form-label">聯絡電話 *</label>
                                <input v-model.trim="form.phone" type="tel" class="form-control" required />
                            </div>

                            <div class="mb-4">
                                <label class="form-label">Email</label>
                                <input v-model.trim="form.email" type="email" class="form-control" />
                            </div>

                            <div class="mb-4">
                                <label class="form-label">地址</label>
                                <input v-model.trim="form.address" type="text" class="form-control" />
                            </div>

                            <div class="mb-4">
                                <label class="form-label">毛孩姓名 *</label>
                                <input v-model.trim="form.petName" type="text" class="form-control" required />
                            </div>

                            <div class="mb-4">
                                <label class="form-label">種類 *</label>
                                <select v-model="form.species" class="form-select" required>
                                    <option value="">請選擇</option>
                                    <option value="狗狗">狗狗</option>
                                    <option value="貓咪">貓咪</option>
                                </select>
                            </div>

                            <div class="mb-4">
                                <label class="form-label">品種</label>
                                <input v-model.trim="form.breed" type="text" class="form-control"
                                    placeholder="例如：柴犬、米克斯、英短" />
                            </div>

                            <div class="mb-4">
                                <label class="form-label">年紀</label>
                                <input v-model.trim="form.age" type="text" class="form-control"
                                    placeholder="例如：8歲、3個月" />
                            </div>

                            <div class="mb-4">
                                <label class="form-label">性別</label>
                                <select v-model="form.sex" class="form-select">
                                    <option value="">請選擇</option>
                                    <option value="男生">男生</option>
                                    <option value="女生">女生</option>
                                </select>
                            </div>

                            <div class="mb-4">
                                <label class="form-label">結紮狀態</label>
                                <select v-model="form.neutered" class="form-select">
                                    <option value="">請選擇</option>
                                    <option value="已結紮">已結紮</option>
                                    <option value="未結紮">未結紮</option>
                                    <option value="不確定">不確定</option>
                                </select>
                            </div>

                            <div class="mb-4">
                                <label class="form-label">有無晶片</label>
                                <select v-model="form.microchip" class="form-select">
                                    <option value="">請選擇</option>
                                    <option value="有">有</option>
                                    <option value="無">無</option>
                                    <option value="不確定">不確定</option>
                                </select>
                            </div>

                            <div class="mb-4">
                                <label class="form-label">想預約的服務 *</label>

                                <div class="service-grid">
                                    <label v-for="service in serviceOptions" :key="service" class="service-option"
                                        :class="{ active: form.services.includes(service) }">
                                        <input v-model="form.services" type="checkbox" :value="service" />
                                        <span>{{ service }}</span>
                                    </label>
                                </div>
                            </div>

                            <div class="mb-4">
                                <label class="form-label">目前主要症狀或想諮詢的問題</label>
                                <textarea v-model.trim="form.message" rows="5" class="form-control"
                                    placeholder="例如：近期咳嗽、喘氣、昏倒、食慾下降..."></textarea>
                            </div>

                            <div class="mb-4">
                                <label class="form-label">方便聯絡時段</label>
                                <select v-model="form.contactTime" class="form-select">
                                    <option value="">請選擇</option>
                                    <option value="上午">上午</option>
                                    <option value="下午">下午</option>
                                    <option value="晚上">晚上</option>
                                    <option value="皆可">皆可</option>
                                </select>
                            </div>

                            <div class="form-check mb-4">
                                <input v-model="form.emergency" class="form-check-input" type="checkbox"
                                    id="emergencyCheck" />
                                <label class="form-check-label" for="emergencyCheck">
                                    毛孩目前有喘、呼吸費力、昏倒、後肢突然無力等急迫狀況
                                </label>
                            </div>

                            <button type="submit" class="btn submit-btn w-100" :disabled="isSubmitting">
                                {{ isSubmitting ? '送出中...' : '送出預約需求' }}
                            </button>
                        </form>
                    </div>
                </div>

                <div class="col-lg-4">
                    <div class="info-card mb-4">
                        <h5 class="info-title">提醒您</h5>
                        <p>線上表單送出後不代表已完成預約，實際時間需由院內人員確認。</p>
                    </div>

                    <div class="info-card emergency-card mb-4">
                        <h5 class="info-title">若出現急症</h5>
                        <p>
                            若毛孩有明顯呼吸困難、張口喘氣、昏倒、癱瘓等狀況，
                            建議立即就近急診，不建議等待線上回覆。
                        </p>
                    </div>

                    <div class="info-card">
                        <h5 class="info-title">聯絡資訊</h5>
                        <p class="mb-2">02-2363-3016 / 02-2358-3056</p>
                        <p class="mb-0">台北市中正區仁愛路一段47號1樓</p>
                    </div>
                </div>
            </div>
        </div>
    </section> -->
</template>

<script setup>
import { reactive, ref } from 'vue'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase/firebaseConfig'

const serviceOptions = [
    '心臟超音波檢查',
    '心電圖檢查',
    '血液檢查',
    '麻醉術前心臟評估',
    'Holter 24小時心電圖',
    '腫瘤門診',
    '其他'
]

const initialForm = () => ({
    ownerName: '',
    phone: '',
    email: '',
    address: '',
    petName: '',
    species: '',
    breed: '',
    age: '',
    sex: '',
    neutered: '',
    microchip: '',
    services: [],
    message: '',
    contactTime: '',
    emergency: false
})

const form = reactive(initialForm())

const isSubmitting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const resetForm = () => {
    Object.assign(form, initialForm())
}

const submitForm = async () => {
    if (!form.ownerName.trim()) {
        alert('飼主姓名需要填寫')
        return
    }

    if (!form.phone.trim()) {
        alert('聯絡電話需要填寫')
        return
    }

    if (!form.petName.trim()) {
        alert('毛孩姓名需要填寫')
        return
    }

    if (!form.species) {
        alert('請選擇毛孩種類')
        return
    }

    if (!form.services || form.services.length === 0) {
        alert('請至少選擇一項想預約的服務')
        return
    }


    successMessage.value = ''
    errorMessage.value = ''

    if (!form.services.length) {
        errorMessage.value = '請至少選擇一項想預約的服務。'
        alert('請至少選擇一項想預約的服務。')
        return
    }

    try {
        isSubmitting.value = true

        await addDoc(collection(db, 'appointments'), {
            ...form,
            status: 'new',
            source: 'website',
            createdAt: serverTimestamp()
        })

        successMessage.value = '預約需求已送出，我們將盡快與您聯繫。'

        alert('預約成功！我們已收到您的預約需求，院內人員將於營業時間內與您電話聯繫。')

        resetForm()
    } catch (error) {
        console.error(error)
        errorMessage.value = '送出失敗，請稍後再試，或直接來電預約。'
        alert('送出失敗，請稍後再試，或直接來電預約。')
    } finally {
        isSubmitting.value = false
    }
}
</script>

<style scoped>
.appointment-section {
    background: #f8fafc;
}

.appointment-subtitle {
    color: #64748b;
    letter-spacing: 2px;
    margin-bottom: 10px;
}

.appointment-title {
    font-size: 3rem;
    font-weight: 800;
    color: #0f172a;
    margin-bottom: 20px;
}

.appointment-desc {
    max-width: 700px;
    margin: auto;
    color: #64748b;
    line-height: 1.8;
}

.appointment-card,
.info-card {
    background: white;
    border-radius: 24px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.06);
}

.appointment-card {
    padding: 40px;
}

.info-card {
    padding: 30px;
}

.section-title,
.info-title {
    font-weight: 700;
    color: #0f172a;
}

.info-title {
    margin-bottom: 16px;
}

.form-label {
    font-weight: 600;
    margin-bottom: 10px;
    color: #1e293b;
}

.form-control,
.form-select {
    border-radius: 14px;
    padding: 14px;
    border: 1px solid #dbe2ea;
}

.form-control:focus,
.form-select:focus {
    border-color: #0f172a;
    box-shadow: none;
}

.service-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 14px;
}

.service-option {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px;
    border-radius: 16px;
    border: 1px solid #dbe2ea;
    background: white;
    cursor: pointer;
    transition: 0.25s;
}

.service-option:hover,
.service-option.active {
    border-color: #0f172a;
    background: #f8fafc;
    transform: translateY(-2px);
}

.service-option input {
    width: 18px;
    height: 18px;
    accent-color: #0f172a;
}

.service-option span {
    font-weight: 600;
    color: #1e293b;
}

.submit-btn {
    background: #0f172a;
    color: white;
    padding: 16px;
    border-radius: 16px;
    font-weight: 700;
    transition: 0.3s;
}

.submit-btn:hover {
    background: #1e293b;
    color: white;
    transform: translateY(-2px);
}

.submit-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}

.info-card p {
    color: #64748b;
    line-height: 1.8;
}

.emergency-card {
    border: 2px solid #fecaca;
    background: #fff7f7;
}

@media (max-width:768px) {
    .appointment-title {
        font-size: 2.2rem;
    }

    .appointment-card {
        padding: 24px;
    }

    .service-grid {
        grid-template-columns: 1fr;
    }
}
</style>