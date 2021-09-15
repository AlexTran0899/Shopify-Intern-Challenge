import './Nav.css'
import axios from 'axios'
import { useEffect, useState } from 'react';
import { Input, Space } from 'antd';
import { Button } from 'antd';
import "antd/dist/antd.css";
import Upload from '../Upload/Upload'

function clearToken(){
    localStorage.removeItem('token')
    window.location.reload(false)
}

const { Search } = Input;
function Nav() {
    const onSearch = value => console.log(value);
    return (
        <div className="Nav">
            <div className='inner'>
                <Search
                    placeholder="Search for your item"
                    enterButton="Search"
                    size="large"
                    className='searchbar'
                    onSearch={onSearch}
                />
                <Button size='large' className='button' >
                    Your Account
                </Button>
                <Upload />
                <Button size='large' onClick={clearToken}>
                    Logout
                </Button>
            </div>
        </div >
    );
}

export default Nav;
