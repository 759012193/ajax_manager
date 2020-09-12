import React from 'react';


import {Link} from 'react-router-dom'
import xl from './images/xiaoliao.png'
import './left-nav.css'
import PropTypes from 'prop-types';
import { Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
} from '@ant-design/icons';
//引入菜单数据
import menus from './config/menu-config'

const { Sider} = Layout;
const {Item,SubMenu} = Menu;
const icons =[MenuUnfoldOutlined,MenuFoldOutlined,UserOutlined,VideoCameraOutlined,UploadOutlined,UserOutlined,VideoCameraOutlined,UploadOutlined]
class LeftNav extends React.Component{
	
	static propsType = {
	    collapsed: PropTypes.bool.isRequired // 控制收缩
	};
	state={
		menuList:menus
	};
	
	_renderMenu(menuList){
	        return menuList.map((item, index)=>{
	             // 1. 取出一级菜单数据
	            if(!item.children){
	                return (
	                    <Item key={item.path} icon={<MenuUnfoldOutlined />}>
	                        <Link to={item.path}>
	                            <span>{item.title}</span>
	                        </Link>
	                    </Item>
	                )
	            }else {
	                return (
	                    <SubMenu icon={<UploadOutlined />} 
	                        key={item.path}
	                        title={<span>{item.title}</span>}>
	                        {this._renderMenu(item.children)}
	                    </SubMenu>
	                )
	            }
	        });
	    }
	
	render(){
		const {collapsed} = this.props;
		const {menuList} = this.state;
		return(
		<Sider trigger={null} collapsible collapsed={this.props.collapsed}>
		    <div className="logo">
		                        <div className="avatar" style={collapsed ? {width: 50, height: 50} : {}}>
		                            <img src={xl} alt=""/>
		                        </div>
		                        <h4 style={collapsed ? {display: 'none'} : {display: 'block'}}>引擎大总管</h4>
		                    </div>
		    <Menu theme="dark" mode="inline" defaultSelectedKeys={['/pron']}>
		        {this._renderMenu(menuList)}
		    </Menu>
		</Sider>
		)
	}
}

export default LeftNav;