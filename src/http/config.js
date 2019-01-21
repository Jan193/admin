export default {
    method: 'post',
    // 基础url前缀
    // baseURL: 'http://127.0.0.1:7001',
    baseURL: 'http://106.12.121.211:7001',
    // 请求头信息
    headers: {
      'Content-Type':'application/json;charset=UTF-8'
    },
    // 参数
    data: {},
    // 设置超时时间
    timeout: 10000,
    // 携带凭证
    withCredentials: false,
    // 返回数据类型
    responseType: 'json'
}
