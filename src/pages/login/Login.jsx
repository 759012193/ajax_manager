import React from 'react'
import {connect} from 'react-redux'
import './css/login.css'
import xl from './images/xiaoliao.png'
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
class Login extends React.Component{
    render() {
        // 点击登录按钮
        const onFinish = values => {
            console.log('Received values of form: ', values);
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
