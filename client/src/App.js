import "./index.css";
import Navbar from "./Components/Navbar";
import SideNav from "./Components/SideNav";
import Home from "./Components/Home";

import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/internships" element={<SideNav />} />
      </Routes>
    </div>
  );
}

export default App;
