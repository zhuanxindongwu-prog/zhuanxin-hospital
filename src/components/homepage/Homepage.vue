<script setup>
import { ref } from 'vue'
import { doctors } from '../../data/doctors.js'
import { homepageArticleCards } from '../../data/articleCatalog.js'
import { phoneNumber, phoneHref, clinicAddress, mapsDirectionsUrl, lineAddFriendUrl, lineQrImage, lineOfficialId } from '../../siteContact.js'
import { createLineAddFriendClickHandler } from '../../lineNavigation.js'

defineProps({ preview: { type: Boolean, default: false } })

const menuOpen = ref(false)
const menuButton = ref(null)
const activePetDoctor = ref(null)
const doctorPets = {
  'hung-rong-wei': ['milu'],
  'lin-zheng': ['lico'],
  'lee-ji-zhong': ['alger'],
  'wu-guan-xun': ['bass'],
  'yan-shi-rong': ['doubleQ', 'simba'],
  'chen-shi-ting': ['傻狗'],
  'chen-xuan-zhen': ['臭狗'],
  'chen-pin-qi': ['moso']
}
const teamDoctors = doctors.map(doctor => ({
  ...doctor,
  image: doctor.id === 'wu-guan-xun' ? '/imgs/optimized/冠勳的怪貓.webp' : doctor.image,
  imageAlt: doctor.id === 'wu-guan-xun'
    ? '吳冠勳獸醫師選用的貓咪照片'
    : doctor.image === '/imgs/all.webp' ? `${doctor.name}的團隊照片` : `${doctor.name}的個人照片`,
  specialtiesText: (doctor.tags?.length ? doctor.tags : doctor.specialties || []).join('・'),
  pets: (doctorPets[doctor.id] || []).map(pet => `/imgs/optimized/${pet}.webp`)
}))
const togglePet = (id) => { activePetDoctor.value = activePetDoctor.value === id ? null : id }
const handleLine = createLineAddFriendClickHandler(lineAddFriendUrl)
const closeMenu = () => { menuOpen.value = false }
const escapeMenu = () => {
  if (!menuOpen.value) return
  closeMenu()
  menuButton.value?.focus()
}
const navItems = [
  ['醫院介紹', 'about'], ['專科服務', 'services'], ['獸醫師團隊', 'doctors'],
  ['照護指南', 'news'], ['腫瘤門診', 'tumor'], ['聯絡我們', 'contact']
]
const services = [
  { title: '心臟超音波檢查', english: 'Echocardiography', description: '透過影像，看懂每一次心跳。評估心臟結構、瓣膜狀態、心房心室大小與心臟功能，為後續治療提供依據。', tags: '二尖瓣膜疾病 / 心肌病變 / 先天性心臟病 / 肺高壓評估', href: '/services/echocardiography' },
  { title: '心律不整診斷', english: 'Heart rhythm assessment', description: '透過心電圖與 Holter 監測，判讀心跳過快、過慢或不規則，協助評估昏厥原因與用藥方向。', tags: 'ECG 心電圖 / Holter 監測 / 昏厥評估', href: '/services/veterinary-cardiology' },
  { title: '心臟病治療與追蹤', english: 'Long-term cardiac care', description: '依疾病分期與臨床狀態，規劃個別化用藥與回診追蹤，陪伴毛孩與家長面對每個照護階段。', tags: 'MMVD 分期 / 心衰竭管理 / 居家呼吸監測', href: '/topics/mmvd' },
  { title: '術前心臟風險評估', english: 'Pre-anesthetic assessment', description: '協助麻醉與手術前了解心臟風險，為高齡、心雜音或慢性病毛孩提供檢查與評估建議。', tags: '麻醉風險評估 / 高齡犬貓 / 腫瘤手術前評估', href: '/services/veterinary-cardiology' },
  { title: '貓咪心臟疾病評估', english: 'Feline cardiology', description: '貓咪心臟疾病的症狀常不明顯，透過專科檢查，評估心肌病變、心雜音與相關風險。', tags: 'HCM 評估 / 呼吸急促 / 血栓風險', href: '/services/veterinary-cardiology' }
]
const hours = [
  ['週一', '10:00–21:30'], ['週二', '13:00–21:00'], ['週三', '10:00–18:00'],
  ['週四', '10:00–21:30'], ['週五', '10:00–21:30'], ['週六', '10:00–18:00'], ['週日', '休診']
]
const featuredArticle = homepageArticleCards[0]
</script>

