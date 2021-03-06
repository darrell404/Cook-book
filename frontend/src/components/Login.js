import { Link, useNavigate } from 'react-router-dom'
import '../css/addon.css'
import { useState, useContext } from 'react'
import { AppContext } from '../context/Context'
import { Alert } from 'react-bootstrap'
import { setLocalStorage } from '../components/utils/Utils'

function Login(props) {
    const navigate = useNavigate()
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [showMessage, setShowMessage] = useState(false)
    const [message, setMessage] = useState({})
    const {loggedin, userdata, expiresession} = useContext(AppContext)
    const [loggedIn, setLoggedIn] = loggedin
    const [userData, setUserData] = userdata
    const [expiry, setExpiry] = expiresession


    const storeToLocalStorage = (loggedIn, userData, expiry) => {
        setLocalStorage(loggedIn, userData, expiry)
        setLoggedIn(window.localStorage.getItem("loggedIn"))
        setUserData(window.localStorage.getItem("user"))
        setExpiry(window.localStorage.getItem("expiry"))
    }

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const LoggingIn = await fetch('/api/login', options).then(response => response.json())
            .then(data => { 
                 if (data.error) {
                     setMessage(data)
                     setShowMessage(true)
                 }
                 else if (data.isAuth) {
                    const expiryEnd = (1000 * 60 * 60)
                    const currentTime = new Date()
                    const expiryTime = new Date(currentTime.getTime() + expiryEnd)
                    storeToLocalStorage(true, data.name, expiryTime.getTime())
                    navigate('/account/favourites')
                 }
                })
                .catch(err => console.log(err))
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
        <div className="w-100 h-100 p-0">
            <div id="login-container" className="d-flex flex-column w-100 h-100 justify-content-center align-self-center align-items-center">
                <h3 className="text-center mb-5">Login</h3>
                <form id="login-form" className="container my-0 align-items-center text-center" onSubmit={handleSubmit}>
                    <div className='col-xl-6 col-lg-6 col-md-8 m-auto'><input type="email" id="email" className="text-input border-secondary mb-1 border-2 form-control" name="email" onChange={handleChange} placeholder="Email address" required></input></div>
                    <div className='col-xl-6 col-lg-6 col-md-8 m-auto'><input type="password" autoComplete="current-password" id="current-password" className="text-input border-secondary mt-1 border-2 form-control" name="password" onChange={handleChange} placeholder="Password" required></input></div>
                    <input id="submit" className="m-4 btn-sm btn-warning" type="submit" value="Login" />
                    <p>If you do not have an account yet, click <Link to='/account/register'> here </Link> to register</p>
                </form>
                {showMessage && <Alert className="alert-message w-75 text-center mx-auto" variant='danger' onClose={() => {setShowMessage(false); setMessage({})}} dismissible>
                    <Alert.Heading>{message.error}</Alert.Heading>
                </Alert>}
            </div>
        </div>
    )
}

export default Login
