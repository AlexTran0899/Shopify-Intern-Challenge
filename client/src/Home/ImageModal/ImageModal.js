import React, {useState} from 'react'
import style from './ImageModal.module.css'
import {ReactComponent as CloseIconSVG} from "../../Svg-Icon/close-icon.svg";
import ApplePay from "../../Components/ApplePay/ApplePay";
export default function ImageModal({isShowingModal, selectedImage, setIsModalShowing}) {
    const [originalImageLink, setOriginalImageLink] = useState(null)

    return (
    <div>
        {selectedImage &&
        <div className={`${style.modal} ${isShowingModal ? style.openModal :''}`}>
            <div className={style.modalContent}>
                <img src={selectedImage.url} alt={`image of ${selectedImage.image_title}`}/>
                <h1>{selectedImage.image_title}</h1>
                <div className={style.footer}>

                    {!originalImageLink && <div className={style.btn}><ApplePay item_info={selectedImage} setOriginalImageLink={setOriginalImageLink}/></div>}
                    {originalImageLink && <a className={style.downloadButton} href={originalImageLink} download={selectedImage.image_title}><h1>DOWNLOAD IMAGE</h1></a>}
                    <CloseIconSVG className={style.closeButton} onClick={() => setIsModalShowing(false)}/>
                </div>
            </div>
        </div>
        }
    </div>
    )
}
