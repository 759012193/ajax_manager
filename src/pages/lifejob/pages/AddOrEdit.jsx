import React from 'react'
import {connect} from 'react-redux'

// 引入上传图片组件
import YQUploadImg from './../../../components/YQUploadImg'

// 引入富文本组件
import YQRichTextEditor from './../../../components/YQRichTextEditor'

// 引入antD中的组件
import {Card, Form, Input, Button, Divider, Select} from 'antd'
const { Option } = Select;

class AddOrEdit extends React.Component{
    render() {
        // 提交表单数据
        const onFinish = (values) => {
            console.log('Success:', values);
        };

        // 表单内容的布局
        const layout = {
            labelCol: {
                span: 4,
            },
            wrapperCol: {
                span: 12,
            },
        };
        const tailLayout = {
            wrapperCol: {
                offset: 8,
                span: 16,
            },
        };
        return (
            <Card title="新增人生资源">
                <Form
                    {...layout}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="人生名称"
                        name="job_name"
                        rules={[
                            {
                                required: true,
                                message: '请输入职场人生标题!',
                            },
                        ]}
                    >
                        <Input placeholder={"请输入职场人生标题"} />
                    </Form.Item>
                    <Form.Item
                        label="人生作者"
                        name="job_author"
                        rules={[
                            {
                                required: true,
                                message: '请输入作者名称!',
                            },
                        ]}
                    >
                        <Input placeholder={"请输入作者名称"} />
                    </Form.Item>
                    {/* 学前所属分类 */}
                    <Form.Item
                        label="学前所属分类"
                        name="job_pre_edu_id"
                        rules={[
                            {
                                required: true,
                                message: '请选择学前所属分类!',
                            },
                        ]}
                    >
                        <Select
                            placeholder="请选择学前所属分类"
                            style={{width: 200}}
                        >
                            <Option value="male">学前所属分类1</Option>
                            <Option value="female">学前所属分类2</Option>
                            <Option value="other">学前所属分类3</Option>
                        </Select>
                    </Form.Item>
                    {/* 所属家园分类 */}
                    <Form.Item
                        label="所属家园分类"
                        name="job_pre_edu_id"
                        rules={[
                            {
                                required: true,
                                message: '请选择所属家园分类!',
                            },
                        ]}
                    >
                        <Select
                            placeholder="请选择所属家园分类"
                            style={{width: 200}}
                        >
                            <Option value="male">所属家园分类1</Option>
                            <Option value="female">所属家园分类2</Option>
                            <Option value="other">所属家园分类3</Option>
                        </Select>
                    </Form.Item>
                    {/* 人生封面图 */}
                    <Form.Item
                        label="人生封面图"
                    >
                        <YQUploadImg
                            upLoadBtnTitle={"上传封面图"}
                            upLoadName={"job_img"}
                            upLoadAction={""}
                            successCallBack={(name)=>{
                                console.log(name);
                            }}
                        />
                    </Form.Item>
                    {/* 人生焦点图 */}
                    <Form.Item
                        label="人生焦点图"
                        name="focus_img"
                    >
                        <YQUploadImg
                            upLoadBtnTitle={"上传焦点图"}
                            upLoadName={"job_img"}
                            upLoadAction={""}
                            successCallBack={(name)=>{
                                console.log(name);
                            }}
                        />
                    </Form.Item>
                    {/*富文本编辑器*/}
                    <Form.Item
                        label="人生焦点图"
                        name="focus_img"
                        wrapperCol={{span: 20}}
                    >
                        <YQRichTextEditor />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            添加
                        </Button>
                        <Divider type="vertical" />
                        <Button type="danger" htmlType="submit">
                            取消
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}

export default connect(null, null)(AddOrEdit);
