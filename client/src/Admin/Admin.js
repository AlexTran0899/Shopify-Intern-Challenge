import React, {useEffect, useState} from 'react'
import style from './Admin.module.css'
import axiosWithAuth from "../Utils/AxiosWithAuth";
import displayErrorAlert from "../Utils/DisplayErrorAlert";
import ImageContainer from "./ImageContainer/ImageContainer";
import AdminNavBar from "./AdminNavBar/AdminNavBar";
export default function Admin() {
    const [images, setImages] = useState([])
    const [searchText, setSearchText] = useState("")

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
            <AdminNavBar/>
            {images && <ImageContainer images={images} />}
        </div>
    )
}
