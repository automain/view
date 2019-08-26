import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};
export default new Router({
    routes: [
        {
            path: '/', component: () => import('@/components/common/Layout'),
            children: [
                {path: '/main', name: '首页', component: () => import('@/views/common/Main')},
                {path: '/tableTest', name: '表格', component: () => import('@/views/common/TableTest')},
                {path: '/crud', name: '增删改查', component: () => import('@/views/common/CRUD')},
                {path: '/dev/generator', name: '生成器', component: () => import('@/views/common/Generator')},
                {path: '/dev/test', name: '测试页面', component: () => import('@/views/test/Test')},
            ]
        },

    ]
})
