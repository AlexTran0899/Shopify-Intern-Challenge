import React, {useState} from 'react'
import style from './AdminSearchBar.module.css'
import {ReactComponent as SearchIcon} from "../../../Svg-Icon/search_icon.svg";

export default function AdminSearchBar() {
    const [searchText, setSearchText] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault()
        alert("here")
    }

    return (
        <div className={style.body}>
            <form onSubmit={handleSubmit} className={style.searchBar}>
                <input type="text"
                       placeholder="Find Your Photos"
                       className={style.inputBox}
                       id="searchText"
                       maxLength='255'
                       value={searchText}
                       onChange={(e) => setSearchText(e.target.value)}
                />
                <button type='submit'><SearchIcon width="50px" height="50px" className={style.searchIcon}/></button>
            </form>
        </div>
    )
}
