<template>
  <section id="about" class="about-section py-5">
    <div class="container">
      <div class="row align-items-center g-5">
        <div class="col-lg-6">
          <div class="about-image-wrap">
            <img src="/imgs/all.webp" alt="專心動物醫院醫療團隊" class="about-image" />

            <div class="about-floating-card">
              <span>CardioSpecial</span>
              <strong>犬貓心臟專科醫療</strong>
            </div>
          </div>
        </div>

        <div class="col-lg-6">
          <p class="section-label">About CardioSpecial</p>

          <h2 class="section-title">
            以專科經驗，陪伴毛孩面對長期心臟疾病
          </h2>

          <p class="about-text">
            CardioSpecial 專心動物醫院專注於犬貓心臟疾病診療，
            透過心臟超音波、心電圖、影像判讀與長期用藥管理，
            協助飼主理解疾病階段，並為每一位毛孩規劃適合的照護方向。
          </p>

          <div class="about-feature-grid">
            <div class="about-feature">
              <span>01</span>
              <h3>專科訓練背景</h3>
              <p>以犬貓心臟疾病為核心，提供更完整的評估與追蹤。</p>
            </div>

            <div class="about-feature">
              <span>02</span>
              <h3>完整檢查流程</h3>
              <p>結合問診、理學檢查、影像與心臟超音波判讀。</p>
            </div>

            <div class="about-feature">
              <span>03</span>
              <h3>個別化治療</h3>
              <p>依疾病分期、症狀與生活狀態調整治療策略。</p>
            </div>

            <div class="about-feature">
              <span>04</span>
              <h3>長期照護管理</h3>
              <p>協助追蹤呼吸、用藥反應、腎功能與生活品質。</p>
            </div>
          </div>

          <div class="d-flex flex-wrap gap-3 mt-4">
            <router-link to="/appointment" class="btn btn-primary btn-lg rounded-pill px-4 shadow-sm">
              安排專科評估
            </router-link>

            <router-link to="/pet-cpr-game" class="btn btn-dark btn-lg rounded-pill px-4 shadow-sm cpr-btn">
              CPR 節奏挑戰
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.about-section {
  background:
    linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
}

.about-image-wrap {
  position: relative;
  overflow: hidden;
  border-radius: 2rem;
  box-shadow: 0 28px 70px rgba(15, 23, 42, 0.16);
}

.about-image {
  width: 100%;
  height: 520px;
  object-fit: cover;
  display: block;
}

.about-floating-card {
  position: absolute;
  left: 1.5rem;
  bottom: 1.5rem;
  padding: 1rem 1.2rem;
  border-radius: 1.2rem;
  background: rgba(15, 23, 42, 0.78);
  color: #ffffff;
  backdrop-filter: blur(10px);
}

.about-floating-card span {
  display: block;
  color: #bfdbfe;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.about-floating-card strong {
  display: block;
  margin-top: 0.25rem;
  font-size: 1.05rem;
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
  font-size: clamp(2rem, 4vw, 3.1rem);
  font-weight: 800;
  line-height: 1.25;
  letter-spacing: -0.04em;
  margin-bottom: 1.2rem;
}

.about-text {
  color: #475569;
  font-size: 1.08rem;
  line-height: 1.9;
  margin-bottom: 1.8rem;
}

.about-feature-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
}

.about-feature {
  padding: 1.2rem;
  border-radius: 1.25rem;
  background: #ffffff;
  border: 1px solid rgba(148, 163, 184, 0.22);
  box-shadow: 0 14px 35px rgba(15, 23, 42, 0.06);
}

.about-feature span {
  display: inline-block;
  margin-bottom: 0.6rem;
  color: #2563eb;
  font-size: 0.9rem;
  font-weight: 900;
}

.about-feature h3 {
  color: #0f172a;
  font-size: 1.05rem;
  font-weight: 800;
  margin-bottom: 0.4rem;
}

.about-feature p {
  color: #64748b;
  line-height: 1.7;
  margin-bottom: 0;
}

.about-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.85rem 1.5rem;
  border-radius: 999px;
  background: #2563eb;
  color: #ffffff;
  font-weight: 800;
  text-decoration: none;
  box-shadow: 0 14px 30px rgba(37, 99, 235, 0.25);
  transition:
    transform 0.25s ease,
    background 0.25s ease,
    box-shadow 0.25s ease;
}

.about-btn:hover {
  background: #1d4ed8;
  color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 18px 42px rgba(37, 99, 235, 0.35);
}

@media (max-width: 991px) {
  .about-image {
    height: 380px;
  }
}

@media (max-width: 576px) {
  .about-feature-grid {
    grid-template-columns: 1fr;
  }

  .about-image {
    height: 320px;
  }

  .about-btn {
    width: 100%;
  }

  .cpr-btn {
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
  }

  .cpr-btn::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(120deg,
        rgba(255, 255, 255, 0.15),
        transparent);
    transform: translateX(-100%);
    transition: transform 0.6s ease;
  }

  .cpr-btn:hover::before {
    transform: translateX(100%);
  }

  .cpr-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(220, 53, 69, 0.25);
  }
}
</style>