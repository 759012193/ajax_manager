import React from 'react'
import {connect} from 'react-redux'

// 引入日期框架
import Moment from 'moment'

// 引入接口
import {getJobPre, getJobFamily, addOneJob} from './../../../api/lifejob'
import {getAdmin} from './../../../api/adminApi'

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

            jobPre: [],
            jobFamily: []
        }
    }

    componentDidMount() {

        // 1.获取学前所属分类
        getJobPre().then((result) => {
            console.log(result);
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
            console.log(result);
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
            const {imageUrl, focusImageUrl, jobContent} = this.state;
            // 封面图不能没有
            if (!imageUrl) {
                message.warn('请上传封面图片!');
                return;
            }
            // 内容不能为空
            console.log(jobContent);
            if (!jobContent || jobContent === '<p></p>') {
                message.warn('请填写人生内容!');
                return;
            }

            // 3. 调用接口
            // token, job_name, job_img, job_author, job_publish_time, job_content, job_pre_edu_id, job_family_edu_id, focus_img
            addOneJob(getAdmin().token, values.job_name, imageUrl, values.job_author, job_time, jobContent, values.job_pre_edu_id, values.job_family_edu_id, focusImageUrl).then((result)=>{
                if(result.data && result.data.status === 1){
                    message.success(result.data.msg);
                    // 回到列表页面
                    this.props.history.goBack();
                }
            }).catch(()=>{
                message.error('添加人生失败!');
            });

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

        const {jobPre, jobFamily} = this.state;
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
                            uploadName={'job_img'}
                            uploadAction={'/api/auth/life_job/upload_life_job'}
                            successCallBack={(content) => {
                            this.setState({
                                jobContent: content
                            })
                        }}/>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            添加
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
