import React from 'react'
import {connect} from 'react-redux'

// 引入组件
import { Form, Input, Button, Card } from 'antd';

// 引入上传图片组件
import YQUploadImg from './../../../components/YQUploadImg'

class AccountSetting extends React.Component{
    render() {
        // 表单布局
        const formItemLayout = {
            labelCol: { span: 2, offset: 7},
            wrapperCol: { span: 8 },
        };

        const tailLayout = {
            wrapperCol: { offset: 11, span: 16 },
        };

        // 提交表单数据
        const onFinish = values => {
            console.log('Success:', values);
        };

        return (
            <Card title="管理员信息编辑">
                <Form
                    {...formItemLayout}
                    onFinish={onFinish}
                >
                    {/*账户名*/}
                    <Form.Item
                        label="账户名: "
                        name="account"
                    >
                        <Input disabled/>
                    </Form.Item>
                    {/*管理员名称*/}
                    <Form.Item
                        label="管理员名称: "
                        name="account_name"
                        rules={[{ required: true, message: '请添加管理员昵称!' }]}
                    >
                        <Input placeholder={"请添加您的昵称"}/>
                    </Form.Item>
                    {/*管理员头像*/}
                    <Form.Item
                        label="管理员头像: "
                        name="account_icon"
                    >
                        <YQUploadImg />
                    </Form.Item>

                    <Form.Item  {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            修改
                        </Button>
                        &nbsp;&nbsp;&nbsp; 或者   &nbsp;&nbsp;&nbsp;
                        <a onClick={()=>this._editPassword()}>修改密码?</a>
                    </Form.Item>
                </Form>
            </Card>
        )
    }

    // 修改密码
    _editPassword(){

    }
}

export default connect(null, null)(AccountSetting);
