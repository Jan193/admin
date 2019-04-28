
import VueRouter from 'vue-router'

// import Vue from 'vue'
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
        component: () => import('../pages/index.vue'),
        children: [
            { path: '/', redirect: '/home'},
            { path: '/home', name: '首页', component: () => import('../pages/home.vue') },
            { path: '/menu', name: '菜单', component: () => import('../pages/menu.vue') },
            { path: '/list', name: '账号列表', component: () => import('../pages/accountList.vue') },
            { path: '/doc', name: '使用文档', component: () => import('../pages/doc.vue') },
            {
                path: '/users',
                name: '用户',
                component: () => import ('../pages/users.vue')
            },
            {
                path: '/menumg',
                name: '菜单管理',
                component: () => import ('../pages/menuMg.vue')
            },
            {
                path: '/merchant',
                // name: '商家',
                component: () => import ('../pages/merchant/index.vue'),
                children: [
                    {
                        path: '/',
                        name: '商家',
                        component: () => import('../pages/merchant/merchantList.vue')
                    },
                    {
                        path: '/goodsList/:merchantId',
                        name: '商品列表',
                        component: () => import('../pages/merchant/goodsList.vue')
                    }
                ]
            },
        ]
    },
]
export { routes }

export default new VueRouter({
    routes
})