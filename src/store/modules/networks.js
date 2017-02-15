import Vue from 'vue'
import * as types from '../mutation-types'

// initial state
const state = {
  networks: [],
  network: {}
}

// getters
const getters = {
  allNetworks: state => state.networks,
  byIdNetwork: state => state.network
}
// actions
const actions = {
  getAllNetworks({commit}) {
    Vue.axios.get('/networks')
      .then((response) => {
        commit(types.SET_NETWORKS, response.data)
      }).catch((err) => console.log(err))
  },
  getNetworkById({commit}, id) {
    Vue.axios.get('/networks/'+id)
      .then((response) => {
        commit(types.SET_NETWORK, response.data)
      }).catch((err) => console.log(err))
  }
}

// mutations
const mutations = {
  [types.SET_NETWORKS](state, networks) {
    state.networks = networks
  },
  [types.SET_NETWORK](state, network) {
    state.network = network
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
