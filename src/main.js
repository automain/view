import Vue from 'vue';
import ElementUI from 'element-ui';
import axios from "axios";
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.min.css';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import local from "@/local";
import session from "@/session";
import moment from 'moment';

Vue.config.productionTip = false;

Vue.use(ElementUI);

Vue.prototype.$local = local;
Vue.prototype.$session = session;
Vue.prototype.$moment = moment;
let axiosObj = axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:8081/web' : '/web',
    method: 'post',
    timeout: 60000,
    maxContentLength: Infinity,
    loading: true,
    withCredentials: true,
    headers: {'Content-Type': 'application/json;charset=UTF-8'}
});
axiosObj.interceptors.request.use(function (config) {
    config.headers['Authorization'] = session.get('Authorization');
    return config;
}, function (error) {
    return Promise.reject(error);
});
axiosObj.interceptors.response.use(function (response) {
    let authorization = response.headers.authorization;
    if (authorization) {
        session.set('Authorization', authorization);
    }
    if (response.data.status === 403) {
        Vue.prototype.$message.error(response.data.message);
        return Promise.reject(response.data.message);
    }
    return response;
}, function (error) {
    return Promise.reject(error);
});
Vue.prototype.$axios = axiosObj;
Vue.mixin({
    methods: {
        download(response) {
            let contentDisposition = response.headers['content-disposition'];
            let fileName = contentDisposition ? contentDisposition.split("\"")[1] : "undefined";
            let blob = new Blob([response.data]);
            let downloadElement = document.createElement('a');
            let href = window.URL.createObjectURL(blob);
            downloadElement.href = href;
            downloadElement.download = fileName;
            document.body.appendChild(downloadElement);
            downloadElement.click();
            document.body.removeChild(downloadElement);
            window.URL.revokeObjectURL(href);
        },
        commonDateFormatter(timestamp, format = 'YYYY-MM-DD HH:mm:ss') {
            if (timestamp === undefined || timestamp == null) {
                return "";
            }
            return moment(timestamp * 1000).format(format);
        },
        dateTimeFormatter(row, column) {
            return this.commonDateFormatter(row[column.property]);
        },
        dateFormatter(row, column) {
            return this.commonDateFormatter(row[column.property], "YYYY-MM-DD");
        },
        isValidFormatter(row, column) {
            return row[column.property] === 1 ? "是" : "否";
        },
        getDictionaryMap(key, text) {
            let map = session.getMap("dictionaryMap").get(key);
            let select = [];
            if (text) {
                select.push({value: "", text: text});
            }
            map.forEach(function (t, v, o) {
                select.push({value: v, text: t});
            });
            return select;
        }
    }
});
Vue.filter('dateTimeFilter', function (timestamp, format = 'YYYY-MM-DD HH:mm:ss') {
    if (timestamp === undefined || timestamp == null) {
        return "";
    }
    return moment(timestamp * 1000).format(format);
});
Vue.filter('dictionaryFilter', function (key, tableColumnKey) {
    let dictionary = session.getMap("dictionaryMap").get(tableColumnKey);
    return dictionary ? dictionary.get(key) : "";
});
new Vue({
    el: '#app',
    router,
    store,
    render: function (h) {
        return h(App)
    }
});
