import React from 'react'
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
// 引入类型检测库
import PropTypes from 'prop-types'

// 引入网络请求方法
import ajax from './../../../../api/index'
import {checkLogOut, removeAdmin} from './../../../../api/adminApi'

// 引入路由组件
import {withRouter} from 'react-router-dom'

// 引入样式
import './right-header.css'

import {Layout, Button, message, Modal} from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { Header} = Layout;
const {confirm} = Modal;


class RightHeader extends React.Component{
    static propsType = {
        collapsed: PropTypes.bool.isRequired, // 控制收缩
        toggle: PropTypes.func.isRequired // 函数控制收缩
    };

    state = {
       picURL: '', // 天气预报的图片
       notice: '' // 天气的温度 具体情况
    };

    componentDidMount() {
        // 获取当前城市的天气预报
        this._getWeather();
    }

    // 天气预报
    _getWeather(){
        // 1. 定义常量
        const CITY = '南昌';
        const KEY = 'KnHVOML3NCoHEjn8SsDESlKnGsexhhr7';
        const URL = `/bd_weather_diulei/weather?location=${CITY}&output=json&ak=${KEY}`;

        // 2. 发起get请求Y
        ajax(URL).then((result)=>{
            // console.log(result.data, result.data.error);
            if(result.data.error === 0){
                let res = result.data.results[0].weather_data[0];
                let picURL = res.dayPictureUrl;
                let notice = res.weather + ' ' + res.temperature;
                // console.log(res);

                // 2.1 更新状态
                this.setState({
                    picURL,
                    notice
                });
            }
        }).catch((error)=>{
            console.log(error);
            message.error('获取天气信息失败!');
        });

    }

    render() {
       const {picURL, notice} = this.state;
       return (
           <Header className="header" style={{ padding: 0 }}>
               {React.createElement(this.props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                   className: 'trigger',
                   onClick: this.props.toggle,
               })}
               <div className="header-content">
                   <h3 className="header-content-brand">引擎计划-撩学堂后台管理系统</h3>
                   <div className="header-content-right">
                       <img src={picURL} alt="" style={{marginRight: 5}}/>
                       <span>{notice}</span>
                       <Button
                           type="danger"
                           className="exit-btn"
                           onClick={()=>this._logOut()}
                       >退出</Button>
                   </div>
               </div>
           </Header>
       )
    }

    // 退出登录
    _logOut(){
        confirm({
            title: '确定退出登录吗?',
            icon: <ExclamationCircleOutlined />,
            content: '鱼儿不能忘记水的拥抱, 你确定要走吗?',
            okText: '确定',
            cancelText: '取消',
            onOk: ()=>{
                // 发起退出登录请求
                checkLogOut().then((result)=>{
                    let res = result.data;
                    if(res && res.status === 1){ // 退出登录成功
                        // 清除本地的管理员信息
                        removeAdmin();
                        message.success(res.msg);
                        // 跳转登录界面
                        this.props.history.replace('/login');
                    }else {
                       message.error('退出登录失败, 服务器内部错误!');
                    }
                }).catch((error)=>{
                    console.log(error);
                    message.error('网络出现一点问题!');
                });
            },
            onCancel: ()=>{}
        })
    }
}

export default  withRouter(RightHeader);
