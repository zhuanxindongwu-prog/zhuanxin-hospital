<template>
  <main class="still-beating-page">
    <section class="hero-section">
      <div class="hero-overlay"></div>

      <div class="container position-relative">
        <div class="row align-items-center min-vh-75">
          <div class="col-lg-8">
            <p class="eyebrow mb-3">Still Beating</p>

            <h1 class="hero-title mb-4">
              不曾停止的心跳
            </h1>

            <p class="hero-subtitle mb-4">
              專心三十年，我們用知識、經驗與研究，守護每一顆仍在跳動的心。
            </p>

            <div class="d-flex flex-wrap gap-3">
              <RouterLink to="/appointment" class="btn btn-main">
                預約心臟評估
              </RouterLink>

              <a href="#article-content" class="btn btn-outline-light">
                閱讀文章
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="article-content" class="article-section py-5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-9">
            <article class="article-card">
              <p class="article-label">專心三十年系列活動（一）</p>

              <h2 class="article-title">
                Still Beating ～ 不曾停止的心跳
              </h2>

              <p class="lead-text">
                專心動物醫院是台灣首間國際級心臟專科動物醫院，1997 年由洪榮偉院長創立於和平東路，2023 年加入經營團隊，擴大搬遷至仁愛路一段。
              </p>

              <p>
                近三十年來，我們累積了三萬多筆來自小動物與家長的心跳，也就是一份份珍貴的病歷資料。這些資料不只是醫療紀錄，更是每一個家庭與專心共同走過的生命故事。
              </p>

              <div class="highlight-box my-5">
                <span class="highlight-number">30+</span>
                <div>
                  <h3>三十年累積的不只是病例</h3>
                  <p>
                    是每一次診斷、每一次追蹤、每一次治療調整，以及每一位家長對生命的信任。
                  </p>
                </div>
              </div>

              <h3>這些心跳，從未停止</h3>

              <p>
                專心將進行一系列計畫，回應三十年來，那些心跳教會我們的事。
              </p>

              <p>
                這個系列的第一個主軸，是持續精進醫療、積極培養亞洲心臟專科醫師，並發展臨床實證醫療研究。
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section class="mission-section py-5">
      <div class="container">
        <div class="section-heading text-center mb-5">
          <p class="eyebrow-dark">Our Mission</p>
          <h2>專心三十年的核心方向</h2>
          <p>
            從臨床、教育到研究，讓專科醫療不只停留在診間，而能持續累積、傳承與前進。
          </p>
        </div>

        <div class="row g-4">
          <div v-for="item in missions" :key="item.title" class="col-md-4">
            <div class="mission-card h-100">
              <div class="mission-icon">{{ item.number }}</div>
              <h3>{{ item.title }}</h3>
              <p>{{ item.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="milestone-section py-5">
      <div class="container">
        <div class="row justify-content-center mb-5">
          <div class="col-lg-8 text-center">
            <p class="eyebrow-dark">Milestones</p>
            <h2>專心持續前進的里程碑</h2>
          </div>
        </div>

        <div class="timeline">
          <div v-for="item in milestones" :key="item.title" class="timeline-item">
            <div class="timeline-dot"></div>

            <div class="timeline-content">
              <span class="timeline-year">{{ item.year }}</span>
              <h3>{{ item.title }}</h3>
              <p>{{ item.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="research-section py-5">
      <div class="container">
        <div class="row align-items-center g-5">
          <div class="col-lg-5">
            <p class="eyebrow-dark">Clinical Research</p>
            <h2>把三十年的臨床經驗，轉化為實證醫療</h2>
            <p>
              專心團隊將持續整理長年累積的心臟病資料，透過臨床研究、國際會議發表與專科訓練，讓每一次看診不只是單一個案的照護，也成為未來醫療進步的一部分。
            </p>
          </div>

          <div class="col-lg-7">
            <div class="research-grid">
              <div v-for="study in studies" :key="study.title" class="research-card">
                <span>{{ study.tag }}</span>
                <h3>{{ study.title }}</h3>
                <p>{{ study.text }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="quote-section py-5">
      <div class="container">
        <div class="quote-card">
          <p>
            醫療不只是科學，更是一門推理的藝術。需要醫師在有限的資訊中，不斷比較、驗證、修正，讓每一次診斷與治療都兼具理性與經驗。
          </p>
        </div>
      </div>
    </section>

    <section class="cta-section py-5">
      <div class="container text-center">
        <h2>讓不曾停止的心跳，繼續被守護</h2>
        <p>
          如果您的毛孩正在追蹤心臟病，或曾被提醒有心雜音、心臟擴大、咳嗽、喘或活動力下降，建議安排完整心臟評估。
        </p>

        <RouterLink to="/appointment" class="btn btn-main">
          立即線上預約
        </RouterLink>
      </div>
    </section>
  </main>
</template>

<script setup>
const missions = [
  {
    number: '01',
    title: '持續精進醫療',
    text: '透過專科訓練、臨床經驗與國際交流，持續提升犬貓心臟疾病的診斷與治療品質。',
  },
  {
    number: '02',
    title: '培養亞洲心臟專科醫師',
    text: '以長期訓練制度培養下一代心臟專科人才，讓專業能被傳承，也能被更多病患需要。',
  },
  {
    number: '03',
    title: '發展臨床實證研究',
    text: '將長年累積的病例資料轉化為研究成果，讓臨床經驗成為推動醫療進步的重要基礎。',
  },
]

const milestones = [
  {
    year: '1997',
    title: '專心動物醫院創立',
    text: '由洪榮偉院長創立於和平東路，開始專注於小動物心臟疾病照護。',
  },
  {
    year: '2023',
    title: '擴大搬遷至仁愛路一段',
    text: '加入新經營團隊，擴大醫療空間與臨床服務能量。',
  },
  {
    year: '2025',
    title: '國際心臟超音波里程碑',
    text: '洪榮偉院長獲頒美國心臟超音波學會院士，成為亞洲獸醫領域的重要里程碑。',
  },
  {
    year: '未來',
    title: '臨床研究與國際發表',
    text: '專心團隊將持續把長年累積的心臟病例資料，轉化為臨床研究與教育資源。',
  },
]

const studies = [
  {
    tag: '小型犬心臟大小評估',
    title: 'VHAR：評估小型犬心臟大小的新方法',
    text: '透過胸腔 X 光影像中的心臟面積與脊椎大小比較，協助判斷心臟是否擴大。',
  },
  {
    tag: '罕見心臟疾病',
    title: '貓二尖瓣上方狹窄穩定案例',
    text: '分享罕見先天性心臟病在內科治療後穩定控制的臨床經驗。',
  },
]
</script>

<style scoped>
.still-beating-page {
  color: #24312f;
  background: #f7f8f5;
}

.hero-section {
  position: relative;
  min-height: 72vh;
  background:
    linear-gradient(rgba(16, 38, 34, 0.68), rgba(16, 38, 34, 0.82)),
    url('/imgs/heart-dog.webp') center/cover no-repeat;
  color: #fff;
  display: flex;
  align-items: center;
}

.min-vh-75 {
  min-height: 72vh;
}

.eyebrow,
.eyebrow-dark {
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-size: 0.78rem;
  font-weight: 700;
}

.eyebrow {
  color: #d7efe5;
}

.eyebrow-dark {
  color: #52796f;
}

.hero-title {
  font-size: clamp(2.8rem, 6vw, 5.5rem);
  font-weight: 800;
  line-height: 1.05;
}

.hero-subtitle {
  max-width: 720px;
  font-size: 1.25rem;
  line-height: 1.9;
  color: rgba(255, 255, 255, 0.88);
}

.btn-main {
  background: #52796f;
  color: #fff;
  border: none;
  border-radius: 999px;
  padding: 0.85rem 1.8rem;
  font-weight: 700;
  transition: 0.25s ease;
}

.btn-main:hover {
  background: #354f52;
  color: #fff;
  transform: translateY(-2px);
}

.btn-outline-light {
  border-radius: 999px;
  padding: 0.85rem 1.8rem;
  font-weight: 700;
}

.article-card {
  background: #fff;
  border-radius: 28px;
  padding: clamp(2rem, 5vw, 4rem);
  box-shadow: 0 20px 60px rgba(47, 62, 70, 0.08);
}

.article-label {
  color: #52796f;
  font-weight: 700;
  margin-bottom: 0.75rem;
}

.article-title {
  font-size: clamp(2rem, 4vw, 3.2rem);
  font-weight: 800;
  margin-bottom: 1.5rem;
}

.article-card p {
  font-size: 1.08rem;
  line-height: 2;
  color: #4b5d59;
}

.lead-text {
  font-size: 1.22rem !important;
  color: #2f3e46 !important;
}

.article-card h3 {
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  font-weight: 800;
}

.highlight-box {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  background: #edf5f1;
  border-left: 6px solid #52796f;
  border-radius: 22px;
  padding: 2rem;
}

.highlight-number {
  font-size: 3rem;
  font-weight: 900;
  color: #52796f;
  white-space: nowrap;
}

.highlight-box h3 {
  margin-top: 0;
  color: #24312f;
}

.highlight-box p {
  margin-bottom: 0;
}

.section-heading h2,
.milestone-section h2,
.research-section h2,
.cta-section h2 {
  font-weight: 800;
  color: #24312f;
}

.section-heading p {
  max-width: 680px;
  margin: 0 auto;
  color: #5f6f6b;
  line-height: 1.9;
}

.mission-card {
  background: #fff;
  border-radius: 26px;
  padding: 2rem;
  box-shadow: 0 14px 40px rgba(47, 62, 70, 0.07);
  transition: 0.25s ease;
}

.mission-card:hover {
  transform: translateY(-6px);
}

.mission-icon {
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: #52796f;
  color: #fff;
  display: grid;
  place-items: center;
  font-weight: 800;
  margin-bottom: 1.5rem;
}

.mission-card h3 {
  font-size: 1.25rem;
  font-weight: 800;
  margin-bottom: 1rem;
}

.mission-card p {
  color: #5f6f6b;
  line-height: 1.8;
  margin-bottom: 0;
}

.milestone-section {
  background: #fff;
}

.timeline {
  position: relative;
  max-width: 850px;
  margin: 0 auto;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 18px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #cadbd5;
}

.timeline-item {
  position: relative;
  padding-left: 60px;
  margin-bottom: 2rem;
}

.timeline-dot {
  position: absolute;
  left: 8px;
  top: 12px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #52796f;
  border: 5px solid #edf5f1;
}

.timeline-content {
  background: #f7f8f5;
  border-radius: 24px;
  padding: 1.75rem;
}

.timeline-year {
  color: #52796f;
  font-weight: 800;
}

.timeline-content h3 {
  font-size: 1.25rem;
  font-weight: 800;
  margin: 0.5rem 0 0.75rem;
}

.timeline-content p {
  color: #5f6f6b;
  line-height: 1.8;
  margin-bottom: 0;
}

.research-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}

.research-card {
  background: #fff;
  border-radius: 24px;
  padding: 1.75rem;
  box-shadow: 0 14px 40px rgba(47, 62, 70, 0.07);
}

.research-card span {
  color: #52796f;
  font-weight: 800;
  font-size: 0.9rem;
}

.research-card h3 {
  font-size: 1.25rem;
  font-weight: 800;
  margin: 0.7rem 0;
}

.research-card p,
.research-section p {
  color: #5f6f6b;
  line-height: 1.9;
}

.quote-section {
  background: #24312f;
}

.quote-card {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}

.quote-card p {
  color: #fff;
  font-size: clamp(1.4rem, 3vw, 2.2rem);
  line-height: 1.8;
  font-weight: 700;
  margin-bottom: 0;
}

.cta-section {
  background: #edf5f1;
}

.cta-section p {
  max-width: 760px;
  margin: 1rem auto 2rem;
  color: #5f6f6b;
  line-height: 1.9;
}

@media (max-width: 768px) {
  .hero-section {
    min-height: 68vh;
  }

  .highlight-box {
    flex-direction: column;
    align-items: flex-start;
  }

  .article-card {
    border-radius: 22px;
  }
}
</style>