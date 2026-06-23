<template>
    <main class="products-page">
        <section class="products-hero">
            <div class="container">
                <div class="hero-grid">
                    <div class="hero-copy">
                        <p class="eyebrow">Care, beyond the clinic</p>
                        <h1>把專業照護，延伸到每天的生活。</h1>
                        <p class="hero-lead">
                            專心動物醫院選擇能回應真實照護需求的產品，從居家健康趨勢到環境清潔，
                            讓診間之外的每一天，也有清楚、可信的照護依據。
                        </p>

                        <div class="hero-actions">
                            <a href="#product-collection" class="pill-button primary">
                                探索產品
                                <span aria-hidden="true"><i class="bi bi-arrow-down"></i></span>
                            </a>
                            <a href="tel:0223633016" class="pill-button secondary">
                                電話洽詢
                                <span aria-hidden="true"><i class="bi bi-telephone"></i></span>
                            </a>
                        </div>
                    </div>

                    <aside class="hero-index" aria-label="專心照護產品原則">
                        <p class="index-number">02</p>
                        <div>
                            <span>Selected care products</span>
                            <strong>不是更多選項，而是更清楚的照護方向。</strong>
                        </div>
                    </aside>
                </div>
            </div>
        </section>

        <section id="product-collection" class="product-collection">
            <div class="container">
                <div class="collection-heading">
                    <div>
                        <p class="eyebrow">Selected Collection</p>
                        <h2>依照照護場景選擇</h2>
                    </div>
                    <p>
                        每項產品都有明確用途與使用邊界；它們協助觀察與管理，不取代獸醫師診斷。
                    </p>
                </div>

                <div class="product-stack">
                    <RouterLink
                        v-for="(product, index) in products"
                        :key="product.title"
                        :to="product.link"
                        class="product-shell"
                        :class="{ reverse: index % 2 === 1 }"
                    >
                        <article class="product-core">
                            <div class="product-visual" :class="product.theme">
                                <span class="product-count">0{{ index + 1 }}</span>
                                <img
                                    :src="product.image"
                                    :alt="product.alt"
                                    loading="lazy"
                                    decoding="async"
                                />
                                <span class="product-status">{{ product.badge }}</span>
                            </div>

                            <div class="product-content">
                                <p class="eyebrow">{{ product.label }}</p>
                                <h2>{{ product.title }}</h2>
                                <p class="product-summary">{{ product.description }}</p>

                                <dl class="product-facts">
                                    <div v-for="fact in product.facts" :key="fact.label">
                                        <dt>{{ fact.label }}</dt>
                                        <dd>{{ fact.value }}</dd>
                                    </div>
                                </dl>

                                <span class="product-action">
                                    查看產品詳情
                                    <span aria-hidden="true"><i class="bi bi-arrow-up-right"></i></span>
                                </span>
                            </div>
                        </article>
                    </RouterLink>
                </div>
            </div>
        </section>

        <section class="care-framework">
            <div class="container">
                <div class="framework-grid">
                    <div class="framework-intro">
                        <p class="eyebrow">Clinical Framework</p>
                        <h2>產品，是照護流程的一部分。</h2>
                        <p>
                            合適的產品應該讓飼主更容易觀察、記錄與溝通，而不是增加不必要的焦慮。
                        </p>
                    </div>

                    <ol class="framework-list">
                        <li v-for="item in framework" :key="item.no">
                            <span>{{ item.no }}</span>
                            <div>
                                <h3>{{ item.title }}</h3>
                                <p>{{ item.text }}</p>
                            </div>
                        </li>
                    </ol>
                </div>
            </div>
        </section>

        <section class="care-reminder-section">
            <div class="container">
                <div class="care-reminder">
                    <div>
                        <p class="eyebrow">Care Reminder</p>
                        <h2>出現異常症狀，請優先安排醫療評估。</h2>
                        <p>若毛孩出現咳嗽、喘氣、昏倒、活動力下降或食慾異常，請直接與獸醫師聯繫。</p>
                    </div>
                    <a href="tel:0223633016" class="pill-button light">
                        02-2363-3016
                        <span aria-hidden="true"><i class="bi bi-telephone"></i></span>
                    </a>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup>
