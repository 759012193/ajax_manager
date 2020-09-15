import React from 'react'
import PropTypes from 'prop-types'

import { Modal } from 'antd';

class EditPassword extends React.Component{
    static propTypes = {
        visible: PropTypes.bool.isRequired,
        hideFunc: PropTypes.func.isRequired
    };


    handleOk = e => {
        console.log(e);
    };

    handleCancel = e => {
        console.log(e);
        this.props.hideFunc();
    };

    render() {
        return (
            <Modal
                title="Basic Modal"
                visible={this.props.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        )
    }
}

export default EditPassword;
