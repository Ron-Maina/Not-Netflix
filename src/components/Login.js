import React from 'react'
import { useState} from 'react'
import { useNavigate } from 'react-router-dom'

function Login(){

    const navigate = useNavigate() 
    const [Username, setUsername] = useState("")
    const [Password, setPass] = useState("")

    function handleSubmit(e){
        e.preventDefault()

        fetch('http://localhost:3001/userDetails')
        .then(res => res.json())
        .then(users => validateUser(users))   
    }

    function validateUser(users){
        let authorized_user = users.filter(user => user.username === Username && user.password === Password)
        console.log(authorized_user)
        if (authorized_user.length < 1){
            alert("Invalid Username or Password")
        }
        else{
            navigate("/home", {replace: true})
        }
    }
        
    return (
        <div className='login-details'>
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
                <div id = "password">
                    <label htmlFor='password'>Password: </label>
                    <input
                    required
                    type='text'
                    value={Password}
                    onChange={(e) => setPass(e.target.value)}
                    />
                </div>
                <br />
                <div>
                    <button type='submit'>Login</button>   
                </div>
            </form>
        </div>
    )
}

export default Login