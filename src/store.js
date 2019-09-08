import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        fullHeight: document.documentElement.clientHeight - 70,
        dictionaryMap: null,
    },
    mutations: {
        setFullHeight(store, height) {
            this.state.fullHeight = height - 79;
        },
        setDictionaryMap(store, dictionaryList) {
            let dictionaryMap = new Map();
            for (let i = 0, size = dictionaryList.length; i < size; i++) {
                let dictionary = dictionaryList[i];
                let key = dictionary.tableName + "_" + dictionary.columnName;
                let dMap = dictionaryMap.get(key);
                if (!dMap) {
                    dMap = new Map();
                }
                dMap.set(dictionary.dictionaryKey, dictionary.dictionaryValue);
                dictionaryMap.set(key, dMap);
            }
            this.state.dictionaryMap = dictionaryMap;
        }
    },
    actions: {
        initDictionaryMap(context, axios) {
            if (!context.state.dictionaryMap) {
                axios.post("/dictionaryAll").then(response => {
                    let data = response.data;
                    if (data.status === 0) {
                        context.commit("setDictionaryMap", data.data);
                    }
                });
            }
        }
    }
})
