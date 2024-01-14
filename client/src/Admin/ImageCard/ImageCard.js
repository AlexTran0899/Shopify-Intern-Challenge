import React from 'react'
import style from './ImageCard.module.css'
import {ReactComponent as ViewsIcon} from "../../Svg-Icon/views_icon.svg"
import {ReactComponent as GlobeIcon} from "../../Svg-Icon/global-icon.svg"

export default function ImageCard({image}) {
    return (
        <div className={style.container}>
            <img src={image.url} />
            <div className={style.info}>
                <div >
                    <h1 className={style.imageTitle}>{image.image_title}</h1>
                    {image.public === 1 && <div style={{display:'flex', alignItems:'end'}}>
                        <GlobeIcon width='24px' height='24px' style={{marginRight:'5px'}}/>
                        <p style={{fontSize:'20px'}}>Public</p>
                    </div>}
                </div>
            </div>
        </div>
    )
}
