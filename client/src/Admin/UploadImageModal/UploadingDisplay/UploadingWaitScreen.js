import React, { useState, useEffect } from 'react';
import style from './UploadingWaitScreen.module.css';

export default function UploadingDisplay() {
    const [dots, setDots] = useState(1);

    useEffect(() => {
        setInterval(() => {
            setDots(prevDots => (prevDots % 5) + 1);
        }, 500);

    }, []);

    return (
        <div className={style.main}>
            <section>
                <h1>{'.'.repeat(dots)}</h1>
            </section>
        </div>
    );
}