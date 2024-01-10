import React, {useState, useEffect} from 'react'
import style from "./HambugerMenu.module.css"
import hamburgerMenuSVG from "../../../svg-icon/hamburger-menu.svg"
import LoginAndRegisterForm from "../LoginAndRegisterForm/LoginAndRegisterForm";
import {ReactComponent as MenuIconSvg} from "../../../svg-icon/hamburger-menu.svg";

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
                    src={hamburgerMenuSVG}
                    alt="Menu"
                    height="50"
                    width="50"
                    onClick={openMenu}
                />}
            </div>
        </div>
    )
}
