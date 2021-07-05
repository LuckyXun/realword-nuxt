import { request } from '../plugins/request'

export const login = function (data) {
    return request.post('/api/users/login', data)
}
export const register = function (data) {
    return request.post('/api/users', data)
}

export const followUser = function(username){
    return request.post(`/api/profiles/${username}/follow`)
}

export const unFollowUser = function(username){
    return request.delete(`/api/profiles/${username}/follow`)
}