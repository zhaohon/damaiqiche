
/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios';
import router from '../router';
import qs from 'qs'; // 导入qs模块
import { Message } from 'iview'
// import store from '../store/index';
 
 
/** 
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
    router.replace({
        path: '/pages',        
        // query: {
        //     redirect: router.currentRoute.fullPath
        // }
    })
}
 /** 
 * 常规错误统一处理 
 * @param {Number} //res || code 常规错误的状态码
 */
const errorRoutine = (res)=>{
    console.warn('常规错误',res)
    if(res.res == '-1'){
        Message.warning(res.msg,5);
        localStorage.removeItem('shop_id');
        localStorage.removeItem('session_id');
        toLogin()
    }
}

/** 
 * 请求失败后的错误统一处理 
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
    // 状态码判断
    switch (status) {
        case 401:
            break;
        case 403:
            break;
        case 404:
            // ('请求的资源不存在'); 
            break;
        default:
            console.log(other,'other');   
    }
}
 
// 创建axios实例
var instance = axios.create({timeout: 1000 * 12}); //设置请求超时时间
// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
/** 
 * 添加请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token （目前没有在请求头添加token需要）
 * 添加默认值mid
 */ 
instance.interceptors.request.use(    
    config => {
        if(config.url != 'https://damaichaxun.com/Port/GoLogin'){
            let data = qs.parse(config.data);
            data.shop_id = localStorage.getItem('shop_id') || ''
            data.session_id = localStorage.getItem('session_id') || ''
            config.data = qs.stringify(data)
        }
        
        // 登录流程控制中，根据本地是否存在token判断用户的登录情况        
        // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token        
        // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码        
        // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。        
        // const token = store.state.token;        
        // const token ='';
        // token && (config.headers.Authorization = token);

        return config;
    },
    error => Promise.error(error))
// 添加响应拦截器
instance.interceptors.response.use(
    response => {
        // console.log('成功:','接口名称',response.config.url);
        console.log(response)
        const { status, data } = response;
        if (Object.is(status, 200)) {//两个参数是否是相同的值。
            const { res } = data;
            if(res == '-1'){
                errorRoutine(data)
            }
            if(res != '-1'){
                return Promise.resolve(data);
            }
        } else {
            errorHandle(status,data)
            return Promise.reject(new Error());
        }
    },
    error => {
        errorHandle(error.response.status,error.response )
        return Promise.reject(error.response);
    }
);

export default instance;


