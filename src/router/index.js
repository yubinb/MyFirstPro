import Vue from 'vue'
import Router from 'vue-router'
import login from '@/viewPage/login'
import index from '@/components/index'
import userControl from '@/viewPage/userControl'
import second from '@/viewPage/second'
import third from '@/viewPage/third'



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
          path: '/userControl',
          name: 'userControl',
          component: userControl
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
