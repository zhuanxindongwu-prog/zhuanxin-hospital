<template>
  <main class="mmvd-page">

    <section class="mmvd-hero">
      <div class="container hero-content">
        <p class="eyebrow">犬心臟病衛教</p>
        <h1>狗狗 MMVD</h1>
        <h2>內科治療好，還是外科手術好？</h2>
        <p>
          二尖瓣黏液樣變性是小型犬最常見的心臟疾病之一。治療選擇不是單純比較哪一種比較好，
          而是要看疾病分期、心臟大小、症狀、年齡、麻醉風險與照護目標。
        </p>
      </div>
    </section>

    <section class="container intro-section">
      <div class="intro-card">
        <span class="section-label">What is MMVD?</span>
        <h2>什麼是 MMVD？</h2>
        <p>
          MMVD 是指二尖瓣逐漸退化，導致瓣膜關不緊，血液在心臟收縮時逆流回左心房。
          早期可能只有心雜音，隨著疾病進展，可能造成左心房與左心室擴大，甚至出現肺水腫與心衰竭。
        </p>
      </div>
    </section>

    <section class="container compare-section">
      <div class="section-heading">
        <span class="section-label">Treatment Options</span>
        <h2>兩種治療方向，不是互相取代，而是適合不同階段</h2>
      </div>

      <div class="compare-grid">
        <article class="compare-card medical">
          <div class="card-icon">💊</div>
          <h3>內科治療</h3>
          <p>
            主要目標是延緩疾病進展、控制心衰竭症狀、減少肺水腫復發，讓狗狗維持良好生活品質。
          </p>
          <ul>
            <li>適合多數 MMVD 病患</li>
            <li>依 ACVIM 分期調整用藥</li>
            <li>需要定期心臟超音波與 X 光追蹤</li>
          </ul>
        </article>

        <article class="compare-card surgery">
          <div class="card-icon">🫀</div>
          <h3>外科手術</h3>
          <p>
            二尖瓣修復手術的目標是直接修補瓣膜結構，降低逆流程度，但需要高度專業團隊、設備與術後照護。
          </p>
          <ul>
            <li>適合經嚴格評估的特定病患</li>
            <li>需考量麻醉、體外循環與術後風險</li>
            <li>不是每一隻狗狗都適合手術</li>
          </ul>
        </article>
      </div>
    </section>

    <section class="stage-section">
      <div class="container">
        <div class="section-heading text-center">
          <span class="section-label">Disease Stage</span>
          <h2>治療選擇要先看疾病分期</h2>
        </div>

        <div class="stage-grid">
          <div class="stage-card">
            <span>B1</span>
            <h3>有心雜音，但心臟尚未明顯擴大</h3>
            <p>通常以定期追蹤為主，確認心臟是否開始變大。</p>
          </div>

          <div class="stage-card highlight">
            <span>B2</span>
            <h3>心臟已擴大，但尚未心衰竭</h3>
            <p>此階段通常開始考慮內科治療，延緩進入心衰竭。</p>
          </div>

          <div class="stage-card">
            <span>C</span>
            <h3>已經出現心衰竭</h3>
            <p>需要積極控制肺水腫、呼吸症狀與復發風險。</p>
          </div>

          <div class="stage-card">
            <span>D</span>
            <h3>難治型心衰竭</h3>
            <p>治療重點在症狀控制、生活品質與個別化照護。</p>
          </div>
        </div>
      </div>
    </section>

    <section class="container decision-section">
      <div class="decision-card">
        <span class="section-label">How to Decide?</span>
        <h2>那到底該怎麼選？</h2>

        <div class="decision-list">
          <div>
            <strong>01</strong>
            <p>先確認狗狗目前是 B1、B2、C 還是 D 期。</p>
          </div>
          <div>
            <strong>02</strong>
            <p>評估左心房、左心室大小與肺水腫風險。</p>
          </div>
          <div>
            <strong>03</strong>
            <p>確認是否已有咳嗽、喘、運動耐受下降或昏厥。</p>
          </div>
          <div>
            <strong>04</strong>
            <p>再討論內科控制、手術可能性與飼主照護目標。</p>
          </div>
        </div>
      </div>
    </section>

    <section class="quote-section">
      <div class="container">
        <blockquote>
          MMVD 的治療不是「內科 vs 手術」的二選一，
          而是根據每一隻狗狗的病程與風險，選擇最適合牠的心臟照護策略。
        </blockquote>
      </div>
    </section>

    <section class="cta-section">
      <div class="container cta-card">
        <h2>擔心狗狗有二尖瓣心臟病嗎？</h2>
        <p>
          建議安排心臟專科檢查，透過聽診、胸腔 X 光、心臟超音波與血壓評估，
          找出最適合狗狗的治療方向。
        </p>

        <RouterLink to="/contact" class="btn btn-light rounded-pill px-4">
          預約心臟門診
        </RouterLink>
      </div>
    </section>

  </main>
