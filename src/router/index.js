import { createRouter, createWebHistory } from 'vue-router'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/firebaseConfig'

import Home from '../pages/Home.vue'
import PostArticle from '../components/PostArticle.vue'
import PostArticle_2 from '../components/PostArticle_2.vue'
import PostArticle_3 from '../components/PostArticle_3.vue'
import DoctorDetil from '../components/DoctorDetil.vue'
import Products from '../components/Products.vue'
import Ohtrust from '../components/OHTrust.vue'
import AdminAppointments from '../components/AdminAppointments.vue'
import AdminLogin from '../components/AdminLogin.vue'
import Acticles from '../components/articles.vue'
import MediaArticle from '../components/MediaArticle.vue'

const routes = [
  {
    path: '/',
    component: Home,
    meta: {
      title: '專心動物醫院 CardioSpecial｜犬貓心臟專科與腫瘤門診',
      description:
        '專心動物醫院位於台北市中正區，專注犬貓心臟疾病與腫瘤專科醫療，提供心臟超音波、心律不整診斷、慢性病管理與長期照護。'
    }
  },
  {
    path: '/post-article',
    component: PostArticle,
    meta: {
      title: '狗狗 MMVD 二尖瓣心臟病：內科治療與外科手術怎麼選？｜專心動物醫院',
      description:
        '狗狗 MMVD 二尖瓣黏液樣變性該選擇內科治療或外科手術？從疾病分期、風險與照護目標了解適合的治療方向。',
      image: '/imgs/converted_image_2.png',
      type: 'article'
    }
  },
  {
    path: '/post-article-2',
    component: PostArticle_2,
    meta: {
      title: 'Still Beating：不曾停止的心跳｜專心動物醫院',
      description:
        '專心動物醫院累積近三十年的犬貓心臟醫療經驗，持續以臨床、研究與教育守護每一顆心。',
      image: '/imgs/converted_image.png',
      type: 'article'
    }
  },
  {
    path: '/post-article-3',
    component: PostArticle_3,
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
    component: DoctorDetil
  },
  {
    path: '/products',
    component: Products,
    meta: {
      title: '犬貓日常照護產品｜專心動物醫院',
      description:
        '專心動物醫院整理犬貓環境清潔、氣味管理與居家健康監測輔助產品，作為醫療之外的日常照護支援。'
    }
  },
  {
    path: '/ohtrust',
    component: Ohtrust,
    meta: {
      title: '賴瓦特 LikeWater 寵物專用全效清潔防護液｜專心動物醫院',
      description:
        '賴瓦特 LikeWater 寵物專用全效清潔防護液，適用犬貓生活空間與日常用品，作為溫和清潔、抗菌防護與除臭淨味輔助。',
      image: '/imgs/laiwate.jpg'
    }
  },
  {
    path: '/articles',
    component: Acticles,
    meta: {
      title: '專心快訊｜犬貓心臟病、腫瘤照護與醫療觀點',
      description:
        '閱讀專心動物醫院整理的犬貓心臟疾病、腫瘤照護、日常觀察與醫療觀點，掌握症狀與就醫時機。'
    }
  },
  {
    path: '/articles/media/:slug',
    name: 'mediaArticle',
    component: MediaArticle
  },

  {
    path: '/adminLogin',
    component: AdminLogin,
    meta: { noindex: true }
  },

  {
    path: '/adminAppointments',
    component: AdminAppointments,
    meta: { requiresAuth: true, noindex: true }
  },

  {
    path: '/pet-cpr-game',
    component: () => import('../components/PetCPRGame.vue'),
    meta: { noindex: true }
  },
  {
    path: '/post-mmvd-stage-c',
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
    title: 'PetVoice 犬貓居家健康監測｜專心動物醫院',
    description:
      'PetVoice 結合輕量感測器、居家同步裝置與手機 App，協助飼主掌握犬貓居家健康趨勢與異常訊號。',
    image: '/imgs/petvoice宣傳.png'
  }
  },
  {
  path: '/heart-pressure',
  name: 'HeartPressureArticle',
  component: () => import('../components/PostArticle_HeartPressure.vue'),
  meta: {
    title: '毛孩的心臟正在承受壓力嗎？犬貓心臟病警訊｜專心動物醫院',
    description:
      '從心雜音、咳嗽、喘、昏倒等訊號了解犬貓心臟壓力，認識心臟檢查與早期評估的重要性。',
    image: '/imgs/毛孩的心臟.png',
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
  scrollBehavior() {
    return { top: 0 }
  }
})

const getCurrentUser = () => {
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
