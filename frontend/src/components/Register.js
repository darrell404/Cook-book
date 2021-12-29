import { useState } from 'react'
import '../App'
import '../css/main.css'

function Register() {
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmpassword, setConfirmPassword] = useState(null)

    const handleSubmit = async (event) => {
        event.preventDefault();
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"email": username, "password": password})
        }

        const sendData = await fetch('/register', options).then(response => response.json())
        console.log(sendData)
    }

    const getUsername = (event) => {
        setUsername(event.target.value)
    }

    const getPassword = (event) => {
        setPassword(event.target.value)
    }

    return (
        <div className="w-100 vh-100 n-0 p-0">
            <div id="login-container" className="d-flex flex-column text-center justify-content-center w-100 h-100">
                <h3>Register</h3>
                <form id="login-form" className="d-flex flex-column w-25 my-0 align-items-center text-center" onSubmit={handleSubmit}>
                    <input type="email" id="email" className="text-input border-secondary mb-1 border-2 form-control" name="email" placeholder="Email address" required onChange={getUsername}></input>
                    <input type="password" id="password" className="text-input border-secondary mt-1 mb-1 border-2 form-control" name="password" placeholder="Password" required onChange={getPassword}></input>
                    {/* <input onChange={onChange} type="password" id="password" className="text-input border-secondary mt-1 border-2 form-control" name="password-retype" placeholder="Confirm Password" required></input> */}
                    <input id="submit" className="m-4 btn-sm btn-warning" type="submit" value="Create Account" />  
                </form>
            </div>
        </div>
    )
}

export default Register