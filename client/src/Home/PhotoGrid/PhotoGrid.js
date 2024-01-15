import React, { useEffect, useState } from 'react';
import style from './PhotoGrid.module.css';

export default function PhotoGrid({ imageArray, openImageModalWithImage }) {
    const [images, setImages] = useState([]);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [columnStyle, setColumnStyle] = useState(style.column4)
    const [numColumn, setNumColumn] = useState(4)

    const assignIndex = async (images, numColumns) => {
        if (images.length === 0) { return setImages([]); }

        let columnHeights = numColumns === 4 ? [0,-300,-300,0] : [0,0];

        const index_assigned_images = images.map(image => {
            let minColumn = columnHeights.indexOf(Math.min(...columnHeights));
            image.column = minColumn;
            columnHeights[minColumn] += image.compressed_height;
            return image;
        });

        setImages(index_assigned_images);
    }

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    useEffect(() => {
        const numCol = screenWidth >= 1000 ? 4 : 2
        setNumColumn(numCol)
        const colStyle = numCol === 4 ? style.column4 : style.column2
        setColumnStyle(colStyle)
        assignIndex(imageArray, numCol).then();
    }, [imageArray, screenWidth]);

    return (
        <div className={style.row}>
            {[...Array(numColumn)].map((_, colIndex) => (
                <div key={colIndex} className={columnStyle}>
                    {images && images.filter((image) => image.column === colIndex).map(image => (
                        <img key={image.image_key} src={image.url} alt='img' onClick={() => openImageModalWithImage(image)} />
                    ))}
                </div>
            ))}
        </div>
    );
}
