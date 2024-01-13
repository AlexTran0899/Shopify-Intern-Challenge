import React from 'react'
import style from "./ImageNotFoundScreen.module.css";

export default function ImageNotFoundScreen() {
    return (
        <div className={style.notFoundMessage}>
            <h1>Yeah I got nothing for that one 😢</h1>
            <p>Try searching something else</p>
        </div>
    )
}
