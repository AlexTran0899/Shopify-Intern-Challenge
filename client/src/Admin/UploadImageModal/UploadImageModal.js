import React, {useEffect, useState} from 'react'
import style from './UploadImageModal.module.css'
import {ReactComponent as CloseIconSVG} from "../../Svg-Icon/close-icon.svg";
import DropZoneFileUpload from './DropzoneFileUpload/DropzoneFileUpload'
import imageCompression from 'browser-image-compression';
import AxiosWithAuth from "../../Utils/AxiosWithAuth";
import UploadingWaitScreen from "./UploadingDisplay/UploadingWaitScreen";

export default function UploadImageModal({isShowingUploadModal, closeUploadModal,addImage}) {
    const [files, setFiles] = useState([])
    const [isUploading, setIsUploading] = useState(false)

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
        setIsUploading(true)
        while(files.length > 0) {
            await uploadImage(files.pop())
        }
        setIsUploading(false)
        closeUploadModal()

    }

    const addFileToBeUpload = (more_files) => {
        setFiles(old => [...old,...more_files])
    }

    return (
    <div>
        <div className={`${style.modal} ${isShowingUploadModal ? style.openModal :''}`}>
            <div className={style.modalContent}>
                {!isUploading && <DropZoneFileUpload addFileToBeUpload={addFileToBeUpload} setFiles={setFiles}/>}
                {isUploading && <UploadingWaitScreen/>}
                <div className={style.footer}>
                    {files.length > 0 && !isUploading && <button className={style.btn} onClick={uploadAllImage}>UPLOAD {files.length} FILE(S)</button>}
                    {files.length > 0 && isUploading && <button disabled className={style.btn}>{files.length + 1} FILE(S) REMAINING</button>}
                    <CloseIconSVG className={style.closeButton} onClick={closeUploadModal}/>
                </div>
            </div>
        </div>
    </div>
    )
}
