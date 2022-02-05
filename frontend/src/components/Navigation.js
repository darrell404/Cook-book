import { Button, Dropdown, Navbar, Nav, DropdownButton } from "react-bootstrap"
import { useNavigate, Link } from "react-router-dom"
import { useContext } from 'react'
import { AppContext } from '../context/Context'

function Navigation() {

  const {loggedin, userdata, expiresession} = useContext(AppContext)
  const [loggedIn, setLoggedIn] = loggedin
  const [userData, setUserData] = userdata
  const [expiry, setExpiry] = expiresession

  const navigate = useNavigate();
  const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
  }

  const logOut = async () => {
    const loggingOut = await fetch('/api/logout', options).then(response => response.json()).catch((err) => console.log(err))
    clearLocalStorage()
    navigate('/account/login')
  }

  const clearLocalStorage = () => {
      localStorage.clear()
      setLoggedIn(false)
      setUserData(null)
      setExpiry(null)
  }

return (
  <Navbar collapseOnSelect className="px-3 py-4" expand="md" bg="dark" variant="dark">
    <Navbar.Brand className="text-warning px-3 me-auto" href="/"><h3>Cook Book</h3></Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
    { loggedIn === "true" ? 
    <Nav className="ms-auto text-center">
      <Link to="/account/favourites" className="text-warning mx-4 my-2 text-decoration-none">Favourites</Link>
      <DropdownButton id="collasible-nav-dropdown" variant="warning" className="" title={`Welcome, ${userData}`}>
        <Dropdown.Item onClick={logOut}>Logout</Dropdown.Item>
      </DropdownButton>
    </Nav> :
    <Nav className="ms-auto text-sm-right pt-3">
      <Button variant="warning" onClick={() => {navigate('/account/login')}}>Login</Button>
    </Nav> }
    </Navbar.Collapse>
  </Navbar>
  )
}

  export default Navigation