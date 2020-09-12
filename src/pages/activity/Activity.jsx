import React from 'react'
import {connect} from 'react-redux'

class Activity extends React.Component{
    render() {
        return (
           <div style={{backgroundColor: 'gold'}}>活动专区</div>
        )
    }
}

export default connect(null, null)(Activity);
