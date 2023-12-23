import React from 'react';
import './App.css';
import Login from './Login';
import Signup from './Signup';
import Home from './Home';
import MovieDetails from './MovieDetails';
import Watchlist from './Watchlist';
import {Route, Routes} from "react-router-dom"
import { useEffect, useState } from 'react';

function App() {

  const [selected, setSelected] = useState([])
  const [AddedWatchlist, setAddedWatchlist] = useState([])
  const [watchlistTitle, setWatchlistTitle] = useState([])
  const [myMovies, setmyMovies] = useState([])
  const [userId, setUserId] = useState()


  function renderUser(id){
    setUserId(id)
    fetch(`http://localhost:3001/userDetails/${id}`)
    .then(res => res.json())
    .then(data => setmyMovies(data.watchlist))
  }



  function renderDetails(filtered){
    setSelected(filtered)
  }

  function update(movieDetails){
    console.log(watchlistTitle)
    console.log(userId)
    fetch(`http://localhost:3001/userDetails/${userId}`)
      .then(response => response.json())
      .then(data => {
        const updatedWatchlist = [...data.watchlist, {movieDetails}];
        fetch(`http://localhost:3001/userDetails/${userId}`, {
          method: "PATCH",
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({watchlist: updatedWatchlist})
        })
      })
      alert("Added Successfully")
      renderUser(userId)
  }

  function RenderWatchList(movieDetails){
    console.log(movieDetails)
    if (watchlistTitle.includes(movieDetails.title)){
      alert("Movie Already in Watchlist!")
      return null
    }else{
      setWatchlistTitle([...watchlistTitle, movieDetails.title])
      update(movieDetails)
    }       
  }



  function DeleteMovie(id){
    console.log(AddedWatchlist)
    const myMovies = AddedWatchlist.filter(movie => movie.id !== id)
    setAddedWatchlist(myMovies)
  }


  return (
    <>
      <Routes>
        <Route path= "/" element = {<Signup />} />
        <Route path = "/login" element = {<Login onUser={renderUser}/>}/>
        <Route path = "/home" element = {<Home onRenderDetails={renderDetails} />}/>
        <Route path="/movies/:id" element={<MovieDetails selected={selected} onWatchlist={RenderWatchList}/>}/>
        <Route path = "/my-watchlist" element = {<Watchlist AddedWatchlist = {AddedWatchlist} myMovies={myMovies} onRemove={DeleteMovie}/>}/>
      </Routes>
    </>
  );
}

export default App;
