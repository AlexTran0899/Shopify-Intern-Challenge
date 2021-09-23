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
            axiosWithAuth()
                .get(`/api/images/findMyImage/${props.search}`)
                .then(stuff => dividngData(stuff.data))
        } else {
            axiosWithAuth()
                .get(`/api/images/Myimage`)
                .then(stuff => dividngData(stuff.data))
        }
    }, [props.search])

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
    const onCancel = () => {
        window.location.reload(false)
    }
    const deleteAllImage = () => {
        console.log("here")
        axiosWithAuth()
            .delete('/api/images/deleteAll')
            .then(res => console.log(res))
            .then(() => window.location.reload(false))
    }
    return (
        <div>
            {selected[0] ?
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button style={{ margin: '10px', width: "30vw" }} size='large' danger type='primary' onClick={deleteAllImage}>Delete all of your images</Button>
                    <Button style={{ margin: '10px', width: "30vw" }} size='large' danger type='primary' onClick={() => deleteAllSelectedImage(selected)}>Delete selected images</Button>
                    <Button style={{ margin: '10px', width: "30vw" }} size='large' type='primary' onClick={onCancel}>Cancel Selected</Button>

                </div>
                : null
            }

            <div className="HomePage">
            <div className="row">
                <div class="column">
                    {data ? data.map(each =>
                        each.index === 0? <img src={each.url} alt='img' onClick={() => showModal(each)} />: null
                    )
                        : null}
                </div>
                <div class="column">
                    {data ? data.map(each =>
                        each.index === 1? <img src={each.url} alt='img' onClick={() => showModal(each)} />: null
                    )
                        : null}
                </div>
                <div class="column">
                    {data ? data.map(each =>
                        each.index === 2? <img src={each.url} alt='img' onClick={() => showModal(each)} />: null
                    )
                        : null}
                </div>
                <div class="column">
                    {data ? data.map(each =>
                        each.index === 3? <img src={each.url} alt='img' onClick={() => showModal(each)} />: null
                    )
                        : null}
                </div>
            </div>
                <Editimage current={current} setcurrent={setcurrent} isModalVisible={isModalVisible} />
            </div>
        </div>
    );
}

export default Myhomepage;
