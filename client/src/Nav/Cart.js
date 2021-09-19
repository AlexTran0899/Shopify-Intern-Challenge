import React, { useState } from 'react';
import { Form, Input, Button, Modal } from 'antd';

function Cart() {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    return (
        <div>
            <Button size='large' className='button' onClick={showModal}>
                Cart
            </Button>
            
        </div>
    )
}
export default Cart;