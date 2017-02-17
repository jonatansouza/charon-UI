import Vue from 'vue'
import * as types from '../mutation-types'

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
  },
  updateStateServer({
    commit
  }, server) {
    console.log(server);
    Vue.axios.post('/server/', server)
      .then((response) => {
        console.log(response);
      }).catch((err) => console.log(err))
  },
  deleteServer({
    commit
  }, id) {
    commit(types.ACTION_WAIT)
    Vue.axios.delete('/servers/' + id)
      .then((response) => {
        commit(types.DEL_SERVER, response.data)
        commit(types.ACTION_SUCCESS)
      }).catch((err) => {
        commit(types.ACTION_FAILURE)
      })
  },
  createServer({
    commit
  }, data) {
    commit(types.ACTION_WAIT)
    Vue.axios.post('/servers', data)
      .then((response) => {
        commit(types.SET_SERVERS, response.data)
        commit(types.ACTION_SUCCESS, response.data)
      }).catch((err) => {
        commit(types.ACTION_FAILURE, err)
      })
  },
  addFloatingIp({
    commit
  }, server) {
    console.log(server);
    Vue.axios.post('/server/ip', server)
      .then((response) => {
        console.log(response);
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
