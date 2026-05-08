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
  <section id="doctors" class="py-5">
    <div class="container">

      <h2 class="section-title text-center mb-5">醫師團隊</h2>

      <div class="row g-4">
        <div v-for="doc in doctors" :key="doc.name" class="col-md-4">

          <router-link :to="`/doctor/${doc.id}`" class="doctor-link">
            <div class="doctor-card text-center p-4" :style="{
              '--pet-left': `url(${doc.petImage2})`,
              '--pet-right': `url(${doc.petImage})`
            }">

              <img :src="doc.image" class="doctor-img mb-3">

              <h5>{{ doc.name }}</h5>
              <p class="text-muted">{{ doc.title }}</p>

              <p class="small">
                {{ doc.desc }}
              </p>

              <div class="tags mt-2">
                <span v-for="tag in doc.tags" :key="tag" class="badge bg-light text-dark me-1">
                  {{ tag }}
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
/* 卡片 */
.doctor-card {
  position: relative;
  overflow: visible;
  border-radius: 24px;
  background: white;
  padding: 24px;
  transition: all 0.3s ease;
}

/* hover 卡片浮起 */
.doctor-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.15);
}

/* 左邊動物 */
.doctor-card::before {
  content: "";
  position: absolute;

  top: 10px;
  left: 20px;

  width: 90px;
  height: 90px;

  background-image: var(--pet-left);
  background-size: contain;
  background-repeat: no-repeat;

  opacity: 0;
  transform: translateY(30px);
  transition: all 0.35s ease;

  z-index: -1;
}

/* 右邊動物 */
.doctor-card::after {
  content: "";
  position: absolute;

  top: 10px;
  right: 20px;

  width: 90px;
  height: 90px;

  background-image: var(--pet-right);
  background-size: contain;
  background-repeat: no-repeat;

  opacity: 0;
  transform: translateY(30px);
  transition: all 0.35s ease;

  z-index: -1;
}

/* 🔥 同時出現 */
.doctor-card:hover::before,
.doctor-card:hover::after {
  opacity: 1;
  transform: translateY(-35px);
}

/* 醫師照片 */
.doctor-img {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 50%;
}

.doctor-link {
  display: block;
  text-decoration: none;
  color: inherit;
}

.doctor-link:hover {
  text-decoration: none;
  color: inherit;
}
</style>