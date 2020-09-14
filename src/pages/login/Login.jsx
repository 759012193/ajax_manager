import React from 'react'
import {connect} from 'react-redux'
import './css/login.css'
import xl from './images/xiaoliao.png'
import { Form, Input, Button,message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {checkLogin,checkLogOut} from './../../api/adminApi'
import md5 from 'blueimp-md5'
import config from './../../config/config'
import {saveObj} from './../../tools/cache-tool'
class Login extends React.Component{
    render() {
         // 点击登录按钮
         const onFinish = values => {
            console.log('表单提交的数据: ', values);
            // 1. 对密码进行MD5加密
            const md5_pwd = md5(values.password, config.KEY);
            // 2. 发起登录请求
            checkLogin(values.account, md5_pwd).then((result)=>{
                let res = result.data;
                console.log(res);
                // 2.1 判断
                if(res && res.status === 1){
                     // 提示用户
                     message.success(res.msg);
                     // 把管理员信息本地化
                    saveObj('yq_admin_key',res.data);
                    // 跳转到主面板
                    this.props.history.replace('/');
                }else {
                    message.warn(res.msg);
                }
            }).catch((error)=>{
                // console.log(error);
                message.error('网络出现一点问题!');
            });
        };
    
        return (
            <div className="login">
                <div className="login-wrap">
                    {/*头像*/}
                    <div className="avatar">
                        <img src={xl} alt=""/>
                    </div>
                    {/*内容*/}
                    <div className="content">
                        <Form
                            name="normal_login"
                            className="login-form"
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="account"
                                rules={[{ required: true, message: '账户名不能为空!' }]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入账户名" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: '密码不能为空!' }]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="请输入密码"
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    登录
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, null)(Login);
