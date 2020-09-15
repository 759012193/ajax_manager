import React from 'react'
// 引入类型检测库
import PropTypes from 'prop-types'
// 引入样式文件
import './fonts/iconfont.css'
import './left-nav.css'
// 引入图片
import xl from './images/xiaoliao.png'
// 引入左侧的菜单数据
import menus from './config/menu-config'
// 引入路由组件
import {Link, withRouter} from 'react-router-dom'

import {getAdmin} from './../../../../api/adminApi'

// 引入基础配置
import config from './../../../../config/config'

// 引入订阅组件
import PubSub from 'pubsub-js'


import {Layout, Menu} from "antd";
const { Sider} = Layout;
const {Item, SubMenu} = Menu;

class LeftNav extends React.Component{
    static propsType = {
        collapsed: PropTypes.bool.isRequired, // 控制收缩
    };

    state = {
       menuList: menus,  // 菜单数据
       // 管理员信息
       account_name: getAdmin().account_name,
       account_icon: getAdmin().account_icon,
    };

    /**
     * 渲染左侧菜单
     * @param {Array} menuList
     * @returns {*}
     * @private
     */
    _renderMenu(menuList){
        const {collapsed} = this.props;
        return menuList.map((item, index)=>{
             // 1. 取出一级菜单数据
            if(!item.children){
                return (
                    <Item key={item.path}>
                        <Link to={item.path}>
                            <span style={collapsed ? {fontSize: 25}: {}} className={item.icon} />
                            <span style={collapsed ? {display: 'none'}: {}}>{item.title}</span>
                        </Link>
                    </Item>
                )
            }else {
                return (
                    <SubMenu
                        key={item.path}
                        title={
                            <span>
                                <span  style={collapsed ? {fontSize: 25}: {}}  className={item.icon} />
                                <span style={collapsed ? {display: 'none'}: {}}>{item.title}</span>
                            </span>
                        }
                    >
                        {this._renderMenu(item.children)}
                    </SubMenu>
                )
            }
        });
    }

    componentDidMount() {
        // 订阅管理员信息发生改变
        PubSub.subscribe(config.ADMIN_MSG_CHANGE, (msg, data)=>{
             this.setState({
                 account_name: getAdmin().account_name,
                 account_icon: getAdmin().account_icon
             })
        });
    }

    render() {
        // 获取当前的路由路径
        const path = this.props.location.pathname;
        console.log(path);
        const {collapsed} = this.props;
        const {menuList, account_icon, account_name} = this.state;
        return (
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo" style={collapsed ? {height: 100} : {}}>
                    <div className="avatar" style={collapsed ? {width: 50, height: 50} : {}}>
                        <img src={account_icon ? config.BASE_URL + account_icon : xl} alt=""/>
                    </div>
                    <h4 style={collapsed ? {display: 'none'} : {display: 'block'}}>
                        {account_name ? account_name : '引擎管理员'}
                    </h4>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={[path]}
                    selectedKeys={[path]}
                >
                    {this._renderMenu(menuList)}
                </Menu>
            </Sider>
        )
    }

    componentWillUnmount() {
        PubSub.unsubscribe(config.ADMIN_MSG_CHANGE);
    }
}

export default withRouter(LeftNav);
