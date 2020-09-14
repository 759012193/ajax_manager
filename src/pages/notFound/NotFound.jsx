import React from 'react'
import {Button} from 'antd'

// 引入css样式文件
import "./notFound.css"

class Setting extends React.Component{
    render() {
        // console.log(this.props);
        return (
           <div className="not-found">
              <Button type="primary" onClick={()=>this.props.history.replace('/')}>回到首页</Button>
           </div>
        )
    }
}

export default Setting;
