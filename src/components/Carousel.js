import React, { useEffect, useState } from 'react';

import { CCarousel } from '@coreui/react'
import { CCarouselItem } from '@coreui/react'
import { CImage } from '@coreui/react'
import { CCarouselCaption } from '@coreui/react'

import {FaStar} from "react-icons/fa";
import {GoDotFill} from "react-icons/go";
import { FaPlay } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";


function Carousel({renderTrailer}) {

  const [Carousel, setCarousel] = useState([])
  
  useEffect(() => {
    fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', {
      method: 'GET',
      headers: {
        "Accept": 'application/json',
        Authorization: process.env.REACT_APP_API_KEY
      }
    })
    .then(res => res.json())
    .then(data => setCarousel(data.results)) 
  }, [])

  
  return (
    <CCarousel className='carousel'>
    {Carousel.map(movie => (
      <CCarouselItem key={movie.id}>
        <CImage className="d-block w-100" id='img' src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} alt="slider" />
        <CCarouselCaption id='carousel-caption'>
            <div style={{display: 'flex', gap:'15px'}}>
              <p><FaStar style={{ color: 'red', marginRight:'5px', marginTop: '-5px'}}/> {movie.vote_average} </p>
              <GoDotFill style={{fontSize: '10px', marginTop: '7px', color: 'gray'}}/>
              <p>{movie.release_date}</p>
              <GoDotFill style={{fontSize: '10px', marginTop: '7px', color: 'gray'}}/>
              <p>{movie.original_language}</p>
            </div>

            <div>
              <h3 style={{fontFamily: "sans-serif"}}>{movie.title}</h3>
              <br/>
              <p style={{fontStyle: 'oblique'}}>{movie.overview}</p>
            </div>
            

            <div style={{display: 'flex', gap: '20px'}}>
              <button 
              onClick={() => renderTrailer(movie.title)}
              style={{backgroundColor: 'red'}} 
              className='selected-filter'> 
                <FaPlay style={{fontSize: '10px', marginBottom: '2px', marginRight: '5px'}}/>
                Watch
               </button> 
              <button className='default-filter'> 
                <FiPlusCircle style={{fontSize: '15px', marginBottom: '2px', marginRight: '5px'}}/> 
                Add to Watchlist
              </button> 
            </div>
        </CCarouselCaption>
      </CCarouselItem>
    ))}
    </CCarousel>
  )
}

export default Carousel