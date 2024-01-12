import React, {useEffect, useState} from 'react'
import style from './UploadImageModal.module.css'
import {ReactComponent as CloseIconSVG} from "../../Svg-Icon/close-icon.svg";
import DropZoneFileUpload from './DropzoneFileUpload/DropzoneFileUpload'
import imageCompression from 'browser-image-compression';
import AxiosWithAuth from "../../Utils/AxiosWithAuth";

export default function UploadImageModal({isShowingUploadModal, closeUploadModal,addImage}) {
    const [files, setFiles] = useState([])

    const uploadCompressedImage = async (image_file) => {
        const formData = new FormData();
        formData.append('image', image_file);
        return AxiosWithAuth().post(`${process.env.REACT_APP_API_URL}/api/uploadImage`, formData).then(res => res.data.image_key)
    }

    const uploadOriginalImage = (image_file,image_key_in_DB) => {
        const formData = new FormData();
        formData.append('image', image_file);
        return AxiosWithAuth().put(`${process.env.REACT_APP_API_URL}/api/uploadImage/original_image/${image_key_in_DB}`, formData)
    }

    const compressImage = async (imageFile) => {
        const options = {maxSizeMB: 1, maxWidthOrHeight: 1920, useWebWorker: true,}
        try {
            return await imageCompression(imageFile, options)
        } catch (error) {
            console.log(error);
        }
    }

    const uploadImage = async  (image_file) => {
        const compressed = await compressImage(image_file)
        const image_key = await uploadCompressedImage(compressed)
        const {data} = await uploadOriginalImage(image_file, image_key)
        addImage(data[0])
    }

    const uploadAllImage = async () => {
        while(files.length > 0) {
            await uploadImage(files.pop())
        }
        closeUploadModal()
    }

    return (
    <div>
        <div className={`${style.modal} ${isShowingUploadModal ? style.openModal :''}`}>
            <div className={style.modalContent}>
                <DropZoneFileUpload setFiles={setFiles}/>
                <div className={style.footer}>
                    <button className={style.btn} onClick={uploadAllImage}>UPLOAD</button>
                    <CloseIconSVG className={style.closeButton} onClick={closeUploadModal}/>
                </div>
            </div>
        </div>
    </div>
    )
}
