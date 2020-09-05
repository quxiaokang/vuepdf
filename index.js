import axios from 'axios';

export default {
    //get请求
    requestGet(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.get(url, params).then(res => {
                resolve(res.data)
            }).catch(error => {
                reject(error)
            })
        })
    },


}

export function request(config) {
    const instance =  new axios.create({
        baseURL:'https://www.xiaoqianbai.club:20020/',
        timeout:8000
    });
    //请求拦截器
    instance.interceptors.request.use(config=>{
        return config
    },error => {

    })
    //响应拦截器
    instance.interceptors.response.use(res =>{
        // 拦截后需要将拦截下来处理成的结果返回
        return res.data
    },error => {
        console.log(error)
    })
    return instance(config)

}
