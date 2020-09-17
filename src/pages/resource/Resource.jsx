import React from 'react'
import {connect} from 'react-redux'

// 引入路由组件
import {Switch, Route} from 'react-router-dom'

// 引入页面组件
import AddResource from './pages/AddResource'
import EditResource from './pages/EditResource'
import ResourceList from './pages/ResourceList'
import NotFound from './../notFound/NotFound'


class Resource extends React.Component{
    render() {
        return (
            <Switch>
                <Route exact path={"/resource/add-resource"} component={AddResource}/>
                <Route exact path={"/resource/edit-resource"} component={EditResource}/>
                <Route exact path={"/resource"} component={ResourceList}/>
                <Route component={NotFound}/>
            </Switch>
        )
    }
}

export default connect(null, null)(Resource);
