import './HomePage.css'
import { useEffect, useState } from 'react';
import axiosWithAuth from '../Utils/axiosWithAuth';
import Editimage from './Editimage'
import { Button } from 'antd';
import { Checkbox } from 'antd';
import { useForm } from 'rc-field-form';

function HomePage() {
    const [data, setdata] = useState(false)
    const [current, setcurrent] = useState(null)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [kop, setKop] = useState(false)
    let selected = {}

    useEffect(() => {
        axiosWithAuth()
            .get(`/api/images/Myimage`)
            .then(stuff => setdata(stuff.data))
    }, [])


    const showModal = (each) => {
        setcurrent(each)
        setIsModalVisible(true);
    };
    const onChange = (data) => {
        if (selected[data.image_key]) {
            delete selected[data.image_key]
        }
        else {
            selected[data.image_key] = true
        }
        if (Object.keys(selected).length !== 0){
            setKop(true)
        }else{
            setKop(false)
        }
    }
    return (
        <div>
            {kop ?
                <div>
                    <Button style={{ width: "50vw" }} size='large' danger type='primary'>Delete All 14 images</Button>
                </div>
                : null
            }

            <div className="HomePage">
                {data ? data.map(each =>
                    <div className='each' >
                        <img src={each.url} alt='img' onClick={() => showModal(each)} />
                        <h1>{each.image_title ? each.image_title : "Please add title"}</h1>
                        <span>{each.inventory} in stock | </span>
                        <span>${each.price}</span>
                        <Checkbox onChange={() => onChange(each)}>Checkbox</Checkbox>
                    </div>
                )
                    : null}
                <Editimage current={current} setcurrent={setcurrent} isModalVisible={isModalVisible} />
            </div>
        </div>
    );
}

export default HomePage;
