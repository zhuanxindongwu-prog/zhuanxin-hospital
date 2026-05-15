<script setup>
const doctors = [
  {
    id: 'hung-rong-wei',
    name: '洪榮偉 院長',
    title: '獸醫心臟專科醫師',
    image: '/imgs/DRH.webp',
    petImage: '/imgs/milu.png',
    desc: '美國獸醫心臟專科訓練，專注犬貓心臟疾病診療',
    tags: ['心臟超音波', '心衰竭管理', '心律不整']
  },
  {
    id: 'lin-zheng',
    name: '林正 副院長',
    title: '獸醫內科醫師',
    image: '/imgs/DRL.webp',
    petImage: '/imgs/lico.png',
    desc: '專長',
    tags: ['心臟科', '慢性病', 'ECG判讀', '麻醉術前評估']
  },
  {
    id: 'lee-ji-zhong',
    name: '李繼忠 醫師',
    title: '獸醫腫瘤內科醫師',
    image: '/imgs/DRLEE.webp',
    petImage: '/imgs/lger.png',
    desc: '專長',
    tags: ['腫瘤內科']
  },
  {
    id: 'wu-guan-xun',
    name: '吳冠勳 醫師',
    title: '獸醫心臟專科醫師',
    image: '/imgs/all.webp',
    petImage: '/imgs/dog2.png',
    desc: '專長',
    tags: ['心臟科', '慢性病', 'ECG判讀', '麻醉術前評估']
  },
  {
    id: 'yan-shi-rong',
    name: '顏士容 醫師',
    title: '獸醫心臟專科醫師',
    image: '/imgs/all.webp',
    petImage: '/imgs/doubleQ.PNG',
    petImage2: '/imgs/simba.png',
    desc: '專長',
    tags: ['心臟科', '慢性病', 'ECG判讀', '麻醉術前評估']
  },
  {
    id: 'chen-shi-ting',
    name: '陳詩婷 醫師',
    title: '獸醫心臟專科醫師',
    image: '/imgs/all.webp',
    petImage: '/imgs/傻狗.png',
    desc: '專長',
    tags: ['心臟科', '慢性病', 'ECG判讀', '麻醉術前評估']
  },
  {
    id: 'chen-xuan-zhen',
    name: '陳炫甄 醫師',
    title: '獸醫心臟專科醫師',
    image: '/imgs/all.webp',
    petImage: '/imgs/臭狗.png',
    desc: '專長',
    tags: ['心臟科', '慢性病', 'ECG判讀', '麻醉術前評估']
  }
]
</script>

<template>
  <section id="doctors" class="doctors-section py-5">
    <div class="container">
      <div class="text-center mb-5">
        <p class="section-label">Our Specialists</p>
        <h2 class="section-title">醫師團隊</h2>
        <p class="section-subtitle mx-auto">
          由心臟、內科與腫瘤醫療團隊共同提供專科評估、治療規劃與長期追蹤。
        </p>
      </div>

      <div class="row g-4">
        <div v-for="doc in doctors" :key="doc.id" class="col-md-6 col-lg-4">
          <router-link :to="`/doctor/${doc.id}`" class="doctor-link">
            <div class="doctor-card text-center" :style="{
              '--pet-left': doc.petImage2 ? `url(${doc.petImage2})` : 'none',
              '--pet-right': doc.petImage ? `url(${doc.petImage})` : 'none'
            }">
              <div class="doctor-img-wrap">
                <img :src="doc.image" :alt="doc.name" class="doctor-img" />
              </div>

              <div class="doctor-body">
                <h3>{{ doc.name }}</h3>

                <p class="doctor-title">
                  {{ doc.title }}
                </p>

                <p class="doctor-desc">
                  {{ doc.desc }}
                </p>

                <div class="doctor-tags">
                  <span v-for="tag in doc.tags" :key="tag">
                    {{ tag }}
                  </span>
                </div>

                <span class="doctor-more">
                  查看醫師介紹
                </span>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.doctors-section {
  background: #ffffff;
  overflow: hidden;
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

.doctor-link {
  display: block;
  height: 100%;
  text-decoration: none;
  color: inherit;
}

.doctor-link:hover {
  text-decoration: none;
  color: inherit;
}

.doctor-card {
  position: relative;
  height: 100%;
  min-height: 430px;
  padding: 2rem 1.4rem 1.6rem;
  overflow: visible;
  border-radius: 1.7rem;
  background: #ffffff;
  border: 1px solid rgba(148, 163, 184, 0.22);
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.08);
  transition:
    transform 0.28s ease,
    box-shadow 0.28s ease,
    border-color 0.28s ease;
  z-index: 1;
}

