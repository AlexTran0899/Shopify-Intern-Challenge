import './HomePage.css'
import axios from 'axios'
import { useEffect, useState } from 'react';



function HomePage() {
    const [data, setdata] = useState(false)
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URI}/api/images`)
            .then(stuff => setdata(stuff.data))
            .then(() => console.log(data))
    }, [])

    return (
        <div className="HomePage">
            {data ? data.map(each =>
                <div className='each'>
                    <img src={each.url} alt='img'/>
                    <h1>{each.image_title}</h1>
                    <p>${(each.price/100).toFixed(2)}</p>
                </div>
            )
                : null}
        </div>
    );
}

export default HomePage;
