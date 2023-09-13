import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import NavBar from './NavBar'
import Button from 'react-bootstrap/Button';
import { AiOutlineClose } from 'react-icons/ai';



function MovieDetails({selected, onWatchlist}) {

  const [videoId, setVideoId] = useState('');
  const [showVideo, setShowVideo] = useState(false);
  let videoData

 


  function PlayVideo(title){
    fetch( `https://www.googleapis.com/youtube/v3/search?key=AIzaSyCGVPxVpmiOLtlubbjXXzIkZNjoyjPoL_w&q=${title} trailer&part=snippet&maxResults=1`, {
      method: 'GET',
      headers : {
          'Content-Type': 'application/json',  
      }  
    })
    .then(response => response.json())
    .then(data => {
      videoData = data.items[0]
    })
    console.log(videoData)
  
    if (videoData){
      setVideoId(videoData.id.videoId)
      setShowVideo(true)
      
    }
    else{
      alert("Error playing Video")
    }
  }

  function onVideoEnded(){
    console.log("hi")
    // This function will be called when the video ends
    setShowVideo(false);
  };

  function AddToWatchList(movie){
    onWatchlist(movie)
  }


  return (
    <div style={{ display: 'grid', gridTemplateColumns: "auto 1fr", overflowX: "hidden"}}>
        <Sidebar />
        <div style={{height: '100vh'}}>
          <NavBar />
          <div id="movie_details" style={{overflow: "auto", position: 'relative'}}>
          {showVideo && (
            <div className="video-overlay" style={{width: "100%",height: "100%", position: 'absolute', top: "0", right: "5px"}}>
              <iframe
                title="YouTube Video"
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                allowFullScreen
                allow="autoplay"
              ></iframe> 
              <h3 onClick={onVideoEnded} style={{color: "white", position: 'absolute', top: "5px", right: "190px"}}><AiOutlineClose /></h3>
              <p style={{color: "white", position: 'absolute', top: "37px", right: "185px"}}>Close</p>

            </div>
          )}
            {selected?.map(movie => (
                <div key={movie.id} style={{display: 'flex', justifyContent: "center"}}>
                  <img style={{height: '600px', paddingLeft: "100px"}}alt={movie.title} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}/>
                  
                  <div className= "top"style={{textAlign: 'left', marginRight: '50px'}}>
                    <div className='text' style={{fontFamily: "sans-serif", height: "75vh",paddingLeft: "20px"}}>
                      <h4>{movie.overview}</h4>
                      <p style={{color: 'gray'}}>Release Date: {movie.release_date}</p>
                      <p style={{color: 'gray'}}>Original Language: {movie.original_language}</p> 
                      <p style={{color: 'gray'}}>Viewer Ratings: {movie.vote_average}</p>
                      <Button variant="outline-danger" onClick={() => PlayVideo(movie.title)}>Watch Trailer</Button>{' '}
                      <Button variant="outline-light" onClick={() => AddToWatchList(movie)}>Add to WatchList</Button>{' '}
                    </div>
                    
                  </div>
                </div>
            ))}
            
          </div>
          
        </div>
    </div>
  )
}

export default MovieDetails