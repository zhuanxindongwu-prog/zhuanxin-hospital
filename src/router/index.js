import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import PostArticle from '../components/PostArticle.vue'
import PostArticle_2 from '../components/PostArticle_2.vue'
import PostArticle_3 from '../components/PostArticle_3.vue'
import DoctorDetil from '../components/DoctorDetil.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/post-article', component: PostArticle },
  { path: '/post-article-2', component: PostArticle_2},
  { path: '/post-article-3', component: PostArticle_3},
  { path: '/doctor/:id',component: DoctorDetil}


]

export default createRouter({
  history: createWebHistory(),
  routes,

  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
})