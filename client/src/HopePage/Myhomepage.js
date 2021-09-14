import './HomePage.css'
import { useEffect, useState } from 'react';
import axiosWithAuth from '../Utils/axiosWithAuth';
import { Form, Input, Button, Checkbox, Modal, InputNumber } from 'antd';


function editImage() {

}
function HomePage() {
    const [data, setdata] = useState(false)
    const [current, setcurrent] = useState(null)
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        axiosWithAuth()
            .get(`/api/images/Myimage`)
            .then(stuff => setdata(stuff.data))
    }, [])
    useEffect(() => {
        console.log(current)
    }, [current])


    const showModal = (each) => {
        setIsModalVisible(true);
        setcurrent(each)
    };

    const onFinish = (data) => {
        axiosWithAuth()
            .put('/api/images', data)
            .then(res => console.log(res))
        setIsModalVisible(false);
    };

    return (
        <div className="HomePage">
            {data ? data.map(each =>
                <div className='each' onClick={() => showModal(each)}>
                    <>
                        <Modal footer={null} width='350px' title={null} visible={isModalVisible} closeIcon>
                            <Form
                                className='form'
                                name="basic"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
                                initialValues={{image_title: current?.image_title, inventory: current?.inventory, price: current?.price }}
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

                                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                    <Button style={{ marginRight: '22px' }} danger>
                                        Delete Item
                                    </Button>
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Modal>
                    </>

                    <img src={each.url} alt='img' />
                    <h1>{each.image_title ? each.image_title : "Please add title"}</h1>
                    <span>{each.inventory} in stock | </span>
                    <span>${each.price}</span>
                </div>
            )
                : null}
        </div>
    );
}

export default HomePage;
