import React, {useState} from 'react'
import style from './LoginAndRegisterForm.module.css'
import {ReactComponent as CloseIconSVG} from "../../../svg-icon/close-icon.svg";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function LoginAndRegisterForm({closeMenu}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegisteringChecked, setIsRegisteringChecked] = useState(false);

    const navigate = useNavigate()

    const displayErrorAlert = (error) => {
        const friendlyErrorMessage = error.response.data.message
        alert(friendlyErrorMessage)
    }
    const loginNetworkRequest = () => {
        const loginCredential = {email, password}
        axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, loginCredential)
            .then(res => {
                const email = res.data.email
                const token = res.data.token
                localStorage.setItem('email',email );
                localStorage.setItem('token',token );
                setTimeout(() => navigate('/admin'), 500)
            })
            .catch(displayErrorAlert)
    }
    const registerNetworkRequest = () => {
        const credential = {email, password}
        axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, credential)
            .then(res => {
                const email = res.data.email
                const token = res.data.token
                localStorage.setItem('email',email );
                localStorage.setItem('token',token );
                setTimeout(() => navigate('/admin'), 500)
            })
            .catch(displayErrorAlert)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if(isRegisteringChecked) {
            registerNetworkRequest()
        } else {
            loginNetworkRequest()
        }
    };
    return (
        <div className={style.main}>
            <h1>Access Portal </h1>
            <form onSubmit={handleSubmit} className={style.formBody}>
                <div className={style.inputField}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        placeholder='Please enter your email'
                        maxLength='255'
                        autoComplete="off"
                        value={email}
                        className={style.inputBox}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className={style.inputField}>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        minLength='3'
                        maxLength='255'
                        placeholder='Please enter your password'
                        autoComplete="off"
                        value={password}
                        className={style.inputBox}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className={style.checkbox}>
                    <label>
                        <p>I'm registering a new account: </p>
                    </label>
                    <input
                        type="checkbox"
                        checked={isRegisteringChecked}
                        style={{transform: "scale(1.5)"}}
                        onChange={(e) => setIsRegisteringChecked(e.target.checked)}
                    />
                </div>
                <div className={style.footer}>
                    <button type="submit" className={style.btn}>{isRegisteringChecked ? "REGISTER" : "LOGIN" }</button>
                    <CloseIconSVG className={style.closeButton} onClick={closeMenu}/>
                </div>
            </form>
        </div>
    )
}
