import React, {useEffect, useState} from 'react'
import style from './PhotoGrid.module.css'

export default function PhotoGrid({imageArray}) {
    const [images, setImages] = useState([])
    const assignIndex = (images) =>{
        let counter = 0
        const index_assigned_images = images.map(image => {
            image.index = counter
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
                {images && images.filter((image) => image.index === 0).map(image => <img src={image.url} alt='img'/>)}
            </div>
            <div className={style.column}>
                {images && images.filter((image) => image.index === 1).map(image => <img src={image.url} alt='img' />)}
            </div>
            <div className={style.column}>
                {images && images.filter((image) => image.index === 2).map(image => <img src={image.url} alt='img' />)}
            </div>
            <div className={style.column}>
                {images && images.filter((image) => image.index === 3).map(image => <img src={image.url} alt='img' />)}
            </div>
        </div>
    )
}
