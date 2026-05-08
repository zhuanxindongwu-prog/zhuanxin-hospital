<template>
  <section class="symptom-section py-5">
    <div class="container">
      <div class="symptom-panel">
        <div class="text-center mb-4">
          <p class="section-kicker">Heart Check</p>
          <h2>你的毛孩有這些症狀嗎？</h2>
          <p class="section-desc">
            若出現喘、咳嗽、昏倒或活動力下降，可能與心臟疾病有關。
          </p>
        </div>

        <div class="row g-4 mb-4">
          <div v-for="symptom in symptoms" :key="symptom.id" class="col-md-4">
            <button type="button" class="symptom-card" :class="{ active: symptom.checked }"
              @click="symptom.checked = !symptom.checked">
              <div class="symptom-icon">{{ symptom.icon }}</div>
              <h5>{{ symptom.title }}</h5>
              <p>{{ symptom.desc }}</p>
              <span class="check-mark">
                {{ symptom.checked ? '已勾選' : '點選症狀' }}
              </span>
            </button>
          </div>
        </div>

        <div class="risk-box text-center">
          <p class="risk-label">目前風險分數</p>
          <h3>{{ riskScore }} / {{ symptoms.length }}</h3>
          <p class="risk-text">{{ riskMessage }}</p>

          <a href="https://docs.google.com/forms/d/e/YOUR_FORM/viewform" target="_blank"
            class="btn btn-primary rounded-pill px-4 mt-2">
            立即線上預約
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, reactive } from 'vue'

const symptoms = reactive([
  {
    id: 1,
    icon: '🐶',
    title: '容易喘或活動力下降',
    desc: '散步變慢、容易累、運動後喘比較久。',
    checked: false
  },
  {
    id: 2,
    icon: '🐱',
    title: '持續咳嗽或呼吸變快',
    desc: '休息時呼吸變快、夜間咳嗽或咳嗽頻率增加。',
    checked: false
  },
  {
    id: 3,
    icon: '⚠️',
    title: '突然昏倒或虛弱',
    desc: '短暫倒下、站不穩、突然無力或精神變差。',
    checked: false
  }
])

const riskScore = computed(() => {
  return symptoms.filter(symptom => symptom.checked).length
})

const riskMessage = computed(() => {
  if (riskScore.value === 0) {
    return '目前尚未勾選明顯警訊，仍建議持續觀察日常呼吸與活動力。'
  }

  if (riskScore.value === 1) {
    return '已有一項可能相關症狀，建議記錄發生頻率並安排評估。'
  }

  if (riskScore.value === 2) {
    return '已有多項可能相關症狀，建議安排心臟檢查。'
  }

  return '出現多項警訊，建議儘快安排心臟專科評估。'
})
</script>

<style scoped>
.symptom-section {
  background: #fff;
}

.symptom-panel {
  background: linear-gradient(135deg, #eef7ff, #e6f1ff);
  border-radius: 28px;
  padding: 56px 48px;
}

.section-kicker {
  color: #1d7ed0;
  font-weight: 700;
  letter-spacing: 0.08em;
  margin-bottom: 8px;
}

.symptom-panel h2 {
  font-size: 2.2rem;
  font-weight: 800;
  color: #1f2a37;
}

.section-desc {
  color: #526173;
  font-size: 1.05rem;
  margin-top: 12px;
}

.symptom-card {
  width: 100%;
  height: 100%;
  border: 2px solid transparent;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.75);
  padding: 28px 22px;
  text-align: center;
  transition: 0.25s ease;
  cursor: pointer;
}

.symptom-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 32px rgba(44, 89, 140, 0.14);
}

.symptom-card.active {
  border-color: #1d7ed0;
  background: #ffffff;
  box-shadow: 0 16px 36px rgba(29, 126, 208, 0.18);
}

.symptom-icon {
  font-size: 2.4rem;
  margin-bottom: 16px;
}

.symptom-card h5 {
  font-weight: 800;
  color: #1f2a37;
  margin-bottom: 10px;
}

.symptom-card p {
  color: #5f6f82;
  font-size: 0.95rem;
  line-height: 1.7;
  min-height: 54px;
}

.check-mark {
  display: inline-block;
  margin-top: 12px;
  padding: 6px 16px;
  border-radius: 999px;
  background: #e8f2ff;
  color: #1d7ed0;
  font-weight: 700;
  font-size: 0.9rem;
}

.risk-box {
  background: #ffffff;
  border-radius: 24px;
  padding: 28px;
  box-shadow: 0 12px 28px rgba(44, 89, 140, 0.1);
}

.risk-label {
  color: #64748b;
  font-weight: 700;
  margin-bottom: 4px;
}

.risk-box h3 {
  color: #1d7ed0;
  font-size: 2.4rem;
  font-weight: 900;
  margin-bottom: 8px;
}

.risk-text {
  color: #374151;
  margin-bottom: 12px;
}

@media (max-width: 768px) {
  .symptom-panel {
    padding: 40px 22px;
  }

  .symptom-panel h2 {
    font-size: 1.7rem;
  }
}
</style>