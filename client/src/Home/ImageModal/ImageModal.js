import React from 'react'
import style from './ImageModal.module.css'
import {ReactComponent as CloseIconSVG} from "../../Svg-Icon/close-icon.svg";
import ApplePay from "../../Components/ApplePay/ApplePay";
export default function ImageModal({isShowingModal, selectedImage, setIsModalShowing}) {
    return (
    <div>
        {selectedImage &&
        <div className={`${style.modal} ${isShowingModal ? style.openModal :''}`}>
            <div className={style.modalContent}>
                <img src={selectedImage.url} alt={`image of ${selectedImage.image_title}`}/>
                <ApplePay/>
                <h1>{selectedImage.image_title}</h1>
                <div className={style.footer}>
                    <button className={style.btn} >PURCHASE</button>
                    <CloseIconSVG className={style.closeButton} onClick={() => setIsModalShowing(false)}/>
                </div>

            </div>
        </div>
        }
    </div>
    )
}
