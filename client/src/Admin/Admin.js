import React, {useEffect, useState} from 'react'
import style from './Admin.module.css'
import axiosWithAuth from "../Utils/AxiosWithAuth";
import displayErrorAlert from "../Utils/DisplayErrorAlert";
import ImageCard from "./ImageCard/ImageCard";
import ImageContainer from "./ImageContainer/ImageContainer";
export default function Admin() {
    const [images, setImages] = useState([])

    useEffect(() => {
        fetchUserImage()
    }, []);
    const fetchUserImage = () => {
        axiosWithAuth().get(`${process.env.REACT_APP_API_URL}/api/images/user-image`)
            .then(res => setImages(res.data))
            .catch(displayErrorAlert)
    }

    return (
        <div className={style.body}>
            {images && <ImageContainer images={images} />}
        </div>
    )
}