const products = [
    {
        label: 'Connected Health',
        title: 'PetVoice',
        badge: '智慧健康監測',
        theme: 'petvoice',
        image: '/imgs/optimized/petvoice.webp',
        alt: 'PetVoice 犬貓居家生理監測裝置',
        link: '/petvoice',
        description:
            '以輕量感測器持續整理心率、安靜時呼吸數、活動與睡眠趨勢，協助飼主與獸醫師看見回診之外的變化。',
        facts: [
            { label: '適合', value: '心臟病、高齡與慢性病犬貓' },
            { label: '核心價值', value: '居家趨勢觀察與長期紀錄' },
        ],
    },
    {
        label: 'Environmental Care',
        title: '賴瓦特 LikeWater',
        badge: '日常清潔輔助',
        theme: 'likewater',
        image: '/imgs/optimized/laiwate.webp',
        alt: '賴瓦特 LikeWater 寵物專用全效清潔防護液',
        link: '/ohtrust',
        description:
            '以安全性檢測為基礎的抗菌、除臭與環境清潔輔助產品，適用於犬貓生活空間與日常用品管理。',
        facts: [
            { label: '適合', value: '犬貓生活空間與日常用品' },
            { label: '核心價值', value: '清潔、除臭與環境管理' },
        ],
    },
]

const framework = [
    {
        no: '01',
        title: '先理解需求',
        text: '先釐清毛孩的疾病階段、生活環境與真正需要被改善的問題。',
    },
    {
        no: '02',
        title: '建立日常紀錄',
        text: '用容易持續的方法觀察變化，讓回診時的溝通更有依據。',
    },
    {
        no: '03',
        title: '異常時回到醫療',
        text: '產品只負責輔助；症狀、數據或生活狀態異常時，應由獸醫師評估。',
    },
]
</script>

<style scoped>
.products-page {
    --ink: #16312f;
    --muted: #5f707c;
    --teal: #006b70;
    --teal-dark: #004f53;
    --soft: #eef6f4;
    --line: rgba(0, 107, 112, 0.12);
    overflow-x: clip;
    background: #f7f9f9;
    color: var(--ink);
    text-align: left;
}

.products-page,
.products-page * {
    box-sizing: border-box;
    min-width: 0;
}

.products-hero {
    padding: 6rem 0 5.5rem;
    background:
        linear-gradient(120deg, rgba(255, 255, 255, 0.98), rgba(238, 246, 244, 0.92)),
        repeating-linear-gradient(90deg, rgba(0, 107, 112, 0.035) 0 1px, transparent 1px 96px);
}

.hero-grid,
.collection-heading,
.framework-grid {
    display: grid;
    grid-template-columns: minmax(0, 1.15fr) minmax(320px, 0.85fr);
    gap: 4rem;
    align-items: end;
}

.eyebrow {
    margin: 0 0 0.8rem;
    color: var(--teal);
    font-size: 0.78rem;
    font-weight: 900;
    text-transform: uppercase;
}

.hero-copy h1 {
    max-width: 850px;
    margin: 0;
    font-size: clamp(3.2rem, 7vw, 6rem);
    font-weight: 900;
    line-height: 1.04;
    overflow-wrap: anywhere;
}

.hero-lead {
    max-width: 700px;
    margin: 1.5rem 0 0;
    color: #3e5360;
    font-size: 1.12rem;
    line-height: 1.9;
}

.hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 0.85rem;
    margin-top: 2rem;
}

.pill-button,
.product-action {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    min-height: 52px;
    padding: 0.55rem 0.65rem 0.55rem 1.2rem;
    border-radius: 999px;
    color: inherit;
    font-weight: 900;
    text-decoration: none;
    transition:
        transform 0.6s cubic-bezier(0.32, 0.72, 0, 1),
        box-shadow 0.6s cubic-bezier(0.32, 0.72, 0, 1),
        background-color 0.6s cubic-bezier(0.32, 0.72, 0, 1);
}

.pill-button span,
.product-action span {
    display: grid;
    place-items: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
}

