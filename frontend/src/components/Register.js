import { useState } from 'react'
import '../App'
import '../css/main.css'
import { Navigation } from './Main'

function Register() {
    const [password, setPassword] = useState(null)
    const [confirmpassword, setConfirmPassword] = useState(null)

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    const onChange = (event) => {
        this.setState({password: event.target.value})
        if (this.state.password.match(confirmpassword)) {
            console.log("Passwords match")
        }
    }

    return (
        <div className="w-100 vh-100 n-0 p-0">
            <Navigation />
            <div id="login-container" className="d-flex flex-column text-center justify-content-center w-100 h-100">
                <h3>Register</h3>
                <form id="login-form" className="d-flex flex-column w-25 my-0 align-items-center text-center" onSubmit={handleSubmit}>
                    <input type="email" id="email" className="text-input border-secondary mb-1 border-2 form-control" name="email" placeholder="Email address" required></input>
                    <input type="password" id="password" className="text-input border-secondary mt-1 mb-1 border-2 form-control" name="password" placeholder="Password" required></input>
                    <input onChange={onChange} type="password" id="password" className="text-input border-secondary mt-1 border-2 form-control" name="password-retype" placeholder="Confirm Password" required></input>
                    <input id="submit" className="m-4 btn-sm btn-warning" type="submit" value="Create Account" />
                    
                </form>
            </div>
        </div>
    )
}

export default Register