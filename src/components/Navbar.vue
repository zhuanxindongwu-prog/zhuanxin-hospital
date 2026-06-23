<template>
  <header class="navbar-wrapper" :class="{ scrolled: showSolidNavbar }">
    <nav class="container navbar-custom">

      <!-- Logo -->
      <RouterLink to="/" class="logo-wrap" @click="closeMobileMenu">
        <span class="logo-main">
          專心動物醫院 ｜ CardioSpecial
        </span>
      </RouterLink>

      <!-- Desktop Menu -->
      <div class="desktop-menu">
        <a href="/#about">醫院介紹</a>
        <a href="/#services">專科服務</a>
        <a href="/#doctors">醫師團隊</a>
        <a href="/#news">照護指南</a>
        <a href="/#tumor">腫瘤門診</a>
        <RouterLink to="/products">產品</RouterLink>
      </div>

      <!-- Mobile Button -->
      <button class="mobile-toggle" type="button" :aria-expanded="mobileMenu" aria-label="開啟主選單"
        @click="mobileMenu = !mobileMenu">
        <span></span>
        <span></span>
        <span></span>
      </button>

    </nav>

    <!-- Mobile Menu -->
    <transition name="mobile-menu">
      <div v-if="mobileMenu" class="mobile-menu">
        <a href="/#about" @click="closeMobileMenu">醫院介紹</a>
        <a href="/#services" @click="closeMobileMenu">專科服務</a>
        <a href="/#doctors" @click="closeMobileMenu">醫師團隊</a>
        <a href="/#news" @click="closeMobileMenu">專心照護指南</a>
        <a href="/#tumor" @click="closeMobileMenu">腫瘤門診</a>

        <RouterLink to="/products" @click="closeMobileMenu">
          產品
        </RouterLink>

      </div>
    </transition>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()

const isScrolled = ref(false)
const mobileMenu = ref(false)

const isHomePage = computed(() => route.path === '/')

const showSolidNavbar = computed(() => {
  return !isHomePage.value || isScrolled.value
})

const closeMobileMenu = () => {
  mobileMenu.value = false
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 30

  if (mobileMenu.value && window.scrollY > 80) {
    closeMobileMenu()
  }
}

watch(
  () => route.fullPath,
  () => closeMobileMenu()
)

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
  background: linear-gradient(135deg, rgba(105, 150, 74, 0.96), rgba(0, 107, 112, 0.96));

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
  text-decoration: none;
}

.logo-main {
  color: white;

  font-size: 1.25rem;
  font-weight: 900;
  letter-spacing: 0;
}

/* Desktop */

.desktop-menu {
  display: flex;
  align-items: center;
  gap: 1.45rem;
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

  background: #dcebcf;

  transition: width 0.3s ease;
}

.desktop-menu a:hover::after {
  width: 100%;
}

.desktop-menu a:hover {
  color: #e8f3f3;
}

/* Mobile */

.mobile-toggle {
  display: none;

  flex-direction: column;
  gap: 5px;

  background: transparent;
  border: none;
  padding: 0.35rem;
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

  background: linear-gradient(135deg, rgba(105, 150, 74, 0.98), rgba(0, 107, 112, 0.98));

  backdrop-filter: blur(18px);

  border-top:
    1px solid rgba(255, 255, 255, 0.08);

  box-shadow: 0 22px 45px rgba(2, 6, 23, 0.32);
}

.mobile-menu a {
  color: white;

  text-decoration: none;

  font-weight: 700;
  padding: 0.18rem 0;
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
