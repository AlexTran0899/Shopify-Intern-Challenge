import './Nav.css'
import "antd/dist/antd.css";
import { useEffect, useState } from 'react';
import Login from './Login'
import Signup from './SignUp'

function Nav(props) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisible2, setIsModalVisible2] = useState(false);
    const { setSearch } = props
    const [values, setValues] = useState(null)
    const onSubmit = e => {
        e.preventDefault()
        if (values.toLowerCase() === 'login') {
            setIsModalVisible(true)
        } 
        else if (values.toLowerCase() === 'signup') {
            setIsModalVisible2(true)
        }
        else if(values.toLowerCase() === 'github'){
            window.location.href = 'https://github.com/AlexTran0899/Shopify-Developer-Intern-Challenge';
        }
        else {
            setSearch(values)
        }
    }
    const onChange = (e) => {
        const { value } = e.target;
        setValues(value);
    };
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
    useEffect(() => {
        type()
    }, [])

    return (
        <div className="Nav">
            <div className='inner'>
                <form className="search" onSubmit={onSubmit}>
                    <input
                        type='search'
                        value={values}
                        onChange={onChange}
                        placeholder={`Search ${text}`}>
                    </input>
                </form>
                <Login isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
                <Signup isModalVisible={isModalVisible2} setIsModalVisible={setIsModalVisible2} />
            </div>
        </div >
    );
}

export default Nav;
