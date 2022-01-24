import '../css/main.css'
import '../css/addon.css'
import setToFavourite from '../Assets/Set-Favourite.svg'
import addedToFavourite from '../Assets/Favourite.svg'
import { useState, useRef, forwardRef, useEffect } from 'react'
import {useLocation, Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { Card } from 'react-bootstrap'
import Loading from './Loading'
 
const cuisines = ["All","African","American","British","Cajun","Caribbean","Chinese","Eastern European","European","French","German","Greek","Indian","Irish","Italian","Japanese","Jewish","Korean","Latin American","Mediterranean","Mexican","Middle Eastern","Nordic","Southern","Spanish","Thai","Vietnamese"]
const mealTypes = ["All","Main course","Side dish","Dessert","Appetizer","Salad","Bread","Breakfast","Soup","Beverage","Sauce","Marinade","Fingerfood","Snack","Drink"]
const sort = ["Default","Ascending","Descending"]

const filterObject = {
  "Cuisine": cuisines,
  "MealType": mealTypes,
  "Sort": sort
}

export function Main(props) {
  const location = useLocation();
  const navigate = useNavigate();

  const [chosenFilter, setChosenFilter] = useState({"Cuisine": "All", "MealType": "All"})
  const [previousFilter, setPreviousFilter] = useState()
  var [offset, setOffset] = useState()

  var searchedRecipeRef = useRef('')

  const fetchRecipes = async () => await axios(`/recipes/search/${props.searchRecipe}&instructionsRequired=true&cuisine=${chosenFilter.Cuisine}&type=${chosenFilter.MealType}`).then(response => storeShowFood(response.data))

  const submit = () => {
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

  const updateFavourites = (foodId) => {
    if(props.loggedIn === false) {
      navigate('/account/login')
      return
    }
    else props.updateFavouriteState(foodId)
  }

  const fetchRecipesAndFavourites = (event) => {
    event.preventDefault();
    props.fetchFavouriteState(event)
    submit();
  }

  const changeFilter = (event) => {
    setChosenFilter(previousState => ({
      ...previousState, [event.target.id] : event.target.value
    }))
  }

  const updateFilter = () => {
    if (JSON.stringify(previousFilter) == JSON.stringify(chosenFilter)) {
      return
    }
    fetchRecipes()
    setPreviousFilter(chosenFilter)
  }

  return (
    <div className="w-100 h-100">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        <div className="search-container d-flex">
            <form onSubmit={fetchRecipesAndFavourites} className="w-100 form-control d-flex flex-row justify-content-center border-0">
            <input onChange={change} type="input" placeholder="Search for recipes here" className="border border-3 form-control w-50 rounded-0"></input>
            <button type="submit" className="search btn-lg bg-warning"><i className="fa fa-search"></i></button>
            </form>
        </div>
      <SearchRecipeContainer showFood={props.showFood} searchRecipe={props.searchRecipe} ref={searchedRecipeRef} updateFavourites={updateFavourites} updateFilter={updateFilter} favourites={props.favourites} changeFilter={changeFilter}/>
    </div>
  );
}

const SearchRecipeContainer = forwardRef((props, ref) => {
  var fetchedFood = props.showFood.results
  return(
    <div className="mx-auto recipe-list-container justify-content-center">
      {ref.current !== '' && <div className="w-75 m-auto pl-5"><h5 className="showresult">Showing results for {ref.current}...</h5></div>}
      <div className="mx-auto justify-content-center align-items-center w-75">
        {ref.current !== '' && <Filter food={fetchedFood} changeFilter={props.changeFilter} updateFilter={props.updateFilter}/>}
        <div className="container justify-content-center">
          <div className="d-flex flex flex-wrap mx-auto justify-content-center">
          {fetchedFood && (fetchedFood.length == 0 ? <div className="pt-5"> No recipes found </div> : fetchedFood.map(food => <RecipeBox key={food.id} foodInfo={food} updateFavourites={props.updateFavourites} favourites={props.favourites}/>))}
          </div>
        </div>
      </div>
    </div>
  )
})

function Filter(props) {
    let renderDataFilter = []
    for(const value in filterObject) {
      renderDataFilter.push(
        <div key={value} className="d-flex flex-column mx-2">
          <label>{value}</label>
            <select className="mt-2 selectpicker" id={value} name={value} onChange={props.changeFilter}>
              {filterObject[value].map((object, index) => <option key={index}>{object}</option>)}
            </select>
        </div>
      )
    }

    return (
    <div className="filter-container text-light bg-dark p-3">
      <h5>Filter by:</h5>
      <div className="filter-box d-flex flex-row flex-wrap w-100 mt-4">
        <div className="d-flex flex-wrap justify-content-between w-100">
          <div className="d-flex flex-wrap">
            {renderDataFilter}
          </div>
          <button className="btn button-search btn-sm bg-warning p-1 mt-4 mx-2" type="submit" onClick={props.updateFilter}>Update</button>
        </div>
      </div>
    </div>
  )
} 

function RecipeBox(props) {
  const [favouriteIcon, setFavouriteIcon] = useState(false)
  useEffect(() => {
    if (props.favourites.includes(props.foodInfo.id)) {
      setFavouriteIcon(true)
    }
    else setFavouriteIcon(false)
  }, [props.favourites])

  return(
      <Card className="mt-3 p-2 mx-1 card-box" style={{ width: "250px", height: "340px"}}>
        <Link to={`/recipe/${props.foodInfo.id}`} className="recipe-link" state={{from: 'Main'}}>
          <Card.Img className="recipe-image card-image-top d-block" src={props.foodInfo.image}/>
          <Card.Title className="pt-2" style={{height: "60px"}}>
            <h5 className="recipe-title text-center">{props.foodInfo.title.split(" ").map((e) => e.charAt(0).toUpperCase() + e.slice(1, e.length)).join(" ")}</h5>
          </Card.Title>
        </Link>
        <Card.Text>
          <span className="d-flex justify-content-center"><img className="favourite-icon m-4" onClick={() => props.updateFavourites(props.foodInfo.id)} src={favouriteIcon ? addedToFavourite : setToFavourite} alt="Favourite" /></span>
        </Card.Text>
      </Card>
  )
}
