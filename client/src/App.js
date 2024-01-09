import Home from "./Home.js"
import Admin from "./Admin";
import {Link, Route, Routes} from "react-router-dom";

function App() {
  return (
      <div>
          <Link to={'/admin'}>admin</Link>
          <Link to={'/'}>home</Link>
          <Routes>

              <Route path="/" element={<Home/>}/>
              <Route path="/admin" element={<Admin/>}/>
          </Routes>
      </div>

  );
}

export default App;
