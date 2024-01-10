import React, {useState, useEffect} from 'react'
import style from "./HambugerMenu.module.css"
import hamburgerMenuSVG from "../../../svg-icon/hamburger-menu.svg"
import LoginAndRegisterForm from "../LoginAndRegisterForm/LoginAndRegisterForm";

export default function HambugerMenu() {
    const [isShowingMenu,setIsShowingMenu] = useState(false)
    const openMenu = () => {
        setIsShowingMenu(true);
    };

    const closeMenu = () => {

        setIsShowingMenu(false)
    }

    useEffect(() => {
        console.log(isShowingMenu); // This will log the updated state after re-render
    }, [isShowingMenu]);

    return (
        <div className={style.menu}>
            <div
                className={`${style.menu} ${isShowingMenu ? style.rectangle : style.icon}`}
            >
                {isShowingMenu && <LoginAndRegisterForm closeMenu={closeMenu}/>}
                {!isShowingMenu && <img
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
