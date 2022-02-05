import axios from "axios"

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
