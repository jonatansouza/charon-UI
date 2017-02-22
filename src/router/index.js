import Vue from 'vue'
import Router from 'vue-router'
import Index from 'components/Index'
import Servers from 'components/Servers'
import Server from 'components/Server'
import Volumes from 'components/Volumes'
import Volume from 'components/Volume'
import Login from 'components/Login'
import CreateServer from 'components/CreateServer'
import CreateVolume from 'components/CreateVolume'


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
      path: '/create-server',
      name: 'createServer',
      component: CreateServer
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
      path: '/create-volume',
      name: 'createVolume',
      component: CreateVolume
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }


  ]
})
