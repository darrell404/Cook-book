import '../css/addon.css'
import setToFavourite from '../Assets/Set-Favourite.svg'
import addedToFavourite from '../Assets/Favourite.svg'
import { useState, useRef, forwardRef, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Card, Pagination } from 'react-bootstrap'
import Loading from './Loading'
import { AppContext } from '../context/Context'
import { fetchRecipesFromAPI, updateDB } from './utils/Utils'
 
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
  const [chosenFilter, setChosenFilter] = useState({"Cuisine": "All", "MealType": "All"})
  const [previousFilter, setPreviousFilter] = useState({"Cuisine": "All", "MealType": "All"})
  const {recipe, favourite, food, loggedin, loadingdata, itemsonpage, pagecount, activepagenumber} = useContext(AppContext)
  const [searchRecipe, setSearchRecipe] = recipe
  const [favourites, setFavourites] = favourite
  const [showFood, setShowFood] = food
  const [loggedIn, setLoggedIn] = loggedin
  const [loading, setLoading] = loadingdata
  const [itemsOnPage, setItemsOnPage] = itemsonpage
  const [pages, setPages] = pagecount
  const [activePage, setActivePage] = activepagenumber

  var searchedRecipeRef = useRef('')

  const fetchRecipes = async() => {
    setLoading(true)
    const response = await fetchRecipesFromAPI(searchRecipe, chosenFilter.Cuisine, chosenFilter.MealType)
    setShowFood(response)
    setLoading(false)
  }

  const fetchFavouriteState = async (event) => {
    event.preventDefault();
    if (searchRecipe !== '') {
      const getAllFavourites = await fetch('/api/favourites').then(res => res.json()).then(data => data.favourites)
      setFavourites(getAllFavourites)
    }
  }

  // Checks if user is logged in after adding recipe to Favourite

  const updateFavourites = (foodId) => {
    if(loggedIn === false) {
      navigate('/account/login')
      return
    }
    else updateFavouriteState(foodId)
  }

  // Updates Favourite State and updates the DB, if user is logged in

  const updateFavouriteState = (foodID) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"foodID": foodID})
    }
    const checkFavouriteIfExists = async() => {
      const getFavourite = await fetch('/api/recipes/searchSingleRecipe', options).then(res => (res))
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

  const submit = () => {
    if (searchRecipe === '' | searchRecipe === undefined) { 
        searchedRecipeRef.current = '';
        setShowFood('')
        return
      }
    setLoading(true)
    fetchRecipes()
    searchedRecipeRef.current = searchRecipe
  }

  const change = (event) => {  
      setSearchRecipe(event.target.value)
  }

  // function for sorting the data Ascending/Descending

  const changeSort = (event) => {
    const sort = event.target.value
    switch(sort) {
      case "Ascending":
        sortRecipe("ascend", showFood)
        break
      case "Descending":
        sortRecipe("descend", showFood)
        break
      default:
        break
    } 
  }

   // Sorting ascending or descending

   const sortRecipe = (order, data) => {
    if (order === "ascend") {
      const newData = data.results.sort((first, second) => {
        if (first.title < second.title) {
          return -1
        } 
        if (first.title > second.title) {
          return 1
        }
          return 0
      })

      setShowFood({...showFood, results: newData})
    }

    else if (order === "descend") {
      const newData = data.results.sort((first, second) => {
        if (first.title > second.title) {
          return -1
        } 
        if (first.title < second.title) {
          return 1
        }
          return 0
      })
      setShowFood({...showFood, results: newData})
    }
   
  }

  const fetchRecipesAndFavourites = (event) => {
    event.preventDefault();
    fetchFavouriteState(event)
    submit();
  }

  //  Keeps track of the filter choice, if it has been changed

  const changeFilter = (event) => {
    setChosenFilter(previousState => ({
      ...previousState, [event.target.id] : event.target.value
    }))
  }

  // Helper to only fetch for new recipe when filter value has been changed
  //  Avoids unnecessary API calls if update button has been pressed constantly

  const updateFilter = () => {
    if (JSON.stringify(previousFilter) === JSON.stringify(chosenFilter)) {
      return
    }
    fetchRecipes()
    setPreviousFilter(chosenFilter)
  }

  // Changes count number to update number of recipes on pae
  const changeCount = (event) => {
    let numberOfItems = event.target.value
      if(numberOfItems === "All") {
        setItemsOnPage(30)
      }
      else setItemsOnPage(numberOfItems)
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

  return (
    <div className="w-100 h-100">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
        <div className="search-container d-flex">
            <form onSubmit={fetchRecipesAndFavourites} className="w-100 form-control d-flex flex-row justify-content-center border-0">
            <input onChange={change} type="input" placeholder="Search for recipes here" className="border border-3 form-control w-50 rounded-0"></input>
            <button type="submit" className="search btn-lg bg-warning"><i className="fa fa-search"></i></button>
            </form>
        </div>
      <SearchRecipeContainer ref={searchedRecipeRef} updateFavourites={updateFavourites} updateFilter={updateFilter} changeFilter={changeFilter} changeCount={changeCount} changeSort={changeSort}/>
    </div>
  );
}

const SearchRecipeContainer = forwardRef((props, ref) => {
  const {food, loadingdata, activepagenumber, itemsonpage } = useContext(AppContext)
  const [showFood, useShowFood] = food
  const [loading, setLoading] = loadingdata
  const [activePage, setActivePage] = activepagenumber
  const [itemsOnPage, setItemsOnPage] = itemsonpage

  var fetchedFood = showFood.results
  return(
    <div className="mx-auto recipe-list-container justify-content-center">
      {ref.current !== '' ? <div className="w-75 m-auto pl-5"><h5 className="showresult">Showing results for {ref.current}...</h5></div> : null}
      <div className="mx-auto justify-content-center align-items-center w-75">
        {ref.current !== '' ?
          <>
          <Filter changeFilter={props.changeFilter} updateFilter={props.updateFilter} changeSort={props.changeSort}/>
          <ShowItems changeCount={props.changeCount}/>
          </> : null}
        <div className="container justify-content-center">
          <div className="d-flex flex flex-wrap mx-auto justify-content-center">
            {loading ? <Loading />
            :
            fetchedFood && (fetchedFood.length === 0 ? <div className="pt-5"> No recipes found </div> : 
            fetchedFood.slice((itemsOnPage * (activePage - 1)), (itemsOnPage * activePage)).map(food => <RecipeBox key={food.id} foodInfo={food} updateFavourites={props.updateFavourites}/>)
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
        <div className="sort-option d-flex flex-column mt-3 mx-2">
            <label className=''>Sort</label>
            <select className="mt-3 mb-2 selectpicker" id="sort" name="sort" onChange={props.changeSort}>
              {sortOptions.map((value) => <option key={value}>{value}</option>)}
            </select>
        </div>
      </div>
    </div>
  )
} 

// Component for choosing how many items to view on the page

function ShowItems(props) {
  return (
    <div className="container d-flex mt-3 justify-content-end">
      <h6 className="mx-3 mb-0">View</h6>
      <select className="" id="show-items" name="showItems" onChange={props.changeCount}>
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
  const {favourite} = useContext(AppContext)
  const [favourites, setFavourites] = favourite

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
          <span className="d-flex justify-content-center"><img className="favourite-icon m-4" onClick={() => props.updateFavourites(props.foodInfo.id)} src={favouriteIcon ? addedToFavourite : setToFavourite} alt="Favourite" /></span>
        </Card.Text>
      </Card>
  )
}
