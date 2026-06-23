<template>
  <aside v-if="article" class="article-trust-panel" aria-label="文章審閱與參考來源">
    <div class="trust-review">
      <p class="trust-label">Medical Review</p>
      <h2>醫療內容審閱與更新資訊</h2>
      <p>
        本文由
        <RouterLink :to="article.reviewer.path">{{ article.reviewer.name }}｜{{ article.reviewer.title }}</RouterLink>
        審閱，內容用於飼主衛教，不能取代獸醫師診斷。
      </p>
      <dl>
        <div>
          <dt>發布日期</dt>
          <dd>{{ article.publishedDate }}</dd>
        </div>
        <div>
          <dt>最後更新</dt>
          <dd>{{ article.modifiedDate }}</dd>
        </div>
      </dl>
    </div>

    <div class="trust-sources">
      <p class="trust-label">References</p>
      <h2>參考來源</h2>
      <ol>
        <li v-for="source in article.sources" :key="source.url">
          <a :href="source.url" target="_blank" rel="noopener noreferrer">
            <strong>{{ source.title }}</strong>
            <span>{{ source.publisher }} · {{ source.date }}</span>
          </a>
        </li>
      </ol>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { getStaticArticleSeo } from '../data/articleSeo'

const route = useRoute()
const article = computed(() => getStaticArticleSeo(route.path))
</script>

<style scoped>
.article-trust-panel {
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
  gap: 2rem;
  width: min(1120px, calc(100% - 32px));
  margin: 4rem auto;
  padding: 2rem;
  border: 1px solid #dce8e5;
  border-radius: 8px;
  background: #f7fbfa;
  color: #17322e;
}

.article-trust-panel h2 {
  margin: 0 0 1rem;
  font-size: 1.25rem;
  font-weight: 800;
}

.article-trust-panel p {
  line-height: 1.8;
}

.trust-label {
  margin-bottom: 0.5rem;
  color: #006b70;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
}

.trust-review a,
.trust-sources a {
  color: #004f53;
}

.trust-review dl {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
  margin: 1.5rem 0 0;
}

.trust-review dl div {
  padding-top: 0.75rem;
  border-top: 1px solid #dce8e5;
}

.trust-review dt {
  color: #647b77;
  font-size: 0.75rem;
}

.trust-review dd {
  margin: 0.2rem 0 0;
  font-weight: 700;
}

.trust-sources ol {
  display: grid;
  gap: 0.75rem;
  margin: 0;
  padding-left: 1.25rem;
}

.trust-sources a {
  display: grid;
  gap: 0.2rem;
  text-decoration: none;
}

.trust-sources a:hover {
  text-decoration: underline;
}

.trust-sources span {
  color: #647b77;
  font-size: 0.8rem;
}

@media (max-width: 768px) {
  .article-trust-panel {
    grid-template-columns: 1fr;
    padding: 1.25rem;
  }
}
</style>
