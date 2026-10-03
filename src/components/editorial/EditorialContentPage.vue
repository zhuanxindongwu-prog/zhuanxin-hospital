<template>
  <main class="ed-page editorial-brand" :class="{ 'ed-page--topic': page.type === 'topic' }" id="main-content">
    <div class="ed-content-wrap">
      <div class="ed-page-meta">
        <RouterLink to="/"><span aria-hidden="true">←</span> 返回首頁</RouterLink>
        <span>{{ page.type === 'topic' ? '疾病指南' : '專科服務' }}</span>
      </div>

      <section class="ed-hero" aria-labelledby="page-title">
        <div class="ed-hero-copy">
          <p class="ed-eyebrow">{{ page.eyebrow }}</p>
          <h1 id="page-title">{{ page.title }}</h1>
          <p class="ed-summary">{{ page.summary }}</p>
          <div class="ed-actions">
            <a :href="phoneHref" class="ed-primary">電話洽詢 <span aria-hidden="true">↗</span></a>
            <RouterLink to="/doctor/hung-rong-wei">查看專業團隊 <span aria-hidden="true">→</span></RouterLink>
          </div>
        </div>
        <figure v-if="page.image" class="ed-hero-figure">
          <img :src="page.image" :alt="page.title" :width="imageSize[0]" :height="imageSize[1]"
            loading="eager" fetchpriority="high" decoding="async" />
          <figcaption v-if="page.imageCaption">{{ page.imageCaption }}</figcaption>
        </figure>
      </section>

      <ul v-if="page.highlights?.length" class="ed-highlights" aria-label="重點摘要">
        <li v-for="(highlight, index) in page.highlights" :key="highlight">
          <span aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
          <p>{{ highlight }}</p>
        </li>
      </ul>

      <div class="ed-reading-layout">
        <nav v-if="page.sections?.length || page.faqs?.length || page.sources?.length" class="ed-toc" aria-label="本頁目錄">
          <p class="ed-eyebrow">ON THIS PAGE</p>
          <h2>本頁導覽</h2>
          <ol>
            <li v-for="(section, index) in page.sections" :key="index">
              <a :href="'#section-' + (index + 1)"><span aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>{{ section.title }}</a>
            </li>
            <li v-if="page.faqs?.length"><a href="#page-faq">常見問題</a></li>
            <li v-if="page.sources?.length"><a href="#page-references">參考來源</a></li>
          </ol>
        </nav>

        <article class="ed-article">
          <section v-for="(section, index) in page.sections" :key="index" :id="'section-' + (index + 1)" class="ed-section">
            <p class="ed-section-number" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</p>
            <h2>{{ section.title }}</h2>
            <p v-for="paragraph in section.paragraphs" :key="paragraph">{{ paragraph }}</p>
          </section>

          <section v-if="page.faqs?.length" id="page-faq" class="ed-faq ed-section">
            <p class="ed-eyebrow">FREQUENTLY ASKED QUESTIONS</p>
            <h2>常見問題</h2>
            <details v-for="faq in page.faqs" :key="faq.question">
              <summary>{{ faq.question }}<span aria-hidden="true" class="ed-faq-sign"></span></summary>
              <p>{{ faq.answer }}</p>
            </details>
          </section>

          <section v-if="page.sources?.length" id="page-references" class="ed-references ed-section">
            <p class="ed-eyebrow">REFERENCES</p>
            <h2>參考來源</h2>
            <ol>
              <li v-for="source in page.sources" :key="source.url">
                <a :href="source.url" target="_blank" rel="noopener noreferrer">{{ source.title }} <span aria-hidden="true">↗</span></a>
                <p>{{ source.publisher }} · {{ source.date }}</p>
              </li>
            </ol>
          </section>
        </article>

        <aside v-if="page.relatedLinks?.length" class="ed-related" aria-labelledby="related-title">
          <p class="ed-eyebrow">CONTINUE READING</p>
          <h2 id="related-title">延伸閱讀</h2>
          <RouterLink v-for="link in page.relatedLinks" :key="link.path" :to="link.path">
            <small>{{ link.label }}</small>
            <span>{{ link.title }} <span aria-hidden="true">↗</span></span>
          </RouterLink>
        </aside>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { phoneHref } from '../../siteContact'

const props = defineProps({ page: { type: Object, required: true } })
// Intrinsic dimensions of the existing supplied images reserve their original aspect ratios.
const imageDimensions = {
  '/imgs/all.webp': [2560, 1932],
  '/imgs/DRLEE.webp': [776, 583],
  '/imgs/optimized/毛孩的心臟.webp': [1280, 853],
  '/imgs/optimized/converted_image_2.webp': [810, 592]
}
const imageSize = computed(() => imageDimensions[props.page.image] || [1400, 933])
</script>

<style scoped src="./content-page.css"></style>
