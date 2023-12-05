import React from 'react'
import { useGoogleLogin } from '@react-oauth/google';
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

    const [showPassword, setShowPassword] = useState(false);

    const [successfulSignup, setSuccessfulSignup] = useState(false); 
    const [signUpFailed, setSignUpFailed] = useState(false); 

    const login = useGoogleLogin({
        onSuccess: tokenResponse => console.log(tokenResponse),
      });

    function handleSubmit(e){
        e.preventDefault()
        const userDetails = {
            "username": Username,
            "email": Email,
            "password": Password,
        }
        addToLogins(userDetails)
        setUsername("")
        setEmail("")
        setPassword("")
        setconfirmed_password("")
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
            <div id="signup-bg"></div>
            <>
            <NavBar />
            <div id = "signupPage" className='login-details'>
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
                    
                    <div style={{textAlign:"center", paddingTop: '20px'}} className="d-grid gap-2">
                        <Button variant="danger" type='submit' size='lg'>Signup</Button>{' '} 
                    </div>
                </form>

                {successfulSignup && (
                    <p style={{ color: 'white', textAlign: 'center' }}>Successful signup</p>
                )}
                {signUpFailed && (
                    <p style={{ color: 'red', textAlign: 'center' }}>SignUp Failed! Email may already exist</p>
                )}

                <br/>
                <h4 style={{fontSize: '1em'}}>OR</h4>
                <div style={{textAlign:"center", paddingTop: '10px'}} className="d-grid gap-2">
                    <Button variant="outline-light" type='submit' onClick={() => login()}>Sign up with Google 🚀</Button>{' '} 
                </div>
                <div style={{display: 'flex', gap: '10px', paddingTop: '30px'}}>
                    <span>Already have an account? <Link to = "/login" style={{textDecoration: 'none', color: "red"}}>Login</Link></span> 
                </div>
            </div>
            </>
        </div>
    )
}

export default Signup
