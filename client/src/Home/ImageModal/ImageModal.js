import React from 'react'
import style from './ImageModal.module.css'
export default function ImageModal({isShowingModal, selectedImage}) {
    return (
    <div>
        {selectedImage &&
        <div className={`${style.modal} ${isShowingModal ? style.openModal : style.closeModal}`}>
            <div className={style.modalContent}>
                <img src={selectedImage.url} alt={`image of ${selectedImage.image_title}`}/>
                <h1>Image title</h1>
            </div>
        </div>
        }
    </div>
    )
}
