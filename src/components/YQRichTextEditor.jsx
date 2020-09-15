import React from 'react'
import {connect} from 'react-redux'

// 引入编辑器组件
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'

class YQRichTextEditor extends React.Component{
    state = {
        editorState: BraftEditor.createEditorState('<p>Hello <b>World!</b></p>'), // 设置编辑器初始内容
        outputHTML: '<p>我是一个富文本...</p>'
    };

    componentDidMount () {
        this.isLivinig = true;
        // 3秒后更改编辑器内容
        setTimeout(this.setEditorContentAsync, 3000)
    }

    componentWillUnmount () {
        this.isLivinig = false
    }

    handleChange = (editorState) => {
        this.setState({
            editorState: editorState,
            outputHTML: editorState.toHTML()
        })
    };

    setEditorContentAsync = () => {
        this.isLivinig && this.setState({
            editorState: BraftEditor.createEditorState('<p>你好，<b>世界!</b><p>')
        })
    };

    render () {
        const { editorState, outputHTML } = this.state;
        return (
            <div>
                <div className="editor-wrapper">
                    <BraftEditor
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
