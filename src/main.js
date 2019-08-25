import Vue from 'vue';
import ElementUI from 'element-ui';
import axios from "axios";
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.min.css';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import moment from 'moment';

Vue.config.productionTip = false;

Vue.use(ElementUI);

Vue.prototype.$moment = moment;
Vue.prototype.$axios = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:8081/web' : '/',
  method: 'post',
  timeout: 60000,
  maxContentLength: Infinity,
  loading: true,
  withCredentials: true,
  headers: {'Content-Type': 'application/json;charset=UTF-8'}
});

Vue.mixin({
  methods: {
    commonFormat(timestamp, format = 'YYYY-MM-DD HH:mm:ss') {
      if (timestamp == undefined || timestamp == null) {
        return "";
      }
      return moment(timestamp).format(format);
    },
    formatDateTime(row, column) {
      return this.commonFormat(row[column.property]);
    },
    formatDate(row, column) {
      return this.commonFormat(row[column.property], "YYYY-MM-DD");
    }
  },
});
Vue.filter('dateTimeFilter', function (timestamp, format = 'YYYY-MM-DD HH:mm:ss') {
  if (timestamp == undefined || timestamp == null) {
    return "";
  }
  return moment(timestamp).format(format);
});
new Vue({
  el: '#app',
  router,
  store,
  render: function (h) { return h(App) }
})
