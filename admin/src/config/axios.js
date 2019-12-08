import axios from 'axios';
// 创建axios实例
const httpAxios = axios.create();
// 添加请求拦截器
httpAxios.interceptors.request.use(
    config => {
        console.log(config)
        // console.log(JSON.parse(JSON.stringify(config.params)))
        // let params = JSON.parse(JSON.stringify(config.params));
        // params.endAt = config.params.endAt+86400000;
        // if (config.params.endAt) {
        //     config.params = params;
        // }
        return config;
    },
    error => {
        console.log(error)
        return Promise.reject(error);
    }
);
//添加响应拦截器
httpAxios.interceptors.response.use(
    res => {
        console.log(res)
        return res;
    },
    err => {
        console.log(err)
        return Promise.reject(err);
    }
)
export default httpAxios;