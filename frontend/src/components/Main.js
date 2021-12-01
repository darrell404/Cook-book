import '../css/main.css'
import '../css/addon.css'
import { useState } from 'react';
import Login from './Login';
import Register from './Register'
import {useLocation} from 'react-router-dom';


function Main() {
  const location = useLocation();
  var [loading, setLoading] = useState(true)
  var [loggedIn, setLoggedIn] = useState(false)

  return (
    <div className="App w-100 h-100">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      <header className="m-auto w-50 d-flex justify-content-center">
          <img src='/pot.png' alt='' width="50px" height="50px"/>
          <h3 className="p-2">Recipe Lookup</h3>
      </header>
      <div className="body-container m-auto border-0">
      <form className="w-25 justify-content-center form-control d-flex m-auto border-0">
        <input type="input" placeholder="Search for recipes here" class="border border-3 form-control w-75 justify-content-center rounded-0"></input>
        <button type="submit" className="search"><i className="fa fa-search"></i></button>
      </form>
      </div>
    </div>
  );
}

export function LoadingPage() {
  return (
    <div>
      <div>Loading page...</div>
      <div className="loader"></div>
  </div>
  )
}

export default Main;
