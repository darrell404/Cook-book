import '../css/main.css'
import '../css/addon.css'
import setFavourite from '../Assets/Set-Favourite.svg'
import { useState, useRef, forwardRef } from 'react'
import Login from './Login'
import Register from './Register'
import {useLocation, Link} from 'react-router-dom'
import axios from 'axios'
import { Card } from 'react-bootstrap'
 
const cuisines = ["All","African","American","British","Cajun","Caribbean","Chinese","Eastern European","European","French","German","Greek","Indian","Irish","Italian","Japanese","Jewish","Korean","Latin American","Mediterranean","Mexican","Middle Eastern","Nordic","Southern","Spanish","Thai","Vietnamese"]
const mealTypes = ["All","Main course","Side dish","Dessert","Appetizer","Salad","Bread","Breakfast","Soup","Beverage","Sauce","Marinade","Fingerfood","Snack","Drink"]
const sort = ["Ascending","Descending"]

const filterObject = {
  "Cuisine": cuisines,
  "MealType": mealTypes,
  "Sort": sort
}

export function Main(props) {
  const location = useLocation();
  var [loading, setLoading] = useState(true)
  var [loggedIn, setLoggedIn] = useState(false)
  var [offset, setOffset] = useState()

  var searchedRecipeRef = useRef('')


  const fetchRecipes = async () => await axios(`/recipes/search/${props.searchRecipe}`).then(response => storeShowFood(response.data))

  const submit = (event) => {
    event.preventDefault();
    if (props.searchRecipe === '' | props.searchRecipe === undefined) { 
        searchedRecipeRef.current = '';
        return
      }
    fetchRecipes()
    searchedRecipeRef.current = props.searchRecipe
  }

  const change = (event) => {
    props.handleChange(event.target.value)
  }

  const storeShowFood = (data) => {
    props.updateShowFood(data)
  }

  return (
    <div className="w-100 h-100">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      <Navigation />
        <div className="search-container mt-4 position-fixed">
            <form onSubmit={submit} className="w-100 form-control d-flex border-0">
            <input onChange={change} type="input" placeholder="Search for recipes here" className="border border-3 form-control w-75 rounded-0"></input>
            <button type="submit" className="search"><i className="fa fa-search"></i></button>
            </form>
        </div>
      <SearchRecipeContainer showFood={props.showFood} searchRecipe={props.searchRecipe} ref={searchedRecipeRef}/>
    </div>
  );
}

export function Navigation() {
  return (
  <div className="nav navbar border-bottom w-100 shadow-sm position-fixed bg-white">
    <div className="navbar-container w-100 d-flex mt-3 mb-2 px-3">
        <Link className='navbar-brand' to={'/'}>
          <img src='/pot.png' alt='' width="50px" height="50px"/>
        </Link>
        <Link className='nav-link' to={'/'}>
          <h3 className="logo-title p-2">Cook Book</h3>
        </Link>
    </div>
  </div>
  )
}

const SearchRecipeContainer = forwardRef((props, ref) => {
  var fetchedFood = props.showFood.results
  return(
    <div className="mx-auto recipe-list-container justify-content-center">
      {ref.current !== '' && <div className="w-75 m-auto pl-5"><h5 className="showresult">Showing results for {ref.current}...</h5></div>}
      <div className="mx-auto justify-content-center align-items-center w-75">
        {fetchedFood && fetchedFood.length !== 0 && <Filter food={fetchedFood}/>}
        <div className="container justify-content-center">
          <div className="d-flex flex flex-wrap mx-auto justify-content-center">
          {fetchedFood && fetchedFood.map(food => <RecipeBox key={food.id} foodInfo={food}/>)}
          </div>
        </div>
      </div>
    </div>
  )
})

function Filter() {
    let renderDataFilter = []
    for(const value in filterObject) {
      renderDataFilter.push(
        <div key={value} className="d-flex flex-column mx-2">
          <label>{value}</label>
            <select className="mt-2 selectpicker" id={value} name={value}>
              {filterObject[value].map((object, index) => <option key={index}>{object}</option>)}
            </select>
        </div>
      )
    }

    return (
    <div className="filter-container p-3">
      Filter by:
      <div className="filter-box d-flex flex-row flex-wrap w-100 mt-4">
        <div className="d-flex flex-wrap justify-content-between w-100">
          <div className="d-flex flex-wrap">
            {renderDataFilter}
          </div>
          <button className="btn button-search btn-sm p-1 mt-4 mx-2" type="submit">Update</button>
        </div>
      </div>
    </div>
  )
} 

function RecipeBox(props) {
  return(
      <Card className="mt-3 p-2 mx-1" style={{ width: "250px", height: "330px"}}>
        <Link to={`/recipe/${props.foodInfo.id}`} className="recipe-link" state={{from: 'Main'}}>
          <Card.Img className="recipe-image card-image-top mx-auto d-block" src={props.foodInfo.image}/>
          <Card.Title>
            <h5 className="text-center">{props.foodInfo.title.split(" ").map((e) => e.charAt(0).toUpperCase() + e.slice(1, e.length)).join(" ")}</h5>
          </Card.Title>
        </Link>
        <Card.Text>
          <span className="d-flex justify-content-center"><img className="m-4" src={setFavourite} alt="Favourite" /></span>
        </Card.Text>
      </Card>
  )
}


function LoadingPage() {
  return (
    <div>
      <div>Loading page...</div>
      <div className="loader"></div>
  </div>
  )
}
