<template>
  <div>

    <Hero />
    <Symptom />
    <News />
    <About />
    <Services />
    <Doctors />
    <TumorClinic />
    <Contact />

  </div>
</template>

<script setup>
import Hero from '../components/Hero.vue'
import Symptom from '../components/Symptom.vue'
import About from '../components/About.vue'
import Services from '../components/Services.vue'
import Doctors from '../components/Doctors.vue'
import Contact from '../components/Contact.vue'
import News from '../components/News.vue'
import TumorClinic from '../components/TumorClinic.vue'
import { useHead } from '@vueuse/head'

// 這段是什麼意思？ title Google 搜尋標題：
meta: [
  {
    name: 'description',
    content:
      '專心動物醫院專注於犬貓心臟疾病與腫瘤專科醫療，提供心臟超音波、心律不整診斷、慢性病管理與長期照護。'
  },

  {
    property: 'og:title',
    content:
      '專心動物醫院 CardioSpecial'
  },

  {
    property: 'og:description',
    content:
      '犬貓心臟專科與腫瘤專科醫療'
  },

  {
    property: 'og:type',
    content: 'website'
  },

  {
    property: 'og:image',
    content:
      'https://你的網域/imgs/og-cover.jpg'
  }
]
</script>