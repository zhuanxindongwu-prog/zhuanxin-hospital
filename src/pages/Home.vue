<template>
  <div>
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
              <button type="button" class="petvoice-promo-secondary" @click="closePetVoicePromo">
                稍後再看
              </button>
            </div>
          </div>

          <figure class="petvoice-promo-visual">
            <img
              src="/imgs/optimized/digital-health-alert.jpg"
              alt="專心動物醫院未來醫療館 Digital Health 從診間到家庭宣傳圖"
              width="1400"
              height="734"
            >
          </figure>
        </section>
      </div>
    </Teleport>

    <Hero />
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

const showPetVoicePromo = ref(false)

const closePetVoicePromo = () => {
  showPetVoicePromo.value = false
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

.petvoice-promo-visual img {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  height: auto;
  object-fit: contain;
  border-radius: 16px;
  background: #f1f7f8;
  box-shadow: 0 18px 42px rgba(0, 40, 42, 0.24);
}

@media (max-width: 767.98px) {
  .petvoice-promo-overlay {
    align-items: end;
    padding: 14px;
  }

  .petvoice-promo-window {
    grid-template-columns: 1fr;
    min-height: auto;
    max-height: calc(100vh - 28px);
    overflow-y: auto;
    border-radius: 20px;
  }

  .petvoice-promo-copy {
    min-height: auto;
    padding: 34px 24px 0;
  }

  .petvoice-promo-copy h2 {
    max-width: 100%;
  }

  .petvoice-promo-actions {
    flex-direction: column;
  }

  .petvoice-promo-visual {
    padding: 4px 24px 24px;
  }

  .petvoice-promo-visual img {
    aspect-ratio: 16 / 9;
    max-height: 220px;
  }
}
</style>
