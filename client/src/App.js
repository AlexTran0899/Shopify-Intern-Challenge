import { useEffect, useState } from 'react';
import './App.css';
import Home from './HopePage/HomePage'
import Nav from './Nav/Nav'


function App() {
  const [isLogedIn, setisLogedIn] = useState(false)
  useEffect(() => {
    const token = window.localStorage.getItem('token')
    if (token) {
      setisLogedIn(true)
    } else {
      setisLogedIn(false)
    }
  }, )
  return (
    <div className="App">

      <Nav />
      {isLogedIn? null: <Home />}
    </div>
  );
}

export default App;
