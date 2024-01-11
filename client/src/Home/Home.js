import React, { useEffect, useState } from 'react';
import style from './Home.module.css';
import axios from "axios";
import SearchBar from "./SearchBar/SearchBar";
import PhotoGrid from "./PhotoGrid/PhotoGrid";
import HambugerMenu from "./ManageProfileCTA/HambugerMenuIcon/HambugerMenu";
import ImageModal from './ImageModal/ImageModal'

export default function Home() {
    const [images, setImages] = useState([]);
    const [isModalShowing, setIsModalShowing] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null)


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/images`).then(
            res => setImages(res.data)
        ).catch(err => console.log(err));
    }, []);

    useEffect(() => {
    }, []);

    const openImageModalWithImage = (image) => {
        setSelectedImage(image)
        setIsModalShowing(true)
    }

    return (
        <div className={style.body}>
            {!isModalShowing && <HambugerMenu/>}
            <SearchBar/>
            {isModalShowing && <ImageModal setIsModalShowing={setIsModalShowing} isShowingModal={isModalShowing} selectedImage={selectedImage}/>}
            {images && <PhotoGrid imageArray={images} openImageModalWithImage={openImageModalWithImage}/>}
        </div>
    );
}
