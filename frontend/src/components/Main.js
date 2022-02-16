import '../css/addon.css'
import setToFavourite from '../Assets/Set-Favourite.svg'
import addedToFavourite from '../Assets/Favourite.svg'
import { useState, forwardRef, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, Pagination } from 'react-bootstrap'
import Loading from './Loading'
import { AppContext } from '../context/Context'
import { UpdateFavouriteState, changeSort, changeCount, fetchRecipes, changeFilter, updateFilter } from './utils/Utils'
 
const cuisines = ["All","African","American","British","Cajun","Caribbean","Chinese","Eastern European","European","French","German","Greek","Indian","Irish","Italian","Japanese","Jewish","Korean","Latin American","Mediterranean","Mexican","Middle Eastern","Nordic","Southern","Spanish","Thai","Vietnamese"]
const mealTypes = ["All","Main course","Side dish","Dessert","Appetizer","Salad","Bread","Breakfast","Soup","Beverage","Sauce","Marinade","Fingerfood","Snack","Drink"]
const sortOptions = ["Default","Ascending","Descending"]
const numberOfItems = [5, 10, "All"]

const filterObject = {
  "Cuisine": cuisines,
  "MealType": mealTypes
}

export function Main(props) {
  const navigate = useNavigate();
  const {recipe, favourite, food, loggedin, loadingdata, itemsonpage, pagecount, activepagenumber, newfilter, oldfilter} = useContext(AppContext)
  const [searchRecipe, setSearchRecipe] = recipe
  const [favourites, setFavourites] = favourite
  const [showFood, setShowFood] = food
  const [loggedIn, setLoggedIn] = loggedin
  const [loading, setLoading] = loadingdata
  const [itemsOnPage, setItemsOnPage] = itemsonpage
  const [pages, setPages] = pagecount
  const [activePage, setActivePage] = activepagenumber
  const [previousFilter, setPreviousFilter] = oldfilter
  const [chosenFilter, setChosenFilter] = newfilter

  const fetchFavouriteState = async (event) => {
    if (searchRecipe !== '') {
      const getAllFavourites = await fetch('/api/favourites').then(res => res.json()).then(data => data.favourites)
      setFavourites(getAllFavourites)
    }
  }

  const fetchRecipesAndFavourites = (event) => {
    event.preventDefault();
    setSearchRecipe(event.target.querySelector('input').value)
  }

  useEffect(() => {
    if(showFood.message) {
      return
    }
    if(Object.keys(showFood).length !== 0) {
        setPages(Math.ceil(showFood.results.length/itemsOnPage))
        setActivePage(1)
      }
  }, [showFood, itemsOnPage])

  useEffect(() => {
    fetchFavouriteState(searchRecipe)
    if (searchRecipe === '' | searchRecipe === undefined) { 
      setShowFood('')
      return
    }
    setLoading(true)
    fetchRecipes(setLoading, setShowFood, searchRecipe, chosenFilter)
  }, [searchRecipe])

  return (
    <div className="w-100 h-100">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        <div className="search-container d-flex">
            <form onSubmit={fetchRecipesAndFavourites} className="w-100 form-control d-flex flex-row justify-content-center border-0">
            <input type="input" placeholder="Search for recipes here" className="border border-3 form-control w-50 rounded-0"></input>
            <button type="submit" className="search btn-lg bg-warning"><i className="fa fa-search"></i></button>
            </form>
        </div>
      <SearchRecipeContainer updateFilter={updateFilter} changeFilter={changeFilter} />
    </div>
  );
}

const SearchRecipeContainer = forwardRef((props, ref) => {
  const {food, loadingdata, activepagenumber, itemsonpage, recipe } = useContext(AppContext)
  const [searchRecipe, setSearchRecipe] = recipe
  const [showFood, useShowFood] = food
  const [loading, setLoading] = loadingdata
  const [activePage, setActivePage] = activepagenumber
  const [itemsOnPage, setItemsOnPage] = itemsonpage

  var fetchedFood = showFood.results
  return(
    <div className="mx-auto recipe-list-container justify-content-center">
      {searchRecipe !== '' ? <div className="w-75 m-auto pl-5"><h5 className="showresult">Showing results for {searchRecipe}...</h5></div> : null}
      <div className="mx-auto justify-content-center align-items-center w-75">
        {searchRecipe !== '' ?
          <>
          <Filter changeFilter={props.changeFilter} updateFilter={props.updateFilter} />
          <ShowItems />
          </> : null}
        <div className="container justify-content-center">
          <div className="d-flex flex flex-wrap mx-auto justify-content-center">
            {loading ? <Loading />
            :
            fetchedFood && (fetchedFood.length === 0 ? <div className="pt-5"> No recipes found </div> : 
            fetchedFood.slice((itemsOnPage * (activePage - 1)), (itemsOnPage * activePage)).map(food => <RecipeBox key={food.id} foodInfo={food} />)
            )}
          </div>
          {fetchedFood ? <Pages/> : null}
        </div>
      </div>
    </div>
  )
})

