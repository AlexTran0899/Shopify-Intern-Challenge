
import { Form, Input, Button, Checkbox, Modal, InputNumber } from 'antd';
import axiosWithAuth from '../Utils/axiosWithAuth';
import { useEffect, useState } from 'react';



function editImage(props) {
    let isModalVisible = props.isModalVisible
    const current = props.current
    let setcurrent = props.setcurrent
    const onFinish = (data) => {
        console.log(current.image_key)
        axiosWithAuth()
            .put(`/api/images/${current.image_key}`, data)
            .then(res => console.log(res))
            .then(() => setcurrent(false))
            .then(() => window.location.reload(false))
    };
    return (
        <div>
            {current ?
                <Modal footer={null} width='350px' title={null} visible={isModalVisible} closeIcon>
                    <Form
                        className='form'
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ image_title: current.image_title, inventory: current.inventory, price: current.price, public: current.public }}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Image Title"
                            name="image_title"
                            rules={[{ required: true, message: 'Please input your item name!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Inventory"
                            name="inventory"
                            rules={[{ required: true, message: 'Please input your item inventory!' }]}
                        >
                            <InputNumber
                                min={0}
                                style={{ width: 200 }}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Price"
                            name="price"
                            rules={[{ required: true, message: 'Please input your item price!' }]}
                        >
                            <InputNumber
                                style={{ width: 200 }}
                                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                step="0.10"
                            />
                        </Form.Item>
                        <Form.Item
                            name="public"
                            valuePropName="checked"
                            wrapperCol={{ offset: 8, span: 16 }}>
                            <Checkbox>Make item public</Checkbox>
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button style={{ marginRight: '22px' }} danger>
                                Delete Item
                            </Button>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal> : null}

        </div>


    )
}
export default editImage;