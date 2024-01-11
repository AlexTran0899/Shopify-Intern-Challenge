import React from 'react'
import style from './ImageCard.module.css'
import {ReactComponent as ViewsIcon} from "../../Svg-Icon/views_icon.svg"

export default function ImageCard({image}) {
    return (
        <div className={style.container}>
            <img src={image.url} />
            <div className={style.info}>
                <h1 className={style.imageTitle}>a very long image tytle taht will overflow</h1>
                <div className={style.views}>
                    <span><ViewsIcon width='48px' height='32px'/> Views</span>
                    <h1 style={{marginLeft:'auto'}}>{image.views}</h1>
                </div>
            </div>

        </div>
    )
}
