
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
    // 排量
    carQuantity(params) {
        return http.post(`${apiUrl}Port/GetDisplacement`,qs.stringify(params))
    },
    // 年份
    carYear(params) {
        return http.post(`${apiUrl}Port/GetYear`,qs.stringify(params))
    },
    // 款型
     carKuan(params) {
        return http.post(`${apiUrl}Port/GetModel`,qs.stringify(params))
    },
    
    // 型号
    carEngine(params) { 
        return http.post(`${apiUrl}Port/GetEngine`,qs.stringify(params))
    },
    // 功率
    carPower(params) {
        return http.post(`${apiUrl}Port/GetPower`,qs.stringify(params))
    },




    // 获取所有品牌
    Search(params) {
        return http.post(`${apiUrl}Search/index`,qs.stringify(params))
    },
    // 根据品牌获取机型
    SearchModel(params) {
        return http.post(`${apiUrl}Search/productModel`,qs.stringify(params))
    },
    // 根据品牌获取列表
    carList(params) {
        return http.post(`${apiUrl}Search/carList`,qs.stringify(params))
    },
    // 纠错接口
    correction(params) {
        return http.post(`${apiUrl}Search/correction`,qs.stringify(params))
    },
    // 搜索车型
    searchModels(params) {
        return http.post(`${apiUrl}port/search_models`,qs.stringify(params))
    },

    // 获取图片
    GerProimg(params) {
        return http.post(`${apiUrl}Search/GerProimg`,qs.stringify(params))
    },


    



    
    
}

export default api;