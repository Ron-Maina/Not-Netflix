import './App.css';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import {Route, Routes} from "react-router-dom"

function App() {
  return (
    <Routes>
      <Route path= "/" element = {<Signup />} />
      <Route path = "/login" element = {<Login />}/>
      <Route path = "/home" element = {<Home />}/>
    </Routes>
  );
}

export default App;
