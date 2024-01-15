import React, { useEffect, useState } from 'react';
import style from './PhotoGrid.module.css';

export default function PhotoGrid({ imageArray, openImageModalWithImage }) {
    const [images, setImages] = useState([]);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    const assignIndex = (images, numColumns) => {
        if (images.length === 0) { return setImages([]); }

        let columnHeights = [0,-300,-300,0];
        const index_assigned_images = images.map(image => {
            let minColumn = columnHeights.indexOf(Math.min(...columnHeights));
            image.column = minColumn;
            columnHeights[minColumn] += image.compressed_height;
            return image;
        });

        setImages(index_assigned_images);
    }

    useEffect(() => {
        // Function to handle screen resize
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        }

        // Add resize event listener
        window.addEventListener('resize', handleResize);

        // Clean up
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    useEffect(() => {
        const numColumns = screenWidth >= 1000 ? 4 : 2;
        assignIndex(imageArray, numColumns);
    }, [imageArray, screenWidth]);

    return (
        <div className={style.row}>
            {[...Array(screenWidth >= 1000 ? 4 : 2)].map((_, colIndex) => (
                <div key={colIndex} className={`${screenWidth >= 1000 ? `${style.column4}` : `${style.column2}`}`}>
                    {images && images.filter((image) => image.column === colIndex).map(image => (
                        <img key={image.image_key} src={image.url} alt='img' onClick={() => openImageModalWithImage(image)} />
                    ))}
                </div>
            ))}
        </div>
    );
}
