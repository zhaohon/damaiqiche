
/**
 * httpApi模块接口列表
 */
 
import http from './http'; // 导入http中创建的axios实例
// eslint-disable-next-line no-unused-vars
import qs from 'qs'; // 导入qs模块
let apiUrl = 'https://damaichaxun.com/';

const api = {    
    // 大唛保养结果    
    submitprice(params) {
        return http.post(`${apiUrl}Car/submit_price`,qs.stringify(params))
    },
    // 演示get
    // articleDetail (params) {        
    //      注意get请求params参数外要加{}
    //     return http.get(`${apiUrl}Car/submit_price`,{params});     
    // },
    // 车型品牌    
    carName(params) {
        return http.post(`${apiUrl}Port/GetBrand`,qs.stringify(params))
    },
    // 车系  
    carSeries(params) {
        return http.post(`${apiUrl}Port/GetCars`,qs.stringify(params))
    },
    // 车型   
    carType(params) {
        return http.post(`${apiUrl}Port/GetModels`,qs.stringify(params))
    },
}
 

export default api;