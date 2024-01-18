import React, {useState} from 'react'
import style from './AdminSearchBar.module.css'
import {ReactComponent as SearchIcon} from "../../../Svg-Icon/search_icon.svg";
import AxiosWithAuth from "../../../Utils/AxiosWithAuth";
import {REACT_APP_API_URL} from '../../../Utils/Config'

export default function AdminSearchBar({setImages,fetchAllAdminImage}) {
    const [searchText, setSearchText] = useState("")

    const handleSubmit = async (e) =>{
        e.preventDefault()

        if(searchText === "" || searchText == null) {return fetchAllAdminImage()}

        const result = await AxiosWithAuth().get(`${REACT_APP_API_URL}/api/images/find-admin-image/${searchText}`)
            .then(res => res.data)
            .catch(err => console.log(err))
        setImages(result)
    }

    return (
        <div className={style.body}>
            <form onSubmit={handleSubmit} className={style.searchBar}>
                <input type="text"
                       placeholder="Find Your Photos"
                       // className={style.inputBox}
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
