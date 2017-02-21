import Vue from 'vue'
import * as types from '../mutation-types'
import * as info from '../default-messages'

// initial state
const state = {
  servers: [],
  server: {}
}

// getters
const getters = {
  allServers: state => state.servers,
  byIdServer: state => state.server
}
// actions
const actions = {
  getAllServers({
    commit
  }) {
    Vue.axios.get('/servers')
      .then((response) => {
        commit(types.SET_SERVERS, response.data)
      }).catch((err) => console.log(err))
  },
  getServerById({
    commit
  }, id) {
    Vue.axios.get('/servers/' + id)
      .then((response) => {
        var server = response.data
        Vue.axios.get('/images/' + server.imageId)
          .then((response) => {
            server.image = response.data
            commit(types.SET_SERVER, server)
          }).catch((err) => console.log(err))
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
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
