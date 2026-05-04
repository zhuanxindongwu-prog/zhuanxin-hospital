<template>
  <main class="still-page">

    <!-- Hero -->
    <section class="still-hero">
      <div class="hero-overlay"></div>

      <div class="container hero-content">
        <p class="eyebrow">專心三十年系列活動</p>
        <h1>Still Beating</h1>
        <h2>不曾停止的心跳</h2>
        <p class="hero-desc">
          近三十年來，專心動物醫院累積三萬多筆來自小動物與家長的心跳。
          這些心跳，從未停止。
        </p>
        <p class="post-date">2025 / 09 / 25</p>
      </div>
    </section>

    <!-- Intro -->
    <section class="container intro-section">
      <div class="intro-card">
        <span class="section-label">About This Story</span>
        <h2>三十年來，那些心跳教會我們的事</h2>
        <p>
          專心動物醫院是台灣首間國際級心臟專科動物醫院，1997 年由洪榮偉院長創立，
          2023 年加入經營團隊，擴大搬遷至仁愛路一段。
        </p>
        <p>
          近三十年來，我們累積了三萬多筆小動物心臟病歷資料。這些資料不只是醫療紀錄，
          更是每一位毛孩、家長與醫療團隊共同走過的生命軌跡。
        </p>
      </div>
    </section>

    <!-- Timeline -->
    <section class="container milestone-section">
      <div class="section-heading">
        <span class="section-label">Milestones</span>
        <h2>專心持續前進的四個方向</h2>
      </div>

      <div class="timeline">

        <div class="timeline-item">
          <div class="timeline-num">01</div>
          <div class="timeline-content">
            <h3>2025 年國際榮耀</h3>
            <p>
              洪榮偉院長於美國心臟超音波學會 ASE 50 週年大會獲頒院士 FASE，
              成為亞洲獸醫心臟領域的重要里程碑。
            </p>
          </div>
        </div>

        <div class="timeline-item">
          <div class="timeline-num">02</div>
          <div class="timeline-content">
            <h3>AiCVIM 亞洲心臟專科培訓醫院</h3>
            <p>
              專心動物醫院獲選為 AiCVIM 亞洲心臟專科培訓醫院，
              持續培養新一代亞洲心臟專科醫師。
            </p>
          </div>
        </div>

        <div class="timeline-item">
          <div class="timeline-num">03</div>
          <div class="timeline-content">
            <h3>臨床實證研究</h3>
            <p>
              將三十年來累積的臨床病歷資料轉化為研究發表，
              讓不曾停止的心跳成為未來醫療進步的基礎。
            </p>
          </div>
        </div>

        <div class="timeline-item">
          <div class="timeline-num">04</div>
          <div class="timeline-content">
            <h3>國際會議交流</h3>
            <p>
              專心團隊於 FSAVA 亞洲小動物獸醫師大會發表壁報研究，
              將台灣臨床經驗帶向國際。
            </p>
          </div>
        </div>

      </div>
    </section>

    <!-- Research Cards -->
    <section class="research-section">
      <div class="container">
        <div class="section-heading text-center">
          <span class="section-label">Research</span>
          <h2>臨床研究與個案分享</h2>
        </div>

        <div class="research-grid">

          <article class="research-card">
            <p class="research-type">FSAVA Poster</p>
            <h3>評估小型犬心臟大小的新方法</h3>
            <p>
              專心團隊分析一百隻患有退化性二尖瓣瓣膜疾病的小型犬，
              探討 VHAR 是否能協助判斷心臟擴大與 B2 期治療時機。
            </p>
          </article>

          <article class="research-card">
            <p class="research-type">Case Report</p>
            <h3>貓二尖瓣上方狹窄穩定案例</h3>
            <p>
              一隻七個月齡曼赤肯貓被診斷出罕見的二尖瓣上方先天性狹窄，
              經內科治療後狀況持續穩定。
            </p>
          </article>

        </div>
      </div>
    </section>

    <!-- Quote -->
    <section class="quote-section">
      <div class="container">
        <blockquote>
          醫療不只是科學，更是一門推理的藝術。
          <br />
          我們用知識、經驗與研究，守護每一顆心。
        </blockquote>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
      <div class="container cta-card">
        <h2>Still Beating</h2>
        <p>專心三十年，讓不曾停止的心跳持續延續。</p>

        <RouterLink to="/" class="btn btn-outline-light rounded-pill px-4">
          回到專心快訊
        </RouterLink>
      </div>
    </section>

  </main>
</template>

<script setup>
</script>

<style scoped>
.still-page {
  background: #f7fbff;
  color: #1f2d3d;
}

