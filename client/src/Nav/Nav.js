import './Nav.css'
import axios from 'axios'
import { useEffect, useState } from 'react';
import { Input, Space } from 'antd';
import { Button } from 'antd';
import "antd/dist/antd.css";
import Upload from '../Upload/Upload'


const { Search } = Input;
function Nav() {
    const onSearch = value => console.log(value);
    const [upload, setUpload] = useState(false)
    return (
        <div className="Nav">

            <Button size='large' className='button'>Sign In</Button>
            <Button size='large' className='button'>Sign Up</Button>
            <Search
                className='searchbox'
                placeholder="input search text"
                enterButton="Search"
                size="large"
                onSearch={onSearch}
            />
            <Upload />
        </div >
    );
}

export default Nav;
