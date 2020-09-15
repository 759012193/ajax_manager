import React from 'react'
import {connect} from 'react-redux'

// 引入路由组件
import {Switch, Route} from 'react-router-dom'

// 引入页面组件
import LifeList from './pages/LifeList'
import AddOrEdit from './pages/AddOrEdit'
import NotFound from './../notFound/NotFound'

class LifeJob extends React.Component{
    render() {
        return (
            <Switch>
                <Route path={"/lifejob/add-edit"} component={AddOrEdit}/>
                <Route path={"/lifejob"} component={LifeList}/>
                <Route component={NotFound}/>
            </Switch>
        )
    }
}

export default connect(null, null)(LifeJob);
