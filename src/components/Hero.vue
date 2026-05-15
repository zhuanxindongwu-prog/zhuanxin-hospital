<template>
  <section class="hero-section">
    <div class="hero-overlay"></div>

    <div class="container hero-container">
      <div class="row align-items-center min-vh-100">
        <div class="col-lg-7">
          <p class="hero-label">CardioSpecial 動物心臟專科</p>

          <h1 class="hero-title">
            犬貓心臟與腫瘤<br />
            專科醫療
          </h1>

          <p class="hero-subtitle">
            從早期篩檢、慢性病控制到重症照護，提供完整且個別化的專科醫療。
          </p>

          <div class="hero-actions">
            <RouterLink to="/appointment" class="btn btn-primary hero-btn">
              立即線上預約
            </RouterLink>

            <a href="#symptom" class="btn btn-outline-light hero-btn-outline">
              查看常見症狀
            </a>
          </div>

          <div class="hero-trust">
            <span>心臟超音波評估</span>
            <span>心律不整診斷</span>
            <span>長期慢性病管理</span>
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
.hero-section {
  position: relative;
  min-height: 100vh;
  background:
    linear-gradient(90deg, rgba(15, 23, 42, 0.92), rgba(15, 23, 42, 0.68)),
    url('/imgs/all.webp') center/cover no-repeat;
  color: #fff;
  overflow: hidden;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.22), transparent 32%),
    radial-gradient(circle at 70% 70%, rgba(20, 184, 166, 0.16), transparent 30%);
  z-index: 1;
}

.hero-container {
  position: relative;
  z-index: 2;
}

.hero-label {
  display: inline-block;
  margin-bottom: 1rem;
  padding: 0.45rem 0.85rem;
  border: 1px solid rgba(255, 255, 255, 0.28);
  border-radius: 999px;
  font-size: 0.9rem;
  letter-spacing: 0.08em;
  color: #cbd5e1;
  backdrop-filter: blur(8px);
}

.hero-title {
  font-size: clamp(2.6rem, 6vw, 5.5rem);
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.04em;
  margin-bottom: 1.5rem;
}

.hero-subtitle {
  max-width: 620px;
  font-size: clamp(1.05rem, 2vw, 1.35rem);
  line-height: 1.9;
  color: #dbeafe;
  margin-bottom: 2rem;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
}

.hero-btn,
.hero-btn-outline {
  border-radius: 999px;
  padding: 0.85rem 1.6rem;
  font-weight: 700;
  letter-spacing: 0.03em;
}

.hero-btn {
  background: #2563eb;
  border-color: #2563eb;
  box-shadow: 0 14px 30px rgba(37, 99, 235, 0.35);
}

.hero-btn:hover {
  background: #1d4ed8;
  border-color: #1d4ed8;
  transform: translateY(-2px);
}

.hero-btn-outline {
  border-color: rgba(255, 255, 255, 0.65);
  color: #fff;
}

.hero-btn-outline:hover {
  background: rgba(255, 255, 255, 0.14);
  color: #fff;
  transform: translateY(-2px);
}

.hero-trust {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.hero-trust span {
  padding: 0.45rem 0.75rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.11);
  color: #e2e8f0;
  font-size: 0.9rem;
  backdrop-filter: blur(8px);
}

@media (max-width: 768px) {
  .hero-section {
    min-height: 88vh;
    background-position: center;
  }

  .row {
    min-height: 88vh !important;
  }

  .hero-title {
    font-size: 2.7rem;
  }

  .hero-subtitle {
    font-size: 1.05rem;
  }

  .hero-actions {
    flex-direction: column;
  }

  .hero-btn,
  .hero-btn-outline {
    width: 100%;
    text-align: center;
  }
}
</style>