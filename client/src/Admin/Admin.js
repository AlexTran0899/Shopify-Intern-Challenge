import React, {useEffect, useState} from 'react'
import style from './Admin.module.css'
import axiosWithAuth from "../Utils/AxiosWithAuth";
import displayNetworkErrorAlert from "../Utils/DisplayNetworkErrorAlert";
import ImageContainer from "./ImageContainer/ImageContainer";
import AdminNavBar from "./AdminNavBar/AdminNavBar";
import UploadImageModal from './UploadImageModal/UploadImageModal'
import WelcomeNewUserScreen from "./WelcomeNewUserScreen/WelcomeNewUserScreen";

export default function Admin() {
    const [images, setImages] = useState([])
    const [searchText, setSearchText] = useState("")
    const [isShowingUploadModal, setIsShowingUploadModal] = useState(false)

    useEffect(() => {
        fetchUserImage()
    }, []);
    const fetchUserImage = () => {
        axiosWithAuth().get(`${process.env.REACT_APP_API_URL}/api/images/user-image`)
            .then(res => setImages(res.data))
            .catch(displayNetworkErrorAlert)
    }

    const closeUploadModal = () =>{
        setIsShowingUploadModal(false)
    }

    const openUploadModal = () =>{
        setIsShowingUploadModal(true)
    }

    const addImage = (image_data) => {
        setImages(old => [...old,image_data] )
    }

    return (
        <div className={style.body}>
            {isShowingUploadModal && <UploadImageModal isShowingUploadModal={isShowingUploadModal} closeUploadModal={closeUploadModal} addImage={addImage} />}
            <AdminNavBar openUploadModal={openUploadModal}/>
            {images.length === 0 && <WelcomeNewUserScreen/>}
            {images.length > 0 && <ImageContainer images={images} />}
        </div>
    )
}
