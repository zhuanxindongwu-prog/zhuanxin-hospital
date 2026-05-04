<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { doctors } from '../data/doctors'

const route = useRoute()

const doctor = computed(() => {
    return doctors.find((item) => item.id === route.params.id)
})
</script>

<template>
    <main v-if="doctor" class="doctor-detail-page">
        <section class="doctor-hero">
            <div class="container">
                <div class="hero-grid">
                    <div class="hero-image-wrap">
                        <img :src="doctor.image" :alt="doctor.name" class="hero-image" />
                    </div>

                    <div class="hero-content">
                        <p class="doctor-role">{{ doctor.role }}</p>
                        <h1>{{ doctor.name }}</h1>
                        <h2>{{ doctor.title }}</h2>

                        <div v-if="doctor.award || doctor.awardZh" class="award-box">
                            <p v-if="doctor.award">{{ doctor.award }}</p>
                            <strong v-if="doctor.awardZh">{{ doctor.awardZh }}</strong>
                        </div>

                        <p class="intro">{{ doctor.intro }}</p>

                        <div class="tag-list">
                            <span v-for="tag in doctor.tags" :key="tag">
                                {{ tag }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="doctor-about">
            <div class="container">
                <h3>{{ doctor.aboutTitle }}</h3>

                <p v-for="paragraph in doctor.about" :key="paragraph">
                    {{ paragraph }}
                </p>

                <RouterLink to="/" class="back-link">
                    回到首頁
                </RouterLink>
            </div>
        </section>
    </main>

    <main v-else class="container py-5">
        <h1>找不到這位醫師</h1>
        <RouterLink to="/">回到首頁</RouterLink>
    </main>
</template>

<style scoped>
.doctor-detail-page {
    background: #f6f8fb;
    color: #102a43;
}

.doctor-hero {
    padding: 80px 0;
    background:
        linear-gradient(rgba(8, 43, 58, 0.82), rgba(8, 43, 58, 0.9)),
        url('/imgs/still-beating.webp') center / cover no-repeat;
    color: white;
}

.container {
    width: min(1120px, 90%);
    margin: 0 auto;
}

.hero-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 56px;
    align-items: center;
}

.hero-image-wrap {
    padding: 18px;
    border-radius: 28px;
    background: rgba(255, 255, 255, 0.16);
    box-shadow: 0 24px 70px rgba(0, 0, 0, 0.28);
}

.hero-image {
    width: 100%;
    max-height: 720px;
    object-fit: cover;
    border-radius: 22px;
    display: block;
}

.doctor-role {
    letter-spacing: 0.18em;
    text-transform: uppercase;
    font-size: 0.85rem;
    font-weight: 700;
    color: #bde7ee;
    margin-bottom: 20px;
}

.hero-content h1 {
    font-size: clamp(2.5rem, 5vw, 5rem);
    font-weight: 800;
    margin-bottom: 12px;
}

.hero-content h2 {
    font-size: 1.5rem;
    color: #d7eef2;
    margin-bottom: 24px;
}

.award-box {
    padding: 18px 22px;
    border-left: 4px solid #d6aa48;
    background: rgba(255, 255, 255, 0.12);
    border-radius: 14px;
    margin-bottom: 28px;
}

.award-box p {
    margin-bottom: 4px;
}

.intro {
    font-size: 1.1rem;
    line-height: 1.9;
    color: #eef7f8;
}

.tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 28px;
}

.tag-list span {
    padding: 8px 14px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.16);
    color: white;
    font-weight: 600;
}

.doctor-about {
    padding: 72px 0;
    background: white;
}

.doctor-about h3 {
    font-size: 2rem;
    font-weight: 800;
    margin-bottom: 28px;
}

.doctor-about p {
    font-size: 1.1rem;
    line-height: 2;
    color: #34495e;
    margin-bottom: 18px;
}

.back-link {
    display: inline-block;
    margin-top: 28px;
    text-decoration: none;
    color: white;
    background: #123a5a;
    padding: 12px 24px;
    border-radius: 999px;
}

.back-link:hover {
    background: #0b2a42;
}

@media (max-width: 768px) {
    .hero-grid {
        grid-template-columns: 1fr;
    }

    .doctor-hero {
        padding: 48px 0;
    }
}
</style>