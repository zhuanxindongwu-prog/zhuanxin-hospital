<template>
  <section v-if="article" class="article-overview" aria-label="文章摘要與內容資訊">
    <component v-for="(item, index) in items" :key="index" :is="item.tag">
      <a v-if="item.href" :href="item.href">{{ item.text }}</a>
      <template v-else>{{ item.text }}</template>
    </component>
    <details v-if="showOutline && outline.length > 1" class="article-outline">
      <summary>本文導覽</summary>
      <nav aria-label="本文導覽">
        <ol>
          <li v-for="item in outline" :key="item.id"><a :href="'#' + item.id">{{ item.title }}</a></li>
        </ol>
      </nav>
    </details>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getSearchArticle, getArticleOverviewItems, getArticleOutline } from '../data/searchArticles.js'

const props = defineProps({ showSummary: { type: Boolean, default: true }, showMetadata: { type: Boolean, default: true }, showOutline: { type: Boolean, default: true } })
const route = useRoute()
const article = computed(() => getSearchArticle(route.path))
const items = computed(() => getArticleOverviewItems(article.value, { summary: props.showSummary, metadata: props.showMetadata }))
const outline = computed(() => getArticleOutline(article.value))
</script>

<style scoped>
.article-overview { margin-block: 1.25rem; padding: 1rem 0; border-block: 1px solid currentColor; color: inherit; }
.article-overview h2 { margin: 0 0 .6rem; font: inherit; font-size: 1rem; font-weight: 700; }
.article-overview p { margin: 0 0 .45rem; font-size: .875rem; line-height: 1.9; overflow-wrap: anywhere; }
.article-overview a { color: inherit; text-decoration: underline; text-underline-offset: .22em; }
.article-overview a:focus-visible, .article-outline summary:focus-visible { outline: 2px solid currentColor; outline-offset: 4px; }
.article-outline summary { cursor: pointer; min-height: 44px; padding-block: .6rem; font-size: .875rem; font-weight: 600; }
.article-outline ol { margin: .5rem 0; padding-left: 1.4rem; }
.article-outline a { display: inline-block; padding-block: .5rem; font-size: .875rem; line-height: 1.7; }
:global([id^="section-"]), :global(#page-faq), :global(#page-references) { scroll-margin-top: 110px; }
</style>
