import ajax from './index'
import {saveObj, getObj, removeObj} from './../tools/cache-tool'
import config from './../config/config'

/*
  1. 提供给外部判断是否登录的函数
*/
export const isLogin = ()=>{
    // 1.1 从本地获取管理员信息
    let adminObj = getObj(config.YQ_ADMIN_KEY);
    return !!adminObj.token;
};

/*
 2. 登录接口
*/
export const  checkLogin = (account, password)=> ajax('/api/auth/admin/login', {account, password}, 'post');

/*
 3. 退出登录
*/
export const  checkLogOut = ()=> ajax('/api/auth/admin/logout');

/*
 4. 保存管理员信息到本地
*/
export const  saveAdmin = (adminObj)=>{
     saveObj(config.YQ_ADMIN_KEY, adminObj);
};

/*
 5. 删除本地管理员信息
*/
export const  removeAdmin = ()=>{
    removeObj(config.YQ_ADMIN_KEY);
};
