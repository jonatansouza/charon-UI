import Vue from 'vue'
import * as types from '../mutation-types'

// initial state
const state = {
  images: [],
  image: {}
}

// getters
const getters = {
  allImages: state => state.images,
  byIdImage: state => state.image
}
// actions
const actions = {
  getAllImages({commit}) {
    Vue.axios.get('/images')
      .then((response) => {
        commit(types.SET_IMAGES, response.data)
      }).catch((err) => console.log(err))
  },
  getImageById({commit}, id) {
    Vue.axios.get('/images/'+id)
      .then((response) => {
        commit(types.SET_IMAGE, response.data)
      }).catch((err) => console.log(err))
  }
}

// mutations
const mutations = {
  [types.SET_IMAGES](state, images) {
    state.images = images
  },
  [types.SET_IMAGE](state, image) {
    state.image = image
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
