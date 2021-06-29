import axios from 'axios';
// 创建请求对象
export const request = axios.create({
    baseURL: 'https://conduit.productionready.io'
})


export default ({ store }) => {

    request.interceptors.request.use(config => {
      
        if (store.state?.user) {
            console.log(233)
            config.headers.Authorization = 'Token ' + store.state.user.token
        }
        return config
    }, function (error) {
        // TODO 错误处理
        return Promise.reject(error)
    })



}