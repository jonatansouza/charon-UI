import Vue from 'vue'
import * as types from '../mutation-types'

// initial state
const state = {
  servers: [],
  server: {},
  addrs: []
}

// getters
const getters = {
  allServers: state => state.servers,
  byIdServer: state => state.server,
  addrsServer: state => state.addrs
}
// actions
const actions = {
  getAllServers({commit}) {
    Vue.axios.get('/servers')
      .then((response) => {
        commit(types.SET_SERVERS, response.data)
      }).catch((err) => console.log(err))
  },
  getServerById({commit}, id) {
    Vue.axios.get('/servers/'+id)
      .then((response) => {
        commit(types.SET_SERVER, response.data)
        commit(types.SET_ADDRS, response.data)
      }).catch((err) => console.log(err))
  },
  updateStateServer({commit}, server) {
    Vue.axios.get('/servers/'+id)
      .then((response) => {
        commit(types.SET_SERVER, response.data)
      }).catch((err) => console.log(err))
  },
  deleteServer({commit}, id){
    Vue.axios.delete('/servers/'+id)
      .then((response) => {
        commit(types.DEL_SERVER, response.data)
      }).catch((err) => console.log(err))
  }
}

// mutations
const mutations = {
  [types.SET_SERVERS](state, servers) {
    state.servers = servers
  },
  [types.SET_SERVER](state, server) {
    state.server = server
  },
  [types.SET_ADDRS](state, addrs) {
    state.addrs = addrs.addresses.private
  },
  [types.DEL_SERVER](state, id) {
    state.server = {}
  }

}

export default {
  state,
  getters,
  actions,
  mutations
}
