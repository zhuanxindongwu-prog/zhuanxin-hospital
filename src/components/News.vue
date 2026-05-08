<template>
  <!-- 專心快訊 -->
  <section class="news-section">
    <div class="container">
      <h2 class="news-title">專心快訊</h2>

      <p class="news-subtitle">
        毛孩的每一個變化，都可能藏著重要訊號。在這裡，我們分享真實案例與最新醫療觀點，
        幫助你更了解疾病、看懂症狀。
      </p>

      <div class="row g-4">
        <div class="col-md-4" v-for="news in newsList" :key="news.title">
          <div class="news-card">
            <div class="news-card-header">
              <h3>{{ news.title }}</h3>
            </div>

            <div class="news-card-body">
              <img :src="news.img" />
            </div>

            <div class="news-card-footer">
              <router-link :to="news.link">
                <button class="btn-outline">了解詳情</button>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, computed } from 'vue'

const symptoms = reactive([
  {
    id: 1,
    icon: '🐶',
    title: '容易喘或活動力下降',
    desc: '散步變慢、容易疲倦',
    checked: false
  },
  {
    id: 2,
    icon: '🐱',
    title: '持續咳嗽或呼吸變快',
    desc: '休息時呼吸變快或夜間咳嗽',
    checked: false
  },
  {
    id: 3,
    icon: '⚠️',
    title: '突然昏倒或虛弱',
    desc: '短暫倒下或精神變差',
    checked: false
  }
])

const riskScore = computed(() =>
  symptoms.filter(s => s.checked).length
)

const riskMessage = computed(() => {
  if (riskScore.value === 0) return '目前尚無明顯警訊，建議持續觀察'
  if (riskScore.value === 1) return '建議記錄症狀並觀察變化'
  if (riskScore.value === 2) return '建議安排心臟檢查'
  return '建議儘快就診心臟專科'
})

const newsList = [
  {
    title: '飼主大會考－答案公布',
    img: '/imgs/dejiang.webp',
    link: '/post-article-3'
  },
  {
    title: 'Still Beating ～ 不曾停止的心跳',
    img: '/imgs/converted_image.png',
    link: '/post-article-2'
  },
  {
    title: '狗狗 MMVD 內科 vs 外科治療？',
    img: '/imgs/converted_image_2.png',
    link: '/post-article'
  }
]
</script>

<style scoped>
/* ===== 共用 ===== */
.container {
  max-width: 1180px;
}

/* ===== 症狀區 ===== */
.symptom-section {
  background: #f7fbff;
  padding: 80px 0;
}

.symptom-panel {
  background: linear-gradient(135deg, #eef7ff, #e8f3ff);
  border-radius: 28px;
  padding: 50px;
}

.section-kicker {
  color: #1d7ed0;
  font-weight: 700;
}

.symptom-card {
  width: 100%;
  border-radius: 20px;
  background: #fff;
  padding: 24px;
  border: 1px solid #dbe8f5;
  transition: 0.2s;
}

.symptom-card:hover {
  transform: translateY(-5px);
}

.symptom-card.active {
  border-color: #1d7ed0;
  box-shadow: 0 10px 25px rgba(29, 126, 208, 0.2);
}

.symptom-icon {
  font-size: 2rem;
}

.check-mark {
  margin-top: 10px;
  display: inline-block;
  background: #eef7ff;
  padding: 5px 12px;
  border-radius: 999px;
}

.risk-box {
  background: white;
  border-radius: 20px;
  padding: 20px;
}

.btn-main {
  display: inline-block;
  margin-top: 10px;
  padding: 10px 24px;
  border-radius: 999px;
  background: #1d7ed0;
  color: white;
}

/* ===== 快訊區 ===== */
.news-section {
  background: linear-gradient(135deg, #f3f9ff, #eaf4ff);
  padding: 90px 0;
}

.news-title {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 800;
  color: #1f3b57;
}

.news-subtitle {
  text-align: center;
  color: #5f7184;
  margin-bottom: 50px;
}

.news-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* 標題區高度統一 */
.news-card-header {
  height: 90px;
  /* 👉 關鍵 */
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.news-card-header h3 {
  font-size: 1.25rem;
  font-weight: 800;
  line-height: 1.4;
  margin: 0;
}

/* 圖片高度統一 */
.news-card-body img {
  width: 100%;
  height: 220px;
  /* 👉 關鍵 */
  object-fit: cover;
}

/* footer固定在底部 */
.news-card-footer {
  margin-top: auto;
  /* 👉 關鍵 */
  padding: 20px;
}

/* 按鈕一致 */
.btn-outline {
  width: 100%;
  height: 44px;
  border-radius: 999px;
}

.btn-outline:hover {
  background: #1d7ed0;
  color: white;
}
</style>