import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import index from '@/components/index'
import first from '@/LearnDirect/first'
import second from '@/LearnDirect/second'
import third from '@/LearnDirect/third'



const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

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
        },
        {
          path: '/third',
          name: 'third',
          component: third
        }
        
      ]
    }
  ]
})
