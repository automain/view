import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    openTab: [],//所有打开的路由
    activeIndex: '/main' //激活状态
  },
  mutations: {
    // 添加tabs
    add_tabs(state, data) {
      let contain = false;
      for (let option of state.openTab) {
        if (option.menuPath === data.menuPath) {
          contain = true;
          break;
        }
      }
      if (!contain){
        this.state.openTab.push(data);
      }
    },
    // 删除tabs
    delete_tabs(state, menuPath) {
      let index = 0;
      for (let option of state.openTab) {
        if (option.menuPath === menuPath) {
          break;
        }
        index++;
      }
      this.state.openTab.splice(index, 1);
    },
    // 设置当前激活的tab
    set_active_index(state, index) {
      this.state.activeIndex = index;
    },
  },
  actions: {

  }
})
