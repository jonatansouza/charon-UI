import Vue from 'vue'
import * as types from '../mutation-types'
import * as info from '../default-messages'

// initial state
const state = {
  actionStatus: {}
}

// getters
const getters = {
  actionStatus: state => state.actionStatus
}
// actions
const actions = {
  actionFailure({
    commit
  }, msg) {
    commit(types.ACTION_FAILURE, msg)
  },
  actionSuccess({
    commit
  }, msg) {
    commit(types.ACTION_SUCCESS, msg)
  },
  actionReset({
    commit
  }){
    commit(types.ACTION_RESET)
  },actionWait({
    commit
  }){
    commit(types.ACTION_WAIT)
  }
}

// mutations
const mutations = {
  [types.ACTION_SUCCESS](state, msg) {
    state.actionStatus = {status: info.SUCCESS, msg: msg }
  },
  [types.ACTION_FAILURE](state, msg) {
    state.actionStatus = {status: info.FAILURE, msg: msg.response.data.result }
  },
  [types.ACTION_RESET](state) {
    state.actionStatus = {}
  },
  [types.ACTION_WAIT](state) {
    state.actionStatus = {status: info.WAIT, msg: "" }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
