import request from '../utils/request'

export const login = function (data) {
    return request.post('/api/users/login', data)
}
export const register = function (data) {
    return request.post('/api/users', data)
}

