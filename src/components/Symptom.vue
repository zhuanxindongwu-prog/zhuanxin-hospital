<template>
  <section id="symptom" class="symptom-section py-5">
    <div class="container">
      <div class="text-center mb-5">
        <p class="section-label">When should you check the heart?</p>
        <h2 class="section-title">你的毛孩有這些症狀嗎？</h2>
        <p class="section-subtitle mx-auto">
          犬貓心臟病不一定一開始就會有明顯症狀。若出現以下情況，
          建議安排心臟相關檢查，例如胸腔 X 光、心臟超音波或心電圖評估。
        </p>
      </div>

      <div class="row g-4">
        <div v-for="(item, index) in symptoms" :key="item.title" class="col-md-6 col-lg-3">
          <div class="symptom-card h-100" :class="{ active: activeIndex === index }" @click="toggleCard(index)">
            <div class="symptom-icon">{{ item.icon }}</div>

            <h3>{{ item.title }}</h3>

            <p class="symptom-summary">
              {{ item.summary }}
            </p>

            <ul class="symptom-list">
              <li v-for="point in item.points" :key="point">
                {{ point }}
              </li>
            </ul>

            <div class="symptom-more">
              <p>{{ item.detail }}</p>
            </div>

            <button class="symptom-toggle" type="button">
              {{ activeIndex === index ? '收合內容' : '了解更多' }}
            </button>
          </div>
        </div>
      </div>

      <div class="breathing-alert mt-5">
        <div>
          <p class="alert-label">需要特別警覺的呼吸變化</p>
          <h3>休息或睡覺時呼吸持續變快，建議儘快評估</h3>
          <p>
            若毛孩在休息或睡覺時，呼吸每分鐘持續超過 30–40 次，
            或出現呼吸費力、脖子伸長、肚子明顯起伏等情況，
            建議儘快就醫評估。
          </p>
        </div>

        <RouterLink to="/appointment" class="alert-btn">
          立即線上預約
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const activeIndex = ref(null)

const toggleCard = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index
}

const symptoms = [
  {
    icon: '🐶',
    title: '狗狗常見警訊',
    summary: '中老年小型犬常見二尖瓣退化性疾病，早期可能只有心雜音。',
    points: [
      '咳嗽持續超過一週',
      '半夜、清晨或興奮後咳嗽',
      '活動力下降、容易累',
      '健康檢查時聽到心雜音'
    ],
    detail:
      '狗狗心臟病初期不一定會喘，許多病例是在健檢聽到心雜音後才發現。若合併咳嗽、活動力下降或呼吸變快，建議進一步檢查。'
  },
  {
    icon: '🐱',
    title: '貓咪常見警訊',
    summary: '貓咪心臟病常常很隱匿，有時會突然出現嚴重症狀。',
    points: [
      '持續張嘴喘氣或呼吸變快',
      '呼吸時肚子起伏明顯',
      '突然後肢無力或癱瘓',
      '躲起來、不太走動'
    ],
    detail:
      '貓咪很會隱藏不舒服，若出現張嘴呼吸、後肢突然無力、癱瘓或明顯呼吸費力，通常不是單純疲累，應儘快就醫。'
  },
  {
    icon: '🫁',
    title: '疑似心衰竭惡化',
    summary: '左心衰竭常以肺積水表現，重點是呼吸變快、變費力。',
    points: [
      '休息時呼吸變快或用力',
      '呼吸快但沒有張大嘴巴',
      '脖子伸長呼吸',
      '輾轉難眠'
    ],
    detail:
      '心衰竭惡化時，飼主最容易在家中觀察到的是呼吸頻率與呼吸型態改變。睡眠呼吸速率是很重要的居家監測指標。'
  },
  {
    icon: '🏠',
    title: '居家照護重點',
    summary: '若已診斷為心衰竭 Stage C，穩定用藥與呼吸監測很重要。',
    points: [
      '避免過度驚嚇與壓力',
      '不可自行停用利尿劑',
      '每日記錄睡眠呼吸速率',
      '定期回診追蹤腎功能與心臟變化'
    ],
    detail:
      '心臟病治療不是只看一次，而是需要長期追蹤。藥物、腎功能、電解質、呼吸狀態都需要一起評估。'
  }
]
</script>

<style scoped>
.symptom-section {
  background:
    linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
}

.section-label {
  display: inline-block;
  margin-bottom: 0.75rem;
  color: #2563eb;
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.section-title {
  color: #0f172a;
  font-size: clamp(2rem, 4vw, 3.2rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  margin-bottom: 1rem;
}

.section-subtitle {
  max-width: 760px;
  color: #475569;
  font-size: 1.08rem;
  line-height: 1.9;
}

.symptom-card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 430px;
  padding: 1.6rem;
  background: #ffffff;
  border: 1px solid rgba(148, 163, 184, 0.22);
  border-radius: 1.5rem;
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.08);
  cursor: pointer;
  transition:
    transform 0.28s ease,
    box-shadow 0.28s ease,
    border-color 0.28s ease;
}

.symptom-card:hover,
.symptom-card.active {
  transform: translateY(-6px);
  border-color: rgba(37, 99, 235, 0.35);
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.13);
}

.symptom-icon {
  width: 56px;
  height: 56px;
  display: grid;
  place-items: center;
  margin-bottom: 1.2rem;
  border-radius: 1rem;
  background: #eff6ff;
  font-size: 1.8rem;
}

.symptom-card h3 {
  color: #0f172a;
  font-size: 1.25rem;
  font-weight: 800;
  margin-bottom: 0.8rem;
}

.symptom-summary {
  min-height: 78px;
  color: #64748b;
  line-height: 1.7;
  margin-bottom: 1rem;
}

.symptom-list {
  padding-left: 1.1rem;
  margin-bottom: 1rem;
  color: #334155;
  line-height: 1.8;
}

.symptom-list li::marker {
  color: #2563eb;
}

.symptom-more {
  max-height: 0;
  overflow: hidden;
  color: #475569;
  line-height: 1.8;
  transition: max-height 0.35s ease;
}

.symptom-card.active .symptom-more {
  max-height: 180px;
}

.symptom-toggle {
  margin-top: auto;
  border: 0;
  background: transparent;
  color: #2563eb;
  font-weight: 800;
  text-align: left;
  padding: 0;
}

.breathing-alert {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding: 2rem;
  border-radius: 1.8rem;
  background:
    linear-gradient(135deg, #0f172a, #1e3a8a);
  color: #ffffff;
  box-shadow: 0 24px 70px rgba(15, 23, 42, 0.22);
}

.alert-label {
  margin-bottom: 0.5rem;
  color: #bfdbfe;
  font-size: 0.9rem;
  font-weight: 800;
  letter-spacing: 0.1em;
}

.breathing-alert h3 {
  font-weight: 800;
  margin-bottom: 0.75rem;
}

.breathing-alert p {
  margin-bottom: 0;
  color: #dbeafe;
  line-height: 1.8;
}

.alert-btn {
  flex-shrink: 0;
  display: inline-block;
  padding: 0.85rem 1.4rem;
  border-radius: 999px;
  background: #ffffff;
  color: #1e3a8a;
  font-weight: 800;
  text-decoration: none;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.alert-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(255, 255, 255, 0.25);
}

@media (max-width: 991px) {
  .symptom-card {
    min-height: auto;
  }

  .symptom-summary {
    min-height: auto;
  }

  .breathing-alert {
    align-items: flex-start;
    flex-direction: column;
  }

  .alert-btn {
    width: 100%;
    text-align: center;
  }
}
</style>