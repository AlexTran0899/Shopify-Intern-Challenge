import React, {useState} from 'react'
import style from './SearchBar.module.css'
export default function SearchBar() {
    const [searchText, setSearchText] = useState("")

    return (
        <div>
            <input type="text" className={style.searchBar}/>
        </div>
    )
}
