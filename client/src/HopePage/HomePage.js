import './HomePage.css'
import axios from 'axios'
import { useEffect, useState } from 'react';
import ApplePay from './ApplePay';
import { Modal } from 'antd';



function HomePage(props) {
    const [data, setdata] = useState(false)
    const [current, setCurrent] = useState(false)

    const dividngData = (stuff) => {
        let counter = 0;
        setdata(stuff.map(each => {
            each.index = counter
            counter += 1
            if (counter === 4) {
                counter = 0
            }
            return each
        }))
        console.log(data)
    }
    useEffect(() => {
        if (props.search) {
            axios.get(`${process.env.REACT_APP_API_URI}/api/images/find/${props.search}`)
                .then(stuff => dividngData(stuff.data))
        } else {
            axios.get(`${process.env.REACT_APP_API_URI}/api/images`)
                .then(stuff => dividngData(stuff.data))
        }
    }, [props.search])
    const [isModalVisible, setIsModalVisible] = useState(false);



    const showModal = (stuff) => {
        setCurrent(stuff)
        setIsModalVisible(true);
    };

    return (
        <div className="HomePage" >
            <div className="row">
                <div class="column">
                    {data ? data.map(each =>
                        each.index == 0 ? <img src={each.url} alt='img' onClick={() => showModal(each)} /> : null
                    )
                        : null}
                </div>
                <div class="column">
                    {data ? data.map(each =>
                        each.index == 1 ? <img src={each.url} alt='img' onClick={() => showModal(each)} /> : null
                    )
                        : null}
                </div>
                <div class="column">
                    {data ? data.map(each =>
                        each.index == 2 ? <img src={each.url} alt='img' onClick={() => showModal(each)} /> : null
                    )
                        : null}
                </div>
                <div class="column">
                    {data ? data.map(each =>
                        each.index == 3 ? <img src={each.url} alt='img' onClick={() => showModal(each)} /> : null
                    )
                        : null}
                </div>
            </div>
            {isModalVisible ? <Modal footer={null} width='550px' title={null} visible={isModalVisible} closeIcon>
                <img src={current.url} style={{ width: '500px', marginBottom: '20px' }} />
                <ApplePay price={current.price} image_key={current.image_key} setIsModalVisible={setIsModalVisible} isModalVisible={isModalVisible} />
            </Modal> : null}
        </div>
    );
}

export default HomePage;
