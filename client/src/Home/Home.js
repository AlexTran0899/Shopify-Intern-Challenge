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
            {images && images.map((image, index) => {
                if(image.url) {
                    return <img key={index} src={image.url} alt="Image" />;
                }
                return null; // Always include a return in map function
            })}
        </div>
    );
}
