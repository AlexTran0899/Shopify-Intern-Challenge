import React, {useState, useEffect} from 'react'
import style from './SearchBar.module.css'
export default function SearchBar() {
    const [searchText, setSearchText] = useState("")
    const [placeHolderText, setPlaceHolderText] = useState("")
    const fullPlaceholder = "Search for "; // Full placeholder text

    useEffect(() => {
        setInterval(() => {
            setPlaceHolderText((prevText) => {
                return fullPlaceholder.substr(0, prevText.length + 1);
            });
        }, 1000);

    }, []);


    return (
        <div  className={style.searchBar}>
            <input type="text"
                   maxLength='255'
                   className={style.inputBox}
                   placeholder={placeHolderText}
                   onChange={(e) => setSearchText(e.target.value)}
            />
        </div>
    )
}
