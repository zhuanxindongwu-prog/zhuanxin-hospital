<template>
  <Navbar />

  <router-view />

  <Footer :hide-mobile-cta="route.path === '/pet-cpr-game'" />
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import { useSeo } from './seo'
import { useRoute } from 'vue-router'

const route = useRoute()
useSeo()
</script>
