import React from 'react'
// 引入antd组件
import {Card, Button, Table, Switch, Divider, message, notification, Modal} from 'antd'
// 引入获取数据接口
import {getResourceList, setFocusResource, deleteResource} from './../../../api/resourceApi'
// 引入配置文件
import config from './../../../config/config'

class ResourceList extends React.Component{
    constructor(props) {
        super(props);
        // 状态机
        this.state = {
            totalSize: 0, // 总记录数
            pageSize: 4, // 每页显示的条数
            resourceList: []
        }
    }

    componentDidMount() {
        // 加载列表数据
        this._loadData();
    }

    // 根据页码加载列表数据
    _loadData = (page_num=1, page_size=4)=>{
        getResourceList(page_num, page_size).then((result)=>{
            if(result.data && result.data.status === 1){
                message.success('获取列表数据成功!', 1);
                this.setState({
                    totalSize: result.data.data.resource_count,
                    resourceList: result.data.data.resource_list,
                })
            }
        }).catch((error)=>{
            message.error('获取列表数据失败!');
        });
    };

    // 表格中的列
    columns = [
        {
            title: '编号',
            dataIndex: 'id',
            key: 'id',
            align: 'center'
        },
        {
            title: '幼教标题',
            dataIndex: 'resource_name',
            key: 'resource_name',
            align: 'center'
        },
        {
            title: '幼教封面',
            dataIndex: 'resource_img',
            key: 'resource_img',
            align: 'center',
            render: (text, record)=>{
                return (
                    <img src={config.BASE_URL + record.resource_img} alt="人生封面" width={100}/>
                )
            }
        },
        {
            title: '所属作者',
            dataIndex: 'resource_author',
            key: 'resource_author',
            align: 'center'
        },
        {
            title: '所属分类',
            dataIndex: 'category_name',
            key: 'category_name',
            align: 'center'
        },
        {
            title: '首页焦点',
            dataIndex: 'is_focus',
            key: 'is_focus',
            align: 'center',
            render: (text, record)=>{
                return (
                    <Switch
                        checkedChildren="是"
                        unCheckedChildren="否"
                        disabled={record.focus_img.length === 0}
                        defaultChecked={record.is_focus}
                        onChange={(checked)=>{
                            setFocusResource(record.id, Number(checked)).then((result)=>{
                                if(result.data && result.data.status === 1){
                                    notification['success']({
                                        message: '温馨提示',
                                        description:`${checked ? '设置': '取消'}焦点成功!`
                                    });
                                }
                            });
                        }}
                    />
                )
            }
        },
        {
            title: '操作',
            render: (text, record)=>{
                return (
                    <>
                        <Button onClick={()=>{
                            // 跳转到编辑界面
                            this.props.history.push({
                                pathname: '/resource/edit-resource',
                                state: {
                                    resource: record
                                }
                            })
                        }}>编辑</Button>
                        <Divider type="vertical" />
                        <Button onClick={()=>{
                            Modal.confirm({
                                title: '确认删除该记录吗?',
                                content: '删除此资源,所有关联内容都会被删除!',
                                okText: '确认',
                                cancelText: '取消',
                                onOk: ()=>{
                                    // 调用删除接口
                                    deleteResource(record.id).then((result)=>{
                                        if(result.data && result.data.status === 1){
                                            message.success(result.data.msg, 1);
                                            // 重新拉取数据
                                            this._loadData();
                                        }else {
                                            message.error('删除记录失败!', 1);
                                        }
                                    }).catch((error)=>{
                                        console.log(error);
                                        message.error('删除记录失败!', 1);
                                    });
                                }
                            });
                        }}>删除</Button>
                    </>
                )
            }
        }
    ];

    render() {
        // 添加按钮
        let addBtn = (
            <Button type="primary" onClick={()=>{
                this.props.history.push('/resource/add-resource');
            }}>添加幼教资源</Button>
        );

        const {totalSize, pageSize, resourceList} = this.state;
            
        return (
            <Card title="幼教资源列表" extra={addBtn}>
                <Table
                    columns={this.columns}
                    dataSource={resourceList}
                    rowKey={"id"}
                    pagination={{
                        total: totalSize,
                        pageSize,
                        onChange: (page, pageSize)=>{
                            console.log(page, pageSize);
                            this._loadData(page, pageSize);
                        }
                    }}
                />
            </Card>
        )
    }
}

export default ResourceList;