.doctor-card:hover {
  transform: translateY(-8px);
  border-color: rgba(37, 99, 235, 0.35);
  box-shadow:
    0 28px 70px rgba(15, 23, 42, 0.14),
    0 0 24px rgba(37, 99, 235, 0.12);
}

/* 左邊寵物彈出 */
.doctor-card::before {
  content: "";
  position: absolute;
  top: 26px;
  left: 16px;
  width: 96px;
  height: 96px;
  background-image: var(--pet-left);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0;
  transform: translateY(34px) rotate(-6deg);
  transition:
    opacity 0.35s ease,
    transform 0.35s ease;
  z-index: 0;
  pointer-events: none;
}

/* 右邊寵物彈出 */
.doctor-card::after {
  content: "";
  position: absolute;
  top: 26px;
  right: 16px;
  width: 96px;
  height: 96px;
  background-image: var(--pet-right);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0;
  transform: translateY(34px) rotate(6deg);
  transition:
    opacity 0.35s ease,
    transform 0.35s ease;
  z-index: 0;
  pointer-events: none;
}

/* hover 時寵物彈出 */
.doctor-card:hover::before {
  opacity: 1;
  transform: translateY(-48px) rotate(-8deg);
}

.doctor-card:hover::after {
  opacity: 1;
  transform: translateY(-48px) rotate(8deg);
}

.doctor-img-wrap {
  position: relative;
  z-index: 2;
  width: 132px;
  height: 132px;
  margin: 0 auto 1.2rem;
  padding: 5px;
  border-radius: 50%;
  background:
    linear-gradient(135deg, #dbeafe, #ffffff, #bfdbfe);
  box-shadow: 0 16px 35px rgba(15, 23, 42, 0.12);
}

.doctor-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  border-radius: 50%;
  display: block;
  background: #e2e8f0;
}

.doctor-body {
  position: relative;
  z-index: 2;
}

.doctor-body h3 {
  color: #0f172a;
  font-size: 1.3rem;
  font-weight: 800;
  margin-bottom: 0.35rem;
}

.doctor-title {
  color: #2563eb;
  font-weight: 800;
  margin-bottom: 0.8rem;
}

.doctor-desc {
  color: #64748b;
  line-height: 1.8;
  min-height: 56px;
  margin-bottom: 1rem;
}

.doctor-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.45rem;
  margin-bottom: 1.2rem;
}

.doctor-tags span {
  padding: 0.35rem 0.65rem;
  border-radius: 999px;
  background: #eff6ff;
  color: #2563eb;
  font-size: 0.82rem;
  font-weight: 800;
}

.doctor-more {
  display: inline-block;
  margin-top: auto;
  color: #0f172a;
  font-weight: 900;
  transition: color 0.25s ease;
}

.doctor-card:hover .doctor-more {
  color: #2563eb;
}

@media (max-width: 768px) {
  .doctor-card {
    min-height: auto;
  }

  .doctor-card::before,
  .doctor-card::after {
    width: 78px;
    height: 78px;
  }

  .doctor-card:hover::before {
    transform: translateY(-38px) rotate(-8deg);
  }

  .doctor-card:hover::after {
    transform: translateY(-38px) rotate(8deg);
  }
}
</style>