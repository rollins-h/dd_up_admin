import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/subject',
    component: Layout,
    redirect: '/subject/list',
    name: '题目管理',
    meta: { title: '题目管理', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '题目组列表',
        component: () => import('@/views/subject/list'),
        meta: { title: '题目组列表'}
      }
    ]
  },

  //用户管理
  {
    path: '/customer',
    component: Layout,
    redirect: '/customer/list',
    name: '用户管理',
    meta: { title: '用户管理', icon: 'peoples' },
    children: [
      {
        path: 'list',
        name: '用户列表',
        component: () => import('@/views/customer/list'),
        meta: { title: '用户列表',icon: 'example' }
      }
    ]
  },

  //积分管理
  {
    path: '/point',
    component: Layout,
    redirect: '/point/index',
    name: '积分管理',
    meta: { title: '积分管理', icon: 'example' },
    children: [
      {
        path: 'index',
        name: '积分日志',
        component: () => import('@/views/point/index'),
        meta: { title: '积分日志' }
      },{
        path: 'add',
        name: '积分充值',
        component: () => import('@/views/point/add'),
        meta: { title: '积分充值'}
      }
    ]
  },

    //指南管理
    {
      path: '/guide',
      component: Layout,
      redirect: '/guide/list',
      name: '指南管理',
      meta: { title: '指南管理', icon: 'example' },
      children: [
        {
          path: 'list',
          name: '指南列表',
          component: () => import('@/views/guide/list'),
          meta: { title: '指南列表' }
        },{
          path: 'form',
          name: '添加指南',
          component: () => import('@/views/guide/form'),
          meta: { title: '添加问题组', icon: 'tree' },
          hidden: true
        },
        {
          path: 'form/:id',   
          name: '编辑指南',
          component: () => import('@/views/guide/form'),
          meta: { title: '编辑指南', noCache: true },
          hidden: true
        },
      ]
    },

  //用户反馈
  {
    path: '/feedback',
    component: Layout,
    redirect: '/feedback/list',
    name: '用户反馈',
    meta: { title: '用户反馈', icon: 'example' },
    children: [
      {
        path: 'list',
        name: '反馈列表',
        component: () => import('@/views/feedback/list'),
        meta: { title: '反馈列表', icon: 'table' }
      }
    ]
  },
  
  {
    path: '/subject',
    hidden: true,
    redirect: '/subject/list',
    component: Layout,
    children: [
      {
        path: 'form',
        name: '添加问题组',
        component: () => import('@/views/subject/form'),
        meta: { title: '添加问题组', icon: 'tree' },
        hidden: true
      },
      {
        path: 'form/:id',   
        name: '编辑问题组',
        component: () => import('@/views/subject/form'),
        meta: { title: '编辑问题组', noCache: true },
        hidden: true
      },
      {
        path: 'detail/:id',   
        name: '问题组详情',
        component: () => import('@/views/subject/detail'),
        meta: { title: '问题组详情', noCache: true },
        hidden: true
      }
    ]
  },

  {
    path: '/question',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'form',
        name: '添加题目',
        component: () => import('@/views/question/form'),
        meta: { title: '添加题目', icon: 'tree' },
        hidden: true
      },
      {
        path: 'form/:id',   
        name: '编辑题目',
        component: () => import('@/views/question/form'),
        meta: { title: '编辑题目', noCache: true },
        hidden: true
      },
    ]
  },

  {
    path: '/login',
    component: Layout,
    redirect: '/login/index',
    name: '',
    meta: { title: '' },
    hidden: true,
    children: []
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
