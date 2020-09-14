import React from 'react'
import {connect} from 'react-redux'

// 引入样式
import "./admin.css"
import {Switch, Redirect, Route} from 'react-router-dom'
// 引入antd中组件
import { Layout, Menu } from 'antd';
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
import {isLogin} from './../../api/adminApi'
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