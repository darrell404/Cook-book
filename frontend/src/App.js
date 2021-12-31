import './App.css';
import './css/main.css'
import  { Main } from './components/Main'
import RecipePage from './components/RecipePage';
import { Fragment, useState } from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login';
import Register from './components/Register';
import Navigation from './components/Navigation';


function App() {

  const [searchRecipe, setSearchRecipe] = useState('')
  const [showFood, setShowFood] = useState({})
  const [loading, setLoading] = useState(true)
  const [loggedIn, setLoggedIn] = useState(window.localStorage.getItem('loggedIn') || false)
  const [userData, setUserData] = useState(window.localStorage.getItem('User') || null)

  const handleChange = (event) => {
    setSearchRecipe(event)
  }

  const updateShowFood = (data) => {
    setShowFood(data)
  }
  
  const storeUserData = (data) => {
    setUserData(data)
  }

  return (
    <div className='vw-100 vh-100 n-0 p-0'>
    <Router>
       <Fragment>
        <Navigation loggedIn={loggedIn} userData={userData}/>
        <Routes>
          <Route exact path='/' element={<Main showFood={showFood} searchRecipe={searchRecipe} handleChange={handleChange} updateShowFood={updateShowFood} loggedIn={loggedIn}/>} />
          <Route path='/recipe/:id' element={<RecipePage/>} />
          <Route exact path='/account/login' element={loggedIn ? <Navigate to='/'/> : <Login storeUserData={storeUserData}/>} />
          <Route exact path='/account/register' element={loggedIn ? <Navigate to='/'/> : <Register/>}/>
        </Routes>
       </Fragment>
    </Router>
    </div>
  );
}

export default App;
