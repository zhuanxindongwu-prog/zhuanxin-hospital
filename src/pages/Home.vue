<template>
  <div class="home-index">
    <Teleport to="body">
      <div
        v-if="showPetVoicePromo"
        class="petvoice-promo-overlay"
        @click.self="closePetVoicePromo"
      >
        <section
          class="petvoice-promo-window"
          role="dialog"
          aria-modal="true"
          aria-labelledby="petvoice-promo-title"
          aria-describedby="petvoice-promo-description"
        >
          <button
            type="button"
            class="petvoice-promo-close"
            aria-label="關閉 PetVoice 宣傳視窗"
            @click="closePetVoicePromo"
          >
            <i class="bi bi-x-lg" aria-hidden="true"></i>
          </button>

          <div class="petvoice-promo-copy">
            <p class="petvoice-promo-kicker">PetVoice 居家生理監測</p>
            <h2 id="petvoice-promo-title">讓心臟照護從診間延伸到日常</h2>
            <p id="petvoice-promo-description">
              透過心率、安靜時呼吸數、活動與睡眠趨勢，協助心臟病與慢性病毛孩建立更完整的居家追蹤線索。
            </p>
            <RouterLink
              to="/articles/media/digital-health-veterinary-care-2026"
              class="petvoice-promo-topic-link"
              @click="closePetVoicePromo"
            >
              <span>Digital Health 專題</span>
              從診間到家庭，理解智慧寵物醫療如何改變照護方式
              <i class="bi bi-arrow-right-short" aria-hidden="true"></i>
            </RouterLink>
            <div class="petvoice-promo-actions">
              <RouterLink to="/petvoice" class="petvoice-promo-primary" @click="closePetVoicePromo">
                了解 PetVoice
                <i class="bi bi-arrow-right" aria-hidden="true"></i>
              </RouterLink>
              <a
                class="petvoice-promo-line"
                :href="lineAddFriendUrl"
                target="_blank"
                rel="noopener noreferrer"
                @click="handlePetVoiceLineClick"
              >
                加入 LINE 好友
                <i class="bi bi-box-arrow-up-right" aria-hidden="true"></i>
              </a>
              <button type="button" class="petvoice-promo-secondary" @click="closePetVoicePromo">
                稍後再看
              </button>
            </div>
          </div>

          <figure class="petvoice-promo-visual">
            <a
              class="petvoice-promo-qr-card"
              :href="lineAddFriendUrl"
              target="_blank"
              rel="noopener noreferrer"
              @click="handlePetVoiceLineClick"
            >
              <img
                :src="lineQrImage"
                alt="專心動物醫院官方 LINE 加好友 QR Code"
                width="360"
                height="360"
              >
              <span>
                掃描加入官方 LINE
                <strong>{{ lineOfficialId }}</strong>
              </span>
            </a>
          </figure>
        </section>
      </div>
    </Teleport>

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
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import Hero from '../components/Hero.vue'
import Symptom from '../components/Symptom.vue'
import About from '../components/About.vue'
import Services from '../components/Services.vue'
import Doctors from '../components/Doctors.vue'
import Contact from '../components/Contact.vue'
import News from '../components/News.vue'
import TumorClinic from '../components/TumorClinic.vue'
import { createLineAddFriendClickHandler } from '../lineNavigation'
import { lineAddFriendUrl, lineOfficialId, lineQrImage } from '../siteContact'

const showPetVoicePromo = ref(false)
const handleLineAddFriendClick = createLineAddFriendClickHandler(lineAddFriendUrl)

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

const closePetVoicePromo = () => {
  showPetVoicePromo.value = false
}

const handlePetVoiceLineClick = (event) => {
  handleLineAddFriendClick(event)
  closePetVoicePromo()
}

const handlePetVoicePromoKeydown = (event) => {
  if (event.key === 'Escape') {
    closePetVoicePromo()
  }
}

onMounted(() => {
  showPetVoicePromo.value = true
  window.addEventListener('keydown', handlePetVoicePromoKeydown)
})

watch(showPetVoicePromo, (isOpen) => {
  document.body.classList.toggle('petvoice-promo-open', isOpen)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handlePetVoicePromoKeydown)
  document.body.classList.remove('petvoice-promo-open')
})
</script>

<style scoped>
:global(body.petvoice-promo-open) {
  overflow: hidden;
}

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

.petvoice-promo-overlay {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: grid;
  place-items: center;
  padding: clamp(18px, 4vw, 40px);
  background: rgba(9, 32, 33, 0.58);
  backdrop-filter: blur(14px);
}

.petvoice-promo-window {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(240px, 0.66fr);
  gap: clamp(18px, 3vw, 30px);
  width: min(780px, 100%);
  min-height: 360px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.26);
  border-radius: 22px;
  background:
    radial-gradient(circle at 18% 20%, rgba(105, 150, 74, 0.24), transparent 32%),
    linear-gradient(135deg, rgba(105, 150, 74, 0.98), rgba(0, 107, 112, 0.98));
  box-shadow: 0 28px 80px rgba(0, 38, 40, 0.32);
  color: #fff;
}

.petvoice-promo-window::after {
  content: "";
  position: absolute;
  inset: auto -16% -38% 48%;
  height: 220px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.13);
  transform: rotate(-12deg);
}

.petvoice-promo-close {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 3;
  display: inline-grid;
  width: 42px;
  height: 42px;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.34);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  transition: transform 0.2s ease, background 0.2s ease;
}

.petvoice-promo-close:hover {
  background: rgba(255, 255, 255, 0.22);
  transform: translateY(-1px);
}

