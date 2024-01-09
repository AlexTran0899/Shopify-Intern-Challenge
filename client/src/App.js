import Home from "./Home.js"
import Admin from "./Admin";
import {Route, Routes} from "react-router-dom";

function App() {
  return (
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/admin" element={<Admin/>}/>
      </Routes>
  );
}

export default App;
