import { useEffect, useState } from 'react';
import './App.css';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import Watchlist from './Watchlist';
import RequireAuth from './RequireAuth';
import {Route, Routes} from "react-router-dom"
import Layout from './Layout';


function App() {
  
  const refresh_token = sessionStorage.getItem('refresh-token');
  
    setInterval(() => {
      fetch('/refresh', {
          method: 'GET',
          credentials: 'include',
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",   
            'Authorization': 'Bearer ' + refresh_token,
          },
      })
      .then(res => res.json())
      .then(data => {
        localStorage.setItem("jwt-token", data.new_access_token);
      })
    }, 12 * 60 * 1000)

  return (
    <>
      <Routes>
        <Route path='/' element={<Layout/>}>
          {/* Public Routes */}
          <Route path= "/signup" element = {<Signup />} />
          <Route path = "/" element = {<Login />}/>

          {/* Protected Routes */}
          <Route element={<RequireAuth/>}>
            
            <Route path = "/home" element = {<Home/>}/>
            <Route path = "/my-watchlist" element = {<Watchlist/>}/>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
