import Vue from 'vue'
import * as types from '../mutation-types'

// initial state
const state = {
  limits: {}
}

// getters
const getters = {
  allLimits: state => state.limits,
}
// actions
const actions = {
  getAllLimits({commit}) {
    Vue.axios.get('/limits')
      .then((response) => {
        var limits = response.data.absolute;
        limits.maxDiskSize = 300;
        limits.totalDiskUsed = 80;
        commit(types.SET_LIMITS, limits)
      }).catch((err) => console.log(err))
  }
}

// mutations
const mutations = {
  [types.SET_LIMITS](state, limits) {
    state.limits = limits
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
