import React from 'react'
import PropTypes from 'prop-types'

// 引入路由
import {withRouter} from 'react-router-dom'

// 引入MD5文件
import md5 from 'blueimp-md5'
import config from './../../../config/config'

// 引入antd中的组件
import {Form, Input, Button, Modal, message} from 'antd';
// 引入接口文件
import {changeAdminPwd, getAdmin, removeAdmin} from './../../../api/adminApi'

class EditPassword extends React.Component {
    static propTypes = {
        visible: PropTypes.bool.isRequired,
        hideFunc: PropTypes.func.isRequired
    };

    handleCancel = e => {
        console.log(e);
        this.props.hideFunc();
    };

    onFinish = (values) => {
        // 1. 判断: 新旧密码不一致
        if (values.old_password === values.new_password) {
            message.warning('新密码和旧密码不能一致!');
            return;
        }

        // 2. 对新旧密码进行加密
        const old_pwd = md5(values.old_password, config.KEY);
        const new_pwd = md5(values.new_password, config.KEY);
        // console.log(old_pwd, new_pwd);

        // 3. 调用接口
        changeAdminPwd(getAdmin().token, old_pwd, new_pwd).then((result)=>{
            if(result && result.status === 200){
                let res = result.data;
                // 3.1 退出登录成功
                if(res && res.status === 1){
                    message.success(res.msg);
                    // 清除用户信息
                    removeAdmin();
                    // 路由跳转
                    this.props.history.replace('/login');
                }else if(res && res.status === 0){
                    message.error(result.msg);
                }
            }
        }).catch((error)=>{
            console.log(error);
            message.error('网络出现异常!');
        })
    };

    render() {
        const tailLayout = {
            wrapperCol: {offset: 11, span: 16},
        };
        return (
            <Modal
                title="修改密码"
                visible={this.props.visible}
                onCancel={this.handleCancel}
                footer={null}
            >
                <Form
                    name="change_pwd"
                    onFinish={this.onFinish}
                >
                    <Form.Item
                        label="旧密码:"
                        name="old_password"
                        rules={[
                            {
                                required: true,
                                message: '请输入旧的密码!',
                            },
                        ]}
                    >
                        <Input.Password placeholder="请输入旧的密码"/>
                    </Form.Item>
                    <Form.Item
                        label="新密码:"
                        name="new_password"
                        rules={[
                            {
                                required: true,
                                message: '请输入新的密码!',
                            },
                        ]}
                    >
                        <Input.Password placeholder="请输入新的密码"/>
                    </Form.Item>
                    <Form.Item   {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            修改密码
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
}

export default withRouter(EditPassword);