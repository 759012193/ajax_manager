import React from 'react'
import {connect} from 'react-redux'

import {Switch, Route} from 'react-router-dom'

import AccountSetting from './pages/AccountSetting'
import MemberCount from './pages/MemberCount'

class Setting extends React.Component{
    render() {
        return (
           <div>
               <Switch>
                   <Route path={"/setting/account"} component={AccountSetting}/>
                   <Route path={"/setting/member"} component={MemberCount}/>
               </Switch>
           </div>
        )
    }
}

export default connect(null, null)(Setting);
