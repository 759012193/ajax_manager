import React from 'react'
import {connect} from 'react-redux'
import PubSub from 'pubsub-js'
// 引入样式
import "./admin.css"
import {Switch, Redirect, Route} from 'react-router-dom'
// 引入antd中组件
import { Layout, Menu,Modal} from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';


import RightHeader from './components/right-header/right-header'
import LeftNav from './components/left-nav/left-nav'
import Home from './../home/home'
import Resource from './../resource/Resource'
import LifeJob from './../lifejob/LifeJob'
import Activity from './../activity/Activity'
import Live from './../live/Live'
import Setting from './../setting/Setting'
import NotFound from './../notFound/NotFound'
import {isLogin,removeAdmin} from './../../api/adminApi'
const { Content, Footer} = Layout;

// 引入路由组件


class Admin extends React.Component{

    state = {
        collapsed: false, // 控制左右收缩
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    componentDidMount() {
        // 去订阅token失效信息
        PubSub.subscribe('tokenOut', ()=>{
            // 1. 移动本地管理员信息
            removeAdmin();
            // 2. 提示用户
            Modal.warning({
                title: '您的登录信息已经失效!',
                content: (
                    <div>
                        <p>请重新登录后再操作</p>
                    </div>
                ),
                onOk: ()=>{
                    this.props.history.replace('/login');
                }
            })

        });
    }
    
    componentWillUnmount() {
        PubSub.unsubscribe('tokenOut');
    }

    render() {

        // 判断是否是登录的
        if(!isLogin()){

            console.log(isLogin());
            // 如果没有登录, 则切换到登录界面
            return <Redirect to={'/login'}/>
        }
        return (
            <Layout className="admin-panel">
                {/*左侧*/}
                <LeftNav collapsed={this.state.collapsed} />
                {/*右侧*/}
                <Layout>
                    {/*右侧头部*/}
                    <RightHeader collapsed={this.state.collapsed} toggle={this.toggle} />
                    {/*右侧内容*/}
                    <Content
                        className="admin-content"
                    >
                       <Switch>
                               <Redirect from={"/"} to={"/home"} exact />
                               <Route path={"/home"} component={Home}/>
                               <Route path={"/resource"} component={Resource}/>
                               <Route path={"/lifejob"} component={LifeJob}/>
                               <Route path={"/activities"} component={Activity}/>
                               <Route path={"/live"} component={Live}/>
                               <Route path={"/setting"} component={Setting}/>
                               <Route path={"/notfound"} component={NotFound}/>
                               <Redirect to="/notfound" component={NotFound} />
                        </Switch>
                    </Content>
                    {/*右侧尾部*/}
                    <Footer className="admin-footer">引擎计划</Footer>
                </Layout>
            </Layout>
        )
    }
}

export default connect(null, null)(Admin);