import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import index from '@/components/index'
import first from '@/LearnDirect/first'
import second from '@/LearnDirect/second'


Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/index',
      name: 'index',
      component: index,
      children: [
        {
          path: '/first',
          name: 'first',
          component: first
        },
        {
          path: '/second',
          name: 'second',
          component: second
        }
      ]
    }
  ]
})
