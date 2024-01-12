import React, {useEffect, useState} from 'react'
import style from './PhotoGrid.module.css'

export default function PhotoGrid({imageArray, openImageModalWithImage}) {
    const [images, setImages] = useState([])
    const assignIndex = (images) =>{
        if (images.length === 0) { return }
        let counter = 0
        const index_assigned_images = images.map(image => {
            image.column = counter
            counter = (counter + 1) % 4
            return image
        })
        setImages(index_assigned_images)
    }

    useEffect(() => {
        assignIndex(imageArray)
    }, [imageArray]);

    return (
        <div className={style.row}>
            <div className={style.column}>
                {images && images.filter((image) => image.column === 0).map(image =>
                    <img key={image.image_id} src={image.url} alt='img' onClick={() => openImageModalWithImage(image)}/>)}
            </div>
            <div className={style.column}>
                {images && images.filter((image) => image.column === 1).map(image =>
                    <img key={image.image_id} src={image.url} alt='img' onClick={() => openImageModalWithImage(image)}/>)}
            </div>
            <div className={style.column}>
                {images && images.filter((image) => image.column === 2).map(image =>
                    <img key={image.image_id} src={image.url} alt='img' onClick={() => openImageModalWithImage(image)}/>)}
            </div>
            <div className={style.column}>
                {images && images.filter((image) => image.column === 3).map(image =>
                    <img key={image.image_id} src={image.url} alt='img' onClick={() => openImageModalWithImage(image)}/>)}
            </div>
        </div>
    )
}
