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
    </Routes>
  );
}

export default App;
