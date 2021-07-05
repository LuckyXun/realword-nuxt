import axios from 'axios';
import Vue from 'vue';
// 创建请求对象
export const request = axios.create({
    baseURL: 'https://conduit.productionready.io'
})


export default ({ store,redirect}) => {

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
      },function({response}){
          const {status} = response;
          // code 401 重定向到登陆页面
          if(status===401){
              redirect('/login')
          }
          console.dir(response)
      });


}