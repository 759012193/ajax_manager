import React from 'react'

// 引入样式文件
import './home.css'

// 引入路由组件
import {Switch, Route} from 'react-router-dom'

// 引入页面组件
import HomeList from './pages/HomeList'
import HomeCommon from './pages/HomeCommon'
import NotFound from './../notFound/NotFound'

class Home extends React.Component{
    render() {
        return (
            <Switch>
                <Route exact path={"/home"} component={HomeList}/>
                <Route exact path={"/home/common"} component={HomeCommon}/>
                <Route component={NotFound}/>
            </Switch>
        )
    }
}

export default Home;
