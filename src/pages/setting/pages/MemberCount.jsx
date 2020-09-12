import React from 'react'
import {connect} from 'react-redux'

class MemberCount extends React.Component{
    render() {
        return (
           <div style={{backgroundColor: 'blue'}}>会员统计</div>
        )
    }
}

export default connect(null, null)(MemberCount);
