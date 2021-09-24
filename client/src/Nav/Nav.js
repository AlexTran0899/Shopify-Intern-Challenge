import './Nav.css'
import { Input } from 'antd';
import "antd/dist/antd.css";
import Login from './Login'
import Signup from './SignUp'
import Cart from './Cart'

const { Search } = Input;
function Nav(props) {
    const { setSearch } = props
    const onSearch = value => {
        setSearch(value)
    }
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
                <Signup size='large' />
                {/* <Cart /> */}
            </div>
        </div >
    );
}

export default Nav;