</template>

<script setup>
</script>

<style scoped>
.mmvd-page {
  background: #f7fbff;
  color: #1f2d3d;
}

.mmvd-hero {
  min-height: 560px;
  display: flex;
  align-items: center;
  color: white;
  background:
    linear-gradient(120deg, rgba(8, 32, 55, .88), rgba(8, 32, 55, .55)),
    url('../assets/mmvd-dog.webp') center/cover;
}

.hero-content {
  max-width: 900px;
}

.eyebrow,
.section-label {
  display: inline-block;
  color: #d7a84f;
  font-weight: 800;
  letter-spacing: .18em;
  text-transform: uppercase;
  margin-bottom: 16px;
}

.mmvd-hero h1 {
  font-size: clamp(3rem, 8vw, 7rem);
  font-weight: 900;
  line-height: 1;
}

.mmvd-hero h2 {
  font-size: clamp(1.6rem, 4vw, 3.3rem);
  font-weight: 850;
  margin: 20px 0;
}

.mmvd-hero p {
  max-width: 760px;
  line-height: 2;
  font-size: 1.1rem;
}

.intro-section {
  padding: 90px 16px 60px;
}

.intro-card {
  max-width: 920px;
  margin: -150px auto 0;
  background: white;
  border-radius: 32px;
  padding: 48px;
  box-shadow: 0 24px 70px rgba(11, 44, 77, .1);
  position: relative;
  z-index: 2;
}

.intro-card h2,
.section-heading h2,
.decision-card h2 {
  color: #0b2c4d;
  font-weight: 900;
}

.intro-card p,
.compare-card p,
.stage-card p,
.decision-list p,
.cta-card p {
  color: #52677b;
  line-height: 1.9;
}

.compare-section {
  padding: 60px 16px 90px;
}

.section-heading {
  margin-bottom: 42px;
}

.compare-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 28px;
}

.compare-card {
  background: white;
  border-radius: 28px;
  padding: 36px;
  box-shadow: 0 18px 50px rgba(11, 44, 77, .08);
  border-top: 6px solid #d7a84f;
}

.compare-card h3 {
  color: #0b2c4d;
  font-weight: 850;
}

.card-icon {
  font-size: 2.4rem;
  margin-bottom: 18px;
}

.compare-card ul {
  padding-left: 20px;
  color: #52677b;
  line-height: 2;
}

.stage-section {
  background: linear-gradient(180deg, #edf5fb, #ffffff);
  padding: 90px 0;
}

.stage-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 22px;
}

.stage-card {
  background: white;
  border-radius: 24px;
  padding: 28px;
  box-shadow: 0 14px 40px rgba(11, 44, 77, .07);
}

.stage-card span {
  color: #d7a84f;
  font-size: 2rem;
  font-weight: 900;
}

.stage-card h3 {
  color: #0b2c4d;
  font-weight: 800;
  font-size: 1.1rem;
  margin: 16px 0;
}

.stage-card.highlight {
  background: #0b2c4d;
}

.stage-card.highlight h3,
.stage-card.highlight p {
  color: white;
}

.decision-section {
  padding: 90px 16px;
}

.decision-card {
  background: white;
  border-radius: 32px;
  padding: 48px;
  box-shadow: 0 20px 60px rgba(11, 44, 77, .08);
}

.decision-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-top: 36px;
}

.decision-list div {
  padding: 24px;
  border-radius: 20px;
  background: #f3f8fc;
}

.decision-list strong {
  color: #d7a84f;
  font-size: 1.5rem;
}

.quote-section {
  background: #0b2c4d;
  color: white;
  padding: 90px 16px;
  text-align: center;
}

.quote-section blockquote {
  max-width: 920px;
  margin: 0 auto;
  font-size: clamp(1.3rem, 3vw, 2.2rem);
  font-weight: 850;
  line-height: 1.8;
}

.cta-section {
  padding: 90px 16px;
}

.cta-card {
  text-align: center;
  color: white;
  border-radius: 36px;
  padding: 56px 36px;
  background: linear-gradient(135deg, #0b2c4d, #123e68);
  box-shadow: 0 24px 70px rgba(11, 44, 77, .18);
}

.cta-card h2 {
  font-weight: 900;
  margin-bottom: 18px;
}

.cta-card p {
  color: rgba(255, 255, 255, .86);
  max-width: 760px;
  margin: 0 auto 28px;
}

@media (max-width: 992px) {
  .stage-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .compare-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .mmvd-hero {
    min-height: 480px;
  }

  .intro-card {
    margin-top: -100px;
    padding: 32px 24px;
  }

  .stage-grid,
  .decision-list {
    grid-template-columns: 1fr;
  }
}
</style>