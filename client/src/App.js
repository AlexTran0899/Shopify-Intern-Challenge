import Home from "./Home/Home.js"
import Admin from "./Admin/Admin";
import {Route, Routes} from "react-router-dom";

function App() {
  return (
      <div>
          <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/admin" element={<Admin/>}/>
          </Routes>
      </div>

  );
}

export default App;
