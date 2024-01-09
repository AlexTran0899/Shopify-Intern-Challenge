import React, { useEffect, useState } from 'react';
import style from './Home.module.css';
import axios from "axios";

export default function Home() {
    const [images, setImages] = useState([]);
    const divideImagesIntoColumn = (images) => {
        let counter = 0;
        if(images){
            setImages(images.map(image => {
                image.index = counter
                counter = (counter + 1) % 4
                return image
            }))
        }
    }

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/images`).then(
            res => divideImagesIntoColumn(res.data)

        ).catch(err => console.log(err));
    }, []);


    const renderColumn = (col) => {
        console.log(col)
        if(images){
            return (
                <div className={style.column}>{images.map(each => each.index === col &&
                    <img src={each.url} alt='img' className={style.column.img}/>
                )}</div>)
        }
    }
    return (
        <div className={style.homePage}>
            <div className={style.row}>
                    {[...Array(4)].map((_, col) => renderColumn(col))}
            </div>

        </div>
    );
}
