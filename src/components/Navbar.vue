<template>
  <header v-if="variant === 'editorial'" class="navbar-wrapper ed-navbar editorial-brand" :class="{ 'ed-navbar--compact': compactNavigation }" @keydown.esc="closeAndRestoreFocus" @focusout="handleEditorialFocusOut">
    <nav ref="editorialNav" class="ed-nav-inner" aria-label="主要導覽">
      <RouterLink to="/" class="ed-wordmark" @click="closeMobileMenu">
        <span>專心動物醫院</span><small>CARDIOSPECIAL</small>
      </RouterLink>
      <div ref="desktopNav" class="ed-desktop-menu" :inert="compactNavigation" :aria-hidden="compactNavigation || undefined">
        <RouterLink v-for="link in editorialLinks" :key="link.to" :to="link.to">{{ link.label }}</RouterLink>
      </div>
      <RouterLink class="ed-schedule" to="/doctor-schedule" @click="closeMobileMenu">查看門診<span aria-hidden="true"> ↗</span></RouterLink>
      <button ref="editorialToggle" class="ed-menu-toggle" type="button" :aria-expanded="mobileMenu"
        aria-controls="editorial-mobile-menu" :aria-label="mobileMenu ? '關閉主選單' : '開啟主選單'" @click="mobileMenu = !mobileMenu">
        <span aria-hidden="true" class="ed-menu-icon" :class="{ 'is-open': mobileMenu }"></span>
      </button>
    </nav>
    <nav v-show="mobileMenu" id="editorial-mobile-menu" class="ed-mobile-menu" aria-label="行動導覽">
      <RouterLink v-for="link in editorialLinks" :key="link.to" :to="link.to" @click="closeMobileMenu">{{ link.label }}<span aria-hidden="true">↗</span></RouterLink>
      <RouterLink to="/doctor-schedule" @click="closeMobileMenu">查看門診<span aria-hidden="true">↗</span></RouterLink>
    </nav>
  </header>
  <header v-else class="navbar-wrapper" :class="{ scrolled: showSolidNavbar }">
    <nav class="container navbar-custom">

      <!-- Logo -->
      <RouterLink to="/" class="logo-wrap" @click="closeMobileMenu">
        <span class="logo-main">
          專心動物醫院 ｜ CardioSpecial
        </span>
      </RouterLink>

      <!-- Desktop Menu -->
      <div class="desktop-menu">
        <RouterLink :to="{ path: '/', hash: '#about' }">醫院介紹</RouterLink>
        <RouterLink :to="{ path: '/', hash: '#services' }">專科服務</RouterLink>
        <RouterLink :to="{ path: '/', hash: '#doctors' }">醫師團隊</RouterLink>
        <RouterLink :to="{ path: '/', hash: '#news' }">照護指南</RouterLink>
        <RouterLink :to="{ path: '/', hash: '#tumor' }">腫瘤門診</RouterLink>
        <RouterLink :to="{ path: '/', hash: '#contact' }">聯絡我們</RouterLink>
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
        <RouterLink :to="{ path: '/', hash: '#about' }" @click="closeMobileMenu">醫院介紹</RouterLink>
        <RouterLink :to="{ path: '/', hash: '#services' }" @click="closeMobileMenu">專科服務</RouterLink>
        <RouterLink :to="{ path: '/', hash: '#doctors' }" @click="closeMobileMenu">醫師團隊</RouterLink>
        <RouterLink :to="{ path: '/', hash: '#news' }" @click="closeMobileMenu">心臟照護秘笈</RouterLink>
        <RouterLink :to="{ path: '/', hash: '#tumor' }" @click="closeMobileMenu">腫瘤門診</RouterLink>
        <RouterLink :to="{ path: '/', hash: '#contact' }" @click="closeMobileMenu">聯絡我們</RouterLink>

        <RouterLink to="/products" @click="closeMobileMenu">
          產品
        </RouterLink>

      </div>
    </transition>
  </header>
  <!-- The existing article library has no built-in fixed-header clearance. -->
  <div v-if="variant === 'editorial' && route.path === '/articles'" class="ed-nav-spacer" aria-hidden="true"></div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const props = defineProps({ variant: { type: String, default: 'legacy' } })
const editorialToggle = ref(null)
const editorialNav = ref(null)
const desktopNav = ref(null)
const compactNavigation = ref(false)
let navigationObserver
const editorialLinks = [
  { to: '/#about', label: '醫院介紹' },
  { to: '/#services', label: '專科服務' },
  { to: '/#doctors', label: '獸醫師團隊' },
  { to: '/#news', label: '照護指南' },
  { to: '/#tumor', label: '腫瘤門診' },
  { to: '/#contact', label: '聯絡我們' },
  { to: '/products', label: '產品' }
]

const isScrolled = ref(false)
const mobileMenu = ref(false)

const isHomePage = computed(() => route.path === '/')

const showSolidNavbar = computed(() => {
  return !isHomePage.value || isScrolled.value
})

const closeMobileMenu = () => {
  mobileMenu.value = false
}
const closeAndRestoreFocus = () => {
  if (!mobileMenu.value) return
  closeMobileMenu()
  editorialToggle.value?.focus()
}
const handleEditorialFocusOut = (event) => {
  if (!event.currentTarget.contains(event.relatedTarget)) closeMobileMenu()
}
const measureNavigation = () => {
  const nav = editorialNav.value
  if (!nav || !desktopNav.value) return
  if (window.innerWidth < 1280) {
    compactNavigation.value = false
    return
  }
  const style = window.getComputedStyle(nav)
  const available = nav.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight)
  const brand = nav.querySelector('.ed-wordmark').getBoundingClientRect().width
  const schedule = nav.querySelector('.ed-schedule').getBoundingClientRect().width
  const required = brand + desktopNav.value.scrollWidth + schedule + parseFloat(style.columnGap) * 2
  compactNavigation.value = required > available
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 30

  if (props.variant !== 'editorial' && mobileMenu.value && window.scrollY > 80) {
    closeMobileMenu()
  }
}

watch(
  () => route.fullPath,
  () => closeMobileMenu()
)

watch(editorialNav, (nav) => {
  navigationObserver?.disconnect()
  window.removeEventListener('resize', measureNavigation)
  compactNavigation.value = false
  if (!nav) return
  measureNavigation()
  window.addEventListener('resize', measureNavigation)
  if (typeof ResizeObserver !== 'undefined') {
    navigationObserver = new ResizeObserver(measureNavigation)
    for (const element of [nav, desktopNav.value,
      nav.querySelector('.ed-wordmark'), nav.querySelector('.ed-schedule')]) {
      navigationObserver.observe(element)
    }
  }
}, { flush: 'post' })

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', measureNavigation)
  navigationObserver?.disconnect()
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
<style scoped src="./editorial/navbar.css"></style>
