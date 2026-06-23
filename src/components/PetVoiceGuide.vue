<template>
  <main class="guide-page">
    <section class="guide-hero">
      <div class="container">
        <RouterLink to="/articles" class="back-link">
          <i class="bi bi-arrow-left"></i>
          返回專心快訊
        </RouterLink>

        <div class="guide-hero-grid">
          <div>
            <p class="guide-kicker">PetVoice Guide</p>
            <h1>PetVoice 是什麼？犬貓居家生理監測完整指南</h1>
            <p class="guide-lead">
              PetVoice 透過輕量感測器與居家同步裝置，協助飼主長期觀察犬貓心率、
              安靜時呼吸數、活動、睡眠與生活趨勢。這篇指南整理專心動物醫院導入 PetVoice 的臨床定位、
              適用族群與使用注意事項。
            </p>
            <div class="guide-actions">
              <RouterLink to="/petvoice" class="guide-btn primary">查看 PetVoice 主頁</RouterLink>
              <RouterLink to="/articles/media/petvoice-home-monitoring" class="guide-btn secondary">
                查看媒體報導
              </RouterLink>
            </div>
          </div>

          <figure class="guide-image">
            <img
              src="/imgs/optimized/petvoice宣傳.webp"
              alt="PetVoice 犬貓居家生理監測裝置"
              width="1280"
              height="853"
              fetchpriority="high"
              decoding="async"
            />
          </figure>
        </div>
      </div>
    </section>

    <section class="guide-content-section">
      <div class="container guide-layout">
        <article class="guide-article">
          <section class="review-box">
            <p>本文由專心動物醫院整理，內容聚焦犬貓心臟病與慢性病照護中的居家觀察需求。</p>
            <RouterLink to="/doctor/hung-rong-wei">審閱：洪榮偉院長｜獸醫心臟專科醫師</RouterLink>
          </section>

          <section>
            <h2>PetVoice 的定位：補足回診之間看不見的變化</h2>
            <p>
              犬貓心臟病、心衰竭出院後照護、高齡慢性病追蹤，常常不是只靠單次回診就能完整掌握。
              飼主在家看到的是日常食慾、睡眠、活動力與呼吸狀態，而 PetVoice 的價值在於把這些變化整理成可追蹤的趨勢。
            </p>
            <p>
              這些資料不等於診斷結果，但可以成為回診討論的輔助依據，幫助獸醫師理解毛孩在診間之外的狀況。
            </p>
          </section>

          <section>
            <h2>PetVoice 可以觀察哪些資料？</h2>
            <div class="metric-grid">
              <div v-for="metric in metrics" :key="metric.title" class="metric-card">
                <i :class="metric.icon"></i>
                <h3>{{ metric.title }}</h3>
                <p>{{ metric.text }}</p>
              </div>
            </div>
          </section>

          <section>
            <h2>哪些犬貓適合優先考慮？</h2>
            <ul class="guide-list">
              <li>已診斷 MMVD、心肌病或需要長期追蹤的心臟病犬貓。</li>
              <li>曾發生心衰竭、肺水腫，出院後需要觀察安靜時呼吸數的毛孩。</li>
              <li>高齡犬貓、慢性病或術後恢復期，需要長期掌握生活趨勢。</li>
              <li>飼主希望更有系統地記錄活動、睡眠、飲食與居家環境變化。</li>
            </ul>
          </section>

          <section>
            <h2>心臟病毛孩為什麼要注意安靜時呼吸數？</h2>
            <p>
              對心臟病犬貓來說，安靜或睡眠時的呼吸變化是居家觀察的重要線索。
              如果毛孩在沒有運動、緊張或天氣過熱的情況下，呼吸明顯變快或出現喘、咳、無法平躺，
              需要儘快聯絡獸醫師或就醫。
            </p>
            <p>
              PetVoice 可以幫助飼主建立長期趨勢，但任何異常都應搭配精神、食慾、咳嗽、活動力與原本病史一起評估。
            </p>
          </section>

          <section>
            <h2>PetVoice 和一般寵物定位器差在哪？</h2>
            <p>
              一般寵物定位器的核心是位置追蹤；PetVoice 的核心是健康趨勢觀察。
              對需要慢性照護的家庭來說，重點不是知道毛孩在哪裡，而是理解牠在休息、睡眠與日常生活中的狀態是否和平常不同。
            </p>
          </section>

          <section class="notice-panel">
            <i class="bi bi-info-circle"></i>
            <p>
              PetVoice 是居家觀察與醫療溝通的輔助工具，不能取代獸醫師診斷。
              若毛孩出現呼吸困難、昏倒、持續咳嗽、無法平躺或明顯不適，請儘快就醫。
            </p>
          </section>
        </article>

        <aside class="guide-sidebar">
          <div class="sidebar-card">
            <p class="guide-kicker">Related</p>
            <h2>延伸閱讀</h2>
            <RouterLink v-for="link in relatedLinks" :key="link.path" :to="link.path">
              <span>{{ link.label }}</span>
              {{ link.title }}
            </RouterLink>
          </div>
        </aside>
      </div>
    </section>
    <ArticleTrustPanel />
  </main>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import ArticleTrustPanel from './ArticleTrustPanel.vue'

const metrics = [
  {
    title: '心率與呼吸趨勢',
    icon: 'bi bi-heart-pulse',
    text: '協助觀察安靜時心率、安靜時呼吸數與呼吸變化率。'
  },
  {
    title: '活動與睡眠',
    icon: 'bi bi-activity',
    text: '長期記錄活動量、休息量與睡眠狀態，了解生活型態改變。'
  },
  {
    title: '日常行為',
    icon: 'bi bi-clipboard2-pulse',
    text: '整理飲水、進食、如廁、理毛等行為趨勢，輔助居家照護。'
  },
  {
    title: '居家環境',
    icon: 'bi bi-house-heart',
    text: '同步室溫與濕度資料，協助判讀環境對毛孩狀態的影響。'
  }
]

