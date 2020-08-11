
/**
 * httpApi模块接口列表
 */
 
import axios from './axios'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块
let apiUrl = 'https://www.damaichaxun.com/';

const api = {    
    // 大麦保养结果    
    submitprice(params) {
        return axios.post(`${apiUrl}Car/submit_price`,qs.stringify(params))
    },
    // 演示get
    // articleDetail (id, params) {        
    //     return axios.get(`${base.sq}/topic/${id}`, {            
    //         params: params        
    //     });    
    // },

}
 

export default api;