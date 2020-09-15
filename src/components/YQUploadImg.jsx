import React from 'react'
import PropTypes from 'prop-types'

import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

// 引入公共配置
import config from './../config/config'


/**
 * 上传之前的验证工作
 * @param file
 * @returns {boolean}
 */
function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' ;
    if (!isJpgOrPng) {
        message.error('上传的图片格式不正确, 格式为JPG或PNG!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('上传的图片大小不能超过2MB!');
    }
    return isJpgOrPng && isLt2M;
}


class YQUploadImg extends React.Component{

    static propTypes = {
        upLoadBtnTitle: PropTypes.string.isRequired, // 上传图片的按钮标题
        upLoadName: PropTypes.string.isRequired, // 上传图片的key
        upLoadAction: PropTypes.string.isRequired, // 上传图片的接口地址
        upDefaultImage: PropTypes.string, // 如果有默认地址
        successCallBack: PropTypes.func.isRequired // 回调函数, 返回图片地址
    };

    state = {
        loading: false,
        imageUrl: ''
    };

    // 父组件传递数据给子组件(接收处)
    componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.upDefaultImage){
            this.setState({
                imageUrl: nextProps.upDefaultImage
            });
        }
    }

    handleChange = info => {
        // 控制loading的
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }

        // 获取服务端返回的响应数据
        if (info.file.response && info.file.status === 'done' && info.file.response.status === 1) {
            const name = info.file.response.data.name;
            // console.log(name);

            // 把结果返回给调用者
            this.props.successCallBack(name);

            // 更新状态机
            this.setState({
                loading: false,
                imageUrl: name
            });
        }
    };

    render() {
        // 取出状态(是否架子啊, 图片地址)
        const { loading, imageUrl } = this.state;
        const { upLoadBtnTitle, upLoadName, upLoadAction} = this.props;

        // 上传按钮
        const uploadButton = (
            <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>{upLoadBtnTitle}</div>
            </div>
        );

        return (
            <Upload
                name={upLoadName}
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action={upLoadAction}
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
            >
                {imageUrl ? <img src={config.BASE_URL + imageUrl} alt="avatar" style={{ width: '100%', height: '100%', backgroundSize: 'cover' }} /> : uploadButton}
            </Upload>
        );
    }
}

export default YQUploadImg;