.pill-button.primary {
    background: var(--teal-dark);
    color: #fff;
    box-shadow: 0 16px 34px rgba(7, 84, 79, 0.2);
}

.pill-button.primary span {
    background: rgba(255, 255, 255, 0.14);
}

.pill-button.secondary {
    border: 1px solid var(--line);
    background: #fff;
}

.pill-button.secondary span {
    background: var(--soft);
    color: var(--teal);
}

.pill-button:hover,
.product-shell:hover .product-action {
    transform: translateY(-2px);
}

.hero-index {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 1.2rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--line);
}

.index-number {
    margin: 0;
    color: var(--teal);
    font-size: 3.6rem;
    font-weight: 900;
    line-height: 1;
}

.hero-index span,
.hero-index strong {
    display: block;
}

.hero-index span {
    color: var(--muted);
    font-size: 0.78rem;
    font-weight: 900;
    text-transform: uppercase;
}

.hero-index strong {
    margin-top: 0.4rem;
    font-size: 1.12rem;
    line-height: 1.55;
}

.product-collection {
    padding: 6rem 0;
}

.collection-heading {
    margin-bottom: 3rem;
}

.collection-heading h2,
.framework-intro h2,
.care-reminder h2 {
    margin: 0;
    font-size: clamp(2.4rem, 5vw, 4rem);
    font-weight: 900;
    line-height: 1.12;
}

.collection-heading > p,
.framework-intro > p:not(.eyebrow) {
    margin: 0;
    color: var(--muted);
    line-height: 1.85;
}

.product-stack {
    display: grid;
    gap: 2rem;
}

.product-shell {
    display: block;
    padding: 8px;
    border: 1px solid rgba(0, 107, 112, 0.08);
    border-radius: 16px;
    background: rgba(0, 107, 112, 0.04);
    color: inherit;
    text-decoration: none;
    transition:
        transform 0.7s cubic-bezier(0.32, 0.72, 0, 1),
        box-shadow 0.7s cubic-bezier(0.32, 0.72, 0, 1);
}

.product-shell:hover {
    transform: translateY(-5px);
    box-shadow: 0 28px 70px rgba(0, 107, 112, 0.1);
}

.product-core {
    display: grid;
    grid-template-columns: minmax(0, 1.15fr) minmax(360px, 0.85fr);
    min-height: 520px;
    overflow: hidden;
    border-radius: 10px;
    background: #fff;
    box-shadow: inset 0 1px rgba(255, 255, 255, 0.8);
}

.product-shell.reverse .product-visual {
    order: 2;
}

.product-visual {
    position: relative;
    display: grid;
    min-height: 520px;
    overflow: hidden;
    place-items: center;
    padding: 3rem;
}

.product-visual.petvoice {
    background: linear-gradient(135deg, #122a2c, #006b70);
}

.product-visual.likewater {
    background: #f2f8f8;
}

.product-visual img {
    width: min(92%, 680px);
    max-height: 420px;
    object-fit: contain;
    transition: transform 0.8s cubic-bezier(0.32, 0.72, 0, 1);
}

.product-shell:hover .product-visual img {
    transform: scale(1.035);
}

.product-count,
.product-status {
    position: absolute;
    z-index: 1;
    font-weight: 900;
}

.product-count {
    top: 1.4rem;
    left: 1.5rem;
    color: rgba(255, 255, 255, 0.62);
    font-size: 0.82rem;
}

.likewater .product-count {
    color: var(--teal);
}

.product-status {
    right: 1.5rem;
    bottom: 1.5rem;
    padding: 0.45rem 0.8rem;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.92);
    color: var(--teal-dark);
    font-size: 0.78rem;
    max-width: calc(100% - 3rem);
}

.product-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: clamp(2rem, 5vw, 4.5rem);
}

.product-content h2 {
    margin: 0;
    font-size: clamp(2.8rem, 5vw, 4.5rem);
    font-weight: 900;
    line-height: 1;
}

.product-summary {
    margin: 1.4rem 0 0;
    color: var(--muted);
    line-height: 1.9;
}

.product-facts {
    display: grid;
    gap: 0;
    margin: 2rem 0;
}

