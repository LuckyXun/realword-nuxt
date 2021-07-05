import { request } from '../plugins/request'

export const getArticles = function (data) {
    return request.get('/api/articles', data)
}
export const getTags = function (data) {
    return request.get('/api/tags', data)
}

export const getFeedList = function (data) {
    return request.get('/api/articles/feed', data)
}

export const addFavorite = slug => {
    return request({
        method: 'POST',
        url: `/api/articles/${slug}/favorite`
    })
}

export const deleteFavorite = slug => {
    return request({
        method: 'DELETE',
        url: `/api/articles/${slug}/favorite`
    })
}

export const getArticle = slug => {
    return request({
        method: 'GET',
        url: `/api/articles/${slug}`
    })
}

export const publishArticle = data =>{
    return request.post('/api/articles', data)

}
