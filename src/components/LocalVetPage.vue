<template>
  <main class="local-vet-page">
    <section class="local-hero">
      <div class="container">
        <div class="local-hero-grid">
          <div>
            <p class="local-kicker">Taipei Veterinary Hospital</p>
            <h1>台北中正區動物醫院｜犬貓心臟專科與腫瘤門診</h1>
            <p class="local-lead">
              專心動物醫院位於台北市中正區東門里仁愛路一段47號1樓，
              提供犬貓心臟疾病、犬貓腫瘤門診、心臟超音波、心律不整診斷與慢性病長期追蹤。
            </p>

            <dl class="local-stats" aria-label="專心動物醫院地方資訊">
              <div v-for="item in localStats" :key="item.label">
                <dt>{{ item.value }}</dt>
                <dd>{{ item.label }}</dd>
              </div>
            </dl>

            <div class="local-actions">
              <a href="tel:0223633016" class="local-btn primary">
                電話洽詢
                <span aria-hidden="true"><i class="bi bi-telephone"></i></span>
              </a>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=台北市中正區東門里仁愛路一段47號1樓"
                target="_blank"
                rel="noopener noreferrer"
                class="local-btn secondary"
              >
                Google 導航
                <span aria-hidden="true"><i class="bi bi-map"></i></span>
              </a>
            </div>
          </div>

          <aside class="local-info-card" aria-label="專心動物醫院聯絡資訊">
            <p class="local-kicker">Clinic Info</p>
            <h2>專心動物醫院</h2>
            <ul>
              <li>
                <i class="bi bi-geo-alt"></i>
                <span>台北市中正區東門里仁愛路一段47號1樓</span>
              </li>
              <li>
                <i class="bi bi-telephone"></i>
                <a href="tel:0223633016">02-2363-3016</a>
              </li>
              <li>
                <i class="bi bi-heart-pulse"></i>
                <span>犬貓心臟專科、犬貓腫瘤門診</span>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </section>

    <section class="local-section">
      <div class="container">
        <div class="section-heading">
          <p>Search Intent</p>
          <h2>如果你正在找台北動物醫院，什麼情況適合來專心？</h2>
        </div>

        <div class="intent-grid">
          <article v-for="item in searchIntents" :key="item.title" class="intent-card">
            <div class="intent-icon"><i :class="item.icon"></i></div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="local-section soft">
      <div class="container">
        <div class="section-heading">
          <p>Specialty Services</p>
          <h2>台北犬貓心臟與腫瘤專科服務</h2>
          <span>
            針對心雜音、咳嗽喘、昏倒、呼吸急促、腫塊、癌症追蹤與高齡慢性病，
            提供從檢查、分期到長期照護的專科評估。
          </span>
        </div>

        <div class="service-link-grid">
          <RouterLink v-for="service in services" :key="service.path" :to="service.path" class="service-link-card">
            <span>{{ service.label }}</span>
            <h3>{{ service.title }}</h3>
            <p>{{ service.text }}</p>
          </RouterLink>
        </div>
      </div>
    </section>

    <section class="local-section visit-section">
      <div class="container">
        <div class="visit-panel">
          <div>
            <p class="local-kicker">Before Visit</p>
            <h2>來院前建議先電話確認</h2>
            <p>
              若毛孩有喘、昏倒、呼吸急促、持續咳嗽、無法平躺、食慾精神明顯下降，
              來電時可先說明症狀、目前用藥、既有檢查報告與是否曾被診斷心臟病或腫瘤。
            </p>
          </div>

          <div class="hours-card">
            <h3>營業時間</h3>
            <dl>
              <div v-for="hour in hours" :key="hour.day">
                <dt>{{ hour.day }}</dt>
                <dd>{{ hour.time }}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>

    <section class="local-section soft">
      <div class="container">
        <div class="section-heading">
          <p>FAQ</p>
          <h2>台北動物醫院常見搜尋問題</h2>
        </div>

        <div class="faq-grid">
          <details v-for="item in faqs" :key="item.question" class="faq-item">
            <summary>{{ item.question }}</summary>
            <p>{{ item.answer }}</p>
          </details>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { RouterLink } from 'vue-router'

const localStats = [
  {
    value: '台北',
    label: '中正區仁愛路一段'
  },
  {
    value: '02',
    label: '2363-3016'
  },
  {
    value: '犬貓',
    label: '心臟與腫瘤專科'
  }
]

const searchIntents = [
  {
    title: '懷疑犬貓心臟病',
    icon: 'bi bi-heart-pulse',
    text: '如果出現心雜音、咳嗽、喘、昏倒、呼吸變快或運動耐受下降，可安排心臟專科評估。'
  },
  {
    title: '需要心臟超音波',
    icon: 'bi bi-activity',
    text: '透過心臟超音波、心電圖與必要檢查，評估瓣膜、心房心室大小、心肌功能與肺高壓風險。'
  },
  {
    title: '犬貓腫瘤門診',
    icon: 'bi bi-clipboard2-pulse',
    text: '針對腫塊、癌症分期、術前風險、治療追蹤與高齡慢性病，協助規劃後續照護方向。'
  }
]

