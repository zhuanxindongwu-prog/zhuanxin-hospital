<template>
  <div class="home-index">
    <Hero />

    <section class="index-director" aria-labelledby="index-director-title">
      <div class="container">
        <div class="index-director-grid">
          <div class="index-director-copy">
            <p class="index-section-label">Start Here</p>
            <h2 id="index-director-title">把症狀、檢查與長期照護接起來</h2>
            <p>
              依照毛孩現在的狀況，快速找到心臟專科、腫瘤門診、居家監測與照護文章。
            </p>

            <div class="index-director-actions" aria-label="首頁主要行動">
              <RouterLink to="/doctor-schedule" class="index-primary-action">
                查看本月班表
                <i class="bi bi-calendar2-week" aria-hidden="true"></i>
              </RouterLink>
              <a href="tel:0223633016" class="index-secondary-action">
                02-2363-3016
                <i class="bi bi-telephone" aria-hidden="true"></i>
              </a>
            </div>
          </div>

          <div class="index-path-grid" aria-label="專心動物醫院核心入口">
            <RouterLink
              v-for="path in indexCarePaths"
              :key="path.title"
              :to="path.to"
              class="index-path-card"
            >
              <span class="index-path-icon">
                <i :class="path.icon" aria-hidden="true"></i>
              </span>
              <span class="index-path-label">{{ path.label }}</span>
              <strong>{{ path.title }}</strong>
              <p>{{ path.text }}</p>
              <i class="bi bi-arrow-right-short index-path-arrow" aria-hidden="true"></i>
            </RouterLink>
          </div>
        </div>

        <div class="index-trust-strip" aria-label="專心動物醫院基本資訊">
          <div v-for="item in indexTrustItems" :key="item.label">
            <span>{{ item.label }}</span>
            <strong>{{ item.value }}</strong>
          </div>
        </div>
      </div>
    </section>

    <Symptom />
    <News />
    <About />
    <Services />
    <Doctors />
    <TumorClinic />
    <Contact />

  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import Hero from '../components/Hero.vue'
import Symptom from '../components/Symptom.vue'
import About from '../components/About.vue'
import Services from '../components/Services.vue'
import Doctors from '../components/Doctors.vue'
import Contact from '../components/Contact.vue'
import News from '../components/News.vue'
import TumorClinic from '../components/TumorClinic.vue'

const indexCarePaths = [
  {
    label: '心臟專科',
    title: '犬貓心臟專科',
    text: '咳嗽、喘、昏倒、心雜音或活動力下降時，先從心臟專科評估開始。',
    icon: 'bi bi-heart-pulse',
    to: '/services/veterinary-cardiology'
  },
  {
    label: '檢查服務',
    title: '心臟超音波',
    text: '評估瓣膜、心房心室大小、血流方向與疾病分期，協助規劃後續照護。',
    icon: 'bi bi-soundwave',
    to: '/services/echocardiography'
  },
  {
    label: '腫瘤照護',
    title: '犬貓腫瘤門診',
    text: '從腫塊評估、疾病分期到治療追蹤，依照毛孩狀態討論照護方向。',
    icon: 'bi bi-clipboard2-pulse',
    to: '/services/veterinary-oncology'
  },
  {
    label: '居家追蹤',
    title: 'PetVoice 居家監測',
    text: '協助記錄心率、安靜時呼吸數、活動與睡眠趨勢，補足回診之間的日常線索。',
    icon: 'bi bi-house-heart',
    to: '/petvoice'
  }
]

const indexTrustItems = [
  {
    label: '院所',
    value: '專心動物醫院'
  },
  {
    label: '地址',
    value: '台北市中正區仁愛路一段47號'
  },
  {
    label: '電話',
    value: '02-2363-3016'
  },
  {
    label: '核心照護',
    value: '犬貓心臟專科與腫瘤門診'
  }
]

</script>

<style scoped>
.home-index {
  background:
    radial-gradient(circle at 8% 18%, rgba(105, 150, 74, 0.12), transparent 28%),
    linear-gradient(180deg, #f6f8f4 0%, #ffffff 48%, #f7faf9 100%);
}

.index-director {
  position: relative;
  padding: clamp(3.5rem, 7vw, 6rem) 0;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(239, 245, 235, 0.72));
  border-bottom: 1px solid rgba(0, 107, 112, 0.1);
}

.index-director-grid {
  display: grid;
  grid-template-columns: minmax(0, 0.88fr) minmax(0, 1.12fr);
  gap: clamp(2rem, 5vw, 4rem);
  align-items: center;
}

.index-director-copy {
  max-width: 34rem;
}

