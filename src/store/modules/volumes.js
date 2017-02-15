import Vue from 'vue'
import * as types from '../mutation-types'

// initial state
const state = {
  volumes: [],
  volume: {}
}

// getters
const getters = {
  allVolumes: state => state.volumes,
  byIdVolume: state => state.volume
}
// actions
const actions = {
  getAllVolumes({commit}) {
    Vue.axios.get('/volumes')
      .then((response) => {
        commit(types.SET_VOLUMES, response.data)
      }).catch((err) => console.log(err))
  },
  getVolumeById({commit}, id) {
    Vue.axios.get('/volumes/'+id)
      .then((response) => {
        commit(types.SET_VOLUME, response.data)
      }).catch((err) => console.log(err))
  }
}

// mutations
const mutations = {
  [types.SET_VOLUMES](state, volumes) {
    state.volumes = volumes
  },
  [types.SET_VOLUME](state, volume) {
    state.volume = volume
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
