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
        {
            path: '/index', component: () => import('@/components/Layout'),
            children: [
                {path: '/main', name: '首页', component: () => import('@/views/system/Main')},
                {path: '/dev/generator', name: '生成器', component: () => import('@/views/dev/Generator')},
                {path: '/dev/test', name: '测试', component: () => import('@/views/dev/Test')},
                {path: '/system/dictionary', name: '字典管理', component: () => import('@/views/system/Dictionary')},
                {path: '/system/menu', name: '菜单管理', component: () => import('@/views/system/Menu')},
                {path: '/system/user', name: '人员管理', component: () => import('@/views/system/User')},
                {path: '/system/role', name: '角色管理', component: () => import('@/views/system/Role')},
                {path: '/system/privilege', name: '权限管理', component: () => import('@/views/system/Privilege')},
                {path: '/system/schedule', name: '任务管理', component: () => import('@/views/system/Schedule')},
                {path: '/system/config', name: '配置管理', component: () => import('@/views/system/Config')},
                {path: '/system/file', name: '文件管理', component: () => import('@/views/system/File')},
            ]
        },

    ]
})