/* Hero */
.still-hero {
  position: relative;
  min-height: 560px;
  display: flex;
  align-items: center;
  overflow: hidden;
  background:
    linear-gradient(rgba(8, 32, 55, 0.72), rgba(8, 32, 55, 0.82)),
    url('../assets/still-beating.webp') center/cover;
}

.hero-content {
  position: relative;
  z-index: 2;
  color: white;
  max-width: 900px;
}

.eyebrow,
.section-label {
  display: inline-block;
  color: #d7a84f;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  margin-bottom: 16px;
}

.still-hero h1 {
  font-size: clamp(3rem, 8vw, 7rem);
  font-weight: 900;
  line-height: 1;
  margin-bottom: 12px;
}

.still-hero h2 {
  font-size: clamp(1.8rem, 4vw, 3.5rem);
  font-weight: 800;
  margin-bottom: 24px;
}

.hero-desc {
  max-width: 720px;
  font-size: 1.15rem;
  line-height: 2;
  opacity: 0.95;
}

.post-date {
  margin-top: 28px;
  font-weight: 600;
  opacity: 0.8;
}

/* Intro */
.intro-section {
  padding: 90px 16px 60px;
}

.intro-card {
  background: white;
  border-radius: 32px;
  padding: 48px;
  box-shadow: 0 24px 70px rgba(11, 44, 77, 0.1);
  max-width: 920px;
  margin: -150px auto 0;
  position: relative;
  z-index: 3;
}

.intro-card h2,
.section-heading h2 {
  color: #0b2c4d;
  font-weight: 900;
  margin-bottom: 24px;
}

.intro-card p {
  color: #4b5f73;
  line-height: 2;
  font-size: 1.05rem;
}

/* Timeline */
.milestone-section {
  padding: 60px 16px 90px;
  max-width: 960px;
}

.section-heading {
  margin-bottom: 42px;
}

.timeline {
  position: relative;
}

.timeline-item {
  display: grid;
  grid-template-columns: 90px 1fr;
  gap: 28px;
  padding: 32px 0;
  border-bottom: 1px solid #dbe7f1;
}

.timeline-num {
  font-size: 2.4rem;
  font-weight: 900;
  color: #d7a84f;
  line-height: 1;
}

.timeline-content h3 {
  color: #0b2c4d;
  font-weight: 850;
  margin-bottom: 12px;
}

.timeline-content p {
  color: #52677b;
  line-height: 1.9;
  margin-bottom: 0;
}

/* Research */
.research-section {
  background: linear-gradient(180deg, #edf5fb 0%, #ffffff 100%);
  padding: 90px 0;
}

.research-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 28px;
  margin-top: 42px;
}

.research-card {
  background: white;
  border-radius: 28px;
  padding: 36px;
  box-shadow: 0 18px 50px rgba(11, 44, 77, 0.08);
  border: 1px solid rgba(11, 44, 77, 0.06);
  transition: 0.25s ease;
}

.research-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 24px 70px rgba(11, 44, 77, 0.14);
}

.research-type {
  color: #c99700;
  font-weight: 800;
  margin-bottom: 14px;
}

.research-card h3 {
  color: #0b2c4d;
  font-weight: 850;
  margin-bottom: 18px;
}

.research-card p {
  color: #52677b;
  line-height: 1.9;
}

/* Quote */
.quote-section {
  padding: 90px 16px;
  background: #0b2c4d;
  color: white;
  text-align: center;
}

.quote-section blockquote {
  max-width: 900px;
  margin: 0 auto;
  font-size: clamp(1.4rem, 3vw, 2.3rem);
  font-weight: 800;
  line-height: 1.8;
}

/* CTA */
.cta-section {
  padding: 90px 16px;
  background: #f7fbff;
}

.cta-card {
  background:
    linear-gradient(135deg, #0b2c4d, #123e68);
  color: white;
  border-radius: 36px;
  padding: 56px 36px;
  text-align: center;
  box-shadow: 0 24px 70px rgba(11, 44, 77, 0.18);
}

.cta-card h2 {
  font-size: 2.8rem;
  font-weight: 900;
  margin-bottom: 12px;
}

.cta-card p {
  font-size: 1.15rem;
  opacity: 0.9;
  margin-bottom: 28px;
}

/* Responsive */
@media (max-width: 768px) {
  .still-hero {
    min-height: 480px;
  }

  .intro-card {
    margin-top: -100px;
    padding: 32px 24px;
  }

  .timeline-item {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .research-grid {
    grid-template-columns: 1fr;
  }
}
</style>