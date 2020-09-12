import React from 'react'
import {connect} from 'react-redux'

class LifeJob extends React.Component{
    render() {
        return (
           <div style={{backgroundColor: 'purple'}}>职场人生</div>
        )
    }
}

export default connect(null, null)(LifeJob);
