import React, {useState} from 'react'
import style from './LoginAndRegisterForm.module.css'
import {ReactComponent as CloseIconSVG} from "../../../svg-icon/close-icon.svg";
export default function LoginAndRegisterForm({closeMenu}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegisteringChecked, setIsRegisteringChecked] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('email:', email, 'Password:', password);
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
