<template>
  <section id="symptom" class="symptom-section py-5">
    <div class="container">
      <div class="text-center mb-5">
        <p class="section-kicker">When should you check the heart?</p>
        <h2 class="section-title">你的毛孩有這些症狀嗎？</h2>
        <p class="section-desc">
          犬貓心臟病不一定一開始就會有明顯症狀。若出現以下情況，建議安排心臟相關檢查，
          例如胸腔 X 光、心臟超音波或心電圖評估。
        </p>
      </div>

      <div class="row g-4">
        <div v-for="item in symptoms" :key="item.title" class="col-12 col-md-6 col-lg-3">
          <div class="symptom-card h-100">
            <div class="icon-wrap">
              <span>{{ item.icon }}</span>
            </div>

            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>

            <ul>
              <li v-for="point in item.points" :key="point">
                {{ point }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="warning-box mt-5">
        <div>
          <h3>需要特別警覺的呼吸變化</h3>
          <p>
            若毛孩在休息或睡覺時呼吸每分鐘持續超過 30–40 次，或出現呼吸費力、脖子伸長、
            肚子明顯起伏等情況，建議儘快就醫評估。
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const symptoms = [
  {
    icon: '🐶',
    title: '狗狗常見警訊',
    desc: '狗狗心臟病常見於中老年小型犬，尤其是二尖瓣退化性疾病。',
    points: [
      '咳嗽持續超過一週',
      '半夜、清晨或興奮後咳嗽',
      '活動力下降、容易累',
      '健康檢查時聽到心雜音'
    ]
  },
  {
    icon: '🐱',
    title: '貓咪常見警訊',
    desc: '貓咪心臟病常常很隱匿，可能沒有咳嗽，卻突然出現嚴重症狀。',
    points: [
      '突然喘氣或呼吸變快',
      '突然後肢無力或癱瘓',
      '躲起來、不太走動',
      '呼吸時肚子起伏明顯'
    ]
  },
  {
    icon: '🫁',
    title: '疑似心衰竭惡化',
    desc: '左心衰竭常以肺積水表現，重點是「呼吸變快、變費力」。',
    points: [
      '休息時呼吸變快',
      '嘴巴微張喘氣',
      '脖子伸長呼吸',
      '肚子起伏明顯但呼吸聲不大'
    ]
  },
  {
    icon: '🏠',
    title: '居家照護重點',
    desc: '若已被診斷為心衰竭 Stage C，穩定用藥與呼吸監測非常重要。',
    points: [
      '避免過度驚嚇與壓力',
      '不可自行停用利尿劑',
      '每日記錄睡眠呼吸速率',
      '定期回診追蹤腎功能與心臟變化'
    ]
  }
]
</script>

<style scoped>
.symptom-section {
  background: linear-gradient(180deg, #f8fbff 0%, #ffffff 100%);
}

.section-kicker {
  color: #6c8ebf;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.section-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  color: #243b53;
  margin-bottom: 1rem;
}

.section-desc {
  max-width: 760px;
  margin: 0 auto;
  color: #5f6f7f;
  line-height: 1.8;
}

.symptom-card {
  background: #ffffff;
  border-radius: 24px;
  padding: 28px 24px;
  box-shadow: 0 12px 35px rgba(36, 59, 83, 0.08);
  border: 1px solid rgba(108, 142, 191, 0.12);
  transition: all 0.25s ease;
}

.symptom-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 18px 45px rgba(36, 59, 83, 0.14);
}

.icon-wrap {
  width: 56px;
  height: 56px;
  border-radius: 18px;
  background: #eef5ff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  margin-bottom: 1.25rem;
}

.symptom-card h3 {
  font-size: 1.25rem;
  font-weight: 800;
  color: #243b53;
  margin-bottom: 0.75rem;
}

.symptom-card p {
  color: #627282;
  line-height: 1.7;
  margin-bottom: 1rem;
}

.symptom-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.symptom-card li {
  position: relative;
  padding-left: 1.4rem;
  margin-bottom: 0.6rem;
  color: #3f4f5f;
  line-height: 1.6;
}

.symptom-card li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #6c8ebf;
  font-weight: 800;
}

.warning-box {
  background: #fff7ed;
  border: 1px solid #fed7aa;
  border-radius: 24px;
  padding: 28px 32px;
}

.warning-box h3 {
  color: #9a3412;
  font-weight: 800;
  margin-bottom: 0.75rem;
}

.warning-box p {
  color: #7c2d12;
  line-height: 1.8;
  margin: 0;
}

@media (max-width: 768px) {
  .symptom-card {
    padding: 24px 20px;
  }

  .warning-box {
    padding: 24px 20px;
  }
}
</style>