.petvoice-promo-copy {
  position: relative;
  z-index: 2;
  display: flex;
  min-height: 360px;
  flex-direction: column;
  justify-content: center;
  padding: clamp(28px, 4vw, 44px);
  padding-right: clamp(18px, 3vw, 26px);
}

.petvoice-promo-kicker {
  margin: 0 0 14px;
  color: rgba(255, 255, 255, 0.78);
  font-size: 0.86rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.petvoice-promo-copy h2 {
  margin: 0;
  max-width: 10.6em;
  color: #fff;
  font-size: clamp(1.9rem, 3.5vw, 2.75rem);
  font-weight: 900;
  line-height: 1.12;
  letter-spacing: 0;
}

.petvoice-promo-copy p:not(.petvoice-promo-kicker) {
  max-width: 25rem;
  margin: 16px 0 0;
  color: rgba(255, 255, 255, 0.82);
  font-size: 0.98rem;
  line-height: 1.75;
}

.petvoice-promo-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 20px;
}

.petvoice-promo-topic-link {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 3px 10px;
  max-width: 27rem;
  margin-top: 18px;
  padding: 14px 16px;
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.84);
  font-size: 0.88rem;
  font-weight: 700;
  line-height: 1.55;
  text-decoration: none;
  transition: transform 0.2s ease, background 0.2s ease;
}

.petvoice-promo-topic-link:hover {
  background: rgba(255, 255, 255, 0.18);
  color: #fff;
  transform: translateY(-1px);
}

.petvoice-promo-topic-link span {
  display: block;
  grid-column: 1 / -1;
  color: #fff;
  font-size: 0.76rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.petvoice-promo-topic-link i {
  align-self: center;
  color: #fff;
  font-size: 1.25rem;
}

.petvoice-promo-primary,
.petvoice-promo-line,
.petvoice-promo-secondary {
  display: inline-flex;
  min-height: 44px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 999px;
  padding: 0 20px;
  font-weight: 800;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.petvoice-promo-primary {
  border: 0;
  background: #fff;
  color: #006B70;
  box-shadow: 0 14px 34px rgba(0, 44, 46, 0.2);
}

.petvoice-promo-primary:hover {
  color: #006B70;
  transform: translateY(-2px);
  box-shadow: 0 18px 42px rgba(0, 44, 46, 0.28);
}

.petvoice-promo-line {
  border: 0;
  background: #06c755;
  color: #ffffff;
  box-shadow: 0 14px 34px rgba(6, 199, 85, 0.2);
}

.petvoice-promo-line:hover {
  color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 18px 42px rgba(6, 199, 85, 0.28);
}

.petvoice-promo-secondary {
  border: 1px solid rgba(255, 255, 255, 0.36);
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.petvoice-promo-secondary:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}

.petvoice-promo-visual {
  position: relative;
  z-index: 2;
  align-self: center;
  margin: 0;
  padding: clamp(24px, 3vw, 34px) clamp(24px, 3vw, 34px) clamp(24px, 3vw, 34px) 0;
}

.petvoice-promo-qr-card {
  display: grid;
  justify-items: center;
  gap: 16px;
  padding: clamp(22px, 3vw, 32px);
  border-radius: 24px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(241, 247, 248, 0.96));
  box-shadow: 0 18px 42px rgba(0, 40, 42, 0.24);
  color: #006b70;
  text-align: center;
  text-decoration: none;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.petvoice-promo-qr-card:hover {
  color: #006b70;
  transform: translateY(-2px);
  box-shadow: 0 22px 50px rgba(0, 40, 42, 0.3);
}

.petvoice-promo-qr-card img {
  display: block;
  width: min(100%, 280px);
  height: auto;
  border-radius: 18px;
  background: #ffffff;
}

.petvoice-promo-qr-card span {
  display: grid;
  gap: 4px;
  color: #0f5f61;
  font-size: 0.95rem;
  font-weight: 900;
  line-height: 1.35;
}

.petvoice-promo-qr-card strong {
  color: #06c755;
  font-size: 1.08rem;
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

  .petvoice-promo-overlay {
    place-items: center;
    padding: 16px;
  }

  .petvoice-promo-window {
    grid-template-columns: 1fr;
    width: min(420px, 100%);
    min-height: auto;
    max-height: min(74dvh, 560px);
    overflow-y: auto;
    border-radius: 18px;
  }

  .petvoice-promo-close {
    top: 12px;
    right: 12px;
    width: 36px;
    height: 36px;
  }

  .petvoice-promo-copy {
    min-height: auto;
    padding: 16px 18px 18px;
  }

  .petvoice-promo-kicker {
    margin-bottom: 8px;
    font-size: 0.72rem;
  }

  .petvoice-promo-copy h2 {
    max-width: 100%;
    font-size: clamp(1.35rem, 8vw, 1.75rem);
    line-height: 1.15;
  }

  .petvoice-promo-copy p:not(.petvoice-promo-kicker) {
    margin-top: 10px;
    font-size: 0.9rem;
    line-height: 1.58;
  }

  .petvoice-promo-topic-link {
    margin-top: 12px;
    padding: 10px 12px;
    border-radius: 12px;
    font-size: 0.8rem;
    line-height: 1.45;
  }

  .petvoice-promo-topic-link span {
    font-size: 0.68rem;
  }

  .petvoice-promo-actions {
    flex-direction: column;
    gap: 8px;
    margin-top: 14px;
  }

  .petvoice-promo-primary,
  .petvoice-promo-line,
  .petvoice-promo-secondary {
    min-height: 40px;
    padding: 0 16px;
    font-size: 0.92rem;
  }

  .petvoice-promo-visual {
    display: none;
  }
}
</style>
