import './HomePage.css'
import { useEffect, useState } from 'react';
import axiosWithAuth from '../Utils/axiosWithAuth';
import Editimage from './Editimage'

function HomePage() {
    const [data, setdata] = useState(false)
    const [current, setcurrent] = useState(null)
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        axiosWithAuth()
            .get(`/api/images/Myimage`)
            .then(stuff => setdata(stuff.data))
    }, [])

    const showModal = (each) => {
        setcurrent(each)
        setIsModalVisible(true);
    };
    return (
        <div className="HomePage">
            {data ? data.map(each =>
                <div className='each' onClick={() => showModal(each)}>
                    <img src={each.url} alt='img' />
                    <h1>{each.image_title ? each.image_title : "Please add title"}</h1>
                    <span>{each.inventory} in stock | </span>
                    <span>${each.price}</span>
                </div>
            )
                : null}
                <Editimage current={current} setcurrent={setcurrent} isModalVisible={isModalVisible}/>
        </div>
    );
}

export default HomePage;
