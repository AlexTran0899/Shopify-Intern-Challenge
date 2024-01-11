import React from 'react'
import style from './AdminNavBar.module.css'
import AdminSearchBar from "./AdminSearchBar/AdminSearchBar";
export default function AdminNavBar() {
    return (
        <div className={style.body}>
            <AdminSearchBar/>
        </div>
    )
}
