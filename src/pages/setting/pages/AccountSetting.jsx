import React from 'react'
import {connect} from 'react-redux'

// 引入消息发布组件
import PubSub from 'pubsub-js'
// 引入组件
import { Form, Input, Button, Card, message,Modal} from 'antd';
// 引入配置文件
import config from './../../../config/config'
// 引入组件
import YQUploadImg from './../../../components/YQUploadImg' // 上传图片
import EditPassword from './../components/EditPassword'
// 引入接口文件
import {getAdmin, changeAdminMsg, saveAdmin,removeAdmin} from './../../../api/adminApi'


class AccountSetting extends React.Component{
    constructor(props) {
        super(props);
        // 状态机
        this.state = {
            account: '', // 管理员账户名
            account_name: '', // 管理员名称
            account_icon: '', // 管理员头像
            token: '', // 令牌

            // 控制修改密码面板的显示和隐藏
            editPwdPanelShow: false
        };

        // 创建ref
        this.formRef = React.createRef();
    }

    
    componentDidMount() {
        // console.log(getAdmin());
        // 更新管理员的数据
        this.setState({
            account: getAdmin().account, // 管理员账户名
            account_name: getAdmin().account_name, // 管理员名称
            account_icon: getAdmin().account_icon, // 管理员头像
            token: getAdmin().token // 令牌
        }, ()=>{
            // console.log(this.formRef);
            // ****设置表单中的值***
            const {account, account_name} = this.state;
            this.formRef.current.setFieldsValue({
                account,
                account_name
            });
        });
    }

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
            // 1. 获取数据
            const {token, account_icon} = this.state;
            // 2. 调用修改管理员信息接口
            changeAdminMsg(token, values.account_name, account_icon).then((result)=>{
                if(result && result.status === 200){
                    let res = result.data;
                    // 2.1 更新本地的管理员信息
                    saveAdmin(res.data);
                    message.success(res.msg);
                    // 2.2 通知外界管理员信息修改了
                    PubSub.publish(config.ADMIN_MSG_CHANGE, {});
                }
            }).catch((error)=>{
                message.error('管理员信息修改失败!');
            });
        };

        // 取出默认的头像
        const {account_icon} = this.state;
        return (
            <Card title="管理员信息编辑">
                <Form
                    ref={this.formRef}
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
                        <YQUploadImg upLoadAction={"/api/auth/admin/upload_admin_icon"} upLoadBtnTitle={"上传头像"} upLoadName={"admin_avatar"} upDefaultImage={account_icon}  successCallBack={(name)=>{
                            // console.log(name);
                            // 更新状态机
                            this.setState({
                                account_icon:  name
                            });
                        }} />
                    </Form.Item>

                    <Form.Item  {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            修改
                        </Button>
                        &nbsp;&nbsp;&nbsp; 或者   &nbsp;&nbsp;&nbsp;
                        <a onClick={()=>this._editPassword()}>修改密码?</a>
                    </Form.Item>
                </Form>
                <EditPassword visible={this.state.editPwdPanelShow}  hideFunc={()=>this._hidePwdPanel()}/>
            </Card>
        )
    }


    // 一旦触发该函数,则隐藏面板
    _hidePwdPanel(){
        this.setState({
            editPwdPanelShow: false
        })
    }

    // 修改密码
    _editPassword(){
        this.setState({
            editPwdPanelShow: true
        })
    }
}

export default connect(null, null)(AccountSetting);
