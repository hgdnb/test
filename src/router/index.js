import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index.js'
import AV from '@/api/AV'
import { Toast } from 'vant'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/warehouse'
  },
  {
    path: '/myHome',
    component: () => import('@/views/my/myHome'),
    meta: {
      title: '我的',
      keep_alive: true
    }
  },
  {
    path: '/account',
    component: () => import('@/views/my/account'),
    meta: {
      title: '账号安全',
      keep_alive: false
    }
  },
  {
    path: '/editInfo',
    component: () => import('@/views/my/editInfo'),
    meta: {
      title: '修改信息',
      keep_alive: false
    }
  },
  {
    path: '/upload',
    component: () => import('@/views/test/upload'),
    meta: {
      title: '上传题库',
      keep_alive: true
    }
  },
  {
    path: '/test',
    component: () => import('@/views/test/test'),
    meta: {
      title: '练习',
      keep_alive: false
    }
  },
  {
    path: '/testSet',
    component: () => import('@/views/test/testSet'),
    meta: {
      title: '设置题目',
      keep_alive: false
    }
  },
  {
    path: '/result',
    component: () => import('@/views/test/result'),
    meta: {
      title: '考试结果',
      keep_alive: false
    }
  },
  {
    path: '/mistake',
    component: () => import('@/views/test/mistake'),
    meta: {
      title: '错题',
      keep_alive: true
    }
  },
  {
    path: '/myWarehouse',
    component: () => import('@/views/warehouse/myWarehouse'),
    meta: {
      title: '我的仓库',
      keep_alive: true
    }
  },
  {
    path: '/warehouse',
    component: () => import('@/views/warehouse/warehouse'),
    meta: {
      title: '题库广场',
      keep_alive: true
    }
  },
  {
    path: '/login',
    component: () => import('@/views/login/login'),
    meta: {
      title: '登录',
      keep_alive: false
    }
  },
  {
    path: '/register',
    component: () => import('@/views/login/register'),
    meta: {
      title: '注册',
      keep_alive: false
    }
  },
  {
    path: '/question',
    component: () => import('@/views/explain/question'),
    meta: {
      title: '常见问题',
      keep_alive: false
    }
  }
]

const router = new VueRouter({
  routes
})

const needLogin = new Set([
  '/myHome',
  '/account',
  '/myWarehouse',
  '/editInfo',
  '/upload'
])

// 路由前置守卫
router.beforeEach((to, from, next) => {
  store.commit('isLoading', true) // loading组件显示
  if (needLogin.has(to.path)) {
    if (AV.User.current() === null) {
      next('/login')
      store.commit('isLoading', false)
    } else {
      next()
      store.commit('isLoading', false)
    }
  } else if (!window.sessionStorage.getItem('excelJson') && to.path === '/testSet') {
    next('/upload')
    Toast('您还没有选中题库，请先选择题库再做题哟！')
    store.commit('isLoading', false)
  } else {
    next()
  }
})

// 路由后置守卫
router.afterEach((to, from, next) => {
  window.scroll(0, 0) // 滚动条回到页面顶部
  store.commit('isLoading', false) // loading组件消失
})
export default router