const relatedLinks = [
  {
    label: '產品主頁',
    title: 'PetVoice 犬貓居家生理監測',
    path: '/petvoice'
  },
  {
    label: '媒體報導',
    title: '專心動物醫院導入 PetVoice 居家生理監測',
    path: '/articles/media/petvoice-home-monitoring'
  },
  {
    label: '真實案例',
    title: '14 歲老犬 Monet 的居家監測案例',
    path: '/articles/media/monet-home-monitoring'
  },
  {
    label: '疾病照護',
    title: '狗狗 MMVD Stage C 心衰竭照護重點',
    path: '/articles/dog-mmvd-stage-c-care'
  }
]
</script>

<style scoped>
.guide-page {
  color: #16312f;
  background: #f7f9fc;
}

.guide-hero {
  padding: 7rem 0 4rem;
  background: linear-gradient(135deg, #ffffff, #eef7f6);
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  margin-bottom: 2rem;
  color: #006b70;
  font-weight: 900;
  text-decoration: none;
}

.guide-hero-grid,
.guide-layout {
  display: grid;
  gap: 3rem;
}

.guide-hero-grid {
  grid-template-columns: minmax(0, 1.1fr) minmax(340px, 0.9fr);
  align-items: center;
}

.guide-kicker {
  color: #006b70;
  font-size: 0.82rem;
  font-weight: 900;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.guide-hero h1 {
  color: #16312f;
  font-size: clamp(2.5rem, 5vw, 4.8rem);
  font-weight: 900;
  line-height: 1.12;
}

.guide-lead {
  max-width: 760px;
  margin-top: 1.35rem;
  color: #475569;
  font-size: 1.12rem;
  line-height: 1.9;
}

.guide-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  margin-top: 2rem;
}

.guide-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.82rem 1.25rem;
  border-radius: 999px;
  font-weight: 900;
  text-decoration: none;
}

.guide-btn.primary {
  background: #006b70;
  color: #fff;
}

.guide-btn.secondary {
  background: #fff;
  color: #16312f;
  box-shadow: 0 0.8rem 2rem rgba(0, 79, 83, 0.08);
}

.guide-image {
  margin: 0;
  padding: 1rem;
  border-radius: 1.1rem;
  background: #fff;
  box-shadow: 0 1rem 2.6rem rgba(0, 79, 83, 0.1);
}

.guide-image img {
  width: 100%;
  display: block;
  border-radius: 0.8rem;
}

.guide-content-section {
  padding: 4rem 0 5rem;
}

.guide-layout {
  grid-template-columns: minmax(0, 1fr) 320px;
  align-items: start;
}

.guide-article,
.sidebar-card,
.review-box,
.notice-panel {
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 1rem;
  background: #fff;
  box-shadow: 0 0.8rem 2rem rgba(20, 35, 60, 0.06);
}

.guide-article {
  padding: 2rem;
}

.guide-article section+section {
  margin-top: 3rem;
}

.guide-article h2 {
  color: #16312f;
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  font-weight: 900;
  line-height: 1.35;
}

.guide-article p,
.guide-list li {
  color: #475569;
  line-height: 1.95;
}

.review-box {
  padding: 1rem 1.1rem;
  border-left: 4px solid #006b70;
}

.review-box p {
  margin: 0;
}

.review-box a {
  display: inline-flex;
  margin-top: 0.5rem;
  color: #006b70;
  font-weight: 900;
  text-decoration: none;
}

.metric-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  margin-top: 1.25rem;
}

.metric-card {
  padding: 1.25rem;
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 0.9rem;
  background: #f8fafc;
}

.metric-card i {
  color: #006b70;
  font-size: 1.6rem;
}

.metric-card h3 {
  margin: 0.75rem 0 0.45rem;
  color: #16312f;
  font-size: 1.08rem;
  font-weight: 900;
}

.metric-card p {
  margin: 0;
}

.guide-list {
  margin: 1rem 0 0;
  padding-left: 1.2rem;
}

.notice-panel {
  display: flex;
  gap: 0.75rem;
  padding: 1rem;
  background: #eef7f6;
}

.notice-panel i {
  color: #006b70;
}

.notice-panel p {
  margin: 0;
}

.guide-sidebar {
  position: sticky;
  top: 6rem;
}

.sidebar-card {
  padding: 1.25rem;
}

.sidebar-card h2 {
  color: #16312f;
  font-size: 1.3rem;
  font-weight: 900;
}

.sidebar-card a {
  display: block;
  padding: 1rem 0;
  border-top: 1px solid rgba(148, 163, 184, 0.2);
  color: #16312f;
  font-weight: 900;
  line-height: 1.55;
  text-decoration: none;
}

.sidebar-card span {
  display: block;
  margin-bottom: 0.2rem;
  color: #006b70;
  font-size: 0.78rem;
  letter-spacing: 0.08em;
}

@media (max-width: 991px) {

  .guide-hero-grid,
  .guide-layout {
    grid-template-columns: 1fr;
  }

  .guide-sidebar {
    position: static;
  }
}

@media (max-width: 576px) {
  .guide-hero {
    padding: 6rem 0 3rem;
  }

  .guide-hero h1 {
    font-size: 2.25rem;
  }

  .guide-article {
    padding: 1.25rem;
  }

  .metric-grid {
    grid-template-columns: 1fr;
  }
}
</style>
