import $axios from './api' // 倒入 api

/* 将所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 * 此处的数据依然来自 Easy Mock
 */

// 单独倒出
// export const query = params => {
//     return axios({
//         url: '/query',
//         method: 'get',
//         params
//     })
// }

// 默认全部倒出
// 根绝需要进行  
export default {
    // query,
    userList(params) {
        return $axios({
            url: '/admin/user/list',
            method: 'get',
            params
        })
    },
    login(params) {
        return $axios({
            url: '/admin/login',
            method: 'post',
            params
        })
    },
    menuList(params) {
        return $axios({
            url: '/admin/menu/list',
            method: 'get',
            params
        })
    },
    menuAdd(params) {
        return $axios({
            url: '/admin/menu/add',
            method: 'post',
            params
        })
    },
    menuDelete(params) {
        return $axios({
            url: '/admin/menu/delete',
            method: 'post',
            params
        })
    },
    menuUpdate(params) {
        return $axios({
            url: '/admin/menu/update',
            method: 'post',
            params
        })
    },
    // app
    merchantList(params) {
        return $axios({
            url: '/merchant/list',
            method: 'get',
            params
        })
    },
}
