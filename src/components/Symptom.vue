<script setup>
import { ref } from 'vue'

const score = ref(0)

function clickSymptom() {
  score.value++
}
</script>

<template>
  <section class="py-5">
    <div class="container">

      <div class="highlight text-center">

        <h3 class="mb-4">你的毛孩有這些症狀嗎？</h3>

        <div class="row">

          <div class="col-md-4" @click="clickSymptom">
            🐶 容易喘或活動力下降
          </div>

          <div class="col-md-4" @click="clickSymptom">
            🐱 持續咳嗽或呼吸變快
          </div>

          <div class="col-md-4" @click="clickSymptom">
            ⚠️ 突然昏倒或虛弱
          </div>

        </div>

        <p class="mt-3">
          這些都可能與心臟疾病有關
        </p>

        <p>風險分數：{{ score }}</p>

      </div>

    </div>
  </section>
</template>

<style scoped>
.highlight {
  background: #eaf4ff;
  padding: 40px;
  border-radius: 12px;
  cursor: pointer;
}
</style>