const services = [
  {
    label: 'Cardiology',
    title: '犬貓心臟專科',
    text: '心臟超音波、心律不整、MMVD、心肌病、肺高壓與心衰竭追蹤。',
    path: '/#services'
  },
  {
    label: 'Oncology',
    title: '犬貓腫瘤門診',
    text: '腫瘤評估、疾病分期、治療追蹤與生活品質管理。',
    path: '/#tumor'
  },
  {
    label: 'Team',
    title: '醫師團隊',
    text: '了解洪榮偉院長與專心動物醫院醫療團隊的專業背景。',
    path: '/doctor/hung-rong-wei'
  },
  {
    label: 'Articles',
    title: '犬貓照護文章',
    text: '閱讀心臟病、腫瘤照護、居家觀察與就醫時機整理。',
    path: '/articles'
  }
]

const hours = [
  { day: '週一、四、五', time: '10:00 - 21:30' },
  { day: '週二', time: '13:00 - 21:00' },
  { day: '週三、六', time: '10:00 - 18:00' },
  { day: '週日', time: '休診' }
]

const faqs = [
  {
    question: '專心動物醫院是台北哪一區的動物醫院？',
    answer: '專心動物醫院位於台北市中正區東門里仁愛路一段47號1樓，鄰近東門與仁愛路一段生活圈。'
  },
  {
    question: '搜尋台北動物醫院時，什麼情況適合選擇心臟專科？',
    answer:
      '若毛孩有心雜音、喘、咳嗽、昏倒、呼吸急促、肺水腫病史，或需要心臟超音波與心律不整評估，建議選擇具心臟專科經驗的動物醫院。'
  },
  {
    question: '專心動物醫院有提供犬貓腫瘤門診嗎？',
    answer: '有。專心動物醫院提供犬貓腫瘤門診，協助腫塊評估、疾病分期、治療追蹤與高齡慢性病照護。'
  },
  {
    question: '可以直接線上預約嗎？',
    answer: '目前網站不提供線上預約功能。建議直接來電 02-2363-3016 洽詢看診與班表資訊。'
  }
]
</script>

<style scoped>
.local-vet-page {
  --local-ink: #10202b;
  --local-muted: #5c7080;
  --local-teal: #0d766d;
  --local-blue: #234f80;
  --local-soft: #eef7f5;
  --local-line: rgba(16, 32, 43, 0.12);
  overflow-x: clip;
  background: #f7faf9;
  color: var(--local-ink);
  text-align: left;
}

.local-vet-page,
.local-vet-page * {
  box-sizing: border-box;
}

.local-hero {
  padding: 6.5rem 0 5rem;
  background:
    linear-gradient(120deg, rgba(255, 255, 255, 0.96), rgba(238, 247, 245, 0.94)),
    repeating-linear-gradient(90deg, rgba(16, 32, 43, 0.035) 0 1px, transparent 1px 96px);
}

.local-hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(340px, 0.85fr);
  gap: 3rem;
  align-items: center;
}

.local-kicker,
.section-heading p {
  margin-bottom: 0.75rem;
  color: var(--local-teal);
  font-size: 0.84rem;
  font-weight: 900;
  text-transform: uppercase;
}

.local-hero h1 {
  max-width: 820px;
  margin: 0;
  color: var(--local-ink);
  font-size: 4.5rem;
  font-weight: 900;
  line-height: 1.08;
}

.local-lead {
  max-width: 760px;
  margin-top: 1.5rem;
  color: #354a58;
  font-size: 1.12rem;
  line-height: 1.9;
}

.local-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
  max-width: 680px;
  margin: 2rem 0 0;
}

.local-stats div {
  min-height: 88px;
  padding: 1rem;
  border: 1px solid var(--local-line);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.78);
}

.local-stats dt {
  color: var(--local-teal);
  font-size: 1.75rem;
  font-weight: 900;
}

.local-stats dd {
  margin: 0.45rem 0 0;
  color: var(--local-muted);
  font-size: 0.9rem;
  font-weight: 800;
}

.local-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  margin-top: 2rem;
}

.local-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
  min-height: 52px;
  padding: 0.55rem 0.72rem 0.55rem 1.25rem;
  border: 1px solid transparent;
  border-radius: 999px;
  font-weight: 900;
  text-decoration: none;
  transition:
    transform 0.55s cubic-bezier(0.32, 0.72, 0, 1),
    box-shadow 0.55s cubic-bezier(0.32, 0.72, 0, 1);
}

.local-btn span {
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
}

.local-btn.primary {
  background: var(--local-teal);
  color: #fff;
  box-shadow: 0 16px 34px rgba(13, 118, 109, 0.2);
}

