<template>
  <section class="pricing py-5" :style="{ '--news-progress': newsProgress }">
    <div class="container">
      <!-- 標題區 -->
      <div class="news-title-area text-center mb-5">
        <h2 class="display-3 fw-normal text-white">專心快訊</h2>
        <p class="fs-4 text-secondary mx-auto pricing-desc">
          毛孩的每一個變化，都可能藏著重要訊號。
          在這裡，我們分享真實案例與最新醫療觀點，幫助你更了解疾病、看懂症狀，陪伴毛孩做出更好的每一個選擇。
        </p>
      </div>

      <!-- 卡片區 -->
      <div class="news-content">
        <div class="row row-cols-1 row-cols-md-3 mb-3 text-center g-4">
          <div class="col">
            <div class="card h-100 text-bg-dark border-secondary rounded-4 shadow-sm">
              <div class="card-header py-3 border-secondary">
                <h4 class="my-0 fw-normal">飼主大會考-答案公布</h4>
              </div>
              <div class="card-body d-flex flex-column">
                <img src="/imgs/dejiang.webp" alt="">
                <router-link to="post-article-3">
                  <button type="button" class="w-100 btn btn-lg btn-outline-primary mt-auto">
                    了解詳情
                  </button>
                </router-link>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="card h-100 text-bg-dark border-secondary rounded-4 shadow-sm">
              <div class="card-header py-3 border-secondary">
                <h4 class="my-0 fw-normal">✨Still Beating ～ 不曾停止的心跳</h4>
              </div>
              <div class="card-body d-flex flex-column">
                <img src="/imgs/converted_image.png" alt="">
                <router-link to="post-article-2">
                  <button type="button" class="w-100 btn btn-lg btn-outline-primary mt-auto">
                    了解詳情
                  </button>
                </router-link>
              </div>
            </div>
          </div>

          <div class="col">
            <div class="card h-100 text-bg-dark border-secondary rounded-4 shadow-sm">
              <div class="card-header py-3 border-secondary">
                <h4 class="my-0 fw-normal">狗狗MMVD二尖瓣心臟病內科治療好還是外科手術好？</h4>
              </div>
              <div class="card-body d-flex flex-column">
                <img src="/imgs/converted_image_2.png" alt="">
                <router-link to="post-article">
                  <button type="button" class="w-100 btn btn-lg btn-outline-primary mt-auto">
                    了解詳情
                  </button>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const newsProgress = ref(0)

const handleScroll = () => {
  const section = document.querySelector('.pricing')
  if (!section) return

  const rect = section.getBoundingClientRect()
  const windowHeight = window.innerHeight

  const start = windowHeight * 0.75
  const end = windowHeight * 0.25

  let progress = (start - rect.top) / (start - end)
  progress = Math.min(Math.max(progress, 0), 1)

  newsProgress.value = progress
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.pricing {
  background: linear-gradient(90deg, #1f242b 0%, #11161c 50%, #1f242b 100%);
  border-radius: 12px;
  margin-left: 5%;
  margin-right: 5%;
  overflow: hidden;

  min-height: auto;
  /* 移除原本 70vh */
}

.pricing-desc {
  max-width: 850px;
}

.news-title-area {
  position: relative;
  z-index: 2;
  padding-bottom: 0;
}

/* 一開始卡片區完全收起來 */
.news-content {
  opacity: var(--news-progress);

  transform:
    translateY(calc(80px * (1 - var(--news-progress)))) scale(calc(0.96 + 0.04 * var(--news-progress)));

  max-height: calc(760px * var(--news-progress));
  overflow: hidden;

  transition:
    opacity 0.05s linear,
    transform 0.05s linear,
    max-height 0.05s linear;
}

img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 3vh;
}

.card-header {
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.card-header h4 {
  margin: 0;
  line-height: 1.3;
}

.card-body {
  display: flex;
  flex-direction: column;
}

.card-body .btn,
.card-body a {
  margin-top: auto;
}
</style>