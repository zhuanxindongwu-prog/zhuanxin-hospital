import { createRouter, createWebHistory } from 'vue-router'
import { seoContentPages } from '../data/seoContentPages'
import { createScrollBehavior } from './scrollBehavior'

const seoContentRoutes = Object.values(seoContentPages).map((page) => ({
  path: page.path,
  component: () => import('../components/SeoContentPage.vue'),
  meta: {
    title: `${page.title}｜專心動物醫院`,
    description: page.description,
    image: page.image,
    type: page.type === 'topic' ? 'article' : 'website'
  }
}))

const routes = [
  ...seoContentRoutes,
  {
    path: '/',
    component: () => import('../pages/Home.vue'),
    meta: {
      title: '專心動物醫院｜犬貓心臟專科與腫瘤門診｜台北',
      description:
        '專心動物醫院位於台北市中正區，專注犬貓心臟疾病與腫瘤專科醫療，提供心臟超音波、心律不整診斷、慢性病管理與長期照護。'
    }
  },
  {
    path: '/articles/dog-mmvd-treatment-options',
    component: () => import('../components/PostArticle.vue'),
    meta: {
      title: '狗狗 MMVD 二尖瓣心臟病：內科治療與外科手術怎麼選？｜專心動物醫院',
      description:
        '狗狗 MMVD 二尖瓣黏液樣變性該選擇內科治療或外科手術？從疾病分期、風險與照護目標了解適合的治療方向。',
      image: '/imgs/optimized/converted_image_2.webp',
      type: 'article'
    }
  },
  {
    path: '/articles/still-beating-veterinary-cardiology',
    component: () => import('../components/PostArticle_2.vue'),
    meta: {
      title: 'Still Beating：不曾停止的心跳｜專心動物醫院',
      description:
        '專心動物醫院累積近三十年的犬貓心臟醫療經驗，持續以臨床、研究與教育守護每一顆心。',
      image: '/imgs/optimized/converted_image.webp',
      type: 'article'
    }
  },
  {
    path: '/articles/pet-heart-disease-warning-signs',
    component: () => import('../components/PostArticle_3.vue'),
    meta: {
      title: '飼主大會考答案解析｜犬貓心臟病常見警訊｜專心動物醫院',
      description:
        '整理犬貓心臟病常見症狀、呼吸速率、居家照護與就醫時機，幫助飼主掌握重要警訊。',
      image: '/imgs/dejiang.webp',
      type: 'article'
    }
  },
  {
    path: '/doctor/:id',
    name: 'doctor',
    component: () => import('../components/DoctorDetil.vue')
  },
  {
    path: '/products',
    component: () => import('../components/Products.vue'),
    meta: {
      title: '犬貓日常照護產品｜專心動物醫院',
      description:
        '專心動物醫院整理犬貓環境清潔、氣味管理與居家健康監測輔助產品，作為醫療之外的日常照護支援。'
    }
  },
  {
    path: '/taipei-zhongzheng-veterinary-hospital',
    component: () => import('../components/LocalVetPage.vue'),
    meta: {
      title: '台北中正區動物醫院｜犬貓心臟專科與腫瘤門診｜專心動物醫院',
      description:
        '專心動物醫院位於台北市中正區仁愛路一段，提供犬貓心臟專科、犬貓腫瘤門診、心臟超音波、心律不整診斷與慢性病長期追蹤。',
      image: '/imgs/all.webp'
    }
  },
  {
    path: '/ai-search-veterinary-cardiology',
    component: () => import('../components/AiSearchOptimizationPage.vue'),
    meta: {
      title: '犬貓心臟專科與腫瘤門診 AI 搜尋摘要｜專心動物醫院',
      description:
        '專心動物醫院 AI 搜尋摘要，整理台北中正區犬貓心臟專科、犬貓腫瘤門診、心臟超音波、心律不整與慢性病照護的核心事實、FAQ 與可信來源。',
      image: '/imgs/all.webp'
    }
  },
  {
    path: '/ohtrust',
    component: () => import('../components/OHTrust.vue'),
    meta: {
      title: '賴瓦特 LikeWater 寵物專用全效清潔防護液｜專心動物醫院',
      description:
        '賴瓦特 LikeWater 寵物專用全效清潔防護液，適用犬貓生活空間與日常用品，作為溫和清潔、抗菌防護與除臭淨味輔助。',
      image: '/imgs/optimized/laiwate.webp'
    }
  },
  {
    path: '/articles',
    component: () => import('../components/articles.vue'),
    meta: {
      title: '犬貓照護指南｜心臟病症狀、檢查與居家照護｜專心動物醫院',
      description:
        '專心動物醫院犬貓照護指南，依常見警訊、心臟檢查、心臟疾病、治療與居家監測分類，協助飼主掌握症狀與就醫時機。'
    }
  },
  {
    path: '/articles/media/:slug',
    name: 'mediaArticle',
    component: () => import('../components/MediaArticle.vue')
  },
  {
    path: '/petvoice-guide',
    component: () => import('../components/PetVoiceGuide.vue'),
    meta: {
      title: 'PetVoice 是什麼？犬貓居家生理監測完整指南｜專心動物醫院',
      description:
        '認識 PetVoice 犬貓居家生理監測，了解心率、安靜時呼吸數、活動與睡眠趨勢如何輔助心臟病與慢性病毛孩照護。',
      image: '/imgs/optimized/petvoice宣傳.webp',
      type: 'article'
    }
  },

  {
    path: '/adminLogin',
    component: () => import('../components/AdminLogin.vue'),
    meta: { noindex: true }
  },

  {
    path: '/adminAppointments',
    component: () => import('../components/AdminAppointments.vue'),
    meta: { requiresAuth: true, noindex: true }
  },

  {
    path: '/pet-cpr-game',
    component: () => import('../components/PetCPRGame.vue'),
    meta: { noindex: true }
  },
  {
    path: '/articles/dog-mmvd-stage-c-care',
    component: () => import('../components/PostArticle_MMVD_StageC.vue'),
    meta: {
      title: '狗狗 MMVD Stage C 心衰竭照護重點｜專心動物醫院',
      description:
        '狗狗進入 MMVD Stage C 後，穩定用藥、睡眠呼吸速率監測與定期追蹤非常重要。整理飼主需要掌握的照護重點。',
      type: 'article'
    }
  },
  {
  path: '/petvoice',
  component: () => import("../components/PetVoice.vue"),
  meta: {
    title: 'PetVoice 犬貓居家生理監測｜專心動物醫院',
    description:
      '專心動物醫院導入日本 PetVoice 犬貓居家生理監測系統，協助掌握心率、安靜時呼吸數、活動與睡眠等健康趨勢。',
    image: '/imgs/optimized/petvoice宣傳.webp'
  }
  },
  {
  path: '/articles/pet-heart-disease-screening',
  name: 'HeartPressureArticle',
  component: () => import('../components/PostArticle_HeartPressure.vue'),
  meta: {
    title: '毛孩的心臟正在承受壓力嗎？犬貓心臟病警訊｜專心動物醫院',
    description:
      '從心雜音、咳嗽、喘、昏倒等訊號了解犬貓心臟壓力，認識心臟檢查與早期評估的重要性。',
    image: '/imgs/optimized/毛孩的心臟.webp',
    type: 'article'
  }
  },
  {
  path: '/doctor-schedule',
  name: 'DoctorSchedule',
  component: () => import('../components/DoctorSchedule.vue'),
  meta: { noindex: true }
}
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: createScrollBehavior()
})

const getCurrentUser = async () => {
  const [{ onAuthStateChanged }, { auth }] = await Promise.all([
    import('firebase/auth'),
    import('../firebase/firebaseConfig')
  ])

  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      user => {
        unsubscribe()
        resolve(user)
      },
      reject
    )
  })
}

router.beforeEach(async (to) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth) {
    const user = await getCurrentUser()

    if (!user) {
      return '/adminLogin'
    }
  }
})

export default router