<template>
  <div class="editorial-home" @keydown.esc="escapeMenu">
    <a class="skip-link" href="#main-content">跳至主要內容</a>
    <div v-if="preview" class="preview-notice"><span>首頁設計提案 <span class="notice-dot">·</span> 僅本機預覽</span><a href="/">查看正式首頁 <i class="bi bi-arrow-up-right" aria-hidden="true"></i></a></div>

    <header class="site-header">
      <div class="header-inner wrap">
        <a class="wordmark" href="#main-content" aria-label="專心動物醫院，回到首頁頂端">
          <span class="wordmark-zh">專心<span>動物醫院</span></span>
          <span class="wordmark-en">CARDIOSPECIAL</span>
        </a>
        <nav class="desktop-nav" aria-label="主要導覽">
          <a v-for="[label, id] in navItems" :key="id" :href="`#${id}`">{{ label }}</a>
        </nav>
        <a class="header-book" href="/doctor-schedule">查看門診 <i class="bi bi-arrow-up-right" aria-hidden="true"></i></a>
        <button ref="menuButton" class="menu-toggle" type="button" :aria-expanded="menuOpen" aria-controls="mobile-navigation" :aria-label="menuOpen ? '關閉導覽選單' : '開啟導覽選單'" @click="menuOpen = !menuOpen">
          <i :class="menuOpen ? 'bi bi-x-lg' : 'bi bi-list'" aria-hidden="true"></i>
        </button>
      </div>
      <nav v-if="menuOpen" id="mobile-navigation" class="mobile-nav" aria-label="行動版導覽">
        <a v-for="[label, id] in navItems" :key="id" :href="`#${id}`" @click="closeMenu">{{ label }}<i class="bi bi-arrow-up-right" aria-hidden="true"></i></a>
        <a href="/doctor-schedule">本月獸醫師班表<i class="bi bi-calendar3" aria-hidden="true"></i></a>
      </nav>
    </header>

    <main id="main-content" tabindex="-1">
      <section class="hero wrap" aria-labelledby="hero-title">
        <div class="hero-copy">
          <p class="eyebrow"><span class="tiny-line"></span> 犬貓心臟專科・腫瘤門診</p>
          <h1 id="hero-title">把每一次心跳，<br />放在<span class="heart-word">心上。</span></h1>
          <p class="hero-description">牠是你的家人，也是我們在乎的生命。<br class="desktop-break" />從專科診療到日常照護，專心陪伴每一段旅程。</p>
          <div class="hero-actions">
            <a class="button button-dark" href="/doctor-schedule">查看本月門診班表 <i class="bi bi-arrow-up-right" aria-hidden="true"></i></a>
            <a class="text-link" href="#doctors">認識醫療團隊 <i class="bi bi-arrow-right" aria-hidden="true"></i></a>
          </div>
          <div class="hero-note"><i class="bi bi-geo-alt" aria-hidden="true"></i><span>台北・仁愛路一段 47 號<span class="hero-note-divider">｜</span><a :href="phoneHref">{{ phoneNumber }}</a></span></div>
        </div>
        <figure class="hero-portrait">
          <div class="portrait-mat">
            <img src="/imgs/DRH.webp" alt="洪榮偉院長抱著白色毛孩，溫暖微笑" width="800" height="1050" fetchpriority="high" loading="eager" />
            <span class="portrait-side-note" aria-hidden="true">EXPERTISE WITH EMPATHY</span>
          </div>
          <figcaption><span>洪榮偉 院長 <span class="caption-divider">/</span> 心臟專科</span><span class="portrait-caption-en">Care, with all our heart.</span></figcaption>
        </figure>
        <div class="hero-bottom"><span>專業，始於理解；照護，來自專心。</span><a href="#about">往下探索 <i class="bi bi-arrow-down" aria-hidden="true"></i></a></div>
      </section>

      <section id="about" class="about-section wrap section-space" aria-labelledby="about-title">
        <div class="section-label"><span>01 / 關於專心</span><span class="label-en">OUR PHILOSOPHY</span></div>
        <div class="about-content">
          <h2 id="about-title">醫療的專業，<br />也有陪伴的溫度。</h2>
          <div class="about-story"><p>心臟病的照護，不只在診間裡。從第一次聽見心雜音，到每一次回診與居家觀察，我們希望讓你更了解毛孩的身體，也讓每個選擇都有清楚的方向。</p><p>專心以犬貓心臟診療為核心，結合內科與腫瘤門診，提供個別化的醫療評估與長期照護。</p><a class="text-link" href="/services/veterinary-cardiology">了解心臟專科 <i class="bi bi-arrow-up-right" aria-hidden="true"></i></a></div>
        </div>
      </section>

      <section id="services" class="services-section section-space" aria-labelledby="services-title">
        <div class="wrap services-layout">
          <div class="services-intro">
            <p class="eyebrow">02 / 專科服務</p>
            <h2 id="services-title">從看懂心跳，<br />到安心照護。</h2>
            <p>讓檢查、治療與生活相互連結，<br />找到適合毛孩的照護步調。</p>
            <a class="text-link" href="/services/veterinary-cardiology">完整心臟診療服務 <i class="bi bi-arrow-up-right" aria-hidden="true"></i></a>
            <div class="care-note"><i class="bi bi-heart-pulse" aria-hidden="true"></i><p>每一顆心，都值得<br /><span>被細心聆聽。</span></p></div>
          </div>
          <div class="service-list">
            <details v-for="(service, index) in services" :key="service.title" name="specialty-services" :open="index === 0" class="service-item">
              <summary><span class="service-number">0{{ index + 1 }}</span><span class="service-heading"><span>{{ service.title }}</span><span class="service-english">{{ service.english }}</span></span><i class="bi bi-plus-lg service-plus" aria-hidden="true"></i></summary>
              <div class="service-detail"><p>{{ service.description }}</p><p class="service-tags">{{ service.tags }}</p><a class="text-link" :href="service.href">了解更多 <i class="bi bi-arrow-up-right" aria-hidden="true"></i></a></div>
            </details>
          </div>
        </div>
      </section>

      <section id="doctors" class="team-section wrap section-space" aria-labelledby="team-title">
        <div class="section-heading"><div><p class="eyebrow">03 / 獸醫師團隊</p><h2 id="team-title">以專業守護，<br class="mobile-break" />用真心陪伴。</h2></div><a class="text-link" href="/doctor-schedule">查看獸醫師班表 <i class="bi bi-arrow-up-right" aria-hidden="true"></i></a></div>
        <div class="team-grid">
          <article v-for="doctor in teamDoctors" :key="doctor.id" class="team-doctor" :class="{ 'is-pet-open': activePetDoctor === doctor.id }" @keydown.esc="activePetDoctor = null">
            <div class="doctor-pets" aria-hidden="true">
              <img v-for="(pet, index) in doctor.pets" :key="pet" :src="pet" alt="" aria-hidden="true" class="doctor-pet" :class="index === 0 ? 'doctor-pet-right' : 'doctor-pet-left'" width="100" height="100" loading="lazy" decoding="async" />
            </div>
            <a class="doctor-profile" :href="`/doctor/${doctor.id}`">
              <div class="doctor-image"><img :src="doctor.image" :alt="doctor.imageAlt" width="800" height="1050" loading="lazy" /><span class="doctor-arrow"><i class="bi bi-arrow-up-right" aria-hidden="true"></i></span></div>
              <div class="doctor-heading"><h3>{{ doctor.name }}</h3><span>{{ doctor.title }}</span></div>
              <p>{{ doctor.specialtiesText }}</p>
              <span class="doctor-read-more">查看介紹 <i class="bi bi-arrow-up-right" aria-hidden="true"></i></span>
            </a>
            <button v-if="doctor.pets.length" class="pet-toggle" type="button" :aria-pressed="activePetDoctor === doctor.id" :aria-label="`和${doctor.name}的小夥伴打招呼`" @click="togglePet(doctor.id)"><i class="bi bi-heart" aria-hidden="true"></i> 小夥伴</button>
          </article>
        </div>
        <div class="team-philosophy"><picture><source type="image/avif" srcset="/imgs/optimized/hero-team-768.avif 768w, /imgs/optimized/hero-team-1600.avif 1600w" sizes="(max-width: 760px) 100vw, 50vw" /><img src="/imgs/optimized/hero-team-1600.jpg" alt="專心動物醫院團隊參與台日獸醫心臟醫學交流" width="1600" height="1066" loading="lazy" /></picture><div><p class="eyebrow">LEARNING, TOGETHER.</p><h3>持續學習，<br />是為了更好的照護。</h3><p>從臨床診療到學術交流，讓醫療知識持續前進，也把每一份所學，帶回毛孩的日常。</p></div></div>
      </section>

      <section id="tumor" class="oncology-section" aria-labelledby="tumor-title"><div class="wrap oncology-layout"><div><p class="eyebrow">04 / 腫瘤門診</p><h2 id="tumor-title">面對不確定，<br />我們一起找方向。</h2></div><div class="oncology-copy"><p>從腫塊評估、影像檢查、治療規劃到安寧照護，依照腫瘤類型與毛孩的身體狀態，提供個別化醫療建議。治療之外，也關心每一天的生活品質。</p><div class="oncology-links"><a class="button button-light" href="/services/veterinary-oncology">了解腫瘤門診 <i class="bi bi-arrow-up-right" aria-hidden="true"></i></a><a class="text-link" href="/files/專心腫瘤轉診單(新版1).docx" download>下載轉診單 <i class="bi bi-download" aria-hidden="true"></i></a></div></div></div></section>

      <section id="news" class="journal-section wrap section-space" aria-labelledby="journal-title">
        <div class="section-heading"><div><p class="eyebrow">05 / 專心照護筆記</p><h2 id="journal-title">多一點了解，<br class="mobile-break" />多一份安心。</h2></div><a class="text-link" href="/articles">所有照護文章 <i class="bi bi-arrow-up-right" aria-hidden="true"></i></a></div>
        <div class="journal-grid">
          <a class="featured-story" :href="featuredArticle.link"><div class="story-image"><img :src="featuredArticle.image" :alt="featuredArticle.title + '的心臟醫學插畫'" width="1536" height="1024" loading="lazy" /></div><div class="story-meta"><span>{{ featuredArticle.category }}</span><time :datetime="featuredArticle.date">{{ featuredArticle.date.replaceAll('-', '.') }}</time></div><h3>{{ featuredArticle.title }}</h3><p>{{ featuredArticle.description }}</p><span class="text-link">閱讀文章 <i class="bi bi-arrow-up-right" aria-hidden="true"></i></span></a>
          <div class="journal-sidebar"><a v-for="article in homepageArticleCards.slice(1)" :key="article.link" class="side-story" :href="article.link"><div class="side-story-image"><img :src="article.image" :alt="article.title + '的原始文章照片'" width="1200" height="629" loading="lazy" /></div><div><div class="story-meta"><span>{{ article.category }}</span><time :datetime="article.date">{{ article.date.replaceAll('-', '.') }}</time></div><h3>{{ article.title }}</h3><span class="small-arrow" aria-hidden="true">↗</span></div></a><div class="petvoice-note"><i class="bi bi-house-heart" aria-hidden="true"></i><div><h3>把照護，延伸到家裡。</h3><p>認識 PetVoice 居家生理監測，讓日常觀察成為與獸醫師溝通的參考。</p><a class="text-link" href="/petvoice">了解 PetVoice <i class="bi bi-arrow-up-right" aria-hidden="true"></i></a></div></div></div>
        </div>
      </section>

      <aside class="urgent-note wrap" aria-label="緊急就醫提醒"><i class="bi bi-exclamation-circle" aria-hidden="true"></i><p><strong>當毛孩不舒服，請先尋求醫療協助。</strong><span>若出現嚴重喘氣、昏倒、無法平躺，請儘快聯繫醫院或就近急診。</span></p><a :href="phoneHref">致電醫院 <i class="bi bi-arrow-up-right" aria-hidden="true"></i></a></aside>

      <section id="contact" class="contact-section section-space" aria-labelledby="contact-title"><div class="wrap"><div class="contact-top"><div><p class="eyebrow">06 / 聯絡專心</p><h2 id="contact-title">下一步，<br />讓我們陪你一起。</h2></div><div class="contact-actions"><a class="button button-dark" :href="lineAddFriendUrl" target="_blank" rel="noopener noreferrer" @click="handleLine"><i class="bi bi-line" aria-hidden="true"></i> LINE 聯繫與預約 <i class="bi bi-arrow-up-right" aria-hidden="true"></i></a><a class="contact-phone" :href="phoneHref">{{ phoneNumber }} <i class="bi bi-arrow-up-right" aria-hidden="true"></i></a><span>看診與預約事宜，歡迎先與我們聯繫。</span></div></div>
        <div class="contact-grid"><div class="contact-address"><h3>來專心，找我們</h3><p>{{ clinicAddress }}</p><a class="text-link" :href="mapsDirectionsUrl" target="_blank" rel="noopener noreferrer">開啟地圖導航 <i class="bi bi-arrow-up-right" aria-hidden="true"></i></a><a class="text-link contact-schedule" href="/doctor-schedule">本月獸醫師班表 <i class="bi bi-calendar3" aria-hidden="true"></i></a></div><div class="opening-hours"><h3>門診時間</h3><dl><div v-for="[day, time] in hours" :key="day"><dt>{{ day }}</dt><dd>{{ time }}</dd></div></dl><p>實際看診安排請以當月班表與院方公告為準。</p></div><div class="line-contact"><img :src="lineQrImage" alt="專心動物醫院 LINE 官方帳號 QR Code" width="357" height="357" loading="lazy" /><p>掃描加入 LINE 好友<br /><span>{{ lineOfficialId }}</span></p></div></div>
      </div></section>
    </main>

    <footer class="site-footer"><div class="wrap footer-inner"><a class="wordmark" href="#main-content"><span class="wordmark-zh">專心<span>動物醫院</span></span><span class="wordmark-en">CARDIOSPECIAL</span></a><p>專心醫療，真心陪伴。<span>© {{ new Date().getFullYear() }} CardioSpecial Veterinary Hospital</span></p><a href="/products">照護產品 <i class="bi bi-arrow-up-right" aria-hidden="true"></i></a></div><nav class="wrap footer-resources" aria-label="醫院資訊"><a href="/taipei-zhongzheng-veterinary-hospital">台北中正區動物醫院</a><a href="/ai-search-veterinary-cardiology">醫療資訊摘要</a><a href="/pet-cpr-game">犬貓急救互動教學</a></nav></footer>
  </div>
</template>

<style scoped src="./homepage.css"></style>
