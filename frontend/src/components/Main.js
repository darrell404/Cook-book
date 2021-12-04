import '../css/main.css'
import '../css/addon.css'
import { useState } from 'react';
import Login from './Login';
import Register from './Register'
import {useLocation} from 'react-router-dom';
import axios from 'axios'
 
function Main() {
  const location = useLocation();
  var [loading, setLoading] = useState(true)
  var [loggedIn, setLoggedIn] = useState(false)
  var [searchRecipe, setSearchRecipe] = useState([]);
  var [showFood, setShowFood] = useState([])
  var [offset, setOffset] = useState()

  const fetchRecipes = async () => await axios(`/recipes/search/${searchRecipe}`).then(response => setShowFood(response.data.results))

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchRecipe === '' | searchRecipe === undefined) return
    fetchRecipes()
  }

  const handleChange = (event) => {
    setSearchRecipe(event.target.value)
  }

  return (
    <div className="Container w-100 h-100">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      <header className="m-auto w-50 d-flex justify-content-center">
          <img src='/pot.png' alt='' width="50px" height="50px"/>
          <h3 className="p-2">Recipe Lookup</h3>
      </header>
      <div className="body-container m-auto border-0">
      <form onSubmit={handleSubmit} className="w-25 justify-content-center form-control d-flex m-auto border-0">
        <input onChange={handleChange} type="input" placeholder="Search for recipes here" className="border border-3 form-control w-75 justify-content-center rounded-0"></input>
        <button type="submit" className="search"><i className="fa fa-search"></i></button>
      </form>
      </div>
      <SearchRecipeContainer showFood={showFood}/>
    </div>
  );
}

function SearchRecipeContainer(props) {
  return(
    <div className="recipeContainer w-75 bg-secondary d-flex flex-wrap mt-5 mx-auto justify-content-around">
      {props.showFood.map(food => <RecipeBox key={food.id} foodInfo={food}/>)}
    </div>
  )
}

function RecipeBox(props) {
  return(
    <div className="m-1">
      <div className="m-1 p-1 align-items-center">
        <img src={props.foodInfo.image} width={"300px"} height={"200px"}/>
      </div>
    </div>
  )
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
