import React from 'react'
import ImageCard from "../ImageCard/ImageCard";
import style from './ImageContainer.module.css'

export default function ImageContainer({images, openEditImageModal}) {
    return (
        <div className={style.body}>
            {images.map(image => <div key={image.image_key} onClick={() => openEditImageModal(image)}><ImageCard image={image} /></div>)}
        </div>
    )
}
