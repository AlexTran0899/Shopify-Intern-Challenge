import React, { useEffect, useState } from 'react';
import style from './Home.module.css';
import axios from "axios";
import SearchBar from "./SearchBar/SearchBar";
import PhotoGrid from "./PhotoGrid/PhotoGrid";
import HambugerMenu from "./ManageProfileCTA/HambugerMenuIcon/HambugerMenu";
import ImageModal from './ImageModal/ImageModal'
import {REACT_APP_API_URL} from '../Utils/Config'

export default function Home() {
    const [images, setImages] = useState([]);
    const [isModalShowing, setIsModalShowing] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null)

    const getAllImages = () => {
        axios.get(`${REACT_APP_API_URL}/api/images`).then(
            res => setImages(res.data)
        ).catch(err => console.log(err));
    }

    useEffect(() => {
        getAllImages()
    }, []);

    const openImageModalWithImage = (image) => {
        setSelectedImage(image)
        setIsModalShowing(true)
    }

    return (
        <div className={style.body}>
            {!isModalShowing && <HambugerMenu/>}
            <SearchBar setImages={setImages} getAllImages={getAllImages}/>
            {isModalShowing && <ImageModal setIsModalShowing={setIsModalShowing} isShowingModal={isModalShowing} selectedImage={selectedImage}/>}
            {images && <PhotoGrid imageArray={images} openImageModalWithImage={openImageModalWithImage}/>}
            <div style={{height: '300px'}}></div>
        </div>
    );
}
