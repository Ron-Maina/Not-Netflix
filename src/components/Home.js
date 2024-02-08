import React, { useEffect, useState } from 'react';

import {FaStar} from "react-icons/fa";
import {GoDotFill} from "react-icons/go";
import { FaPlay } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import { AiOutlineClose } from 'react-icons/ai';
import Alert from 'react-bootstrap/Alert';




import Sidebar from './Sidebar';
import NavBar from './NavBar';
import Carousel from './Carousel';
import SearchBar from './SearchBar'




function Home() {

  const token = sessionStorage.getItem('jwt-token');

  const [successful, setSuccessful] = useState(false)
  const [failed, setFailed] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const [Display, setDisplay] = useState([])
  useEffect(() => {
    fetch("https://api.themoviedb.org/3/trending/all/day?language=en-US", {
      method: 'GET',
      headers: {
        "Accept": 'application/json',
        Authorization: process.env.REACT_APP_API_KEY
      }
    })
    .then(res => res.json())
    .then(data => setDisplay(data.results)) 
  }, [])
  

  const [activeCategory, setactiveCategory] = useState('all');
  const filterByCategory = (word) => {
    setactiveCategory(word);
    fetch(`https://api.themoviedb.org/3/trending/${word}/day?language=en-US`, {
      method: 'GET',
      headers: {
        "Accept": 'application/json',
        Authorization: process.env.REACT_APP_API_KEY
      }
    })
    .then(res => res.json())
    .then(data => setDisplay(data.results)) 
  };


  const [activeFilter, setactiveFilter] = useState('');
  const filters = (filter) => {
    setactiveFilter(filter);
    
    if (activeCategory === 'all') return null;
  
    let endpoint;
  
    if (activeCategory === 'tv') {
      endpoint = (filter === 'new' || filter === 'upcoming') ? (filter === 'new' ? 'airing_today' : 'on_the_air') : filter;
    } else if (activeCategory === 'movie') {
      endpoint = filter === 'new' ? 'now_playing' : filter;
    } 
   
    fetch(`https://api.themoviedb.org/3/${activeCategory}/${endpoint}?language=en-US&page=1`, {
      method: 'GET',
      headers: {
        "Accept": 'application/json',
        Authorization: process.env.REACT_APP_API_KEY
      }
    })
    .then(res => res.json())
    .then(data => setDisplay(data.results));
  };

  const [movieDetails, setMovieDetails] = useState('')
  const [carouselVisible, setCarouselVisible] = useState(true);

  function MovieDetails(film){
    setCarouselVisible(false);
    setMovieDetails(film)
  }

  const [videoId, setVideoId] = useState('');
  const [showVideo, setShowVideo] = useState(false);
  let videoData

  function PlayVideo(title){
      console.log(title)
      let url = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyCGVPxVpmiOLtlubbjXXzIkZNjoyjPoL_w&q=${title} trailer&part=snippet&maxResults=1`
      fetch(url, {
        method: 'GET',
        headers : {
          'Content-Type': 'application/json',  
        }  
      })
    .then(response => response.json())
    .then(data => {
      videoData = data.items[0].id.videoId
      renderVideo(videoData)
      setVideoId(videoData)
    })
    
    function renderVideo(videoData){
      if (videoData){
        setShowVideo(true)
      }
      else{
        alert("Error playing Video")
      }
    }
    
  }

  function EndVideo(){
    setShowVideo(false);
  };
  
  const filtered_display = Display.filter(movie => {
    return (movie.title || movie.name).toLowerCase().includes(searchTerm.toLowerCase())
  })


  function addToWatchlist(movie){
    console.log(movie.overview)
    fetch('/watchlist', {
      method: "POST",
      credentials: 'include',
      headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",   
          'Authorization': 'Bearer ' + token,
      },
      body: JSON.stringify({
        'poster_path': movie.poster_path,
        'name': movie.name || movie.title,
        'overview': movie.overview,
        'id': movie.id,
      })
    })
    .then(response => {
        if (response.ok) {
            setSuccessful(true)
        } 
        else {
          setFailed(true)
          throw new Error('Request failed with status ' + response.status);
        }
    })
    .catch(error => {
        // Handle errors from the fetch or from the response handling
        console.error('Error during fetch:', error);
    });   
           
  }
  
  setTimeout(() => {
    setSuccessful(false)
  }, 1000);

  setTimeout(() => {
    setFailed(false)
  }, 1000);
  

  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr' }} className='app-page'>
        <Sidebar />
        

        <div style={{height: "100vh", overflow: "hidden"}} >
          <div className='home-nav'>
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm}/>
            <NavBar/>
          </div>

          <div>
            {carouselVisible && (
              <div> <Carousel renderTrailer={PlayVideo} /> </div>
            )}
            {!carouselVisible && (
              <>
                {movieDetails && (
                  <div id='selected_movie'
                  style={{backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movieDetails.poster_path})`, backgroundSize: "fill",
                  backgroundPosition: 'center', filter: 'brightness(0.7)'}}>
                    <div style={{marginLeft: '50px', paddingTop: '100px', color: 'white'}}>
                      <div style={{display: 'flex', gap:'15px'}}>
                        <p><FaStar style={{ color: 'red', marginRight:'5px', marginTop: '-5px'}}/> {movieDetails.vote_average} </p>
                        <GoDotFill style={{fontSize: '10px', marginTop: '7px', color: 'gray'}}/>
                        <p>{movieDetails.release_date || movieDetails.first_air_date}</p>
                        <GoDotFill style={{fontSize: '10px', marginTop: '7px', color: 'gray'}}/>
                        <p>{movieDetails.original_language}</p>
                      </div>

                      <div style={{width: '500px'}}>
                        <h3 style={{fontFamily: "sans-serif"}}>{movieDetails.title || movieDetails.name}</h3>
                        <br/>
                        <p style={{fontStyle: 'oblique'}}>{movieDetails.overview}</p>
                      </div>
              

                      <div style={{display: 'flex', gap: '20px'}}>
                        <button 
                        onClick={() => PlayVideo(movieDetails.title || movieDetails.name)}
                        style={{backgroundColor: 'red'}} 
                        className='selected-filter'> 
                          <FaPlay style={{fontSize: '10px', marginBottom: '2px', marginRight: '5px'}}/> 
                          Watch
                        </button> 
                        <button className='default-filter' onClick={() => addToWatchlist(movieDetails)}> 
                          <FiPlusCircle style={{fontSize: '15px', marginBottom: '2px', marginRight: '5px'}}/> 
                          Add to Watchlist
                        </button> 
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {successful && (
              <div className='alert-box'>
                <Alert variant={'success'} className='alert'>
                  Added Successfully
                </Alert>
              </div>
            )}

            {failed && (
              <div className='alert-box'>
                <Alert variant={'danger'} className='alert'>
                  Movie may already exist in Watchlist
                </Alert>
              </div>
            )}

            {showVideo && (
              <div className="video-overlay" style={{position: 'absolute', top: "0"}}>
                <iframe
                  title="YouTube Video"
                  width="1770px"
                  height="500px"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                  allowFullScreen
                  allow="autoplay"
                ></iframe> 
                <h3 onClick={EndVideo} style={{color: "white", position: 'absolute', top: "5px", right: "235px"}}><AiOutlineClose /></h3>
                <p style={{color: "white", position: 'absolute', top: "37px", right: "230px"}}>Close</p>

              </div>
            )}
            
          </div>
          
          <div id='categories'>
            <p className={activeCategory === 'all' ? 'selected-category' : ''} onClick={() => filterByCategory('all')}> All </p>
            <p className={activeCategory === 'movie' ? 'selected-category' : ''} onClick={() => filterByCategory('movie')}> Movies </p>
            <p className={activeCategory === 'tv' ? 'selected-category' : ''} onClick={() => filterByCategory('tv')}> TV Shows</p>
          </div>

          <div id='filters'>
            <button className={activeFilter === 'new' ? 'selected-filter' : 'default-filter'} onClick={() => filters('new')}> New </button>
            <button className={activeFilter === 'popular' ? 'selected-filter' : 'default-filter'} onClick={() => filters('popular')}> Popular </button>
            <button className={activeFilter === 'top_rated' ? 'selected-filter' : 'default-filter'} onClick={() => filters('top_rated')}> Top Rated </button>
            <button className={activeFilter === 'upcoming' ? 'selected-filter' : 'default-filter'} onClick={() => filters('upcoming')}> Upcoming </button> 
          </div>
       
          <div className='films'>
            {filtered_display?.map(film => (
              <div key={film.id} style={{width: "200px", padding: "10px"}}>
                <img 
                alt = {film.title} 
                style={{width: "150px"}} 
                src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`}
                onClick={() => MovieDetails(film)}/>
                <figcaption style={{justifyContent: "center", wordWrap: "break-word", fontSize: '15px'}}>{film.title || film.name}</figcaption>
              </div>
            ))}
          </div>

        </div>
      
      </div>
    </>
  );
}

export default Home;
