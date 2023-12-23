import React from 'react'
import { useEffect, useState } from 'react';
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image';
import Carousel from 'react-bootstrap/Carousel';

import { CCarousel } from '@coreui/react'
import { CCarouselItem } from '@coreui/react'
import { CImage } from '@coreui/react'
import { CCarouselCaption } from '@coreui/react'





import Sidebar from './Sidebar'
import NavBar from './NavBar';
import {useNavigate} from "react-router-dom"


function Home({onRenderDetails}) {

  const [Trending, setTrending] = useState([])
  const [Movies, setMovies] = useState([])
  const [All, setAll] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/account/20421072/favorite/movies?language=en-US&page=2&sort_by=created_at.asc', {
      method: 'GET',
      headers: {
        "Accept": 'application/json',
        Authorization: process.env.REACT_APP_API_KEY
      }
    })
    .then(res => res.json())
    .then(data => setMovies(data.results)) 
  }, [])

  useEffect(() => {
    fetch("https://api.themoviedb.org/3/trending/all/day?language=en-US", {
      method: 'GET',
      headers: {
        "Accept": 'application/json',
        Authorization: process.env.REACT_APP_API_KEY
      }
    })
    .then(res => res.json())
    .then(data => setAll(data.results)) 
  }, [])

  
  // function viewDetails(movie_id = 0, show_id = 0){
  //   if (movie_id != 0){
  //     const filteredMovie = Movies.filter(movie => movie.id === movie_id)
  //     navigate(`/movies/${movie_id}`)
  //     onRenderDetails(filteredMovie)
  //   }
  //   else if (show_id != 0){
  //     const filteredShow = TvShows.filter(show => show.id === show_id)
  //     navigate(`/movies/${show_id}`)
  //     onRenderDetails(filteredShow)
  //   }

  // }


  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: "auto 1fr"}} className='app-page'>
        <Sidebar />
        <div style={{height: "100vh", overflow: "hidden"}} >

          <NavBar/>
          <CCarousel className='carousel'>
          {Movies.map(movie => (
            <CCarouselItem>
              <CImage className="d-block w-100" src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} alt="slider" />
              <CCarouselCaption className="d-none d-md-block" id='carousel-caption'>
                  <h3 style={{fontFamily: 'fantasy'}}>{movie.title}</h3>
                  <br/>
                  <p>{movie.overview}</p>
              </CCarouselCaption>
            </CCarouselItem>
          ))}
          </CCarousel>
         
          
          <div id='categories'>
            <button class="btn warning">TV Shows</button>
            <button class="btn warning">Movies</button>
          </div>

          <div id='filters'>
            <p>Trending</p>
            <p>Popular</p>
            <p>Top Rated</p>
            <p>Upcoming</p>
          </div>
       
          <div className='films'>
          {All.map(film => (
            <div key={film.id} style={{width: "200px", padding: "10px"}} 
            // onClick={() => viewDetails(film.id)}
            >
              <img alt = {film.title} style={{width: "150px"}} src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}/>
              <figcaption style={{justifyContent: "center", wordWrap: "break-word"}}>{film.title || film.name}</figcaption>
            </div>
          ))}
          </div>

        </div>
      </div>
    </>
      
    
      
        
        




        
  )
}

export default Home