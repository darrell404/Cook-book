import { Button, Dropdown, Navbar, Nav, DropdownButton } from "react-bootstrap"
import { useLocation, useNavigate, Link } from "react-router-dom"

function Navigation(props) {
  const navigate = useNavigate();
  const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    }
}

  const location = useLocation(); 

  const logOut = async () => {
    const loggingOut = await fetch('/logout', options).then(response => response.json()).catch((err) => console.log(err))
    props.clearLocalStorage()
    navigate('/account/login')
  }
  
return (
  <Navbar collapseOnSelect className="px-3 py-4" expand="md" bg="dark" variant="dark">
    <Navbar.Brand className="text-warning px-3 me-auto" href="/"><h3>Cook Book</h3></Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
    { props.loggedIn === "true" ? 
    <Nav className="ms-auto text-center">
      <Link to="/account/favourites" className="text-warning mx-4 my-2 text-decoration-none">Favourites</Link>
      <DropdownButton id="collasible-nav-dropdown" variant="warning" className="" title={`Welcome, ${props.userData}`}>
        <Dropdown.Item>Settings</Dropdown.Item>
        <Dropdown.Item onClick={logOut}>Logout</Dropdown.Item>
      </DropdownButton>
    </Nav> :
    <Nav className="ms-auto text-sm-right pt-3">
      <Button variant="warning"><Link to='/account/login' className="link-dark text-decoration-none">Login</Link></Button>
    </Nav> }
    </Navbar.Collapse>
  </Navbar>
  )
}

  export default Navigation