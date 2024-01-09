import React, {useState} from 'react'
import style from "./HambugerMenu.module.css"
import hamburgerMenuSVG from "../../svg-icon/hamburger-menu.svg"

export default function HambugerMenu() {
    const [showingMenu,setShowingMenu] = useState(false)

    return (
        <div className={style.menu}>


            <div className={style.menuIcon}>
                <img src={hamburgerMenuSVG} alt="svg"
                     height="50"
                     width="50"
                />
            </div>

        </div>
    )
}
