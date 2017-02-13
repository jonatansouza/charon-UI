import Vue from 'vue'
import Router from 'vue-router'
import Index from 'components/Index'
import Servers from 'components/Servers'
import Server from 'components/Server'
import Volumes from 'components/Volumes'
import Volume from 'components/Volume'
import Login from 'components/Login'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/servers',
      name: 'servers',
      component: Servers
    },
    {
      path: '/servers/:id',
      name: 'server',
      component: Server
    },
    {
      path: '/volumes',
      name: 'volumes',
      component: Volumes
    },
    {
      path: '/volumes/:id',
      name: 'volume',
      component: Volume
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }


  ]
})
