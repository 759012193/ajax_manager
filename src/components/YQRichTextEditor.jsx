import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {ContentUtils} from 'braft-utils'
import {Upload} from 'antd'

import config from './../config/config'

// 引入编辑器组件
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'

class YQRichTextEditor extends React.Component {
    static propTypes = {
        uploadName: PropTypes.string.isRequired, // 上传图片的key
        uploadAction: PropTypes.string.isRequired, // 上传图片的接口地址
        successCallBack: PropTypes.func.isRequired
    };

    state = {
        // 设置编辑器初始内容
        editorState: BraftEditor.createEditorState(null)
    };

    // 内容发生改变
    handleChange = (editorState) => {
        // console.log(editorState.toHTML());
        this.props.successCallBack && this.props.successCallBack(editorState.toHTML());
        this.setState({
            editorState: editorState
        })
    };

    // 配置富文本编辑器内部的控件
    editControls = [
        'undo', 'redo', 'separator',
        'font-size', 'line-height', 'letter-spacing', 'separator',
        'text-color', 'bold', 'italic', 'underline', 'strike-through', 'separator',
        'superscript', 'subscript', 'remove-styles', 'emoji', 'separator', 'text-indent', 'text-align', 'separator',
        'headings', 'list-ul', 'list-ol', 'blockquote', 'code', 'separator',
        'link', 'separator', 'hr', 'separator',
        'separator',
        'clear'
    ];



    uploadHandler = (info) => {
        console.log(info);
        if (info.file.status === 'uploading') {
            return;
        }
        // 获取服务端返回的响应数据
        if (info.file.response && info.file.status === 'done' && info.file.response.status === 1) {
            const name = info.file.response.data.name;
            console.log(name);
            this.setState({
                editorState: ContentUtils.insertMedias(this.state.editorState, [{
                    type: 'IMAGE',
                    url: config.BASE_URL + name
                }])
            })
        }
    };

    extendControls = [
        {
            key: 'antd-uploader',
            type: 'component',
            component: (
                <Upload
                    name={this.props.uploadName}
                    accept="image/*"
                    action={this.props.uploadAction}
                    showUploadList={false}
                    onChange={this.uploadHandler}
                >
                    <button type="button" className="control-item button upload-button" data-title="插入图片">
                        插入图片
                    </button>
                </Upload>
            )
        }
    ];

    render() {
        const {editorState} = this.state;
        return (
            <div>
                <div className="editor-wrapper">
                    <BraftEditor
                        controls={this.editControls}
                        extendControls={this.extendControls}
                        value={editorState}
                        style={{border: '1px solid lightgray'}}
                        onChange={this.handleChange}
                    />
                </div>
            </div>
        )

    }
}

export default connect(null, null)(YQRichTextEditor);
