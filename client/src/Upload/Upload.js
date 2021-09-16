import React, { useState } from 'react';
import axiosWithAuth from '../Utils/axiosWithAuth';
import { Upload, Modal, Button, Spin } from 'antd';
import {
    LoadingOutlined,
} from '@ant-design/icons';
import './Upload.less';
// Icons for modal
import Icon from '@ant-design/icons';
import UploadCaseBox from '../Icons/upload-box.svg';
import imageCompression from 'browser-image-compression';

const UploadCase = ({ getPendingCases }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { Dragger } = Upload;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const spinner = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true
    }


    const onFileChange = e => {
        let file = e.pop();
        if (file) {
            const original = new FormData();
            original.append('image', file, file.name);
            setIsLoading(true);
            imageCompression(file, options)
                .then(function (compressedFile) {
                    const fd = new FormData();
                    fd.append('image', compressedFile, file.name);
                    axiosWithAuth()
                        .post('/api/uploadImage', fd)
                        .then(() =>
                            axiosWithAuth()
                                .put('/api/uploadImage/original_image', original)
                                .then(() => console.log("uploaded"))
                                .then(() => onFileChange(e))
                        );
                })
                .catch(function (error) {
                    console.log(error.message);
                });
        } else {
            setIsLoading(false);
            setTimeout(() => window.location.reload(false), 2000);
        }
    };

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const DragProps = {
        name: 'image',
        multiple: true,
        accept: '.jpeg, .png',
        progress: false,
        fileList: [],
        beforeUpload: (file, fileList) => {
            onFileChange(fileList);
        },
    };

    return (
        <div className="uploadPage">
            <div className='button'>
                <Button size='large' onClick={showModal}>
                    <span>Upload Image</span>
                </Button>
                <Modal
                    title=""
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={[
                        <div key="footer" className="footer-btn">
                            <Button className="not-now-btn" key="back" onClick={handleCancel}>
                                Not Now
                            </Button>
                            <Button className="review-btn" key="review" onClick={handleOk}>
                                Review Cases
                            </Button>
                        </div>,
                    ]}
                >
                    <div className="pdf-container">
                        <div>
                            <h1 className="uploadh1">Upload Images</h1>
                            <p className="divider"></p>
                        </div>
                        <div className="pdfUpload">
                            <h2 className="h2Styles">
                                Once your files have finished uploading, please make any
                                necessary corrections to the fields before submitting.
                            </h2>
                            <form>
                                <div className="pdf-upload">
                                    <Dragger {...DragProps}>
                                        <p className="ant-upload-drag-icon">
                                            <Icon
                                                component={() => (
                                                    <img src={UploadCaseBox} alt="uplaod case icon" />
                                                )}
                                            />
                                        </p>
                                        <p className="ant-upload-text">
                                            Click here or drag files to this area to upload
                                        </p>
                                    </Dragger>
                                    <>
                                        {isLoading ? (
                                            <div className="spinner_container">
                                                <Spin indicator={spinner} />
                                            </div>
                                        ) : (
                                            <p />
                                        )}
                                    </>
                                </div>
                            </form>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default UploadCase;