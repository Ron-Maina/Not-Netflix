import React from 'react'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'



function Signup(){
    const navigate = useNavigate()

    const [Username, setUsername] = useState("")
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const [checkEmail, setCheckEmail] = useState([])
    const [checkUsername, setCheckName] = useState([])


    function handleSubmit(e){
        e.preventDefault()
        const userDetails = {
            "username": Username,
            "email": Email,
            "password": Password
        }
        addToLogins(userDetails)
        setUsername("")
        setEmail("")
        setPassword("")
    }

    function loginPage(){
        navigate("/login", {replace: true})
    }

    function addToLogins(details){
        if (checkEmail.includes(details.email)){
            alert("Email already in use")
        }
        else if (checkUsername.includes(details.username)){
            alert("Username already in use")
        }
        else{
            fetch('http://localhost:3001/userDetails', {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(details)
            })
            alert("Successfully Added")
            setCheckEmail([...checkEmail, Email])
            setCheckName([...checkUsername, Username])
        }
        loginPage()
    }

    return (
        <div id = "signupPage" className='login-details'>
            <form onSubmit={handleSubmit}>
                <div id = "username">
                    <label htmlFor='username'>Username: </label>
                    <input
                    required
                    type='text'
                    value={Username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <br/>
                <div id = "email">
                    <label htmlFor='email'>Email: </label>
                    <input
                    required
                    type='email'
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <br/>
                <div id = "password">
                    <label htmlFor='password'>Password: </label>
                    <input
                    required
                    type='text'
                    minLength="5"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <br/>
                <div>
                    <button type='submit'>Sign Up</button>   
                </div>
            </form>
            <p>
                <span>Already have an account? </span>
                <Link to = "/login"><button>Login</button></Link>  
            </p>
        </div>

    )
}

export default Signup