.local-btn.primary span {
  background: rgba(255, 255, 255, 0.16);
}

.local-btn.secondary {
  border-color: var(--local-line);
  background: #fff;
  color: var(--local-ink);
}

.local-btn.secondary span {
  background: var(--local-soft);
  color: var(--local-teal);
}

.local-btn:hover {
  transform: translateY(-2px);
}

.local-info-card {
  padding: 2rem;
  border: 1px solid var(--local-line);
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 18px 46px rgba(16, 32, 43, 0.09);
}

.local-info-card h2 {
  margin-bottom: 1.5rem;
  color: var(--local-ink);
  font-size: 2rem;
  font-weight: 900;
}

.local-info-card ul {
  display: grid;
  gap: 1rem;
  padding: 0;
  margin: 0;
  list-style: none;
}

.local-info-card li {
  display: flex;
  gap: 0.75rem;
  color: var(--local-muted);
  line-height: 1.7;
}

.local-info-card i {
  color: var(--local-teal);
}

.local-info-card a {
  color: var(--local-blue);
  font-weight: 900;
  text-decoration: none;
}

.local-section {
  padding: 5.5rem 0;
}

.local-section.soft {
  background: linear-gradient(180deg, var(--local-soft), #f8fbfa);
}

.section-heading {
  max-width: 820px;
  margin: 0 auto 2.75rem;
  text-align: center;
}

.section-heading h2 {
  margin: 0;
  color: var(--local-ink);
  font-size: 3rem;
  font-weight: 900;
  line-height: 1.18;
}

.section-heading span {
  display: block;
  margin-top: 0.9rem;
  color: var(--local-muted);
  line-height: 1.8;
}

.intent-grid,
.service-link-grid {
  display: grid;
  gap: 1.25rem;
}

.intent-grid {
  grid-template-columns: repeat(3, 1fr);
}

.service-link-grid {
  grid-template-columns: repeat(4, 1fr);
}

.intent-card,
.service-link-card,
.visit-panel,
.hours-card,
.faq-item {
  border: 1px solid var(--local-line);
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 14px 34px rgba(16, 32, 43, 0.055);
}

.intent-card,
.service-link-card {
  height: 100%;
  padding: 1.75rem;
  text-decoration: none;
}

.intent-icon {
  display: grid;
  place-items: center;
  width: 58px;
  height: 58px;
  margin-bottom: 1.25rem;
  border-radius: 8px;
  background: var(--local-soft);
  color: var(--local-teal);
  font-size: 1.55rem;
}

.intent-card h3,
.service-link-card h3,
.visit-panel h2,
.hours-card h3 {
  color: var(--local-ink);
  font-weight: 900;
}

.intent-card p,
.service-link-card p,
.visit-panel p,
.hours-card dd,
.faq-item p {
  color: var(--local-muted);
  line-height: 1.8;
}

.service-link-card span {
  color: var(--local-teal);
  font-size: 0.8rem;
  font-weight: 900;
  text-transform: uppercase;
}

.service-link-card h3 {
  margin-top: 0.65rem;
}

.visit-panel {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(300px, 0.8fr);
  gap: 2rem;
  padding: 2.25rem;
}

.hours-card {
  padding: 1.5rem;
  background: var(--local-soft);
}

.hours-card dl,
.hours-card dd {
  margin: 0;
}

.hours-card dl {
  display: grid;
  gap: 0.8rem;
}

.hours-card div {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding-top: 0.8rem;
  border-top: 1px solid var(--local-line);
}

.hours-card dt {
  color: var(--local-ink);
  font-weight: 900;
}

.faq-grid {
  display: grid;
  gap: 1rem;
  max-width: 920px;
  margin: 0 auto;
}

.faq-item {
  padding: 1.25rem 1.4rem;
}

.faq-item summary {
  color: var(--local-ink);
  cursor: pointer;
  font-weight: 900;
}

.faq-item p {
  margin: 0.9rem 0 0;
}

@media (max-width: 992px) {
  .local-hero {
    padding: 4.5rem 0 4rem;
  }

  .local-hero-grid,
  .visit-panel {
    grid-template-columns: 1fr;
  }

  .local-hero h1 {
    font-size: 3.4rem;
  }

  .intent-grid,
  .service-link-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .local-vet-page .container {
    width: 366px;
    max-width: calc(100% - 24px);
    margin-right: 12px;
    margin-left: 12px;
    padding-right: 12px;
    padding-left: 12px;
  }

  .local-hero h1 {
    font-size: 2.25rem;
  }

  .local-stats,
  .local-actions,
  .intent-grid,
  .service-link-grid {
    display: grid;
    grid-template-columns: 1fr;
    width: 100%;
  }

  .local-btn {
    width: 100%;
  }

  .local-section {
    padding: 3.5rem 0;
  }

  .section-heading h2 {
    font-size: 1.9rem;
  }

  .local-info-card,
  .visit-panel {
    padding: 1.35rem;
  }
}
</style>
