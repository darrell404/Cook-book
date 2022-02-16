import axios from "axios"

// Sets up State for loading and pulling data from DB/API

export const fetchRecipes = async(setLoading, setShowFood, searchRecipe, chosenFilter) => {
  setLoading(true)
  const response = await fetchRecipesFromAPI(searchRecipe, chosenFilter.Cuisine, chosenFilter.MealType)
  setShowFood(response)
  setLoading(false)
}

// Fetches all the Recipes from the API based on search criteria

export const fetchRecipesFromAPI = async (searchRecipe, Cuisine, MealType) => {
    const foodArray = await axios(`/api/recipes/search/${searchRecipe}&instructionsRequired=true&cuisine=${Cuisine}&type=${MealType}&number=30`).then(response => (response.data))
    if (foodArray.results) {
        foodArray.results.forEach(recipe => {
            recipe.title = recipe.title.charAt(0).toUpperCase() + recipe.title.slice(1)
        })
    }
    return foodArray
  }

// Updates the DB when the used adds/removes a Favourite Recipe 

export const updateDB = async(fav) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"favourites": fav})
    }
    const updateFavouriteOnDB = await fetch('/api/favourites/add', options).then(res => res.json()).then(data => data)
    return updateFavouriteOnDB
  }

// Function to add data from State to Local Storage

export const setLocalStorage = (loggedInData, userData, expiry) => {
    window.localStorage.setItem("loggedIn", loggedInData)
    window.localStorage.setItem("user", userData)
    window.localStorage.setItem("expiry", expiry)
  }

// Function which adds or subtracts recipes from State to DB

export const UpdateFavouriteState = (foodID, favourites, setFavourites) => {
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
    return
}

// Changing sort of recipe

export const changeSort = (event, showFood, setShowFood) => {
  const sort = event.target.value
  switch(sort) {
    case "Ascending":
      sortRecipe("ascend", showFood, setShowFood)
      break
    case "Descending":
      sortRecipe("descend", showFood, setShowFood)
      break
    default:
      break
  } 
}

 // Sorting ascending or descending

 const sortRecipe = (order, data, setShowFood) => {
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

    setShowFood({...data, results: newData})
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
    setShowFood({...data, results: newData})
  }
 
}

  // Changes count number to update number of recipes on page

export const changeCount = (event, setItemsOnPage) => {
  let numberOfItems = event.target.value
    if(numberOfItems === "All") {
      setItemsOnPage(30)
    }
    else setItemsOnPage(numberOfItems)
}

 //  Keeps track of the filter choice, if it has been changed

export const changeFilter = (event, setChosenFilter) => {
  setChosenFilter(previousState => ({
    ...previousState, [event.target.id] : event.target.value
  }))
}

// Helper to only fetch for new recipe when filter value has been changed
//  Avoids unnecessary API calls if update button has been pressed constantly

export const updateFilter = (chosenFilter, previousFilter, setPreviousFilter, setLoading, setShowFood, searchRecipe) => {
  if (JSON.stringify(previousFilter) === JSON.stringify(chosenFilter)) {
    return
  }
  fetchRecipes(setLoading, setShowFood, searchRecipe, chosenFilter)
  setPreviousFilter(chosenFilter)
}

