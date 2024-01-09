import React, { useEffect, useState } from 'react';
import style from './Home.module.css';
import axios from "axios";
import SearchBar from "./SearchBar/SearchBar";
import PhotoGrid from "./PhotoGrid/PhotoGrid";
import HambugerMenu from "./ManageProfileCTA/HambugerMenu";

export default function Home() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/images`).then(
            res => setImages(res.data)
        ).catch(err => console.log(err));
    }, []);

    return (
        <div className={style.body}>
            <HambugerMenu/>
            <SearchBar/>
            {images && <PhotoGrid imageArray={images}/>}
        </div>
    );
}
