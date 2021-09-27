import { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import './Nav.css'


function SearchBar(props) {
    const [text, setText] = useState(null)
    let isDeleting = false
    const words = ['login', 'signup', 'github', 'anything']
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
        setText(txt)
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
    useEffect(()=>{
        type()
    },[])
    return (
        <div className="search">
            <input
                type='search'
                placeholder={`Search ${text}`}>
            </input>
        </div>
    );
}

export default SearchBar;
