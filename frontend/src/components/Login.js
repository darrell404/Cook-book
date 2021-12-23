import {Link} from 'react-router-dom'
import '../App'
import '../css/addon.css'
import { Navigation } from './Main'
import { useState } from 'react'

function Login() {

    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:5000/login', options).then(response => response.json()).then(data => console.log(data)).catch(err => console.error(err))
    }

    const handleChange = (event) => {
        if (event.target.name === 'email') {
            setEmail(event.target.value)
        }
        if (event.target.name === 'password') {
            setPassword(event.target.value)
        }
    }

    return (
        <div className="vw-100 vh-100 n-0 p-0">
            <Navigation />
            <div id="login-container" className="d-flex w-100 h-100 justify-content-center align-self-center align-items-center">
                <form id="login-form" className="d-flex flex-column w-25 h-25 align-items-center text-center justify-content-center" onSubmit={handleSubmit}>
                    <input type="email" id="email" className="text-input border-secondary mb-1 border-2 form-control" name="email" onChange={handleChange} placeholder="Email address" required></input>
                    <input type="password" id="password" className="text-input border-secondary mt-1 border-2 form-control" name="password" onChange={handleChange} placeholder="Password" required></input>
                    <input id="submit" className="m-4 btn-sm btn-warning" type="submit" value="Login" />
                    <p>If you do not have an account yet, click <Link to='/register'> here </Link> to register</p>
                </form>
            </div>
        </div>
    )
}

export default Login
