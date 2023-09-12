import React from 'react'
import { useEffect, useState } from 'react';
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image';
import Carousel from 'react-bootstrap/Carousel';
import Sidebar from './Sidebar'
import NavBar from './NavBar';
import {Route, Routes, useParams, useNavigate} from "react-router-dom"


function Home() {

  const [Trending, setTrending] = useState([])
  const [Movies, setMovies] = useState([])
  const [TvShows, setTvShows] = useState([])
  const [selected, setSelected] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/account/20421072/favorite/movies?language=en-US&page=1&sort_by=created_at.asc', {
      method: 'GET',
      headers: {
        "Accept": 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YTVmNDFjNGYzNWU4YWNmZThhNTgzOGMwMjlmMWY4NiIsInN1YiI6IjY0ZmUxMThkNmEyMjI3MDBmZDFlZmZmZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CvtBQSi3JQShP_TdwVrfr4OiH2rr1ZZHMT6SkHIrmxI'
      }
    })
    .then(res => res.json())
    .then(data => setMovies(data.results)) 
  }, [])

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/account/20421072/favorite/tv?language=en-US&page=1&sort_by=created_at.asc', {
      method: 'GET',
      headers: {
        "Accept": 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YTVmNDFjNGYzNWU4YWNmZThhNTgzOGMwMjlmMWY4NiIsInN1YiI6IjY0ZmUxMThkNmEyMjI3MDBmZDFlZmZmZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.CvtBQSi3JQShP_TdwVrfr4OiH2rr1ZZHMT6SkHIrmxI'
      }
    })
    .then(res => res.json())
    .then(data => setTvShows(data.results)) 
  }, [])

  
  function viewDetails(movie_id = 0, show_id = 0){
    if (movie_id !== 0){
      setSelected(Movies.filter(movie => movie.id === movie_id))
      navigate(`/movies/${movie_id}`)
    }
    else if (show_id !== 0){
      setSelected(TvShows.filter(show => show.id === show_id))
      navigate(`/movies/${show_id}`)
    }
  }

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: "auto 1fr"}}>
        <Sidebar />
        <div style={{height: "100vh", overflow: "auto"}}>
          <NavBar />

          <h3 style={{fontFamily: "cursive", paddingLeft: "50px"}}>Movies</h3><hr/>
          <div className='posters' style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
          {Movies.map(movie => (
            <div key={movie.id} style={{width: "200px", padding: "10px"}} onClick={() => viewDetails(movie.id)}>
              <img alt = {movie.title} style={{width: "150px"}} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}/>
              <figcaption style={{justifyContent: "center", wordWrap: "break-word"}}>{movie.title}</figcaption>
            </div>
          ))}
          </div>

          <h3 style={{fontFamily: "cursive", paddingLeft: "50px"}}>TV Shows</h3><hr/>
            <div className='posters' style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
              {TvShows.map(show => (
              <div key={show.id} style={{width: "200px", padding: "10px"}} onClick={() => viewDetails(0,show.id)}>
                <img alt = {show.name} style={{width: "150px"}} src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}/>
                <figcaption style={{justifyContent: "center", wordWrap: "break-word"}}>{show.name}</figcaption>
              </div>
              ))}

            </div>
        </div>
      </div>
    </>
      
    
      
        
        




        
  )
}

export default Home