import React from 'react'
import Sidebar from './Sidebar'
import NavBar from './NavBar'
import Button from 'react-bootstrap/Button';
import { AiFillDelete } from 'react-icons/ai';

function Watchlist({AddedWatchlist, onRemove}) {

    function deleteMovie(id){
        fetch(`http://localhost:3002/watchlist/${id}`, {
            method: "DELETE"
        })
        onRemove(id)
    }
    return (
        <div style={{ display: 'grid', gridTemplateColumns: "auto 1fr"}}>
            <Sidebar />
            <div style={{height: '100vh'}}>
                <NavBar />
                <div  style={{display: "flex", flexWrap: "wrap", justifyContent: "normal"}}>
                    {AddedWatchlist.map(movie => (
                        <div key={movie.id} style={{width: "200px", padding: "10px", position: 'relative'}}>
                            <img alt = {movie.title} style={{width: "150px"}} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}/>
                            <figcaption style={{justifyContent: "center", wordWrap: "break-word"}}>{movie.title}</figcaption>
                            <h4 onClick = {() => deleteMovie(movie.id)} style={{color: "white", position: 'absolute', top: "-5px", right: "30px"}}><AiFillDelete/></h4>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Watchlist