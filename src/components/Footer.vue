<template>
  <footer id="contact" class="site-footer">
    <div class="container">
      <div class="footer-alert">
        <div>
          <p>Emergency Notice</p>
          <h3>若出現嚴重喘氣、昏倒、無法平躺，請儘快聯繫醫院或就近急診。</h3>
        </div>

        <RouterLink to="/appointment" class="footer-alert-btn">
          立即線上預約
        </RouterLink>
      </div>

      <div class="footer-main">
        <div class="footer-brand">
          <h2>CardioSpecial</h2>
          <p>
            專注犬貓心臟專科診療，提供從早期篩檢、疾病分期到長期治療追蹤的完整照護。
          </p>
        </div>

        <div class="footer-column">
          <h3>聯絡資訊</h3>
          <ul>
            <li>
              <span>電話</span>
              <a href="tel:0223633016">02-2363-3016</a>
            </li>
            <li>
              <span>地址</span>
              <a href="https://www.google.com/maps/search/?api=1&query=台北市中正區仁愛路一段47號1樓" target="_blank"
                rel="noopener noreferrer">
                台北市中正區仁愛路一段47號1樓
              </a>
            </li>
          </ul>
        </div>

        <div class="footer-column">
          <h3>營業時間</h3>
          <ul>
            <li><span>週一</span>10:00 – 21:30</li>
            <li><span>週二</span>13:00 – 21:00</li>
            <li><span>週三</span>10:00 – 18:00</li>
            <li><span>週四</span>10:00 – 21:30</li>
            <li><span>週五</span>10:00 – 21:30</li>
            <li><span>週六</span>10:00 – 18:00</li>
            <li><span>週日</span>休診</li>
          </ul>
        </div>

        <div class="footer-column">
          <h3>快速連結</h3>
          <div class="footer-links">
            <a href="/#about">關於我們</a>
            <a href="/#services">專科服務</a>
            <a href="/#doctors">醫師團隊</a>
            <a href="/#news">專心快訊</a>
            <a href="/#oncology">腫瘤門診</a>
            <RouterLink to="/products">產品</RouterLink>
          </div>

          <div class="footer-actions">
            <a href="https://www.google.com/maps/dir/?api=1&destination=台北市中正區仁愛路一段47號1樓" target="_blank"
              rel="noopener">
              Google 導航
            </a>

            <RouterLink to="/appointment">
              線上預約
            </RouterLink>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <span>© 2026 CardioSpecial 動物心臟專科</span>
        <span>犬貓心臟與腫瘤專科醫療</span>
      </div>
    </div>

    <div class="mobile-bottom-cta">
      <a href="tel:0223633016">電話</a>
      <a href="https://www.google.com/maps/search/?api=1&query=台北市中正區仁愛路一段47號1樓" target="_blank"
        rel="noopener noreferrer">
        導航
      </a>
      <RouterLink to="/appointment">預約</RouterLink>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.site-footer {
  position: relative;
  background:
    radial-gradient(circle at 10% 10%, rgba(37, 99, 235, 0.18), transparent 30%),
    linear-gradient(180deg, #0f172a 0%, #020617 100%);
  color: #ffffff;
  padding: 4rem 0 2rem;
}

.footer-alert {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 3rem;
  padding: 1.6rem 1.8rem;
  border-radius: 1.6rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(14px);
}

.footer-alert p {
  margin-bottom: 0.4rem;
  color: #93c5fd;
  font-size: 0.82rem;
  font-weight: 900;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.footer-alert h3 {
  margin-bottom: 0;
  color: #ffffff;
  font-size: 1.2rem;
  font-weight: 800;
  line-height: 1.6;
}

.footer-alert-btn {
  flex-shrink: 0;
  padding: 0.8rem 1.3rem;
  border-radius: 999px;
  background: #ffffff;
  color: #1e3a8a;
  font-weight: 900;
  text-decoration: none;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.footer-alert-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(255, 255, 255, 0.25);
}

.footer-main {
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr 1fr;
  gap: 2.2rem;
}

.footer-brand h2 {
  margin-bottom: 1rem;
  font-size: 1.8rem;
  font-weight: 900;
  letter-spacing: -0.04em;
}

.footer-brand p {
  max-width: 360px;
  color: #cbd5e1;
  line-height: 1.9;
}

.footer-column h3 {
  margin-bottom: 1rem;
  color: #ffffff;
  font-size: 1rem;
  font-weight: 900;
}

.footer-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-column li {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  color: #cbd5e1;
  line-height: 1.7;
}

.footer-column li span {
  min-width: 42px;
  color: #93c5fd;
  font-weight: 800;
}

.footer-column a,
.footer-links a,
.footer-links :deep(a) {
  color: #cbd5e1;
  text-decoration: none;
  transition: color 0.25s ease;
}

.footer-column a:hover,
.footer-links a:hover,
.footer-links :deep(a:hover) {
  color: #ffffff;
}

.footer-links {
  display: grid;
  gap: 0.6rem;
}

.footer-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 1.2rem;
}

.footer-actions a,
.footer-actions :deep(a) {
  padding: 0.55rem 0.85rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.09);
  color: #ffffff;
  font-weight: 800;
  text-decoration: none;
  transition:
    background 0.25s ease,
    transform 0.25s ease;
}

.footer-actions a:hover,
.footer-actions :deep(a:hover) {
  background: rgba(255, 255, 255, 0.16);
  transform: translateY(-2px);
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 3rem;
  padding-top: 1.4rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: #94a3b8;
  font-size: 0.9rem;
}

.mobile-bottom-cta {
  display: none;
}

@media (max-width: 991px) {
  .footer-main {
    grid-template-columns: 1fr 1fr;
  }

  .footer-alert {
    flex-direction: column;
    align-items: flex-start;
  }

  .footer-alert-btn {
    width: 100%;
    text-align: center;
  }
}

@media (max-width: 576px) {
  .site-footer {
    padding-bottom: 5.5rem;
  }

  .footer-main {
    grid-template-columns: 1fr;
  }

  .footer-bottom {
    flex-direction: column;
  }

  .mobile-bottom-cta {
    position: fixed;
    left: 1rem;
    right: 1rem;
    bottom: 1rem;
    z-index: 9999;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    overflow: hidden;

    border-radius: 999px;
    background: rgba(15, 23, 42, 0.92);
    border: 1px solid rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(16px);
    box-shadow: 0 18px 45px rgba(15, 23, 42, 0.35);
  }

  .mobile-bottom-cta a,
  .mobile-bottom-cta :deep(a) {
    padding: 0.85rem 0.5rem;
    color: #ffffff;
    font-size: 0.9rem;
    font-weight: 900;
    text-align: center;
    text-decoration: none;
  }

  .mobile-bottom-cta a:not(:last-child) {
    border-right: 1px solid rgba(255, 255, 255, 0.12);
  }
}
</style>