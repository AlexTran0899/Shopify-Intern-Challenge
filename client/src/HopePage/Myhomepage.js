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
    const [selected, setSelected] = useState([])
    const [numberofImage, setnumberofImage] = useState(0)
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
        const indexofImage = selected.indexOf(data.image_key)
        if (indexofImage === -1) {
            setSelected([...selected, data.image_key])
            setnumberofImage(selected.length + 1)
        } else {
            const temp = selected
            temp.pop(indexofImage)
            setSelected(temp)
            setnumberofImage(temp.length)
        }
    }
    const deleteAllSelectedImage = (data) => {
        const lastImage = data.pop()
        if(lastImage){
            axiosWithAuth()
            .delete(`/api/images/${lastImage}`)
            .then(stuff => console.log(stuff))
            .then(()=> deleteAllSelectedImage(data))
        } else {
            window.location.reload(false)
        }
    }
    return (
        <div>
            {numberofImage || selected[0] ?
                <div>
                    <Button style={{ width: "50vw" }} size='large' danger type='primary' onClick={()=> deleteAllSelectedImage(selected)}>Delete All {numberofImage} images</Button>
                    <Button style={{ width: "50vw" }} size='large' type='primary'>Cancel Selected</Button>

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
                        <br />
                        <Checkbox onChange={() => onChange(each)}>Select Image</Checkbox>
                    </div>
                )
                    : null}
                <Editimage current={current} setcurrent={setcurrent} isModalVisible={isModalVisible} />
            </div>
        </div>
    );
}

export default HomePage;
