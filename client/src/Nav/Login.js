import React, { useState } from 'react';
import { Form, Input, Button, Modal } from 'antd';
import axios from 'axios';
const Login = (props) => {
    const { isModalVisible, setIsModalVisible } = props
    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const onFinish = (user) => {
        axios
            .post(`${process.env.REACT_APP_API_URI}/api/auth/login`, user)
            .then(res1 => {
                localStorage.setItem("token", res1.data.token);
                window.location.reload(false)
            })
            .catch(error => {
                alert("Username or password is incorrect");
            })
    };

    return (
        <>
            <Modal footer={null} width='350px' title="Sign in" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form
                    className='form'
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default Login;
