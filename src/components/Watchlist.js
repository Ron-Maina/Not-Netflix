import {useEffect, useState} from 'react'
import Sidebar from './Sidebar'
import NavBar from './NavBar'


function Watchlist() {

    const id = localStorage.getItem('user-id');

    const [myMovies, setMyMovies] = useState()


    useEffect(() => {
        fetch(`/user/${id}`)
        .then(res => res.json())
        .then(data => setMyMovies(data.my_watchlist))
    }, [id])

    console.log(myMovies)
    
    return (
        <>
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr' }} className='app-page'>
          <Sidebar />
  
          <div style={{height: "100vh", overflow: "hidden"}} >
            <NavBar/>

           
  
            <div className='watchlist'>
                {myMovies?.length 
                    ? (
                        <>
                            <div className='films'>
                                {myMovies.map(film => (
                                <div key={film.id} style={{width: "200px", padding: "10px", height: '300px'}}>
                                    <img 
                                    alt = {film.title} 
                                    style={{width: "150px"}} 
                                    src={`https://image.tmdb.org/t/p/w500/${film.poster}`}
                                    />
                                    <figcaption style={{justifyContent: "center", wordWrap: "break-word", fontSize: '15px'}}>{film.title}</figcaption>
                                </div>
                                ))}
                            </div>
                        </>
                    ) :
                        <p style={{textAlign: 'center'}}>No Movies to Display</p>
                }
              
            </div>
            
            
          </div>
        
        </div>
      </>
    )
}

export default Watchlist