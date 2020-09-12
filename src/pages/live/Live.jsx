import React from 'react'
import {connect} from 'react-redux'

class Live extends React.Component{
    render() {
        return (
           <div style={{backgroundColor: 'skyblue'}}>直播课堂</div>
        )
    }
}

export default connect(null, null)(Live);
