/*
 * @Author: XunL
 * @Date: 2021-06-30 01:29:57
 * @LastEditTime: 2021-07-08 15:29:40
 * @Description: file content
 */
import axios from 'axios';
import Vue from 'vue';
// 创建请求对象
export const request = axios.create({
    baseURL: 'https://conduit.productionready.io'
})


export default ({ store, redirect }) => {

    request.interceptors.request.use(config => {

        if (store.state?.user) {
            config.headers.Authorization = 'Token ' + store.state.user.token
        }
        return config
    }, function (error) {
        // TODO 错误处理

        return Promise.reject(error)
    })
    request.interceptors.response.use(async (response) => {

        return response;
    }, function (err) {
        const { status } = err.response;
        // code 401 重定向到登陆页面
        if (status === 401 && status === 400) {
            redirect('/login');
            return
        }
        throw(err)
    });


}