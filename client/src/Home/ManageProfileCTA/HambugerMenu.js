import React, {useState} from 'react'
import style from "./HambugerMenu.module.css"
import hamburgerMenuSVG from "../../svg-icon/hamburger-menu.svg"

export default function HambugerMenu() {
    const [showingMenu,setShowingMenu] = useState(false)
    const openMenu = () => {
        setShowingMenu(true);
    };

    return (
        <div className={style.menu}>
            <div
                className={`${style.menu} ${showingMenu ? style.rectangle : style.icon}`}
                onClick={openMenu}
            >
                {!showingMenu && <img
                    src={hamburgerMenuSVG}
                    alt="Menu"
                    height="50"
                    width="50"
                />}
            </div>
        </div>
    )
}
