import React, {useEffect, useState} from 'react'
import style from './UploadImageModal.module.css'
import {ReactComponent as CloseIconSVG} from "../../Svg-Icon/close-icon.svg";
import DropZoneFileUpload from './DropzoneFileUpload/DropzoneFileUpload'
import imageCompression from 'browser-image-compression';

export default function UploadImageModal({isShowingUploadModal, closeUploadModal}) {
    const [files, setFiles] = useState([])

    const compressImage = async (imageFile) => {
        console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
        console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        }
        try {
            const compressedFile = await imageCompression(imageFile, options);
            console.log('compressedFile instanceof Blob', compressedFile instanceof Blob);
            console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`);
            return compressedFile
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        compressImage(files[0]).then(r => console.log(r))
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
