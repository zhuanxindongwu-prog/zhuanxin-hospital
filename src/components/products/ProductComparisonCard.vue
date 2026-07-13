<template>
  <article
    class="product-comparison-card"
    :class="`product-comparison-card--${product.theme}`"
  >
    <header class="product-heading">
      <p class="product-label">{{ product.label }}</p>
      <h2>{{ product.title }}</h2>
    </header>

    <div class="product-image-stage">
      <img
        :src="product.image"
        :alt="product.alt"
        :width="product.width"
        :height="product.height"
        loading="eager"
        decoding="async"
      />
    </div>

    <p class="product-description">{{ product.description }}</p>

    <dl class="product-facts">
      <div v-for="fact in product.facts" :key="fact.label">
        <dt>{{ fact.label }}</dt>
        <dd>{{ fact.value }}</dd>
      </div>
    </dl>

    <RouterLink
      :to="product.link"
      class="product-detail-link"
      :aria-label="`查看 ${product.title} 產品詳情`"
    >
      查看產品詳情
      <i class="bi bi-arrow-right" aria-hidden="true"></i>
    </RouterLink>
  </article>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.product-comparison-card {
  display: flex;
  min-width: 0;
  height: 100%;
  flex-direction: column;
  padding: clamp(1.5rem, 2.5vw, 2rem);
  background: #fff;
}

.product-heading {
  min-height: 64px;
}

.product-label {
  margin: 0 0 0.55rem;
  color: var(--brand-secondary);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0;
}

.product-heading h2 {
  margin: 0;
  color: var(--brand-ink);
  font-size: clamp(2rem, 3.3vw, 3.25rem);
  font-weight: 900;
  line-height: 1.08;
  letter-spacing: 0;
  overflow-wrap: anywhere;
}

.product-image-stage {
  display: grid;
  width: 100%;
  aspect-ratio: 16 / 9;
  margin: 0.75rem 0 1rem;
  overflow: hidden;
  place-items: center;
  border-radius: 6px;
  background: #eef4f4;
}

.product-comparison-card--likewater .product-image-stage {
  background: #f4f7f1;
}

.product-image-stage img {
  display: block;
  width: min(84%, 520px);
  height: 84%;
  object-fit: contain;
  transition: transform 180ms ease;
}

.product-comparison-card--likewater .product-image-stage img {
  width: min(88%, 560px);
  height: 88%;
}

.product-description {
  margin: 0;
  color: var(--brand-muted);
  font-size: 1rem;
  line-height: 1.8;
}

.product-facts {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin: 0.9rem 0 1rem;
  border-top: 1px solid var(--brand-line);
  border-bottom: 1px solid var(--brand-line);
}

.product-facts > div {
  padding: 0.7rem 0.75rem;
}

.product-facts > div + div {
  border-left: 1px solid var(--brand-line);
}

.product-facts dt {
  margin-bottom: 0.2rem;
  color: var(--brand-secondary);
  font-size: 0.82rem;
  font-weight: 800;
}

.product-facts dd {
  margin: 0;
  color: var(--brand-ink);
  font-weight: 700;
  overflow-wrap: anywhere;
}

.product-detail-link {
  display: inline-flex;
  width: 100%;
  min-height: 48px;
  align-items: center;
  justify-content: center;
  gap: 0.65rem;
  margin-top: auto;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  background: var(--brand-secondary);
  color: #fff;
  font-weight: 800;
  text-decoration: none;
  transition: background-color 180ms ease, transform 180ms ease;
}

.product-detail-link:hover {
  background: var(--brand-secondary-dark);
  transform: translateY(-2px);
}

.product-detail-link:focus-visible {
  outline: 3px solid rgba(105, 150, 74, 0.42);
  outline-offset: 3px;
}

@media (max-width: 767.98px) {
  .product-comparison-card {
    padding: 1.35rem 0;
  }

  .product-heading {
    min-height: 0;
  }

  .product-heading h2 {
    font-size: clamp(2rem, 10vw, 2.65rem);
  }

  .product-image-stage {
    aspect-ratio: 4 / 3;
    margin-block: 1rem 1.2rem;
  }

  .product-facts > div {
    padding-inline: 0;
  }

  .product-facts {
    grid-template-columns: 1fr;
  }

  .product-facts > div + div {
    border-top: 1px solid var(--brand-line);
    border-left: 0;
  }

  .product-detail-link {
    min-height: 48px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .product-image-stage img,
  .product-detail-link {
    transition: none;
  }
}
</style>
