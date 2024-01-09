import React, { useEffect, useState } from 'react';
import style from './Home.module.css';
import axios from "axios";

export default function Home() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/images`).then(
            res => setImages(res.data)
        ).catch(err => console.log(err));
    }, []);

    return (
        <div>
            {images.filter(image => image.url).map(renderImage)}
        </div>
    );

    const renderImage = (image) => {
        return <img key={image.id} src={image.url} alt={`Image ${image.id}`} />;
    };
}
