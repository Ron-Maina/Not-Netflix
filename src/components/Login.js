import React, { useEffect }  from 'react'
import { jwtDecode } from "jwt-decode";


import { useState} from 'react'
import { useNavigate, Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import NavBar from './NavBar';
import useAuth from './CustomHooks/useAuth';



function Login(){

    const navigate = useNavigate() 

    const {setAuth} = useAuth()

    const [showSpinner, setShowSpinner] = useState(false); 

    const [Username, setUsername] = useState("")
    const [Password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);

    const [signInFailed, setSignInFailed] = useState(false); 


   
    function handleCallBackResponse(response){
        let userObject = jwtDecode(response.credential);
        loginUser(userObject)
    }
  
    useEffect(() => {
        /*global google*/
        google.accounts.id.initialize({
            client_id:"957308811194-lk7p997rgsjle3v560grp8n1bmbkklhe.apps.googleusercontent.com",
            callback: handleCallBackResponse
        })
        
        google.accounts.id.renderButton(
            document.getElementById('google-auth'),
            {theme: 'Outline', size: 'large'}
        )

        google.accounts.id.prompt()
    }, [])

    function loginUser(details){
        setShowSpinner(true)
        fetch('/login', {
            method: "POST",
            credentials: 'include',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",   
            },
            body: JSON.stringify(details)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Request failed with status ' + response.status);
            }
        })
        .then(data => {
            localStorage.setItem("jwt-token", data[0].access_token);
            sessionStorage.setItem("refresh-token", data[0].refresh_token);
            sessionStorage.setItem("user-id", data[0].id);
            sessionStorage.setItem('isLoggedIn', true)
            setAuth({accessToken: data[0].access_token})
            setUsername("")
            setPassword("")
            setTimeout(() => {
                setShowSpinner(false)
                navigate('/home', {replace: true})
            }, 2000)
            
        }) 
        .catch(error => {
            // Handle errors from the fetch or from the response handling
            setSignInFailed(true)
            setShowSpinner(false)
                setTimeout(() => {
                    setSignInFailed(false)
                }, 2000)
            console.error('Error during fetch:', error);
            });   
        
        
    }

    function handleSubmit(e){
        e.preventDefault()
        loginUser({'username': Username, 'password': Password})   
    }

        
    return (
        <div className='auth-page'>
            <div className="bg">
                <img src='https://help.nflxext.com/0af6ce3e-b27a-4722-a5f0-e32af4df3045_what_is_netflix_5_en.png' alt='background'/>
            </div>
            <>
                <NavBar />
                <div id = "authentication-box" className='login-details'>
                    <h3>The Gateway to a World of Entertainment</h3>
                    <br />
                    <form onSubmit={handleSubmit}>
                    <div id = "username">
                            <label htmlFor='username'></label>
                            <input
                            size={30}
                            placeholder='Username'
                            name='username'
                            required
                            type='text'
                            value={Username}
                            onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <br/>
                        <div id = "password">
                            <label htmlFor='password'> </label>
                            <input
                            size={30}
                            placeholder='Password'
                            name='password'
                            autoComplete='off'
                            required
                            minLength="5"
                            type={showPassword ? 'text' : 'password'}
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        
                        <div style={{textAlign: 'left'}}>
                            <label>
                                <input 
                                type="checkbox" 
                                onChange={() => setShowPassword(!showPassword)} 
                                style={{verticalAlign: 'middle', margin: '10px'}}/>
                                Show password
                            </label>
                        </div>

                        {showSpinner && (
                            <div className="spinner-overlay">
                                <Spinner size="xl" animation="border"/>
                            </div>
                        )}

                        <div style={{textAlign:"center", paddingTop: '20px'}} className="d-grid gap-2">
                            <Button variant="danger" type='submit' size='lg' style={{fontFamily: 'fantasy'}}>Login</Button>{' '}   
                        </div>
                    </form>
                    <br />
                    <h4 style={{fontSize: '1em'}}>OR</h4>

                    <div id='google-auth'></div>
                    <br/>
                    {signInFailed && (
                        <p style={{ color: 'red', textAlign: 'center' }}>Failed Login. Try Again</p>
                    )}

                    <div style={{display: 'flex', gap: '10px', paddingTop: '30px'}}>
                        <p> <span style={{color: 'gray'}}>New to Not-Netflix?</span> <Link to = "/signup" style={{textDecoration: 'none', color: 'white', fontFamily: 'cursive', fontSize: '20px', }}><strong>Sign up now</strong></Link></p> 
                    </div>
                </div>
            </>
        </div>
    )
}

export default Login