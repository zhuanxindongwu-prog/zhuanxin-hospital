<script setup>
const services = [
  {
    title: '心臟超音波檢查',
    desc: '評估心臟大小、瓣膜疾病與功能'
  },
  {
    title: '心律不整診斷',
    desc: 'ECG與Holter檢測心跳異常'
  },
  {
    title: '心臟病治療',
    desc: '個別化藥物與長期追蹤管理'
  }
]
</script>

<template>
  <section id="services" class="py-5 bg-light">
    <div class="container">

      <h2 class="section-title text-center mb-5">專科服務</h2>

      <div class="row g-4">

        <div
          v-for="s in services"
          :key="s.title"
          class="col-md-4"
        >
          <div class="card service-card p-4">
            <h4>{{ s.title }}</h4>
            <p>{{ s.desc }}</p>
          </div>
        </div>

      </div>

    </div>
  </section>
</template>

<style scoped>
.service-card {
  border: none;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  transition: 0.3s;
}

.service-card:hover {
  transform: translateY(-5px);
}
</style>