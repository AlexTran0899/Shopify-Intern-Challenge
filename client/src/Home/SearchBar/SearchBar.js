import React, { useState, useEffect } from 'react';
import style from './SearchBar.module.css';
import axios from "axios";
import {REACT_APP_API_URL} from '../../Utils/Config'

export default function SearchBar({ setImages, getAllImages }) {
    const [searchText, setSearchText] = useState("");
    const [placeHolderText, setPlaceHolderText] = useState(null);

    const words = ["'car'", "'cave'", "'tree'", 'anything'];
    const wait = 2000;
    let isDeleting = false;
    let txt = '';
    let wordIndex = 0;

    useEffect(() => {
        const type = () => {
            const current = wordIndex % words.length;
            const fullTxt = words[current];

            if (isDeleting) {
                txt = fullTxt.substring(0, txt.length - 1);
            } else {
                txt = fullTxt.substring(0, txt.length + 1);
            }

            setPlaceHolderText(txt);

            let typeSpeed = 100;
            if (isDeleting) {
                typeSpeed /= 2;
            }

            if (!isDeleting && txt === fullTxt) {
                isDeleting = true;
                typeSpeed = wait;
            } else if (isDeleting && txt === '') {
                isDeleting = false;
                wordIndex++;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        };

        const timeoutId = setTimeout(type, 100);

        return () => clearTimeout(timeoutId);
    }, []);

    const onSubmit = async (e) => {
        e.preventDefault();

        if (searchText === "" || searchText == null) {
            return getAllImages();
        }

        const result = await axios.get(`${REACT_APP_API_URL}/api/images/find/${searchText}`)
            .then(res => res.data)
            .catch(err => console.log(err));

        setImages(result);
    };

    return (
        <div>
            <form onSubmit={onSubmit} className={style.searchBar}>
                <input type="text"
                       maxLength='255'
                       className={style.inputBox}
                       placeholder={`Search for ${placeHolderText}`}
                       onChange={(e) => setSearchText(e.target.value)}
                />
            </form>
        </div>
    );
}
