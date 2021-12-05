import '../css/main.css'
import '../css/addon.css'
import { useState, useRef, forwardRef } from 'react';
import Login from './Login';
import Register from './Register'
import {useLocation, Link} from 'react-router-dom';
import axios from 'axios'
import { Card } from 'react-bootstrap'
 
function Main() {
  const location = useLocation();
  var [loading, setLoading] = useState(true)
  var [loggedIn, setLoggedIn] = useState(false)
  var [searchRecipe, setSearchRecipe] = useState('');
  var [showFood, setShowFood] = useState({})
  var [offset, setOffset] = useState()

  var searchedRecipeRef = useRef('')


  const fetchRecipes = async () => await axios(`/recipes/search/${searchRecipe}`).then(response => setShowFood(response.data))

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchRecipe === '' | searchRecipe === undefined) { 
        searchedRecipeRef.current = '';
        return
      }
    fetchRecipes()
    searchedRecipeRef.current = searchRecipe
  }

  const handleChange = (event) => {
    setSearchRecipe(event.target.value)
  }

  return (
    <div className="Container w-100 h-100">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      <nav className="w-100 border-bottom shadow-sm">
        <div className="navbar-container w-75 d-flex m-auto mt-3 mb-2">
          <div className="logo-container w-25 d-flex m-0">
              <img className="" src='/pot.png' alt='' width="50px" height="50px"/>
              <h3 className="p-2">Recipe Lookup</h3>
          </div>
          <div className="search-container w-50">
              <form onSubmit={handleSubmit} className="w-75 justify-content-center form-control d-flex m-auto border-0">
                <input onChange={handleChange} type="input" placeholder="Search for recipes here" className="border border-3 form-control w-75 justify-content-center rounded-0"></input>
                <button type="submit" className="search"><i className="fa fa-search"></i></button>
              </form>
          </div>
        </div>
      </nav>
      <div className="body-container m-auto border-0">
      </div>
      <SearchRecipeContainer showFood={showFood} searchRecipe={searchRecipe} ref={searchedRecipeRef}/>
    </div>
  );
}

const SearchRecipeContainer = forwardRef((props, ref) => {
  var fetchedFood = props.showFood.results
  return(
    <div className="container recipeContainer w-75 row mt-5 mx-auto justify-content-center">
      {ref.current !== '' && <div className="w-100 text-left mt-3 mb-3"><h3>Showing results for {ref.current}...</h3></div>}
      {fetchedFood && fetchedFood.map(food => <RecipeBox key={food.id} foodInfo={food}/>)}
    </div>
  )
})

function RecipeBox(props) {
  return(
    <Card className="mt-3" style={{ width: "300px", height: "350px"}}>
      <Link to={`/recipe/${props.foodInfo.id}`} state={{from: 'Main'}}>
        <Card.Img className="card-image-top" src={props.foodInfo.image} width={"300px"} height={"250px"} />
        <Card.Title>
          <h5 className="text-center">{props.foodInfo.title.split(" ").map((e) => e.charAt(0).toUpperCase() + e.slice(1, e.length)).join(" ")}</h5>
        </Card.Title>
      </Link>
      <Card.Text>
        <p className="text-center">Add to Favourites</p>
      </Card.Text>
    </Card>
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
