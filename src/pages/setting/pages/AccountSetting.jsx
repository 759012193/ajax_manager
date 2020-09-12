import React from 'react'
import {connect} from 'react-redux'

class AccountSetting extends React.Component{
    render() {
        return (
           <div style={{backgroundColor: 'green'}}>账户设置</div>
        )
    }
}

export default connect(null, null)(AccountSetting);
