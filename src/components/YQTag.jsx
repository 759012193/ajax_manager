import React from 'react'
import { Tag, Input } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
import { PlusOutlined } from '@ant-design/icons';

import PropTypes from 'prop-types'

export default class YQTag extends React.Component {
    static propTypes = {
        tagsCallBack: PropTypes.func.isRequired, // 给外部放回一个标签数组数据
        tagsArr: PropTypes.array, // 外部给入的一个标签数组数据
    };

    state = {
        tags: [], // 标签数据
        inputVisible: false, // 控制输入框的显示和隐藏
        inputValue: '', // 输入框中的值
    };

    // 接受外部传入的数据
    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.tagsArr){
            this.setState({
                tags: nextProps.tagsArr
            })
        }
    }

    handleClose = removedTag => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        console.log(tags);
        this.setState({ tags });

        // 把数据给到调用者
        this.props.tagsCallBack(tags);
    };

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    };

    // 输入框中内容改变
    handleInputChange = e => {
        this.setState({ inputValue: e.target.value });
    };
    // 输入框失去焦点的处理
    handleInputConfirm = () => {
        const { inputValue } = this.state;
        let { tags } = this.state;
        if (inputValue && tags.indexOf(inputValue) === -1) {
            tags = [...tags, inputValue];
        }
        // console.log(tags);
        this.setState({
            tags,
            inputVisible: false,
            inputValue: '',
        });

        // 把数据给到调用者
        this.props.tagsCallBack(tags);
    };

    saveInputRef = input => {
        this.input = input;
    };

    forMap = tag => {
        const tagElem = (
            <Tag
                closable
                onClose={e => {
                    e.preventDefault();
                    this.handleClose(tag);
                }}
            >
                {tag}
            </Tag>
        );
        return (
            <span key={tag} style={{ display: 'inline-block' }}>
        {tagElem}
      </span>
        );
    };

    render() {
        const { tags, inputVisible, inputValue } = this.state;
        const tagChild = tags.map(this.forMap);
        return (
            <>
                <div style={{ marginBottom: 16 }}>
                    <TweenOneGroup
                        enter={{
                            scale: 0.8,
                            opacity: 0,
                            type: 'from',
                            duration: 100,
                            onComplete: e => {
                                e.target.style = '';
                            },
                        }}
                        leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
                        appear={false}
                    >
                        {tagChild}
                    </TweenOneGroup>
                </div>
                {inputVisible && (
                    <Input
                        ref={this.saveInputRef}
                        type="text"
                        size="small"
                        style={{ width: 78 }}
                        value={inputValue}
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputConfirm}
                        onPressEnter={this.handleInputConfirm}
                    />
                )}
                {!inputVisible && (
                    <Tag onClick={this.showInput} className="site-tag-plus">
                        <PlusOutlined /> 新的标签
                    </Tag>
                )}
            </>
        );
    }
}
