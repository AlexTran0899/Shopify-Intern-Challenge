import React from 'react'
import style from './AdminNavBar.module.css'
import AdminSearchBar from "./AdminSearchBar/AdminSearchBar";
import {useNavigate} from "react-router-dom";
export default function AdminNavBar({openUploadModal, fetchAllAdminImage,setImages}) {
    const navigate = useNavigate()
    const logout = () => {
        localStorage.removeItem('email');
        localStorage.removeItem('token');
        setTimeout(() => navigate('/'), 500)
    }



    return (
        <div className={style.body} >
            {/*<button className={style.navBarButton}>Select Multiple</button>*/}
            <button className={style.navBarButton} onClick={openUploadModal}>Upload</button>
            <AdminSearchBar setImages={setImages} fetchAllAdminImage={fetchAllAdminImage}/>
            <button onClick={logout} className={style.navBarButton}>Log Out</button>
        </div>
    )
}
