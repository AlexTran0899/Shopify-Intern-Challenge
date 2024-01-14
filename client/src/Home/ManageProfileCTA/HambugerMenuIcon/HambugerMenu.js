import React, {useState, useEffect} from 'react'
import style from "./HambugerMenu.module.css"
import LoginAndRegisterForm from "../LoginAndRegisterForm/LoginAndRegisterForm";
import {ReactComponent as MenuIconSvg} from "../../../Svg-Icon/hamburger-menu-icon.svg";

export default function HambugerMenu() {
    const [isShowingMenu,setIsShowingMenu] = useState(false)
    const openMenu = () => {
        setIsShowingMenu(true);
    };

    const closeMenu = () => {
        setIsShowingMenu(false)
    }

    return (
        <div className={style.menu}>
            <div
                className={`${style.menu} ${isShowingMenu ? style.rectangle : style.icon}`}
            >
                {isShowingMenu && <LoginAndRegisterForm closeMenu={closeMenu}/>}
                {!isShowingMenu && <MenuIconSvg
                    alt="Menu"
                    height="50"
                    width="50"
                    onClick={openMenu}
                />}
            </div>
        </div>
    )
}
