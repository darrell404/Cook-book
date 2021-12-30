import { useState } from 'react'
import { Alert } from 'react-bootstrap'
import { useNavigate  } from 'react-router-dom'
import '../App'
import '../css/main.css'
import '../css/addon.css'

function Register() {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [showMessage, setShowMessage] = useState(false)
    const [message, setMessage] = useState({})
    const [passwordMatch, setPasswordMatch] = useState(true)
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (confirmPassword !== password) {
            setPasswordMatch(false)
            hideAlert()
            return
        }
        const {firstName, lastName} = event.target
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"firstName": firstName.value, "lastName": lastName.value, email, password})
        }
        const sendData = await fetch('/register', options).then(response => response.json())
        if(sendData.success) {
            setMessage(sendData)
            setShowMessage(true)
            setTimeout(() => {
                navigate('/account/login')
            }, 2000)
        }
    }

    const getEmail = (event) => {
        setEmail(event.target.value)
    }

    const getPassword = (event) => {
        setPassword(event.target.value)
    }

    const getConfirmPassword = (event) => {
        setConfirmPassword(event.target.value)
    }

    const hideAlert = () => {
        setTimeout(() => {
            setPasswordMatch(true)
        }, 2000)

    }

    return (
        <div className="w-100 vh-100 n-0 p-0">
            <div id="login-container" className="position-relative d-flex flex-column text-center justify-content-center w-100 h-100">
                {showMessage && 
                message.error ?
                    <Alert className="alert-message w-50 mx-auto position-absolute start-50 translate-middle-x" variant='danger' onClose={() => {setShowMessage(false); setMessage({})}} dismissible>
                        <Alert.Heading>{message.error}</Alert.Heading>
                    </Alert> : message.success ?
                    <Alert className="alert-message w-50 mx-auto position-absolute start-50 translate-middle-x" variant='success' onClose={() => {setShowMessage(false); setMessage({})}} dismissible>
                        <Alert.Heading>{message.success}</Alert.Heading>
                        <p>Redirecting to the Login page</p>
                    </Alert> : <></>
                }
                {passwordMatch === false &&
                    <Alert className="alert-message w-50 mx-auto position-absolute start-50 translate-middle-x" variant='danger' dismissible>
                        <Alert.Heading>{"Passwords do not match"}</Alert.Heading>
                    </Alert>}
                <h3>Register</h3>
                    <form id="login-form" className="container my-0 align-items-center text-center" onSubmit={handleSubmit}>
                        <input type="text" id="name" className="col text-input border-secondary mb-1 border-2 form-control" name="firstName" placeholder="First Name" required/>
                        <input type="text" id="surname" className="col-xl-4 text-input border-secondary mb-1 border-2 form-control" name="lastName" placeholder="Last Name" required/>
                        <input type="email" id="email" className="col text-input border-secondary mb-1 border-2 form-control" name="email" placeholder="Email address" required onChange={getEmail}></input>
                        <input type="password" id="password" className="col text-input border-secondary mt-1 mb-1 border-2 form-control" name="password" placeholder="Password" required onChange={getPassword}></input>
                        <input type="password" id="re-password" className="col text-input border-secondary mt-1 border-2 form-control"  placeholder="Confirm Password" required onChange={getConfirmPassword}></input>
                        <input id="submit" className="m-4 btn-sm btn-warning" type="submit" value="Create Account" />  
                    </form>
            </div>
        </div>
    )
}

export default Register