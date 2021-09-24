import './HomePage.css'
import { useEffect, useState } from 'react';
import axiosWithAuth from '../Utils/axiosWithAuth';
import Editimage from './Editimage'
import { Button } from 'antd';
import { Checkbox } from 'antd';

function Myhomepage(props) {
    const [data, setdata] = useState(false)
    const [current, setcurrent] = useState(null)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selected, setSelected] = useState([])
    const [deletemenu, setdeletemenu] = useState(false)

    useEffect(() => {
        if (props.search) {
            axiosWithAuth()
                .get(`/api/images/findMyImage/${props.search}`)
                .then(stuff => setdata(stuff.data))
                .then(() => console.log(data))
        } else {
            axiosWithAuth()
                .get(`/api/images/Myimage`)
                .then(stuff => setdata(stuff.data))
        }
    }, [props.search])

    const showModal = (each) => {
        setcurrent(each)
        setIsModalVisible(true);
    };
    const onChange = async (data) => {
        const indexofImage = await selected.indexOf(data.image_key)
        if (indexofImage === -1) {
            selected.push(data.image_key)
            console.log(selected)
        } else {
            selected.splice(indexofImage, 1)
            console.log(selected)

        }
        if(selected.length === 0){
            setdeletemenu(false)
        } else {
            setdeletemenu(true)
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
    const onCancel = () => {
        window.location.reload(false)
    }
    const deleteAllImage = () => {
        axiosWithAuth()
            .delete('/api/images/deleteAll')
            .then(res => console.log(res))
            .then(() => window.location.reload(false))
    }
    return (
        <div>
            {deletemenu ?
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button style={{ margin: '10px', width: "30vw" }} size='large' danger type='primary' onClick={deleteAllImage}>Delete all of your images</Button>
                    <Button style={{ margin: '10px', width: "30vw" }} size='large' danger type='primary' onClick={() => deleteAllSelectedImage(selected)}>Delete selected images</Button>
                    <Button style={{ margin: '10px', width: "30vw" }} size='large' type='primary' onClick={onCancel}>Cancel Selected</Button>

                </div>
                : null
            }

            <div className="MyHomePage">
                {data ? data.map(each =>
                    <div className='each' >
                        <img src={each.url} alt='img' onClick={() => showModal(each)} />
                        <h1>{each.image_title ? each.image_title : "Please add title"}</h1>
                        <span>{each.inventory} in stock | </span>
                        <span>${each.price / 100}</span>
                        <br />
                        <Checkbox onChange={() => onChange(each)}>Select Image</Checkbox>
                    </div>
                )
                    : null}
                <Editimage current={current} setcurrent={setcurrent} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
            </div>
        </div>
    );
}

export default Myhomepage;
