<template>
  <Navbar v-if="route.path !== '/'" />

  <router-view />

  <Footer v-if="route.path !== '/'" :hide-mobile-cta="['/pet-cpr-game', '/ai-search-veterinary-cardiology'].includes(route.path)" />
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import { useSeo } from './seo'
import { useRoute } from 'vue-router'

const route = useRoute()
useSeo()
</script>
