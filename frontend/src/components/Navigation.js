import { Button, Dropdown, Navbar, Container, Nav, NavDropdown, DropdownButton } from "react-bootstrap"
import { useLocation, useNavigate } from "react-router-dom"

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
      <Nav.Link className="text-warning" href="/account/favourites">Favourites</Nav.Link>
      <DropdownButton id="collasible-nav-dropdown" variant="warning" className="" title={`Welcome, ${props.userData}`}>
        <Dropdown.Item href="#">Settings</Dropdown.Item>
        <Dropdown.Item onClick={logOut}>Logout</Dropdown.Item>
      </DropdownButton>
    </Nav> :
    <Nav className="ms-auto text-sm-right pt-3">
      <Button href="/account/login" variant="warning">Login</Button>
    </Nav> }
    </Navbar.Collapse>
  </Navbar>
  )
}

  export default Navigation