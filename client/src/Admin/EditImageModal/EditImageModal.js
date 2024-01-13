import React, {useState, useEffect} from 'react';
import style from "./EditImageModal.module.css";
import {ReactComponent as CloseIconSVG} from "../../Svg-Icon/close-icon.svg";
import AxiosWithAuth from "../../Utils/AxiosWithAuth";

export default function EditImageModal({closeEditImageModal, selectedImage}) {
    const defaultValue = {...selectedImage, price: (selectedImage.price / 100).toFixed(2)}
    const [editedImageInfo,setEditedImageInfo] = useState(defaultValue)
    const [minPriceWarning, setMinPriceWaring] = useState(false)

    const isPriceValid = (price) => {
        if(parseFloat(price) < 0.50) {return false}
        return true
    }
    const onChange = (e) => {
        setMinPriceWaring(false)
        if(e.target.id === 'price') {
            let new_price = e.target.value.replace(/[^\d.]/g, '');
            if(!isPriceValid(new_price)) {setMinPriceWaring(true)}
            e.target.value = new_price
        }
        setEditedImageInfo({...editedImageInfo,[e.target.id]: e.target.value})
    }

    const updateImageInfoNetworkRequest =  () => {
        return AxiosWithAuth().put(`${process.env.REACT_APP_API_URL}/api/images/${selectedImage.image_key}`,editedImageInfo)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!isPriceValid(editedImageInfo.price)){ setMinPriceWaring(true); return}
        await updateImageInfoNetworkRequest()
        closeEditImageModal()
    }
    return (
        <div>
            {selectedImage &&
                <div className={`${style.modal} ${style.openModal}`}>
                    <form onSubmit={handleSubmit} className={style.formBody}>
                    <div className={style.modalContent}>
                        <img src={selectedImage.url} alt={`image of ${selectedImage.image_title}`}/>
                        <div className={style.inputField}>
                            <label htmlFor="image_title">Title: </label>
                            <input
                                type="text"
                                id="image_title"
                                minLength='3'
                                maxLength='255'
                                autoComplete="off"
                                required
                                value={editedImageInfo.image_title}
                                className={style.inputBox}
                                onChange={onChange}
                            />
                        </div>
                        <div className={style.inputField}>
                            <label htmlFor="price">Price: </label>
                            {minPriceWarning && <p style={{color:"red"}}>Cannot be lower than 0.50 cents</p>}
                            <input
                                type="text"
                                id="price"
                                autoComplete="off"
                                required
                                value={editedImageInfo.price}
                                className={style.inputBox}
                                onChange={onChange}
                            />
                        </div>
                        <div className={style.footer}>
                            <button type='submit' className={style.btn}>SAVE CHANGES</button>
                            <CloseIconSVG className={style.closeButton} onClick={() => closeEditImageModal(false)}/>
                        </div>
                    </div>
                    </form>
                </div>
            }
        </div>
    )
}
