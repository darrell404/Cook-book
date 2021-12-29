import './App.css';
import './css/main.css'
import  { Main } from './components/Main'
import RecipePage from './components/RecipePage';
import { Fragment, useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './components/Login';
import Register from './components/Register';
import Navigation from './components/Navigation';


function App() {

  var [searchRecipe, setSearchRecipe] = useState('')
  var [showFood, setShowFood] = useState({})
  var [loading, setLoading] = useState(true)
  var [loggedIn, setLoggedIn] = useState(false)

  const handleChange = (event) => {
    setSearchRecipe(event)
  }

  const updateShowFood = (data) => {
    setShowFood(data)
  }
  
  return (
    <div className='vw-100 vh-100 n-0 p-0'>
    <Router>
       <Fragment>
        <Navigation loggedIn={loggedIn}/>
        <Routes>
          <Route exact path='/' element={<Main showFood={showFood} searchRecipe={searchRecipe} handleChange={handleChange} updateShowFood={updateShowFood}/>} />
          <Route path='/recipe/:id' element={<RecipePage/>} />
          <Route exact path='/account/login' element={<Login/>} />
          <Route exact path='/account/register' element={<Register/>}/>
        </Routes>
       </Fragment>
    </Router>
    </div>
  );
}

export default App;
