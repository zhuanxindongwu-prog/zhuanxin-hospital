<template>
  <Navbar v-if="route.path !== '/'" :variant="usesEditorialChrome(route.path) ? 'editorial' : 'legacy'" />

  <router-view />

  <Footer v-if="route.path !== '/'" :variant="usesEditorialChrome(route.path) ? 'editorial' : 'legacy'" :hide-mobile-cta="['/pet-cpr-game', '/ai-search-veterinary-cardiology'].includes(route.path)" />
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import { useSeo } from './seo'
import { useRoute } from 'vue-router'
import { usesEditorialChrome } from './editorialRoutes'
import './styles/editorial-brand.css'

const route = useRoute()
useSeo()
</script>
