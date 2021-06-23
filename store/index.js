
const cookieparser = process.server ? require('cookieparser') : undefined

// 在服务端渲染期间运行都是同一个实例(同时打开几个页面的情况)
// 为了防止数据冲突，务必要把 state 定义成一个函数，返回数据对象
export const state = () => {
    return {
        user: null
    }
}



export const mutations = {
    setUser(state, data) {
        state.user = data;
    },

}


export const actions = {
    nuxtServerInit({ commit }, { req }) {
        let user = null;
        if (req.headers.cookie) {
            const cookie = cookieparser.parse(req.headers.cookie)
            try {
                user = JSON.parse(cookie.user)
            } catch (e) { }
        }
        commit('setUser', user)


    }
}