<template>
  <header class="navbar-wrapper" :class="{ scrolled: showSolidNavbar }">
    <nav class="container navbar-custom">

      <!-- Logo -->
      <RouterLink to="/" class="logo-wrap">
        <span class="logo-main">
          CardioSpecial
        </span>

        <span class="logo-sub">
          專心動物醫院
        </span>
      </RouterLink>

      <!-- Desktop Menu -->
      <div class="desktop-menu">
        <a href="/#about">醫院介紹</a>
        <a href="/#services">專科服務</a>
        <a href="/#doctors">醫師團隊</a>
        <a href="/#news">專心快訊</a>
        <a href="/#tumor">腫瘤門診</a>
        <RouterLink to="/products">產品</RouterLink>
      </div>

      <!-- Mobile Button -->
      <button class="mobile-toggle" @click="mobileMenu = !mobileMenu">
        <span></span>
        <span></span>
        <span></span>
      </button>

    </nav>

    <!-- Mobile Menu -->
    <transition name="mobile-menu">
      <div v-if="mobileMenu" class="mobile-menu">
        <a href="/#about">醫院介紹</a>
        <a href="/#services">專科服務</a>
        <a href="/#doctors">醫師團隊</a>
        <a href="/#news">專心快訊</a>
        <a href="/#tumor">腫瘤門診</a>

        <RouterLink to="/products">
          產品
        </RouterLink>

        <RouterLink to="/appointment" class="mobile-appointment">
          立即預約
        </RouterLink>
      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()

const isScrolled = ref(false)
const mobileMenu = ref(false)

const isHomePage = computed(() => route.path === '/')

const showSolidNavbar = computed(() => {
  return !isHomePage.value || isScrolled.value
})

const handleScroll = () => {
  isScrolled.value = window.scrollY > 30
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.navbar-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;

  z-index: 9999;

  transition:
    background 0.35s ease,
    backdrop-filter 0.35s ease,
    box-shadow 0.35s ease,
    padding 0.35s ease;

  padding: 1.1rem 0;
}

.navbar-wrapper.scrolled {
  background: rgba(15, 23, 42, 0.72);

  backdrop-filter: blur(18px);

  box-shadow:
    0 12px 35px rgba(0, 0, 0, 0.18);

  border-bottom:
    1px solid rgba(255, 255, 255, 0.08);

  padding: 0.7rem 0;
}

.navbar-custom {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Logo */

.logo-wrap {
  display: flex;
  flex-direction: column;

  text-decoration: none;
}

.logo-main {
  color: white;

  font-size: 1.35rem;
  font-weight: 900;
  letter-spacing: -0.03em;
}

.logo-sub {
  color: rgba(255, 255, 255, 0.7);

  font-size: 0.82rem;
}

/* Desktop */

.desktop-menu {
  display: flex;
  align-items: center;
  gap: 1.8rem;
}

.desktop-menu a {
  position: relative;

  color: white;

  text-decoration: none;

  font-weight: 600;

  transition:
    color 0.25s ease;
}

.desktop-menu a::after {
  content: "";

  position: absolute;

  left: 0;
  bottom: -6px;

  width: 0;
  height: 2px;

  background: #60a5fa;

  transition: width 0.3s ease;
}

.desktop-menu a:hover::after {
  width: 100%;
}

.desktop-menu a:hover {
  color: #bfdbfe;
}

/* CTA */

.appointment-btn {
  padding: 0.72rem 1.2rem;

  border-radius: 999px;

  background:
    linear-gradient(135deg,
      #2563eb,
      #1d4ed8);

  box-shadow:
    0 12px 30px rgba(37, 99, 235, 0.35);

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
}

.appointment-btn:hover {
  transform: translateY(-2px);

  box-shadow:
    0 18px 40px rgba(37, 99, 235, 0.45);
}

/* Mobile */

.mobile-toggle {
  display: none;

  flex-direction: column;
  gap: 5px;

  background: transparent;
  border: none;
}

.mobile-toggle span {
  width: 26px;
  height: 2px;

  background: white;

  border-radius: 999px;
}

.mobile-menu {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  padding: 1.5rem;

  background:
    rgba(15, 23, 42, 0.95);

  backdrop-filter: blur(18px);

  border-top:
    1px solid rgba(255, 255, 255, 0.08);
}

.mobile-menu a {
  color: white;

  text-decoration: none;

  font-weight: 700;
}

.mobile-appointment {
  display: flex;
  justify-content: center;

  margin-top: 0.5rem;

  padding: 0.85rem;

  border-radius: 999px;

  background:
    linear-gradient(135deg,
      #2563eb,
      #1d4ed8);
}

/* Animation */

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}

/* Responsive */

@media (max-width: 992px) {

  .desktop-menu {
    display: none;
  }

  .mobile-toggle {
    display: flex;
  }
}
</style>