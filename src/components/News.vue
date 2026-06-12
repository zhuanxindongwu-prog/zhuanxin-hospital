<template>
  <section id="news" class="news-section py-5">
    <div class="container">
      <div class="news-header text-center mb-5">
        <p class="section-label">News & Insights</p>
        <h2 class="section-title">專心快訊</h2>
        <p class="section-subtitle mx-auto">
          毛孩的每一個變化，都可能藏著重要訊號。在這裡，我們分享真實案例與醫療觀點，
          幫助你更了解疾病、看懂症狀。
        </p>
      </div>

      <div class="row g-4">
        <div v-for="item in newsList" :key="item.title" class="col-md-6 col-lg-4">
          <article class="news-card h-100">
            <div class="news-image-wrap">
              <img :src="item.image" :alt="item.title" class="news-image" loading="lazy" decoding="async" />
              <span class="news-badge">{{ item.category }}</span>
            </div>

            <div class="news-body">
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>

              <RouterLink :to="item.link" class="news-link">
                了解詳情
              </RouterLink>
            </div>
          </article>
        </div>
      </div>

      <div class="all-articles-action">
        <RouterLink to="/articles" class="more-articles-link">
          查看所有專心快訊
          <i class="bi bi-arrow-right"></i>
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'

const newsList = [
  {
    title: '專心動物醫院導入 PetVoice 居家生理監測',
    category: '媒體報導',
    description:
      '從診間延伸到日常，透過穿戴式裝置與趨勢資料，協助飼主掌握犬貓休息時的健康變化。',
    image: '/imgs/media/petvoice-hero.webp',
    link: '/articles/media/petvoice-home-monitoring'
  },
  {
    title: 'Still Beating ～ 不曾停止的心跳',
    category: '真實案例',
    description:
      '從病例故事出發，了解心臟疾病治療過程中的風險、選擇與陪伴。',
    image: '/imgs/optimized/converted_image.webp',
    link: '/articles/still-beating-veterinary-cardiology'
  },
  {
    title: '狗狗 MMVD 內科 vs 外科治療？',
    category: '醫療觀點',
    description:
      '面對二尖瓣膜疾病，內科藥物與外科手術各有適應症，治療選擇需要個別評估。',
    image: '/imgs/optimized/converted_image_2.webp',
    link: '/articles/dog-mmvd-treatment-options'
  }
]
</script>

<style scoped>
.news-section {
  background: #ffffff;
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
  max-width: 780px;
  color: #475569;
  font-size: 1.08rem;
  line-height: 1.9;
}

.news-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 1.6rem;
  background: #ffffff;
  border: 1px solid rgba(148, 163, 184, 0.2);
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.08);
  transition:
    transform 0.28s ease,
    box-shadow 0.28s ease,
    border-color 0.28s ease;
}

.news-card:hover {
  transform: translateY(-8px);
  border-color: rgba(37, 99, 235, 0.35);
  box-shadow: 0 28px 70px rgba(15, 23, 42, 0.14);
}

.news-image-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: #e2e8f0;
}

.news-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.news-card:hover .news-image {
  transform: scale(1.06);
}

.news-badge {
  position: absolute;
  left: 1rem;
  top: 1rem;
  padding: 0.4rem 0.75rem;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.72);
  color: #ffffff;
  font-size: 0.8rem;
  font-weight: 800;
  backdrop-filter: blur(8px);
}

.news-body {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 1.5rem;
}

.news-body h3 {
  color: #0f172a;
  font-size: 1.28rem;
  font-weight: 800;
  line-height: 1.45;
  margin-bottom: 0.8rem;
}

.news-body p {
  color: #64748b;
  line-height: 1.8;
  margin-bottom: 1.5rem;
}

.news-link {
  margin-top: auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 0.75rem 1.1rem;
  border-radius: 999px;
  background: #eff6ff;
  color: #2563eb;
  font-weight: 800;
  text-decoration: none;
  transition:
    background 0.25s ease,
    color 0.25s ease,
    transform 0.25s ease;
}

.news-link:hover {
  background: #2563eb;
  color: #ffffff;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .news-body {
    padding: 1.25rem;
  }

  .news-link {
    width: 100%;
  }
}

.all-articles-action {
  display: flex;
  justify-content: center;
  margin-top: 2.5rem;
}

.more-articles-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 1.35rem;
  color: #ffffff;
  background: #172033;
  border: 1px solid #172033;
  border-radius: 999px;
  font-size: 0.95rem;
  font-weight: 800;
  text-decoration: none;
  white-space: nowrap;
  transition:
    background 0.25s ease,
    border-color 0.25s ease,
    transform 0.25s ease;
}

.more-articles-link:hover {
  background: #2563eb;
  border-color: #2563eb;
  transform: translateY(-2px);
}
</style>
