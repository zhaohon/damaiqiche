
/**
 * httpApi模块接口列表
 */
 
import http from './http'; // 导入http中创建的axios实例
// eslint-disable-next-line no-unused-vars
import qs from 'qs'; // 根据需求是否导入qs模块
let apiUrl = 'https://www.damaichaxun.com/';

const api = {    
    // 大唛保养结果    
    submitprice(params) {
        console.log('params',{params})
        return http.post(`${apiUrl}Car/submit_price`,qs.stringify(params))
    },
    // 演示get
    // articleDetail (params) {        
    //      注意get请求params参数外要加{}
    //     return http.get(`${apiUrl}Car/submit_price`,{params});     
    // },
}
 

export default api;