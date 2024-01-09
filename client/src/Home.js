import React, {useEffect} from 'react'
import axios from "axios";

export default function Home() {
    useEffect(() => {
        axios.get('/')
    }, []);
    return (
        <div>
            <h1>this is the home page</h1>
        </div>
    )
}
