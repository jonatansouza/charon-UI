import Vue from 'vue'
import * as types from '../mutation-types'

// initial state
const state = {
  volumes: [],
  volume: {},
  types: [],
  type: {}
}

// getters
const getters = {
  allVolumes: state => state.volumes,
  byIdVolume: state => state.volume,
  allTypes: state => state.types,
  byIdType: state => state.type
}
// actions
const actions = {
  getAllVolumes({commit}) {
    Vue.axios.get('/volumes')
      .then((response) => {
        commit(types.SET_VOLUMES, response.data)
        commit(types.ACTION_SUCCESS)
      }).catch((err) => {
        console.log(err);
        commit(types.ACTION_FAILURE);
      });
  },
  getVolumeById({commit}, id) {
    Vue.axios.get('/volumes/'+id)
      .then((response) => {
        commit(types.SET_VOLUME, response.data)
      }).catch((err) => console.log(err))
  },
  getAllTypes({commit}) {
    Vue.axios.get('/types')
      .then((response) => {
        commit(types.SET_TYPES, response.data)
      }).catch((err) => {
        console.log(err);
      });
  },
  getTypeById({commit}, id) {
    Vue.axios.get('/types/'+id)
      .then((response) => {
        commit(types.SET_TYPE, response.data)
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
  },
  [types.SET_TYPES](state, types) {
    state.types = types
  },
  [types.SET_TYPE](state, type) {
    state.type = type
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
