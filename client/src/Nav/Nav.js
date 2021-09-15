import './Nav.css'
import axios from 'axios'
import { useEffect, useState } from 'react';
import { Input, Space } from 'antd';
import "antd/dist/antd.css";
import Upload from '../Upload/Upload'
import Login from './Login'
import Signup from './SignUp'

const { Search } = Input;
function Nav() {
    const onSearch = value => console.log(value);
    return (
        <div className="Nav">
            <div className='inner'>
            <Search
                className='searchbox'
                placeholder="Search anything"
                enterButton="Search"
                size="large"
                className='searchbar'
                onSearch={onSearch}
            />
            <Login size='large' />
            <Signup size='large'/>
            </div>
        </div >
    );
}

export default Nav;
