import React, {useState} from 'react'
import style from './LoginAndRegisterForm.module.css'
export default function LoginAndRegisterForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle the form submission logic here
        console.log('email:', email, 'Password:', password);
        // You can integrate your authentication logic here
    };

    return (
        <div className={style.body}>
            <form onSubmit={handleSubmit}>
                <div className={style.inputField}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
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
                        value={password}
                        className={style.inputBox}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}
