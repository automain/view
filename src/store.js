import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        fullHeight: document.documentElement.clientHeight - 70
    },
    mutations: {
        setFullHeight(store, height) {
            this.state.fullHeight = height - 79;
        }
    },
    actions: {}
})
