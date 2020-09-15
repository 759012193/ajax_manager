import React from 'react'
import {connect} from 'react-redux'

// 引入antd组件
import {Card, Button, Table, Switch, Divider} from 'antd'

// 表格中的列
const columns = [
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
                <img src={record.job_img} alt="人生封面" width={100}/>
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
                <Switch defaultChecked={record.is_focus} />
            )
        }
    },
    {
        title: '操作',
        render: (text, record)=>{
            return (
                <>
                    <Button>编辑</Button>
                    <Divider type="vertical" />
                    <Button>删除</Button>
                </>
            )
        }
    },
];
// 表格中的行
const data = [
    {
        id: '1',
        job_name: '真正的孤独（经典好文）',
        job_img: 'http://localhost:3001/uploads/images/admin/admin_avatar-1600158534752.jpeg',
        job_author: '静盼花来开',
        is_focus: false
    },
    {
        id: '2',
        job_name: '真正的孤独（经典好文）',
        job_img: 'http://localhost:3001/uploads/images/admin/admin_avatar-1600158534752.jpeg',
        job_author: '静盼花来开',
        is_focus: false
    },
    {
        id: '3',
        job_name: '真正的孤独（经典好文）',
        job_img: 'http://localhost:3001/uploads/images/admin/admin_avatar-1600158534752.jpeg',
        job_author: '静盼花来开',
        is_focus: true
    },
];

class LifeList extends React.Component{
    constructor(props) {
        super(props);

        // 状态机
        this.state = {
            totalSize: 0, // 总记录数
            pageSize: 5, // 每页显示的条数
        }
    }



    render() {
        // 添加按钮
        let addBtn = (
            <Button type="primary" onClick={()=>{
                 this.props.history.push('/lifejob/add-edit');
            }}>添加人生资源</Button>
        );

        const {totalSize, pageSize} = this.state;
        return (
            <Card title="人生资源列表" extra={addBtn}>
                <Table
                    columns={columns}
                    dataSource={data}
                    rowKey={"id"}
                    pagination={{
                        total: totalSize,
                        pageSize,
                        onChange: (page, pageSize)=>{
                             console.log(page, pageSize);
                        }
                    }}
                />
            </Card>
        )
    }
}

export default connect(null, null)(LifeList);