import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Modal } from 'antd';
import axios from 'axios';


const Signup = (props) => {
  const { isModalVisible, setIsModalVisible } = props

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onFinish = (user) => {
    axios
      .post(`${process.env.REACT_APP_API_URI}/api/auth/register`, user)
      .then(res => {
        localStorage.setItem("token", res.data.token);
        window.location.reload(false)
      })
      .catch(error => {
        alert(error.response.data.message);
      })
  };

  return (
    <>
      <Modal footer={null} width='350px' title="Sign Up" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
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
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input />
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

export default Signup;
