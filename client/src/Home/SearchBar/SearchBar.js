import React, {useState, useEffect} from 'react'
import style from './SearchBar.module.css'
export default function SearchBar() {
    const [searchText, setSearchText] = useState("")
    const [placeHolderText, setPlaceHolderText] = useState(null)
    const [isInputBoxFocus, setIsInputBoxFocus] = useState(false)

    let isDeleting = false
    const words = ["'car'", "'cave'", "'tree'", 'anything']
    const wait = 2000
    let txt = ''
    let wordIndex = 0
    const type = () => {
        const current = wordIndex % words.length;
        const fullTxt = words[current];
        if (isDeleting) {
            txt = fullTxt.substring(0, txt.length - 1);
        } else {
            txt = fullTxt.substring(0, txt.length + 1);
        }
        setPlaceHolderText(txt)
        let typeSpeed = 100;
        if (isDeleting) {
            typeSpeed /= 2;
        }
        if (!isDeleting && txt === fullTxt) {
            isDeleting = true
            typeSpeed = wait;
        } else if (isDeleting && txt === '') {
            isDeleting = false
            wordIndex++;
            typeSpeed = 500;
        }
        setTimeout(() => type(), typeSpeed);
    }
    useEffect(() => {
        type()
    }, [])

    return (
        <div  className={style.searchBar}>
            <input type="text"
                   maxLength='255'
                   className={style.inputBox}
                   placeholder={`Search for ${placeHolderText}`}
                   onChange={(e) => setSearchText(e.target.value)}
            />
        </div>
    )
}
