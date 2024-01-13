import React, {useEffect, useState} from 'react'
import style from './Admin.module.css'
import axiosWithAuth from "../Utils/AxiosWithAuth";
import displayNetworkErrorAlert from "../Utils/DisplayNetworkErrorAlert";
import ImageContainer from "./ImageContainer/ImageContainer";
import AdminNavBar from "./AdminNavBar/AdminNavBar";
import UploadImageModal from './UploadImageModal/UploadImageModal'
import WelcomeNewUserScreen from "./WelcomeNewUserScreen/WelcomeNewUserScreen";
import EditImageModal from "./EditImageModal/EditImageModal";

export default function Admin() {
    const [images, setImages] = useState([])
    const [searchText, setSearchText] = useState("")
    const [isShowingUploadModal, setIsShowingUploadModal] = useState(false)
    const [isShowingEditImageModal, setIsShowingEditImageModal] = useState(false)
    const [selectedImage, setSelectedImage] = useState({})

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
            <AdminNavBar openUploadModal={openUploadModal}/>
            {images.length === 0 && <WelcomeNewUserScreen/>}
            {isShowingUploadModal && <UploadImageModal isShowingUploadModal={isShowingUploadModal} closeUploadModal={closeUploadModal} addImage={addImage} />}
            {isShowingEditImageModal && <EditImageModal updateImageInfo={updateImageInfo} selectedImage={selectedImage} closeEditImageModal={closeEditImageModal}/>}
            {images.length > 0 && <ImageContainer images={images} openEditImageModal={openEditImageModal} />}
        </div>
    )
}
