import {useEffect, useState} from 'react'
import Sidebar from './Sidebar'
import NavBar from './NavBar'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';




function Watchlist() {

    const user_id = sessionStorage.getItem('user-id');
    const token = localStorage.getItem('jwt-token');


    const [myMovies, setMyMovies] = useState()
    const [show, setShow] = useState(false);
    const [filmDetails, setDetails] = useState(false);

    const [successful, setSuccessful] = useState(false)
    const [failed, setFailed] = useState(false)

    useEffect(() => {
        fetch(`/user/${user_id}`)
        .then(res => res.json())
        .then(data => {
            setMyMovies(data.my_watchlist)})
    }, [user_id])


    const handleClose = () => setShow(false);
    const handleShow = (film) => {
        setShow(true);
        setDetails(film)
    }

    const handleDelete = (movie_id) => {
        fetch(`/delete/${movie_id}/${user_id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",   
                'Authorization': 'Bearer ' + token,
            },
        })
        .then((response) => {
            if (!response.ok) {
                setFailed(true)
                handleClose()
            } else {
                setSuccessful(true)
                handleClose()
                setMyMovies(myMovies?.filter(movie => movie.movie_id !== movie_id))    
            }   
        })
        .catch((error) => {
            console.error("Error:", error);
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
            <NavBar/>
            {successful && (
              <div className='watchlist-alert-box'>
                <Alert variant={'success'} className='alert'>
                  Deleted Successfully
                </Alert>
              </div>
            )}

            {failed && (
              <div className='watchlist-alert-box'>
                <Alert variant={'danger'} className='alert'>
                  Failed to Delete
                </Alert>
              </div>
            )}
           
            <Modal 
                className="my-modal" 
                show={show} 
                onHide={handleClose}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton style={{color:'white'}}>
                <Modal.Title>{filmDetails.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{filmDetails.overview}</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={() => handleDelete(filmDetails.movie_id)}>
                    Delete
                </Button>
                </Modal.Footer>
            </Modal>
            <div className='watchlist'>
                {myMovies?.length 
                    ? (
                        <>
                            <div className='films'>
                                {myMovies.map(film => (
                                <div key={film.movie_id} style={{width: "200px", padding: "10px", height: '300px'}}>
                                    <img 
                                    onClick={() => handleShow(film)}
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
                        <p style={{textAlign: 'center', marginTop: '20%', fontSize: '50px'}}>No Movies to Display</p>
                }
              
            </div>
            
            
          </div>
        
        </div>
      </>
    )
}

export default Watchlist