import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    name: 'recommend',
    component: () => import(/* webpackChunkName: "recommend" */ '../components/recommend/recommend.vue'),
    children: [
      {
        path: ':id',
        component: () => import(/* webpackChunkName: "disc" */'../components/disc/disc.vue')
      }
    ]
  },
  {
    path: '/singer',
    name: 'singer',
    component: () => import(/* webpackChunkName: "singer" */ '../components/singer/singer.vue'),
    children: [
      {
        path: ':id',
        component: () => import(/* webpackChunkName: "singer-detail" */ '../components/singer-detail/singer-detail.vue')
      }
    ]
  },
  {
    path: '/rank',
    name: 'rank',
    component: () => import(/* webpackChunkName: "rank" */ '../components/rank/rank.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import(/* webpackChunkName: "search" */ '../components/search/search.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
