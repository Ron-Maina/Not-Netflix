import React from 'react'
import { useParams } from 'react-router-dom'
import Sidebar from './Sidebar'
import NavBar from './NavBar'
import Button from 'react-bootstrap/Button';


function MovieDetails({selected}) {
  const {id} = useParams()
  console.log(selected)
  return (
    <div style={{ display: 'grid', gridTemplateColumns: "auto 1fr", overflowX: "hidden"}}>
        <Sidebar />
        <div style={{height: '100vh'}}>
          <NavBar />
          <div id="movie_details" style={{overflow: "auto"}}>
            {selected?.map(movie => (
                <div key={movie.id} style={{display: 'flex', justifyContent: "center"}}>
                  <img style={{height: '600px', paddingLeft: "100px"}}alt={movie.title} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}/>
                  
                  <div className= "top"style={{textAlign: 'left', marginRight: '50px'}}>
                    <div className='text' style={{fontFamily: "sans-serif", height: "75vh",paddingLeft: "20px"}}>
                      <h4>{movie.overview}</h4>
                      <p style={{color: 'gray'}}>Release Date: {movie.release_date}</p>
                      <p style={{color: 'gray'}}>Original Language: {movie.original_language}</p> 
                      <p style={{color: 'gray'}}>Viewer Ratings: {movie.vote_average}</p>
                      <Button variant="outline-danger" type='submit'>Watch Trailer</Button>{' '}
                      <Button variant="outline-light">Add to WatchList</Button>{' '}
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