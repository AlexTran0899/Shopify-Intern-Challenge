import React from 'react';
import style from "./EditImageModal.module.css";
import {ReactComponent as CloseIconSVG} from "../../Svg-Icon/close-icon.svg";

export default function EditImageModal({closeEditImageModal, selectedImage}) {
    return (
        <div>
            <div className={`${style.modal} ${style.openModal}`}>
                <div className={style.modalContent}>
                    <div className={style.footer}>
                        <CloseIconSVG className={style.closeButton} onClick={closeEditImageModal}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
