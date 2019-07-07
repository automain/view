import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/common/Layout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/', component: Layout,
      children: [
        { path: '/main', name: '首页', component: () => import('@/views/common/Main') },
        { path: '/tableTest', name: '表格', component: () => import('@/views/common/TableTest') },
        { path: '/crud', name: '增删改查', component: () => import('@/views/common/CRUD') },
      ]
    },

  ]
})
