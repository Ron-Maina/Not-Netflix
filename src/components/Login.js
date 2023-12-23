import React, { useEffect }  from 'react'
import { useGoogleLogin } from '@react-oauth/google';
import {FaGoogle} from "react-icons/fa";

import { useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import NavBar from './NavBar';

function Login({onUser}){

    const navigate = useNavigate() 
    const [Username, setUsername] = useState("")
    const [Password, setPassword] = useState("")

    const [ userDetails, setUserDetails ] = useState([]);

    const [showPassword, setShowPassword] = useState(false);

    const login = useGoogleLogin({
        onSuccess: tokenResponse => setUserDetails(tokenResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(() => {
        fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${userDetails.access_token}`, {
            method: 'GET',
            headers: {
              "Accept": 'application/json',
              Authorization: `Bearer ${userDetails.access_token}`
            }
          })
          .then(res => res.json())
          .then(data => console.log(data)) 
    }, [userDetails])

    function handleSubmit(e){
        e.preventDefault()

        fetch('http://localhost:3001/userDetails')
        .then(res => res.json())
        .then(users => validateUser(users))   
    }

    function validateUser(users){
        let authorized_user = users.filter(user => user.username === Username && user.password === Password)
        if (authorized_user.length < 1){
            alert("Invalid Username or Password")
        }
        else{
            navigate("/movies", {replace: true})
        }
        onUser(authorized_user)
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
                        <div style={{textAlign:"center", paddingTop: '20px'}} className="d-grid gap-2">
                            <Button variant="danger" type='submit' size='lg' style={{fontFamily: 'fantasy'}}>Login</Button>{' '}   
                        </div>
                    </form>
                    <br />
                    <h4 style={{fontSize: '1em'}}>OR</h4>
                    <div style={{textAlign:"center", paddingTop: '10px'}} className="d-grid gap-2">
                        <Button style={{display: 'flex', gap: '10px'}} variant="outline-light" type='submit' onClick={() => login()}><FaGoogle style={{marginTop: '5px'}}/> Sign in with Google </Button>{' '} 
                    </div>
                    <div style={{display: 'flex', gap: '10px', paddingTop: '30px'}}>
                        <p> <span style={{color: 'gray'}}>New to Not-Netflix?</span> <Link to = "/" style={{textDecoration: 'none', color: 'white', fontFamily: 'cursive', fontSize: '20px', }}><strong>Sign up now</strong></Link></p> 
                    </div>
                </div>
            </>
        </div>
    )
}

export default Login