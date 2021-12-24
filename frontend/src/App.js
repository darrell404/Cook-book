import './App.css';
import './css/main.css'
import  { Main } from './components/Main'
import RecipePage from './components/RecipePage';
import { useState } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Login from './components/Login';
import Register from './components/Register';


function App() {

  var [searchRecipe, setSearchRecipe] = useState('')
  var [showFood, setShowFood] = useState({})

  const handleChange = (event) => {
    setSearchRecipe(event)
  }

  const updateShowFood = (data) => {
    setShowFood(data)
  }
  
  return (
    <Router>
       <Routes>
         <Route exact path='/' element={<Main showFood={showFood} searchRecipe={searchRecipe} handleChange={handleChange} updateShowFood={updateShowFood}/>} />
         <Route path='/recipe/:id' element={<RecipePage/>} />
         <Route path='/login' element={<Login/>} />
         <Route path='/register' element={<Register/>}/>
       </Routes>
    </Router>
  );
}

export default App;
