import React from 'react'
import {connect} from 'react-redux'

// 引入日期框架
import Moment from 'moment'

// 引入接口
import {getJobPre, getJobFamily, addOneJob, editOneJob} from './../../../api/lifejob'
import {getAdmin} from './../../../api/adminApi'

// 引入存储到本地的工具方法
import {getObj} from './../../../tools/cache-tool'

// 引入上传图片组件
import YQUploadImg from './../../../components/YQUploadImg'
// 引入富文本组件
import YQRichTextEditor from './../../../components/YQRichTextEditor'
// 引入antD中的组件
import {Card, Form, Input, Button, Divider, Select, message} from 'antd'

const {Option} = Select;

class AddOrEdit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            imageUrl: '', // 封面图
            focusImageUrl: '', // 首页焦点图
            jobContent: '', // 人生内容
            jobId: '', // id编号

            jobPre: [],
            jobFamily: []
        };

        this.jobFormRef = React.createRef();
        this.jobLifeEditorRef = React.createRef();
    }

    componentDidMount() {
        // 0. 处理编辑状态页面刷新的情况 (返回上一届页面)
        if(getObj('life_job_edit_tag')=== 'edit' && !this.props.location.state){
            // 清除当前页面中的所有状态
            this.setState = ()=> false;
            // 返回上一级界面
            this.props.history.goBack();
        }

        // 获取上一个界面传递的数据
        if(this.props.location.state){
           const jobItem = this.props.location.state.job;
           if(jobItem){
               // 1. 往表单中注入数据
               this.jobFormRef.current.setFieldsValue(jobItem);
               // 2. 更新状态机
               this.setState({
                   imageUrl: jobItem.job_img, // 封面图
                   focusImageUrl: jobItem.focus_img, // 首页焦点图
                   jobContent: jobItem.job_content, // 人生内容
                   jobId: jobItem.id // id编号
               });
           }
        }

        // 1.获取学前所属分类
        getJobPre().then((result) => {
            // console.log(result);
            if (result.data && result.data.status === 1) {
                this.setState({
                    jobPre: result.data.data
                });
            }
        }).catch((error) => {
            message.error('获取前所属分类失败!')
        });

        // 2.获取所属家园分类
        getJobFamily().then((result) => {
            // console.log(result);
            if (result.data && result.data.status === 1) {
                this.setState({
                    jobFamily: result.data.data
                });
            }
        }).catch((error) => {
            message.error('获取前所属分类失败!')
        });
    }


    render() {
        // 提交表单数据
        const onFinish = (values) => {
            // 1. 添加的时间
            const job_time = Moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
            // console.log(job_time);

            // 2. 容错处理
            const {imageUrl, focusImageUrl, jobId} = this.state;
            // 封面图不能没有
            if (!imageUrl) {
                message.warn('请上传封面图片!');
                return;
            }
            // 内容不能为空
            const  jobContent = this.jobLifeEditorRef.current.getContent();
            if (!jobContent || jobContent === '<p></p>') {
                message.warn('请填写人生内容!');
                return;
            }

            // 3. 调用接口
            /*console.log(jobId);
            debugger;*/
            if(jobId){ // 编辑
                editOneJob(getAdmin().token, jobId, values.job_name, imageUrl, values.job_author, job_time, jobContent, values.job_pre_edu_id, values.job_family_edu_id, focusImageUrl).then((result)=>{
                    if(result.data && result.data.status === 1){
                        message.success(result.data.msg, 1);
                        // 回到列表页面
                        this.props.history.goBack();
                    }else {
                        message.error(result.data.msg, 1);
                    }
                }).catch(()=>{
                    message.error('编辑人生失败!', 1);
                });
            }else { // 添加
                addOneJob(getAdmin().token, values.job_name, imageUrl, values.job_author, job_time, jobContent, values.job_pre_edu_id, values.job_family_edu_id, focusImageUrl).then((result)=>{
                    if(result.data && result.data.status === 1){
                        message.success(result.data.msg, 1);
                        // 回到列表页面
                        this.props.history.goBack();
                    }else {
                        message.error(result.msg, 1);
                    }
                }).catch(()=>{
                    message.error('添加人生失败!', 1);
                });
            }
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

        const {jobPre, jobFamily, imageUrl, focusImageUrl, jobContent, jobId} = this.state;
        return (
            <Card title={jobId ? "编辑人生资源" : "新增人生资源"}>
                <Form
                    {...layout}
                    onFinish={onFinish}
                    ref={this.jobFormRef}
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
                        <Input placeholder={"请输入职场人生标题"}/>
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
                        <Input placeholder={"请输入作者名称"}/>
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
                            {
                                jobPre && jobPre.map(item => {
                                    return (
                                        <Option value={item.id} key={item.id}>{item.pre_edu_name}</Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                    {/* 所属家园分类 */}
                    <Form.Item
                        label="所属家园分类"
                        name="job_family_edu_id"
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
                            {
                                jobFamily && jobFamily.map(item => {
                                    return (
                                        <Option value={item.id} key={item.id}>{item.job_family_name}</Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                    {/* 人生封面图 */}
                    <Form.Item
                        label="人生封面图"
                    >
                        <YQUploadImg
                            upLoadBtnTitle={"上传封面图"}
                            upLoadName={"job_img"}
                            upDefaultImage={imageUrl}
                            upLoadAction={"/api/auth/life_job/upload_life_job"}
                            successCallBack={(name) => {
                                this.setState({
                                    imageUrl: name
                                })
                            }}
                        />
                    </Form.Item>
                    {/* 人生焦点图 */}
                    <Form.Item
                        label="人生焦点图"
                    >
                        <YQUploadImg
                            upLoadBtnTitle={"上传焦点图"}
                            upLoadName={"job_img"}
                            upDefaultImage={focusImageUrl}
                            upLoadAction={"/api/auth/life_job/upload_life_job"}
                            successCallBack={(name) => {
                                this.setState({
                                    focusImageUrl: name
                                })
                            }}
                        />
                    </Form.Item>
                    {/*富文本编辑器*/}
                    <Form.Item
                        label="人生内容"
                        wrapperCol={{span: 20}}
                    >
                        <YQRichTextEditor
                            ref={this.jobLifeEditorRef}
                            uploadName={'job_img'}
                            uploadAction={'/api/auth/life_job/upload_life_job'}
                            htmlContent={jobContent}
                        />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            {jobId ? "修改" : "添加"}
                        </Button>
                        <Divider type="vertical"/>
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
