import Vue from 'vue'
import Vuex from 'vuex'
import servers from './modules/servers'
import volumes from './modules/volumes'
import images from './modules/images'
import networks from './modules/networks'
import flavors from './modules/flavors'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    servers, volumes, images, networks, flavors
  }
})
