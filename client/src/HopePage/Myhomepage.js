import './HomePage.css'
import { useEffect, useState } from 'react';
import axiosWithAuth from '../Utils/axiosWithAuth';
import Editimage from './Editimage'
import { Button } from 'antd';
import { Checkbox } from 'antd';

function HomePage(props) {
    const [data, setdata] = useState(false)
    const [current, setcurrent] = useState(null)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selected, setSelected] = useState([])

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
        } else {
            const temp = selected
            temp.pop(indexofImage)
            setSelected(temp)
        }
    }
    const deleteAllSelectedImage = (data) => {
        const lastImage = data.pop()
        if (lastImage) {
            axiosWithAuth()
                .delete(`/api/images/deleteOneImage/${lastImage}`)
                .then(stuff => console.log(stuff))
                .then(() => deleteAllSelectedImage(data))
        } else {
            window.location.reload(false)
        }
    }
    const onCancel = () =>{
         window.location.reload(false)
    }
    const deleteAllImage = () => {
        console.log("here")
        axiosWithAuth()
        .delete('/api/images/deleteAll')
        .then(res => console.log(res))
        .then(()=> window.location.reload(false))
    }
    return (
        <div>
            {selected[0] ?
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button style={{ margin: '10px', width: "30vw" }} size='large' danger type='primary' onClick={deleteAllImage}>Delete all of your images</Button>
                    <Button style={{ margin: '10px', width: "30vw" }} size='large' danger type='primary' onClick={() => deleteAllSelectedImage(selected)}>Delete selected images</Button>
                    <Button style={{ margin: '10px', width: "30vw" }} size='large' type='primary'  onClick={onCancel}>Cancel Selected</Button>

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
