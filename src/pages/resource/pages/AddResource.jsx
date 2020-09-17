import React from 'react'
// 引入日期框架
import Moment from 'moment'
// 引入接口
import {
    getResourceClasses,
    getResourceMeta,
    getResourceArea,
    getResourceFormat,
    getResourceCategory,
    addResource
} from './../../../api/resourceApi'
import {getAdmin} from './../../../api/adminApi'

// 引入上传图片组件
import YQUploadImg from './../../../components/YQUploadImg'

// 引入antD中的组件
import {Card, Form, Input, Button, Divider, Select, message, Upload} from 'antd'
import { InboxOutlined } from '@ant-design/icons';
const {Option} = Select;
const { Dragger } = Upload;

class AddResource extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            imageUrl: '', // 封面图
            focusImageUrl: '', // 首页焦点图
            dragFileList: [], // 存放多个文件

            // 小分类数据
            resourceClasses: [],
            resourceMeta: [],
            resourceArea: [],
            resourceFormat: [],
            resourceCategory: []
        }
    }

    componentDidMount() {
        // 获取小分类数据
        getResourceClasses().then((result) => {
            if (result.data && result.data.status === 1) {
                this.setState({
                    resourceClasses: result.data.data
                });
            }
        }).catch((error) => {
            console.log(error);
        });
        getResourceMeta().then((result) => {
            if (result.data && result.data.status === 1) {
                this.setState({
                    resourceMeta: result.data.data
                });
            }
        }).catch((error) => {
            console.log(error);
        });
        getResourceArea().then((result) => {
            if (result.data && result.data.status === 1) {
                this.setState({
                    resourceArea: result.data.data
                });
            }
        }).catch((error) => {
            console.log(error);
        });
        getResourceFormat().then((result) => {
            if (result.data && result.data.status === 1) {
                this.setState({
                    resourceFormat: result.data.data
                });
            }
        }).catch((error) => {
            console.log(error);
        });
        getResourceCategory().then((result) => {
            if (result.data && result.data.status === 1) {
                this.setState({
                    resourceCategory: result.data.data
                });
            }
        }).catch((error) => {
            console.log(error);
        });

    }

    render() {
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

        const onFinish = (values) => {
            // 1. 处理数据
            const {imageUrl, focusImageUrl, dragFileList} = this.state;
            if(!imageUrl){
                message.warn('请上传资源的封面图!');
                return;
            }
            if(dragFileList.length === 0){
                message.warn('上传的资源文件不能为空!');
                return;
            }
            // 发布时间
            const resource_publish_time = Moment(new Date()).format('YYYY-MM-DD HH:mm:ss');

            // 2. 上传资源
            addResource(getAdmin().token, values.resource_name, values.resource_author, resource_publish_time, dragFileList, values.resource_category_id, values.resource_classes_id, values.resource_area_id, values.resource_mate_id, values.resource_format_id, imageUrl, values.resource_price,  focusImageUrl).then((result)=>{
                if(result.data && result.data.status === 1){
                    message.success(result.data.msg, 1);
                    // 回到列表页面
                    this.props.history.goBack();
                }else {
                    message.error(result.data.msg, 1);
                }
            }).catch(()=>{
                message.error('添加幼教资源失败!', 1);
            });
        };


        const {resourceClasses, resourceMeta, resourceArea, resourceFormat, resourceCategory} = this.state;
        return (
            <Card title="新增幼教资源">
                <Form
                    {...layout}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="资源名称"
                        name="resource_name"
                        rules={[
                            {
                                required: true,
                                message: '请输入资源名称!',
                            },
                        ]}
                    >
                        <Input placeholder={"请输入资源名称"}/>
                    </Form.Item>
                    <Form.Item
                        label="资源作者"
                        name="resource_author"
                        rules={[
                            {
                                required: true,
                                message: '请输入资源作者!',
                            },
                        ]}
                    >
                        <Input placeholder={"请输入资源作者"}/>
                    </Form.Item>
                    {/* 小分类 */}
                    <Form.Item
                        label="所属分类"
                        name="resource_category_id"
                        rules={[
                            {
                                required: true,
                                message: '请选择所属分类!',
                            },
                        ]}
                    >
                        <Select
                            placeholder="请选择所属分类"
                            style={{width: 200}}
                        >
                            {
                                resourceCategory && resourceCategory.map(item => {
                                    return (
                                        <Option value={item.id} key={item.id}>{item.category_name}</Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="所属班级"
                        name="resource_classes_id"
                        rules={[
                            {
                                required: true,
                                message: '请选择所属班级!',
                            },
                        ]}
                    >
                        <Select
                            placeholder="请选择所属班级"
                            style={{width: 200}}
                        >
                            {
                                resourceClasses && resourceClasses.map(item => {
                                    return (
                                        <Option value={item.id} key={item.id}>{item.classes_name}</Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="所属领域"
                        name="resource_area_id"
                        rules={[
                            {
                                required: true,
                                message: '请选择所属领域!',
                            },
                        ]}
                    >
                        <Select
                            placeholder="请选择所属领域"
                            style={{width: 200}}
                        >
                            {
                                resourceArea && resourceArea.map(item => {
                                    return (
                                        <Option value={item.id} key={item.id}>{item.area_name}</Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="素材选择"
                        name="resource_mate_id"
                        rules={[
                            {
                                required: true,
                                message: '请选择所属素材!',
                            },
                        ]}
                    >
                        <Select
                            placeholder="请选择所属素材"
                            style={{width: 200}}
                        >
                            {
                                resourceMeta && resourceMeta.map(item => {
                                    return (
                                        <Option value={item.id} key={item.id}>{item.mate_name}</Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="素材格式"
                        name="resource_format_id"
                        rules={[
                            {
                                required: true,
                                message: '请选择所属格式!',
                            },
                        ]}
                    >
                        <Select
                            placeholder="请选择所属格式"
                            style={{width: 200}}
                        >
                            {
                                resourceFormat && resourceFormat.map(item => {
                                    return (
                                        <Option value={item.id} key={item.id}>{item.format_name}</Option>
                                    )
                                })
                            }
                        </Select>
                    </Form.Item>
                    {/*资源价格*/}
                    <Form.Item
                        label="资源价格"
                        name="resource_price"
                        rules={[
                            {
                                required: true,
                                message: '请输入资源价格!',
                            },
                        ]}
                    >
                        <Input placeholder={"请输入资源价格"} style={{width: 200}}/>
                    </Form.Item>
                    {/*上传焦点图 和 封面图*/}
                    <Form.Item
                        label="资源封面图"
                    >
                        <YQUploadImg
                            upLoadBtnTitle={"资源封面图"}
                            upLoadName={"resource_upload_img"}
                            upLoadAction={"/api/auth/resource/upload_resource"}
                            successCallBack={(name) => {
                                this.setState({
                                    imageUrl: name
                                })
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="资源焦点图"
                    >
                        <YQUploadImg
                            upLoadBtnTitle={"资源焦点图"}
                            upLoadName={"resource_upload_img"}
                            upLoadAction={"/api/auth/resource/upload_resource"}
                            successCallBack={(name) => {
                                this.setState({
                                    focusImageUrl: name
                                })
                            }}
                        />
                    </Form.Item>
                    {/*多文件上传*/}
                    <Form.Item
                       label={"幼教资源"}
                    >
                        <Dragger
                            name='resource_file'
                            multiple={true}
                            action={'/api/auth/resource/upload_many_file'}
                            onChange={(info)=>{
                                const { status } = info.file;
                                if (status !== 'uploading') {
                                    // console.log(info.file, info.fileList);
                                }
                                if (status === 'done') {
                                   if(info.file.response && info.file.response.status === 1){
                                       // 更新状态机
                                       let tempArr = this.state.dragFileList;
                                       tempArr.push(info.file.response.data);
                                       this.setState({
                                           dragFileList: tempArr
                                       }, ()=>{
                                           console.log(this.state.dragFileList);
                                           message.success(`${info.file.name} 文件上传成功!`);
                                       });
                                   }
                                } else if (status === 'error') {
                                    message.error(`${info.file.name} 文件上传失败!`);
                                }
                            }}
                            onRemove={(file)=>{
                                // console.log(file);
                                // 1. 取出本地的文件数组
                                let tempArr = this.state.dragFileList;
                                let newTempArr = [];
                                for(let i=0; i<tempArr.length; i++){
                                    if(tempArr[i].uid !== file.response.data.uid){
                                        newTempArr.push(tempArr[i]);
                                    }
                                }
                                // 2. 更新状态机
                                this.setState({
                                    dragFileList: newTempArr
                                }, ()=>{
                                    console.log(this.state.dragFileList);
                                });
                            }}
                        >
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">单击或者拖拽文件到此区域上传</p>
                            <p className="ant-upload-hint">支持单个或多个文件上传</p>
                        </Dragger>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            保存
                        </Button>
                        <Divider type="vertical"/>
                        <Button type="danger" htmlType="submit" onClick={()=>{
                            this.props.history.goBack();
                        }}>
                            取消
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}

export default AddResource;
