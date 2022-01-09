import { Button, Dropdown } from "react-bootstrap"
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
    <div className="nav navbar navbar-dark bg-dark border-bottom w-100 shadow-sm position-fixed">
      <div className="navbar-container w-100 d-flex justify-content-between px-3">
          <a href='/' className="nav-link">
            <h3 className="logo-title text-warning">Cook Book</h3>
          </a>
        { props.loggedIn === "true" ? 
        <div className="d-flex justify-content-between">
          <a href='/account/favourites' className="nav-link mt-2">
            <h5 className="text-warning">Favourites</h5>
          </a>
          <Dropdown className="my-auto">
            <Dropdown.Toggle variant="warning" className="my-auto">{`Welcome, ${props.userData}`}</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item onClick={logOut}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          </div>
            : (location.pathname !== '/account/login') ? 
            <Button href="/account/login" variant="warning" className="h-25 my-auto">Login</Button> :
            <></>
        }
      </div>
    </div>
    )
  }

  export default Navigation