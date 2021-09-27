import './Nav.css'
import { Input } from 'antd';
import "antd/dist/antd.css";
import Login from './Login'
import Signup from './SignUp'
import Cart from './Cart'
import Search from './Search'

function Nav(props) {
    const { setSearch } = props
    const onSearch = value => {
        setSearch(value)
    }
    return (
        <div className="Nav">
            <div className='inner'>
                <Search/>
            </div>
        </div >
    );
}

export default Nav;
