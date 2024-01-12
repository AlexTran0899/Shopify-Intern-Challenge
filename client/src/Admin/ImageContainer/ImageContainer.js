import React from 'react'
import ImageCard from "../ImageCard/ImageCard";
import style from './ImageContainer.module.css'

export default function ImageContainer({images, openEditImageModal}) {
    return (
        <div className={style.body}>
            {images.map(image => <div onClick={() => openEditImageModal(image)}><ImageCard key={image.image_id} image={image} /></div>)}
        </div>
    )
}
