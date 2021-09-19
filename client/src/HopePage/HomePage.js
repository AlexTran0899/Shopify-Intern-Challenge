import './HomePage.css'
import axios from 'axios'
import { useEffect, useState } from 'react';
import ApplePay from './ApplePay';
import { Modal } from 'antd';



function HomePage(props) {
    const [data, setdata] = useState(false)
    useEffect(() => {
        if (props.search) {
            axios.get(`${process.env.REACT_APP_API_URI}/api/images/find/${props.search}`)
                .then(stuff => setdata(stuff.data))
                .then(() => console.log(data))
        } else {
            axios.get(`${process.env.REACT_APP_API_URI}/api/images`)
                .then(stuff => setdata(stuff.data))
                .then(() => console.log(data))
        }
    }, [props.search])
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };
  

    return (
        <div className="HomePage" >
            {data ? data.map(each =>
                <div className='each' onClick={showModal} >
                    <img src={each.url} alt='img' />
                    <h1>{each.image_title}</h1>
                    <p>${each.price / 100}</p>
                    <Modal footer={null} width='350px' title={null}  visible={isModalVisible} closeIcon>
                        <ApplePay price={each.price} image_key={each.image_key} setIsModalVisible={setIsModalVisible}/>
                    </Modal>
                </div>
            )
                : null}

        </div>
    );
}

export default HomePage;
