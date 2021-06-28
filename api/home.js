import request from '../utils/request'

export const getArticles = function (data) {
    return request.get('/api/articles', data)
}
export const getTags = function (data) {
    return request.get('/api/tags', data)
}