.index-section-label {
  display: inline-flex;
  margin: 0 0 0.9rem;
  color: var(--brand-secondary);
  font-size: 0.78rem;
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.index-director h2 {
  margin: 0;
  color: var(--brand-ink);
  font-size: clamp(2.15rem, 4.8vw, 4.25rem);
  font-weight: 900;
  line-height: 1.08;
  letter-spacing: 0;
  text-wrap: balance;
}

.index-director-copy > p:not(.index-section-label) {
  margin: 1rem 0 0;
  color: var(--brand-muted);
  font-size: 1.08rem;
  line-height: 1.85;
}

.index-director-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 1.7rem;
}

.index-primary-action,
.index-secondary-action {
  display: inline-flex;
  min-height: 48px;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;
  border-radius: 999px;
  padding: 0 1.15rem;
  font-weight: 900;
  text-decoration: none;
  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease,
    background 0.22s ease,
    border-color 0.22s ease;
}

.index-primary-action {
  background: var(--brand-gradient);
  color: #ffffff;
  box-shadow: 0 16px 34px rgba(0, 107, 112, 0.18);
}

.index-primary-action:hover {
  color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 20px 44px rgba(0, 107, 112, 0.24);
}

.index-secondary-action {
  border: 1px solid rgba(0, 107, 112, 0.22);
  background: #ffffff;
  color: var(--brand-secondary-dark);
}

.index-secondary-action:hover {
  border-color: rgba(105, 150, 74, 0.48);
  background: var(--brand-primary-soft);
  color: var(--brand-secondary-dark);
  transform: translateY(-2px);
}

.index-primary-action:active,
.index-secondary-action:active,
.index-path-card:active {
  transform: translateY(1px);
}

.index-path-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.index-path-card {
  position: relative;
  display: grid;
  min-height: 230px;
  align-content: start;
  overflow: hidden;
  padding: 1.35rem;
  border: 1px solid rgba(0, 107, 112, 0.13);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.86);
  box-shadow: 0 16px 36px rgba(0, 79, 83, 0.08);
  color: var(--brand-ink);
  text-decoration: none;
  transition:
    transform 0.24s ease,
    box-shadow 0.24s ease,
    border-color 0.24s ease,
    background 0.24s ease;
}

.index-path-card::after {
  position: absolute;
  right: -42px;
  bottom: -52px;
  width: 140px;
  height: 140px;
  border-radius: 999px;
  background: rgba(105, 150, 74, 0.1);
  content: "";
}

.index-path-card:hover {
  border-color: rgba(105, 150, 74, 0.44);
  background: #ffffff;
  color: var(--brand-ink);
  transform: translateY(-4px);
  box-shadow: 0 24px 56px rgba(0, 79, 83, 0.12);
}

.index-path-icon {
  display: grid;
  width: 48px;
  height: 48px;
  place-items: center;
  margin-bottom: 1rem;
  border-radius: 14px;
  background: var(--brand-secondary-soft);
  color: var(--brand-secondary);
  font-size: 1.35rem;
}

.index-path-label {
  color: var(--brand-primary-dark);
  font-size: 0.78rem;
  font-weight: 900;
}

.index-path-card strong {
  display: block;
  margin-top: 0.35rem;
  color: var(--brand-ink);
  font-size: 1.22rem;
  font-weight: 900;
  line-height: 1.35;
}

.index-path-card p {
  position: relative;
  z-index: 1;
  margin: 0.75rem 0 0;
  color: var(--brand-muted);
  font-size: 0.94rem;
  line-height: 1.75;
}

.index-path-arrow {
  position: absolute;
  right: 1.1rem;
  top: 1.1rem;
  color: var(--brand-secondary);
  font-size: 1.45rem;
}

.index-trust-strip {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  overflow: hidden;
  margin-top: 1.25rem;
  border: 1px solid rgba(0, 107, 112, 0.12);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.76);
}

.index-trust-strip div {
  padding: 1rem 1.15rem;
  border-right: 1px solid rgba(0, 107, 112, 0.1);
}

.index-trust-strip div:last-child {
  border-right: 0;
}

.index-trust-strip span {
  display: block;
  margin-bottom: 0.35rem;
  color: var(--brand-primary-dark);
  font-size: 0.78rem;
  font-weight: 900;
}

.index-trust-strip strong {
  display: block;
  color: var(--brand-ink);
  font-size: 0.98rem;
  font-weight: 900;
  line-height: 1.45;
}

@media (max-width: 767.98px) {
  .index-director {
    padding: 3rem 0;
  }

  .index-director-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .index-director-copy {
    max-width: none;
  }

  .index-director h2 {
    font-size: clamp(1.9rem, 10vw, 2.65rem);
  }

  .index-director-actions {
    display: grid;
    grid-template-columns: 1fr;
  }

  .index-path-grid,
  .index-trust-strip {
    grid-template-columns: 1fr;
  }

  .index-path-card {
    min-height: auto;
  }

  .index-trust-strip div {
    border-right: 0;
    border-bottom: 1px solid rgba(0, 107, 112, 0.1);
  }

  .index-trust-strip div:last-child {
    border-bottom: 0;
  }
}
</style>
