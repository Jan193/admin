import VueRouter from 'vue-router'
import Vue from 'vue'
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: '登录',
        component: () => import('../pages/login.vue')
    },
    {
        path: '/index',
        // name: '首页',
        component: () => import('../pages/index.vue'),
        children: [
            { path: '/', redirect: '/home'},
            { path: '/home', name: '欢迎页', component: () => import('../pages/home.vue') },
            { path: '/menu', name: '菜单', component: () => import('../pages/menu.vue') },
            { path: '/list', name: '账号列表', component: () => import('../pages/accountList.vue') },
            { path: '/doc', name: '使用文档', component: () => import('../pages/doc.vue') },
        ]
    },
]
export { routes }

export default new VueRouter({
    routes
})