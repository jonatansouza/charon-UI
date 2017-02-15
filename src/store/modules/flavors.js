import Vue from 'vue'
import * as types from '../mutation-types'

// initial state
const state = {
  flavors: [],
  flavor: {}
}

// getters
const getters = {
  allFlavors: state => state.flavors,
  byIdFlavor: state => state.flavor
}
// actions
const actions = {
  getAllFlavors({commit}) {
    Vue.axios.get('/flavors')
      .then((response) => {
        commit(types.SET_FLAVORS, response.data)
      }).catch((err) => console.log(err))
  },
  getFlavorById({commit}, id) {
    Vue.axios.get('/flavors/'+id)
      .then((response) => {
        commit(types.SET_FLAVOR, response.data)
      }).catch((err) => console.log(err))
  }
}

// mutations
const mutations = {
  [types.SET_FLAVORS](state, flavors) {
    state.flavors = flavors
  },
  [types.SET_FLAVOR](state, flavor) {
    state.flavor = flavor
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