// Component which creates the filter box

function Filter(props) {
    const { food, newfilter, oldfilter, loadingdata, recipe } = useContext(AppContext)
    const [showFood, setShowFood] = food
    const [chosenFilter, setChosenFilter] = newfilter
    const [previousFilter, setPreviousFilter] = oldfilter
    const [loading, setLoading] = loadingdata
    const [searchRecipe, setSearchRecipe] = recipe
    let renderDataFilter = []

    for(const value in filterObject) {
      renderDataFilter.push(
        <div key={value} className="d-flex flex-column mx-2">
          <label>{value}</label>
            <select className="mt-2 selectpicker" id={value} name={value} onChange={(event) => changeFilter(event, setChosenFilter)}>
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
          <button className="btn button-search btn-sm bg-warning p-1 mt-4 mx-2" type="submit" onClick={() => updateFilter(chosenFilter, previousFilter, setPreviousFilter, setLoading, setShowFood, searchRecipe)}>Update</button>
        </div>
        <div className="sort-option d-flex flex-column mt-3 mx-2">
            <label className=''>Sort</label>
            <select className="mt-3 mb-2 selectpicker" id="sort" name="sort" onChange={(event) => changeSort(event, showFood, setShowFood)}>
              {sortOptions.map((value) => <option key={value}>{value}</option>)}
            </select>
        </div>
      </div>
    </div>
  )
} 

// Component for choosing how many items to view on the page

function ShowItems(props) {
  const { itemsonpage } = useContext(AppContext)
  const [itemsOnPage, setItemsOnPage] = itemsonpage
  return (
    <div className="container d-flex mt-3 justify-content-end">
      <h6 className="mx-3 mb-0">View</h6>
      <select className="" id="show-items" name="showItems" onChange={(event) => changeCount(event, setItemsOnPage)}>
          {numberOfItems.map((items, index) => <option key={index}>{items}</option>)}
      </select>
    </div>
  )
}

// Component for dynamically creating the number of pages

function Pages(props) {
  const { pagecount, activepagenumber } = useContext(AppContext)
  const [pages, setPages] = pagecount
  const [activePage, setActivePage] = activepagenumber
  var pageArray = []
  for (let pagenumber= 1; pagenumber <= pages; pagenumber++) {
    pageArray.push(
      <Pagination.Item onClick={() => {setActivePage(pagenumber)}} key={pagenumber} active={pagenumber === activePage}>
        {pagenumber}
      </Pagination.Item>,
    )
  }

  const pagination =  <Pagination>{pageArray}</Pagination>
  return (
    <div className="my-5 d-flex justify-content-center">
      {pagination}
    </div>
  )
}

// Recipe Cards render after search

function RecipeBox(props) {
  const [favouriteIcon, setFavouriteIcon] = useState(false)
  const {favourite, loggedin} = useContext(AppContext)
  const [favourites, setFavourites] = favourite
  const [loggedIn] = loggedin
  const navigate = useNavigate();

  useEffect(() => {
    if (favourites.includes(props.foodInfo.id)) {
      setFavouriteIcon(true)
    }
    else setFavouriteIcon(false)
  }, [favourites])

  return(
      <Card className="mt-3 p-2 mx-1 card-box" style={{ width: "250px", height: "340px"}}>
        <Link to={`/recipe/${props.foodInfo.id}`} className="recipe-link" state={{from: 'Main'}}>
          <Card.Img className="recipe-image card-image-top d-block" src={props.foodInfo.image}/>
          <Card.Title className="pt-2" style={{height: "60px"}}>
            <h5 className="recipe-title text-center">{props.foodInfo.title.charAt(0).toUpperCase() + props.foodInfo.title.slice(1)}</h5>
          </Card.Title>
        </Link>
        <Card.Text>
          <span className="d-flex justify-content-center"><img className="favourite-icon m-4" onClick={() => loggedIn ? UpdateFavouriteState(props.foodInfo.id, favourites, setFavourites) : navigate('/account/login')} src={favouriteIcon ? addedToFavourite : setToFavourite} alt="Favourite" /></span>
        </Card.Text>
      </Card>
  )
}
