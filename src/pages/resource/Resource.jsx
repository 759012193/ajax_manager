import React from 'react'
import {connect} from 'react-redux'

class Resource extends React.Component{
    render() {
        return (
           <div style={{backgroundColor: 'red'}}>幼教资源</div>
        )
    }
}

export default connect(null, null)(Resource);
