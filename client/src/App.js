import { useEffect, useState } from 'react';
import './App.css';
import Home from './HopePage/HomePage'
import Nav from './Nav/Nav'
import NavLogedIn from './Nav/NavLogedIn'
import Myhomepage from './HopePage/Myhomepage'
function App() {
  const [isLogedIn, setisLogedIn] = useState(false)
  const [search, setSearch] = useState(false)

  useEffect(() => {
    const token = window.localStorage.getItem('token')
    if (token) {
      setisLogedIn(true)
    } else {
      setisLogedIn(false)
    }
  }, [])

  return (
    <div className="App">
      {isLogedIn ? <div>
        <NavLogedIn search={search} setSearch={setSearch} />
        <Myhomepage search={search} setSearch={setSearch} />
      </div> :
        <div>
          <Nav search={search} setSearch={setSearch} />
          <Home search={search} setSearch={setSearch} /></div>}
    </div>
  );
}

export default App;
