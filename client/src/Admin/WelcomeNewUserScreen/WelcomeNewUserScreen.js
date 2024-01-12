import React from 'react'
import style from "./WelcomeNewUserScreen.module.css";

export default function WelcomeNewUserScreen() {
    return (
        <div className={style.welcomeMessage}> <h1>Welcome to the Image For Sale App 🙂</h1>
            <p>Try uploading some photos to see them here.</p></div>
    )
}
