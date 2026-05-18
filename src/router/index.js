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
import Appointment from '../components/Appointment.vue'
import AdminAppointments from '../components/AdminAppointments.vue'
import AdminLogin from '../components/AdminLogin.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/post-article', component: PostArticle },
  { path: '/post-article-2', component: PostArticle_2 },
  { path: '/post-article-3', component: PostArticle_3 },
  { path: '/doctor/:id', component: DoctorDetil },
  { path: '/products', component: Products },
  { path: '/ohtrust', component: Ohtrust },
  { path: '/appointment', component: Appointment },

  {
    path: '/adminLogin',
    component: AdminLogin
  },

  {
    path: '/adminAppointments',
    component: AdminAppointments,
    meta: { requiresAuth: true }
  },

  {
    path: '/pet-cpr-game',
    component: () => import('../components/PetCPRGame.vue')
  },
  {
    path: '/post-mmvd-stage-c',
    component: () => import('../components/PostArticle_MMVD_StageC.vue')
  },
  {
    path: '/petvoice',
    component: () => import("../components/PetVoice.vue")
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

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth) {
    const user = await getCurrentUser()

    if (!user) {
      next('/adminLogin')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router