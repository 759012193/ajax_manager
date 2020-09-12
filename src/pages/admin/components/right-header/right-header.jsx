import React from 'react'
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
// 引入类型检测库
import PropTypes from 'prop-types'
//
import ajax from './../../../../api/index'
import "./right-header.css"
import {Layout,Button,message} from "antd";
const { Header} = Layout;


class RightHeader extends React.Component{
    static propsType = {
        collapsed: PropTypes.bool.isRequired, // 控制收缩
        toggle: PropTypes.func.isRequired // 函数控制收缩
    };
	
	state={
		picURL:'',//图片
		notice:'' //天气温度和具体信息
	};
	
	componentDidMount(){
		//
		this._getWeather();
	};
	
	//天气预报
	//http://api.map.baidu.com/telematics/v3/weather?location=%E4%B8%8A%E6%B5%B7&output=json&ak=KnHVOML3NCoHEjn8SsDESlKnGsexhhr7
	_getWeather(){
		//1.定义常量
		const CITY="南昌";
		const KEY="KnHVOML3NCoHEjn8SsDESlKnGsexhhr7";
		const URL=`/bd_weather_diulei/weather?location=${CITY}&output=json&ak=${KEY}`;
		
		ajax(URL).then((result)=>{
			console.log(result.data);
			if(result.data.error===0){
				let res=result.data.results[0].weather_data[0];
				let picURL=res.dayPictureUrl;
				let notice=res.weather+' '+res.temperature;
				console.log(res);
				
				
				this.setState({
					picURL,
					notice
				});
			}
		}).catch((error)=>{
			message.error("获取天气信息失败");
		})
		
	}
    render() {
		const {picURL,notice}= this.state;
           return (
               <Header className="header">
                   {React.createElement(this.props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                       className: 'trigger',
                       onClick: this.props.toggle,
                   })}
				   <div className="header-content">
				                      <h3 className="header-content-brand">引擎计划-撩学堂后台管理系统</h3>
				                      <div className="header-content-right">
				                          <img src={picURL} alt=""/>
				                          <span>{notice}</span>
				                          <Button type="danger" className="exit-btn">退出</Button>
				                      </div>
				                  </div>
               </Header>
           )
        }
}

export default  RightHeader;