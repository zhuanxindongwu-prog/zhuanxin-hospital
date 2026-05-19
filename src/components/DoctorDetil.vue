<template>
    <main v-if="doctor" class="doctor-detail-page">
        <section class="doctor-hero">
            <div class="container">
                <div class="doctor-hero-grid">
                    <div class="doctor-photo-wrap">
                        <img :src="doctor.image" :alt="doctor.name" class="doctor-photo" />
                    </div>

                    <div class="doctor-hero-content">
                        <p class="doctor-role">{{ doctor.role }}</p>

                        <h1>{{ doctor.name }}</h1>

                        <h2>{{ doctor.title }}</h2>

                        <p class="doctor-intro">
                            {{ doctor.intro }}
                        </p>

                        <div v-if="doctor.specialties?.length" class="doctor-tags">
                            <span v-for="tag in doctor.specialties" :key="tag" class="doctor-tag">
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

                <button type="button" class="back-link" @click="backToDoctors">
                    ← 返回醫師團隊
                </button>
            </div>
        </section>
    </main>

    <main v-else class="doctor-not-found">
        <div class="container">
            <h1>找不到這位醫師</h1>

            <button type="button" class="back-link" @click="backToDoctors">
                ← 返回醫師團隊
            </button>
        </div>
    </main>
</template>

<script setup>
import { computed, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { doctors } from '../data/doctors'

const route = useRoute()
const router = useRouter()

const doctor = computed(() => {
    return doctors.find((item) => item.id === route.params.id)
})

const backToDoctors = async () => {
    await router.push('/')

    await nextTick()

    setTimeout(() => {
        const doctorsSection = document.getElementById('doctors')

        if (doctorsSection) {
            doctorsSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        }
    }, 100)
}
</script>

<style scoped>
.doctor-detail-page {
    background: #f8fafc;
}

.doctor-hero {
    padding: 6rem 0 5rem;
    background: linear-gradient(135deg, #203947, #2f4f5e);
    color: #fff;
}

.doctor-hero-grid {
    display: grid;
    grid-template-columns: minmax(280px, 520px) 1fr;
    gap: 4rem;
    align-items: center;
}

.doctor-photo-wrap {
    padding: 1.1rem;
    border-radius: 1.5rem;
    background: rgba(255, 255, 255, 0.15);
    box-shadow: 0 1.5rem 3rem rgba(0, 0, 0, 0.25);
}

.doctor-photo {
    width: 100%;
    display: block;
    border-radius: 1.2rem;
    object-fit: cover;
}

.doctor-role {
    margin-bottom: 1.2rem;
    color: #c8dfe7;
    font-size: 0.9rem;
    font-weight: 800;
    letter-spacing: 0.22em;
    text-transform: uppercase;
}

.doctor-hero-content h1 {
    margin-bottom: 1rem;
    font-size: clamp(2.5rem, 5vw, 4.5rem);
    font-weight: 900;
    line-height: 1.1;
}

.doctor-hero-content h2 {
    margin-bottom: 1.6rem;
    color: #d8e6eb;
    font-size: 1.35rem;
    font-weight: 800;
}

.doctor-intro {
    max-width: 620px;
    color: #eef6f8;
    font-size: 1.1rem;
    line-height: 1.9;
}

.doctor-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    margin-top: 2rem;
}

.doctor-tag {
    padding: 0.55rem 1rem;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.15);
    color: #fff;
    font-weight: 700;
}

.doctor-about {
    padding: 5rem 0;
    background: #fff;
}

.doctor-about h3 {
    margin-bottom: 1.5rem;
    color: #203947;
    font-size: 2rem;
    font-weight: 900;
}

.doctor-about p {
    max-width: 820px;
    color: #425466;
    font-size: 1.08rem;
    line-height: 1.9;
}

.back-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-top: 2rem;
    padding: 0.8rem 1.4rem;
    border: none;
    border-radius: 999px;
    background: #203947;
    color: #fff;
    font-weight: 800;
    text-decoration: none;
    cursor: pointer;
    transition: 0.25s ease;
}

.back-link:hover {
    background: #2f4f5e;
    transform: translateY(-2px);
}

.doctor-not-found {
    min-height: 60vh;
    padding: 8rem 0;
    background: #f8fafc;
}

.doctor-not-found h1 {
    color: #203947;
    font-weight: 900;
}

@media (max-width: 992px) {
    .doctor-hero-grid {
        grid-template-columns: 1fr;
        gap: 2.5rem;
    }

    .doctor-hero {
        padding: 4rem 0;
    }
}
</style>