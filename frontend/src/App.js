import './App.css';
import './css/main.css'
import  { Main } from './components/Main'
import RecipePage from './components/RecipePage';
import FavouritePage from './components/FavouritePage'
import { Fragment, useEffect, useContext } from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login';
import Register from './components/Register';
import Navigation from './components/Navigation';
import PageNotFound from './components/PageNotFound';
import { AppContext } from './context/Context'

function App() {
  const { loggedin, userdata, expiresession } = useContext(AppContext)
  const [loggedIn, setLoggedIn] = loggedin
  const [userData, setUserData] = userdata
  const [expiry, setExpiry] = expiresession

  // Check if user's session has expired from Backend

  useEffect(() => {
      const getCurrentTime = new Date().getTime()
      if(expiry !== null && getCurrentTime > expiry) {
        clearLocalStorage()
      }
  }, [expiry])

  // Logout user if expired

  const clearLocalStorage = () => {
    localStorage.clear()
    setLoggedIn(false)
    setUserData(null)
    setExpiry(null)
}

  return (
    <div className='p-0'>
    <Router>
       <Fragment>
       <Navigation />
        <Routes>
          <Route exact path='/' element={<Main/>} />
          <Route path='/recipe/:id' element={<RecipePage/>} />
          <Route path='/account/favourites' element={loggedIn ? <FavouritePage /> : <Navigate to='/account/login' />} />
          <Route exact path='/account/login' element={loggedIn ? <Navigate to='/'/> : <Login />} />
          <Route exact path='/account/register' element={loggedIn ? <Navigate to='/'/> : <Register/>}/>
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
       </Fragment>
    </Router>
    </div>
  );
}

export default App;
