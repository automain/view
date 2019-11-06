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
            path: '/', component: () => import('@/components/Login'),
        },
        // {
        //     path: '/', component: () => import('@/components/Layout'),
        //     children: [
        //         {path: '/main', name: '首页', component: () => import('@/views/system/Main')},
        //         {path: '/dev/generator', name: '生成器', component: () => import('@/views/dev/Generator')},
        //         {path: '/dev/test', name: '测试', component: () => import('@/views/dev/Test')},
        //         {path: '/system/dictionary', name: '字典', component: () => import('@/views/system/Dictionary')},
        //         {path: '/system/menu', name: '菜单', component: () => import('@/views/system/Menu')},
        //     ]
        // },

    ]
})
