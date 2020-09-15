import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('./../views/login/login')
  },
  {
    path: '/',
    redirect: '/home',
    component: () => import('./../views/layout/index'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('./../views/home/home')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('./../views/my/my')
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('./../views/qa/qa')
      },
      {
        path: '/video',
        name: 'VideoIndex',
        component: () => import('./../views/video/video')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
