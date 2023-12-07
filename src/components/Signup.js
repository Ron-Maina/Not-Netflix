import React, {useEffect} from 'react'
import { useGoogleLogin } from '@react-oauth/google';
import {FaGoogle} from "react-icons/fa";

import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import NavBar from './NavBar';


function Signup(){
    const navigate = useNavigate()

    const [Username, setUsername] = useState("")
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [confirmed_password, setconfirmed_password] = useState("")

    const [ userDetails, setUserDetails ] = useState([]);

    const [showPassword, setShowPassword] = useState(false);

    const [passworderror, setpassworderror] = useState(false); 
    const [successfulSignup, setSuccessfulSignup] = useState(false); 
    const [signUpFailed, setSignUpFailed] = useState(false); 

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
        const userDetails = {
            "username": Username,
            "email": Email,
            "password": Password,
        }
        if (Password !== confirmed_password){
            setpassworderror(true)
            setTimeout(() => {
                setpassworderror(false)
            }, 2000)
        }
        else{
            addToLogins(userDetails)
            setUsername("")
            setEmail("")
            setPassword("")
            setconfirmed_password("")
        }       
    }

    function loginPage(){
        navigate("/login")
        setSuccessfulSignup(false);
    }

    function addToLogins(details){
        fetch('http://127.0.0.1:5000/api/users', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(details)
        })
        .then (res => res.json())
        .then(data => {
            if (data[1] === 201){
                setSuccessfulSignup(true);
                loginPage()
            }
            else {
                setSignUpFailed(true)
                setTimeout(() => {
                    setSignUpFailed(false)
                }, 2000)
                
            }
        })
        
        
    }

    return (
        <div className='page'>
            <div id="bg">
                <img src='https://help.nflxext.com/43e0db2f-fea0-4308-bfb9-09f2a88f6ee4_what_is_netflix_1_en.png' alt='background'/>
            </div>
            <>
                <NavBar />
                <div id = "authentication-box" className='login-details'>
                    <h3 style={{fontFamily: "serif", paddingBottom: '15px'}}>Sign Up</h3>
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
                        <div id = "email">
                            <label htmlFor='email'></label>
                            <input
                            size={30}
                            placeholder='Email'
                            name='email'
                            required
                            type='email'
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
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
                        <br/>
                        <div id = "password">
                            <label htmlFor='password'> </label>
                            <input
                            size={30}
                            placeholder='Confirm Password'
                            name='password-confirmation'
                            autoComplete='off'
                            required
                            minLength="5"
                            type={showPassword ? 'text' : 'password'}
                            value={confirmed_password}
                            onChange={(e) => setconfirmed_password(e.target.value)}
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

                        {passworderror && (
                            <p style={{ color: 'red', textAlign: 'center' }}>Password does not match. Try Again</p>
                        )}
                        
                        <div style={{textAlign:"center", paddingTop: '20px'}} className="d-grid gap-2">
                            <Button variant="danger" type='submit' size='lg' style={{fontFamily: 'fantasy'}}>Signup</Button>{' '} 
                        </div>
                    </form>

                    {successfulSignup && (
                        <p style={{ color: 'white', textAlign: 'center' }}>Successful signup</p>
                    )}
                    {signUpFailed && (
                        <p style={{ color: 'red', textAlign: 'center' }}>SignUp Failed! Email already exist</p>
                    )}
                    
                    <br />
                    <h4 style={{fontSize: '1em'}}>OR</h4>
                    <div style={{textAlign:"center", paddingTop: '10px'}} className="d-grid gap-2">
                        <Button style={{display: 'flex', gap: '10px'}} variant="outline-light" type='submit' onClick={() => login()}><FaGoogle style={{marginTop: '5px'}}/> Sign up with Google </Button>{' '} 
                    </div>
                    <div style={{display: 'flex', gap: '10px', paddingTop: '30px'}}>
                        <p> <span style={{color: 'gray'}}>Have an account?</span> <Link to = "/login" style={{textDecoration: 'none', color: 'white', fontFamily: 'cursive', fontSize: '20px', }}><strong>Sign in</strong></Link></p> 
                    </div>
                </div>
            </>
        </div>
    )
}

export default Signup
