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
    const [disableButton, setDisableButton] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (confirmPassword !== password) {
            setPasswordMatch(false)
            hideAlert()
            return
        }
        setDisableButton(true)
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
            setDisableButton(true)
            setMessage(sendData)
            setShowMessage(true)
            setTimeout(() => {
                navigate('/account/login')
            }, 1500)
        }
        if(sendData.error) {
            setDisableButton(false)
            setMessage(sendData)
            setShowMessage(true)
            setTimeout(() => {
                setShowMessage(false)
            }, 3000)
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
        <div className="w-100 my-auto p-0">
            <div id="login-container" className="position-relative d-flex flex-column text-center justify-content-center w-100 h-100">
                {showMessage && 
                message.error ?
                    <Alert className="alert-message w-50 mx-auto position-absolute start-50 translate-middle-x" variant='danger' onClose={() => {setShowMessage(false); setMessage({})}} dismissible>
                        <Alert.Heading>{message.error}</Alert.Heading>
                    </Alert> : 
                message.success ?
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
                        <div className='col-xl-6 col-lg-6 m-auto'><input type="text" id="name" className="text-input border-secondary mb-1 border-2 form-control" name="firstName" placeholder="First Name" required/></div>
                        <div className='col-xl-6 col-lg-6 m-auto'><input type="text" id="surname" className="text-input border-secondary mb-1 border-2 form-control" name="lastName" placeholder="Last Name" required/></div>
                        <div className='col-xl-6 col-lg-6 m-auto'><input type="email" id="email" className="text-input border-secondary mb-1 border-2 form-control" name="email" placeholder="Email address" required onChange={getEmail}></input></div>
                        <div className='col-xl-6 col-lg-6 m-auto'><input type="password" autoComplete="new-password" id="new-password" className="text-input border-secondary mt-1 mb-1 border-2 form-control" name="password" placeholder="Password" required onChange={getPassword}></input></div>
                        <div className='col-xl-6 col-lg-6 m-auto'><input type="password" autoComplete="new-password" id="re-password" className="text-input border-secondary mt-1 border-2 form-control"  placeholder="Confirm Password" required onChange={getConfirmPassword}></input></div>
                        <div className='col-xl-6 col-lg-6 m-auto'><input id="submit" disabled={disableButton} className="m-4 btn-sm btn-warning" type="submit" value="Create Account" /></div>
                    </form>
            </div>
        </div>
    )
}

export default Register