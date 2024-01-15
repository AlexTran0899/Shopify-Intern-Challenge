import React, {useEffect, useState} from 'react'
import style from './PhotoGrid.module.css'

export default function PhotoGrid({imageArray, openImageModalWithImage}) {
    const [images, setImages] = useState([])
    const assignIndex = (images) => {
        if (images.length === 0) { return setImages([]); }
        let columnHeights = [0, 300, 300, 0];

        const index_assigned_images = images.map(image => {
            let minColumn = columnHeights.indexOf(Math.min(...columnHeights));
            image.column = minColumn;
            columnHeights[minColumn] += image.compressed_height;
            return image;
        });

        setImages(index_assigned_images);
    }

    useEffect(() => {
        assignIndex(imageArray)
    }, [imageArray]);

    return (
        <div className={style.row}>
            <div className={style.column}>
                {images && images.filter((image) => image.column === 0).map(image =>
                    <img key={image.image_key} src={image.url} alt='img' onClick={() => openImageModalWithImage(image)}/>)}
            </div>
            <div className={style.column}>
                {images && images.filter((image) => image.column === 1).map(image =>
                    <img key={image.image_key} src={image.url} alt='img' onClick={() => openImageModalWithImage(image)}/>)}
            </div>
            <div className={style.column}>
                {images && images.filter((image) => image.column === 2).map(image =>
                    <img key={image.image_key} src={image.url} alt='img' onClick={() => openImageModalWithImage(image)}/>)}
            </div>
            <div className={style.column}>
                {images && images.filter((image) => image.column === 3).map(image =>
                    <img key={image.image_key} src={image.url} alt='img' onClick={() => openImageModalWithImage(image)}/>)}
            </div>
        </div>
    )
}
