import './index.css'
import Navbar from './Components/Navbar';
import SideNav from './Components/SideNav';
import Home from './Components/Home';
function App() {
  return (
    <div className="App">
      <Navbar/>
      {/* <SideNav/> */}
      <Home/>
    </div>
  );
}

export default App;
