import React from 'react'
import ImageCard from "../ImageCard/ImageCard";
import style from './ImageContainer.module.css'

export default function ImageContainer({images}) {
    return (
        <div className={style.body}>
            {images.map(image => <ImageCard image={image}/>)}
        </div>
    )
}
