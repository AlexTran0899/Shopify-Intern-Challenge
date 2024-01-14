import React, {useEffect, useState} from 'react'
import style from './Admin.module.css'
import axiosWithAuth from "../Utils/AxiosWithAuth";
import displayNetworkErrorAlert from "../Utils/DisplayNetworkErrorAlert";
import ImageContainer from "./ImageContainer/ImageContainer";
import AdminNavBar from "./AdminNavBar/AdminNavBar";
import UploadImageModal from './UploadImageModal/UploadImageModal'
import WelcomeNewUserScreen from "./WelcomeNewUserScreen/WelcomeNewUserScreen";
import EditImageModal from "./EditImageModal/EditImageModal";
import {useNavigate} from "react-router-dom";
import ImageNotFoundScreen from "./ImageNotFoundScreen/ImageNotFoundScreen";

export default function Admin() {
    const [images, setImages] = useState([])
    const [isShowingUploadModal, setIsShowingUploadModal] = useState(false)
    const [isShowingEditImageModal, setIsShowingEditImageModal] = useState(false)
    const [selectedImage, setSelectedImage] = useState({})
    const [isNewUser, setIsNewUser] = useState(false)

    const navigate = useNavigate()
    const checkLoggedIn = () =>{
        return localStorage.getItem("token") !== null
    }

    useEffect(() => {
        if(!checkLoggedIn()) {
            alert('Please login first')
            return navigate('/')
        }

        fetchAllAdminImage()
    }, []);

    const fetchAllAdminImage = () => {
        axiosWithAuth().get(`${process.env.REACT_APP_API_URL}/api/images/user-image`)
            .then(res => {
                const image_data = res.data
                if (image_data.length === 0) {setIsNewUser(true)}
                console.log(image_data)
                setImages(image_data)
            })
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

    const openEditImageModal = (image) => {
        setIsShowingEditImageModal(true)
        setSelectedImage(image)
    }

    const closeEditImageModal = () => {
        setIsShowingEditImageModal(false)
        setSelectedImage({})
    }

    const updateImageInfo = (new_image_info) =>{
        const index = images.findIndex(image => image.image_key === new_image_info.image_key)
        const new_arr = [...images]
        new_arr[index] = new_image_info
        setImages(new_arr)
    }

    return (
        <div className={style.body}>
            <AdminNavBar openUploadModal={openUploadModal} fetchAllAdminImage={fetchAllAdminImage} setImages={setImages}/>
            {images.length === 0 && isNewUser && <WelcomeNewUserScreen/>}
            {images.length === 0 && !isNewUser && <ImageNotFoundScreen/>}
            {isShowingUploadModal && <UploadImageModal isShowingUploadModal={isShowingUploadModal} closeUploadModal={closeUploadModal} addImage={addImage} />}
            {isShowingEditImageModal && <EditImageModal updateImageInfo={updateImageInfo} selectedImage={selectedImage} closeEditImageModal={closeEditImageModal}/>}
            {images.length > 0 && <ImageContainer images={images} openEditImageModal={openEditImageModal} />}
        </div>
    )
}
