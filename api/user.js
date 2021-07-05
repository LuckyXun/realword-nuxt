/*
 * @Author: XunL
 * @Date: 2021-06-23 02:30:27
 * @LastEditTime: 2021-07-06 02:00:24
 * @Description: 用户相关接口
 */
import { request } from '../plugins/request'

export const login = function (data) {
    return request.post('/api/users/login', data)
}
export const register = function (data) {
    return request.post('/api/users', data)
}

export const followUser = function (username) {
    return request.post(`/api/profiles/${username}/follow`)
}

export const unFollowUser = function (username) {
    return request.delete(`/api/profiles/${username}/follow`)
}


export const updateUser = function (data) {
    return request.put(`/api/user`,data)
}