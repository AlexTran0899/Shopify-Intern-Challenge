import React, {useState} from 'react'
import style from './SearchBar.module.css'
export default function SearchBar() {
    const [searchText, setSearchText] = useState("")

    return (
        <div  className={style.searchBar}>
            <input type="text" maxLength='255' className={style.inputBox}/>
        </div>
    )
}