.product-facts div {
    display: grid;
    grid-template-columns: 90px 1fr;
    gap: 1rem;
    padding: 0.9rem 0;
    border-top: 1px solid var(--line);
}

.product-facts div:last-child {
    border-bottom: 1px solid var(--line);
}

.product-facts dt {
    color: var(--teal);
    font-size: 0.82rem;
    font-weight: 900;
}

.product-facts dd {
    margin: 0;
    color: #354b57;
    font-weight: 800;
}

.product-action {
    width: fit-content;
    margin-top: auto;
    background: var(--soft);
    color: var(--teal-dark);
}

.product-action span {
    background: #fff;
}

.care-framework {
    padding: 6rem 0;
    background: #edf5f3;
}

.framework-grid {
    align-items: start;
}

.framework-list {
    display: grid;
    gap: 0;
    margin: 0;
    padding: 0;
    list-style: none;
}

.framework-list li {
    display: grid;
    grid-template-columns: 50px 1fr;
    gap: 1rem;
    padding: 1.4rem 0;
    border-top: 1px solid var(--line);
}

.framework-list li:last-child {
    border-bottom: 1px solid var(--line);
}

.framework-list span {
    color: var(--teal);
    font-weight: 900;
}

.framework-list h3 {
    margin: 0;
    font-size: 1.15rem;
    font-weight: 900;
}

.framework-list p {
    margin: 0.45rem 0 0;
    color: var(--muted);
    line-height: 1.75;
}

.care-reminder-section {
    padding: 5rem 0;
}

.care-reminder {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    padding: clamp(2rem, 5vw, 4rem);
    border-radius: 16px;
    background: linear-gradient(135deg, #69964a, #006b70);
    color: #fff;
    box-shadow: 0 24px 60px rgba(0, 107, 112, 0.16);
}

.care-reminder .eyebrow {
    color: #8edbd5;
}

.care-reminder h2 {
    max-width: 780px;
    color: #fff;
}

.care-reminder p:not(.eyebrow) {
    max-width: 760px;
    margin: 1rem 0 0;
    color: #c9d6dc;
    line-height: 1.8;
}

.pill-button.light {
    flex: 0 0 auto;
    background: #fff;
    color: var(--ink);
}

.pill-button.light span {
    background: var(--soft);
    color: var(--teal);
}

@media (max-width: 992px) {
    .hero-grid,
    .collection-heading,
    .framework-grid,
    .product-core {
        grid-template-columns: 1fr;
        gap: 2rem;
    }

    .product-shell.reverse .product-visual {
        order: initial;
    }

    .product-visual,
    .product-core {
        min-height: auto;
    }

    .product-visual {
        min-height: 380px;
    }

    .care-reminder {
        align-items: flex-start;
        flex-direction: column;
    }
}

@media (max-width: 576px) {
    .products-page .container {
        width: 366px;
        max-width: calc(100% - 24px);
        margin-right: 12px;
        margin-left: 12px;
        padding-right: 12px;
        padding-left: 12px;
    }

    .products-hero,
    .product-collection,
    .care-framework,
    .care-reminder-section {
        padding: 4rem 0;
    }

    .products-hero {
        padding-top: 5.75rem;
    }

    .hero-grid {
        gap: 2.75rem;
    }

    .hero-copy h1 {
        font-size: 2.25rem;
        line-height: 1.16;
    }

    .hero-lead,
    .collection-heading > p,
    .framework-list p {
        overflow-wrap: anywhere;
    }

    .hero-index {
        grid-template-columns: 1fr;
    }

    .hero-actions,
    .pill-button {
        width: 100%;
    }

    .product-shell {
        padding: 5px;
        border-radius: 12px;
    }

    .product-core {
        border-radius: 8px;
    }

    .product-visual {
        min-height: 300px;
        padding: 2rem 1rem;
    }

    .product-content {
        padding: 1.6rem;
    }

    .product-content h2 {
        font-size: 2.5rem;
    }

    .product-facts div {
        grid-template-columns: 1fr;
        gap: 0.3rem;
    }

    .care-reminder {
        padding: 1.7rem;
        border-radius: 12px;
    }
}
</style>
