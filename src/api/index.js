import axios from 'axios'

// 设置默认的基础路径
// axios.defaults.baseURL = 'http://demo.itlike.com/web/xlmc';


// 开发服务器 和 生成服务器
// console.log(process.env.NODE_ENV);
/*
const  runVersion = process.env.NODE_ENV;
if(runVersion === 'development'){ // 开发环境
    axios.defaults.baseURL = 'http://demo.itlike.com/web/xlmc';
}else if(runVersion === 'production'){ // 生成环境
    axios.defaults.baseURL = 'http://demo.itlike.com/web/xlmc';
}
*/

// 请求的超时时间
// axios.defaults.timeout = 2500;

// 配置post的请求头
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

//  配置请求拦截器(request)
axios.interceptors.request.use(function (config) {
    // console.log(config);
    /*
      1. 一些请求, 需要统一加token
      2. 在每次发请求之前, 加上请求动画
      3. 配置一些额外的信息
      ...
    */
    return config;
}, function (error) {
    // ...
    return Promise.reject(error);
});

//  配置响应拦截器(response)
axios.interceptors.response.use(function (response) {
    // 任何的响应回来,都会进入此处
    // console.log(response);
    return response;
}, function (error) {
    return Promise.reject(error);
});


export default function ajax(url = '', params = {}, type = 'GET') {
    // 1. 返回promise
    return new Promise((resolve, reject)=>{
          // 1.0 变量
          let promise;

         // 1.1 判断请求的类型
         if(type.toUpperCase() === 'GET'){ // get请求
             promise = axios({
                 url,
                 params
             })
         }else if(type.toUpperCase() === 'POST'){ // post请求
             promise = axios({
                 method: 'post',
                 url,
                 data: params
             })
         }

         // 1.2 处理结果并返回
        promise.then((response)=>{
            resolve(response);
        }).catch((error)=>{
            reject(error);
        });
    });
}
