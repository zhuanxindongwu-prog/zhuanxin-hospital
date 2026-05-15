<template>
  <section id="services" class="services-section py-5">
    <div class="container">
      <div class="text-center mb-5">
        <p class="section-label">Specialty Services</p>
        <h2 class="section-title">專科服務</h2>
        <p class="section-subtitle mx-auto">
          依照毛孩的症狀、疾病分期與檢查需求，安排合適的心臟專科評估與長期照護。
        </p>
      </div>

      <div class="row g-4">
        <div v-for="service in services" :key="service.title" class="col-md-6 col-lg-4">
          <div class="service-card h-100">
            <div class="service-icon">{{ service.icon }}</div>
            <h3>{{ service.title }}</h3>
            <p>{{ service.description }}</p>

            <ul>
              <li v-for="item in service.items" :key="item">
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="questionnaire-card mt-5">
        <div>
          <p class="questionnaire-label">Before Your Visit</p>
          <h3>來院前請先填寫問卷</h3>
          <p>
            提前提供症狀、用藥與過往檢查資訊，可以幫助醫師更快掌握病情，
            也讓當天看診流程更順暢。
          </p>
        </div>

        <a href="https://docs.google.com/forms/d/e/YOUR_FORM/viewform" target="_blank" rel="noopener noreferrer"
          class="questionnaire-btn">
          前往填寫問卷
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
const services = [
  {
    icon: '🫀',
    title: '心臟超音波檢查',
    description: '評估心臟結構、瓣膜狀態、心房心室大小與心臟功能。',
    items: ['二尖瓣膜疾病', '心肌病變', '先天性心臟病', '肺高壓評估']
  },
  {
    icon: '📈',
    title: '心律不整診斷',
    description: '透過心電圖與 Holter 監測，判讀心跳過快、過慢或不規則。',
    items: ['ECG 心電圖', 'Holter 監測', '昏厥評估', '抗心律不整藥物調整']
  },
  {
    icon: '💊',
    title: '心臟病治療管理',
    description: '依疾病分期與臨床狀態，規劃個別化用藥與回診追蹤。',
    items: ['MMVD 分期', '心衰竭用藥', '腎功能與電解質追蹤', '居家呼吸監測']
  },
  {
    icon: '🩺',
    title: '術前心臟評估',
    description: '協助麻醉與手術前了解心臟風險，降低高齡或慢性病毛孩的手術不確定性。',
    items: ['麻醉風險評估', '心雜音檢查', '高齡犬貓評估', '腫瘤手術前評估']
  },
  {
    icon: '🐱',
    title: '貓咪心臟疾病評估',
    description: '貓咪心臟病症狀常不明顯，需要透過專科檢查及早辨識風險。',
    items: ['HCM 評估', '呼吸急促', '血栓風險', '心雜音或奔馬音']
  },
  {
    icon: '🏠',
    title: '長期慢性病照護',
    description: '協助飼主在家追蹤呼吸、食慾、活動力與用藥反應。',
    items: ['定期追蹤', '用藥調整', '生活品質評估', '飼主照護衛教']
  }
]
</script>

<style scoped>
.services-section {
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

.service-card {
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

.service-card:hover {
  transform: translateY(-7px);
  border-color: rgba(37, 99, 235, 0.35);
  box-shadow: 0 28px 70px rgba(15, 23, 42, 0.13);
}

.service-icon {
  width: 58px;
  height: 58px;
  display: grid;
  place-items: center;
  margin-bottom: 1.2rem;
  border-radius: 1rem;
  background: #eff6ff;
  font-size: 1.8rem;
}

.service-card h3 {
  color: #0f172a;
  font-size: 1.25rem;
  font-weight: 800;
  margin-bottom: 0.75rem;
}

.service-card p {
  color: #64748b;
  line-height: 1.8;
  margin-bottom: 1rem;
}

.service-card ul {
  padding-left: 1.1rem;
  margin-bottom: 0;
  color: #334155;
  line-height: 1.9;
}

.service-card li::marker {
  color: #2563eb;
}

.questionnaire-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding: 2rem;
  border-radius: 1.8rem;
  background:
    linear-gradient(135deg, #0f172a, #1e3a8a);
  color: #ffffff;
  box-shadow: 0 24px 70px rgba(15, 23, 42, 0.2);
}

.questionnaire-label {
  margin-bottom: 0.5rem;
  color: #bfdbfe;
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.questionnaire-card h3 {
  font-weight: 800;
  margin-bottom: 0.75rem;
}

.questionnaire-card p {
  color: #dbeafe;
  line-height: 1.8;
  margin-bottom: 0;
}

.questionnaire-btn {
  flex-shrink: 0;
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

.questionnaire-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(255, 255, 255, 0.25);
}

@media (max-width: 991px) {
  .questionnaire-card {
    flex-direction: column;
    align-items: flex-start;
  }

  .questionnaire-btn {
    width: 100%;
    text-align: center;
  }
}
</style>