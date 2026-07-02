<template>
  <section id="contact" class="line-contact-section" aria-labelledby="line-contact-title">
    <div class="container">
      <div class="line-contact-card">
        <div class="line-contact-copy">
          <p class="section-kicker">LINE Official Account</p>
          <h2 id="line-contact-title">加入專心動物醫院官方 LINE</h2>

          <div class="line-contact-actions">
            <a
              class="line-primary-action"
              :href="lineAddFriendUrl"
              target="_blank"
              rel="noopener noreferrer"
              @click="handleLineAddFriendClick"
            >
              加 LINE 好友
              <i class="bi bi-box-arrow-up-right" aria-hidden="true"></i>
            </a>
            <a class="line-secondary-action" :href="phoneHref">
              電話洽詢 {{ phoneNumber }}
            </a>
          </div>
        </div>

        <div class="line-qr-panel" aria-label="專心動物醫院 LINE 加好友 QR Code">
          <img :src="lineQrImage" alt="專心動物醫院官方 LINE 加好友 QR Code" width="357" height="357">
          <div>
            <span>掃描 QR Code</span>
            <strong>{{ lineOfficialId }}</strong>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { createLineAddFriendClickHandler } from '../lineNavigation'
import { lineAddFriendUrl, lineOfficialId, lineQrImage, phoneHref, phoneNumber } from '../siteContact'

const handleLineAddFriendClick = createLineAddFriendClickHandler(lineAddFriendUrl)
</script>

<style scoped>
.line-contact-section {
  padding: 5rem 0;
  background:
    radial-gradient(circle at 85% 20%, rgba(105, 150, 74, 0.12), transparent 28%),
    linear-gradient(180deg, #ffffff 0%, #f6fbf9 100%);
}

.line-contact-card {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(220px, 320px);
  gap: 2rem;
  align-items: center;
  padding: clamp(1.5rem, 4vw, 3rem);
  border: 1px solid rgba(0, 107, 112, 0.12);
  border-radius: 2rem;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 24px 70px rgba(0, 79, 83, 0.1);
}

.section-kicker {
  display: inline-flex;
  margin-bottom: 0.9rem;
  color: #69964a;
  font-size: 0.82rem;
  font-weight: 900;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.line-contact-copy h2 {
  margin-bottom: 1rem;
  color: #123f42;
  font-size: clamp(2rem, 5vw, 3.4rem);
  font-weight: 900;
  letter-spacing: -0.05em;
  line-height: 1.1;
}

.line-contact-copy p:not(.section-kicker) {
  max-width: 660px;
  color: #475569;
  font-size: 1.05rem;
  line-height: 1.9;
}

.line-contact-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  margin-top: 1.6rem;
}

.line-primary-action,
.line-secondary-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  padding: 0.85rem 1.15rem;
  border-radius: 999px;
  font-weight: 900;
  text-decoration: none;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    background 0.25s ease;
}

.line-primary-action {
  background: #06c755;
  color: #ffffff;
  box-shadow: 0 16px 34px rgba(6, 199, 85, 0.24);
}

.line-secondary-action {
  border: 1px solid rgba(0, 107, 112, 0.18);
  background: #ffffff;
  color: #006b70;
}

.line-primary-action:hover,
.line-secondary-action:hover {
  transform: translateY(-2px);
}

.line-primary-action:hover {
  box-shadow: 0 20px 42px rgba(6, 199, 85, 0.3);
}

.line-secondary-action:hover {
  background: #eef7f5;
}

.line-qr-panel {
  display: grid;
  gap: 1rem;
  justify-items: center;
  padding: 1rem;
  border-radius: 1.4rem;
  background: #f8fbfa;
  border: 1px solid rgba(0, 107, 112, 0.12);
}

.line-qr-panel img {
  width: min(100%, 220px);
  height: auto;
  border-radius: 1rem;
  background: #ffffff;
}

.line-qr-panel div {
  display: grid;
  gap: 0.2rem;
  text-align: center;
}

.line-qr-panel span {
  color: #64748b;
  font-size: 0.85rem;
  font-weight: 800;
}

.line-qr-panel strong {
  color: #123f42;
  font-size: 1.05rem;
}

@media (max-width: 768px) {
  .line-contact-section {
    padding: 3.5rem 0;
  }

  .line-contact-card {
    grid-template-columns: 1fr;
  }

  .line-contact-actions {
    display: grid;
  }

  .line-qr-panel {
    max-width: 260px;
    margin: 0 auto;
  }
}
</style>
