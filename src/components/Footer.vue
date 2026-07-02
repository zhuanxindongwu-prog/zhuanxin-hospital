<template>
  <footer class="site-footer">
    <div class="container">
      <div class="footer-alert">
        <div>
          <p>Emergency Notice</p>
          <h3>若出現嚴重喘氣、昏倒、無法平躺，請儘快聯繫醫院或就近急診。</h3>
        </div>

      </div>

      <div class="footer-main">
        <div class="footer-brand">
          <h2>專心動物醫院</h2>
          <p>
            CardioSpecial 是位於台北市中正區仁愛路一段的動物醫院，
            專注犬貓心臟專科與犬貓腫瘤門診，提供從早期篩檢、疾病分期到長期治療追蹤的完整照護。
          </p>
        </div>

        <div class="footer-column">
          <h3>聯絡資訊</h3>
          <ul>
            <li>
              <span>電話</span>
              <a :href="phoneHref">{{ phoneNumber }}</a>
            </li>
            <li>
              <span>LINE</span>
              <a
                :href="lineAddFriendUrl"
                target="_blank"
                rel="noopener noreferrer"
                @click="handleLineAddFriendClick"
              >
                {{ lineOfficialId }}
              </a>
            </li>
            <li>
              <span>地址</span>
              <a :href="mapsSearchUrl" target="_blank" rel="noopener noreferrer">
                {{ clinicAddress }}
              </a>
            </li>
          </ul>

          <a
            class="footer-line-card"
            :href="lineAddFriendUrl"
            target="_blank"
            rel="noopener noreferrer"
            @click="handleLineAddFriendClick"
          >
            <img :src="lineQrImage" alt="專心動物醫院官方 LINE 加好友 QR Code" width="357" height="357">
            <span>
              <strong>LINE 加好友</strong>
              <small>掃描 QR Code 或點擊加入</small>
            </span>
          </a>
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
          <div class="footer-link-groups">
            <div class="footer-link-group">
              <span>網站導覽</span>
              <a href="/#about">關於我們</a>
              <a href="/#services">專科服務</a>
              <a href="/#doctors">醫師團隊</a>
              <a href="/#news">照護指南</a>
            </div>

            <div class="footer-link-group">
              <span>專科與主題</span>
              <RouterLink to="/services/veterinary-cardiology">犬貓心臟專科</RouterLink>
              <RouterLink to="/services/echocardiography">心臟超音波</RouterLink>
              <RouterLink to="/services/veterinary-oncology">犬貓腫瘤門診</RouterLink>
              <RouterLink to="/topics/mmvd">MMVD 指南</RouterLink>
            </div>

            <div class="footer-link-group">
              <span>延伸入口</span>
              <RouterLink to="/taipei-zhongzheng-veterinary-hospital">台北中正區動物醫院</RouterLink>
              <RouterLink to="/ai-search-veterinary-cardiology">AI 搜尋摘要</RouterLink>
              <RouterLink to="/products">照護產品</RouterLink>
            </div>
          </div>

          <div class="footer-actions">
            <a :href="mapsDirectionsUrl" target="_blank" rel="noopener">
              Google 導航
            </a>

            <a :href="phoneHref">電話洽詢</a>
            <a
              :href="lineAddFriendUrl"
              target="_blank"
              rel="noopener noreferrer"
              @click="handleLineAddFriendClick"
            >
              LINE 加好友
            </a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <span>© 2026 專心動物醫院 ｜ CardioSpecial</span>
        <span>犬貓心臟與腫瘤專科醫療</span>
      </div>
    </div>

    <div v-if="!hideMobileCta" class="mobile-bottom-cta">
      <a :href="phoneHref">電話</a>
      <a
        :href="lineAddFriendUrl"
        target="_blank"
        rel="noopener noreferrer"
        @click="handleLineAddFriendClick"
      >
        LINE
      </a>
      <a :href="mapsSearchUrl" target="_blank" rel="noopener noreferrer">
        導航
      </a>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { createLineAddFriendClickHandler } from '../lineNavigation'
import {
  clinicAddress,
  lineAddFriendUrl,
  lineOfficialId,
  lineQrImage,
  mapsDirectionsUrl,
  mapsSearchUrl,
  phoneHref,
  phoneNumber
} from '../siteContact'

const handleLineAddFriendClick = createLineAddFriendClickHandler(lineAddFriendUrl)

defineProps({
  hideMobileCta: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.site-footer {
  position: relative;
  background:
    radial-gradient(circle at 10% 10%, rgba(232, 243, 243, 0.16), transparent 30%),
    linear-gradient(135deg, #69964a 0%, #006b70 100%);
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
  color: #dcebcf;
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
  color: #006b70;
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
  grid-template-columns: minmax(260px, 1.2fr) minmax(210px, 0.7fr) minmax(210px, 0.7fr) minmax(320px, 1.15fr);
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
  color: #dcebcf;
  font-weight: 800;
}

.footer-line-card {
  display: grid;
  grid-template-columns: 72px 1fr;
  gap: 0.8rem;
  align-items: center;
  margin-top: 1.2rem;
  padding: 0.75rem;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.09);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.footer-line-card img {
  width: 72px;
  height: 72px;
  border-radius: 0.6rem;
  background: #ffffff;
}

.footer-line-card span {
  display: grid;
  gap: 0.18rem;
}

.footer-line-card strong {
  color: #ffffff;
  font-weight: 900;
}

.footer-line-card small {
  color: #cbd5e1;
  line-height: 1.45;
}

.footer-column a,
.footer-link-group a,
.footer-link-group :deep(a) {
  color: #cbd5e1;
  text-decoration: none;
  transition: color 0.25s ease;
}

.footer-column a:hover,
.footer-link-group a:hover,
.footer-link-group :deep(a:hover) {
  color: #ffffff;
}

.footer-link-groups {
  display: grid;
  gap: 1rem;
}

.footer-link-group {
  display: grid;
  gap: 0.45rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-link-group:last-child {
  padding-bottom: 0;
  border-bottom: 0;
}

.footer-link-group span {
  color: #dcebcf;
  font-size: 0.78rem;
  font-weight: 900;
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
    background: linear-gradient(135deg, rgba(105, 150, 74, 0.96), rgba(0, 107, 112, 0.96));
    border: 1px solid rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(16px);
    box-shadow: 0 18px 45px rgba(0, 79, 83, 0.32);
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
