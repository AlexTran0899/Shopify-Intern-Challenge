import React, { useState} from 'react'
import style from './UploadImageModal.module.css'
import {ReactComponent as CloseIconSVG} from "../../Svg-Icon/close-icon.svg";
import DropZoneFileUpload from './DropzoneFileUpload/DropzoneFileUpload'
import AxiosWithAuth from "../../Utils/AxiosWithAuth";
import UploadingWaitScreen from "./UploadingDisplay/UploadingWaitScreen";
import DisplayNetworkErrorAlert from "../../Utils/DisplayNetworkErrorAlert";
import {REACT_APP_API_URL} from '../../Utils/Config'
export default function UploadImageModal({isShowingUploadModal, closeUploadModal,addImage}) {
    const [files, setFiles] = useState([])
    const [isUploading, setIsUploading] = useState(false)

    const uploadImageNetworkRequest = async (image_file) => {
        const formData = new FormData();
        formData.append('image', image_file);
        try {
            const response = await AxiosWithAuth().post(`${REACT_APP_API_URL}/api/uploadImage`, formData, {
                headers: {'Content-Type': 'multipart/form-data'}});
            return response.data;
        } catch (error) {
            DisplayNetworkErrorAlert(error);
        }
    }

    const uploadImage = async  (image_file) => {
        const data = await uploadImageNetworkRequest(image_file)
        if(!data.image_key) {return alert('skipping current file')}
        addImage(data)
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
                    {files.length > 0 && isUploading && <button className={style.timeRemainingDisplay}>{files.length + 1} FILE(S) REMAINING</button>}
                    <CloseIconSVG className={style.closeButton} onClick={closeUploadModal}/>
                </div>
            </div>
        </div>
    </div>
    )
}
