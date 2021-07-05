/*
 * @Author: XunL
 * @Description: 评论相关接口
 */
import { request } from '../plugins/request'

export const getComments = function (slug) {
    return request.get(`/api/articles/${slug}/comments`)
}
export const deleteComment = function (slug,id) {
    return request.delete(`/api/articles/${slug}/comments/${id}`)
}

export const addComment = function(slug,data){
    return request.post(`/api/articles/${slug}/comments`,data)
}
