import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentSubMenuName:''
  },
  mutations: {
    setSubMenuName(state, name) {
      this.state.currentSubMenuName = name;
    },
  },
  actions: {

  }
})
