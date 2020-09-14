import React from 'react'

import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';


function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

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
    state = {
        loading: false,
        imageUrl: ''
    };

    handleChange = info => {
        console.log(info);
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };

    render() {
        // 取出状态(是否架子啊, 图片地址)
        const { loading, imageUrl } = this.state;

        // 上传按钮
        const uploadButton = (
            <div>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>上传头像</div>
            </div>
        );

        return (
            <Upload
                name="admin_avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="/api/auth/admin/upload_admin_icon"
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
            >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
        );
    }
}

export default YQUploadImg;
