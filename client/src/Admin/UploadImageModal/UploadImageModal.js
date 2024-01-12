import React, {useEffect, useState} from 'react'
import style from './UploadImageModal.module.css'
import {ReactComponent as CloseIconSVG} from "../../Svg-Icon/close-icon.svg";
import DropZoneFileUpload from './DropzoneFileUpload/DropzoneFileUpload'
export default function UploadImageModal({isShowingUploadModal, closeUploadModal}) {
    const [files, setFiles] = useState([])
    useEffect(() => {
        // console.log(files)
    }, [files]);
    return (
    <div>
        <div className={`${style.modal} ${isShowingUploadModal ? style.openModal :''}`}>
            <div className={style.modalContent}>
                <DropZoneFileUpload setFiles={setFiles}/>
                <div className={style.footer}>
                    <button className={style.btn} >UPLOAD</button>
                    <CloseIconSVG className={style.closeButton} onClick={closeUploadModal}/>
                </div>
            </div>
        </div>
    </div>
    )
}
