import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/common/Layout'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: Layout },
    { path: '/about', component: () => import('@/components/About') }
  ]
})
