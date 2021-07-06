/*
 * @Author: XunL
 * @Description: 用户信息相关接口
 */
import { request } from '../plugins/request'

export const getProfile = function (username) {
    return request.get(`/api/profiles/${username}`)
}