import './App.css';
import './css/main.css'
import  { Main } from './components/Main'
import RecipePage from './components/RecipePage';
import FavouritePage from './components/FavouritePage'
import { Fragment, useState, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login';
import Register from './components/Register';
import Navigation from './components/Navigation';

function App() {
  const [searchRecipe, setSearchRecipe] = useState('')
  const [showFood, setShowFood] = useState({})
  const [loading, setLoading] = useState(true)
  const [loggedIn, setLoggedIn] = useState(window.localStorage.getItem('loggedIn') || false)
  const [userData, setUserData] = useState(window.localStorage.getItem('user') || null)
  const [expiry, setExpiry] = useState(window.localStorage.getItem('expiry') || null)
  const [favourites, setFavourites] = useState([])

  useEffect(() => {
      const getCurrentTime = new Date().getTime()
      if(expiry !== null && getCurrentTime > expiry) {
        clearLocalStorage()
      }
  }, [expiry])

  const setLocalStorage = (loggedInData, userData, expiry) => {
    window.localStorage.setItem("loggedIn", loggedInData)
    window.localStorage.setItem("user", userData)
    window.localStorage.setItem("expiry", expiry)
    setLoggedIn(window.localStorage.getItem("loggedIn"))
    setUserData(window.localStorage.getItem("user"))
    setExpiry(window.localStorage.getItem("expiry"))
  }

  const clearLocalStorage = () => {
    localStorage.clear()
    setLoggedIn(false)
    setUserData(null)
    setExpiry(null)
  }

  const handleChange = (event) => {
    setSearchRecipe(event)
  }

  const updateShowFood = (data) => {
    setShowFood(data)
  }

  const updateDB = async(fav) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"favourites": fav})
    }
    const updateFavouriteOnDB = await fetch('/favourites/add', options).then(res => res.json()).then(data => data)
  }

  const updateFavouriteState = (foodID) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"foodID": foodID})
    }
    const checkFavouriteIfExists = async() => {
      const getFavourite = await fetch('/recipes/searchSingleRecipe', options).then(res => console.log(res))
    }

    checkFavouriteIfExists()

    if (favourites.includes(foodID)) {
      const removeFavourite = favourites.filter(food => food !== foodID)
      setFavourites(removeFavourite)
      updateDB(removeFavourite)
    }
    else {
      const addFavourite = [...favourites, foodID]
      setFavourites(addFavourite)
      updateDB(addFavourite)
    }
  }

  const fetchFavouriteState = async (event) => {
    if (event) event.preventDefault();
    const getAllFavourites = await fetch('/favourites').then(res => res.json()).then(data => data.favourites)
    setFavourites(getAllFavourites)
  }

  return (
    <div className='w-100 h-100 n-0 p-0'>
    <Router>
       <Fragment>
        <Navigation loggedIn={loggedIn} userData={userData} expiry={expiry} clearLocalStorage={clearLocalStorage}/>
        <Routes>
          <Route exact path='/' element={<Main showFood={showFood} searchRecipe={searchRecipe} handleChange={handleChange} updateShowFood={updateShowFood} loggedIn={loggedIn} favourites={favourites} updateFavouriteState={updateFavouriteState} fetchFavouriteState={fetchFavouriteState}/>} />
          <Route path='/recipe/:id' element={<RecipePage/>} />
          <Route path='/account/favourites' element={loggedIn ? <FavouritePage updateDB={updateDB} /> : <Navigate to='/account/login' />} />
          <Route exact path='/account/login' element={loggedIn ? <Navigate to='/'/> : <Login setLocalStorage={setLocalStorage}/>} />
          <Route exact path='/account/register' element={loggedIn ? <Navigate to='/'/> : <Register/>}/>
        </Routes>
       </Fragment>
    </Router>
    </div>
  );
}

export default App;
