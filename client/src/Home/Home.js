import React, { useEffect, useState } from 'react';
import style from './Home.module.css';
import axios from "axios";
import SearchBar from "./SearchBar/SearchBar";
import PhotoGrid from "./PhotoGrid/PhotoGrid";

export default function Home() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/images`).then(
            res => setImages(res.data)
        ).catch(err => console.log(err));
    }, []);


    return (
        <div >
            <SearchBar/>
            {images && <PhotoGrid images={images}/>}
        </div>
    );
}
