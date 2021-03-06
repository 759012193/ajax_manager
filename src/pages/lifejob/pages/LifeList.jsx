import React from 'react'
import {connect} from 'react-redux'

// 引入antd组件
import {Card, Button, Table, Switch, Divider, message, notification, Modal} from 'antd'

// 引入获取数据接口
import {getJobList, setFocusJob, deleteOneJob} from './../../../api/lifejob'

// 引入配置文件
import config from './../../../config/config'

// 引入存储到本地的工具方法
import {saveObj} from './../../../tools/cache-tool'




class LifeList extends React.Component{
    constructor(props) {
        super(props);
        // 状态机
        this.state = {
            totalSize: 0, // 总记录数
            pageSize: 4, // 每页显示的条数
            jobList: []
        }
    }

    componentDidMount() {
        // 加载列表数据
        this._loadData();
    }

    // 表格中的列
    columns = [
        {
            title: '编号',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: '职场人生标题',
            dataIndex: 'job_name',
            key: 'job_name',
        },
        {
            title: '职场人生封面',
            dataIndex: 'job_img',
            key: 'job_img',
            render: (text, record)=>{
                return (
                    <img src={config.BASE_URL + record.job_img} alt="人生封面" width={100}/>
                )
            }
        },
        {
            title: '所属作者',
            dataIndex: 'job_author',
            key: 'job_author',
        },
        {
            title: '首页焦点',
            dataIndex: 'is_focus',
            key: 'is_focus',
            render: (text, record)=>{
                return (
                    <Switch
                        checkedChildren="是"
                        unCheckedChildren="否"
                        // disabled={record.focus_img.length === 0}
                        defaultChecked={record.is_focus}
                        onChange={(checked)=>{
                            setFocusJob(record.id, Number(checked)).then((result)=>{
                                if(result && result.status === 1){
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
                            // 往本地存储一个tag, 记录是否是 --> 点击编辑进入的
                            saveObj('life_job_edit_tag', 'edit');
                            // 跳转到编辑界面
                            this.props.history.push({
                                pathname: '/lifejob/add-edit',
                                state: {
                                    job: record
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
                                    deleteOneJob(record.id).then((result)=>{
                                        console.log(result);
                                        if(result.data && result.data.status === 1){
                                            message.success(result.data.msg, 1);
                                            console.log(this);
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
        },
    ];

    // 根据页码加载列表数据
    _loadData = (page_num=1, page_size=4)=>{
        getJobList(page_num, page_size).then((result)=>{
            // console.log(result);
            if(result.data && result.data.status === 1){
                 message.success('获取列表数据成功!', 1);
                 this.setState({
                     totalSize: result.data.data.job_count,
                     jobList: result.data.data.job_list,
                 })
             }
        }).catch((error)=>{
            message.error('获取列表数据失败!');
        });
    };

    render() {
        // 添加按钮
        let addBtn = (
            <Button type="primary" onClick={()=>{
                // 往本地存储一个tag, 记录是否是 --> 点击编辑进入的
                 saveObj('life_job_edit_tag', 'add');
                 this.props.history.push('/lifejob/add-edit');
            }}>添加人生资源</Button>
        );

        const {totalSize, pageSize, jobList} = this.state;
        return (
            <Card title="人生资源列表" extra={addBtn}>
                <Table
                    columns={this.columns}
                    dataSource={jobList}
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

export default connect(null, null)(LifeList);
