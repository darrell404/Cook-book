import React, { createContext, useState } from 'react'

export const AppContext = createContext()

const DataProvider = (props) => {
    const [searchRecipe, setSearchRecipe] = useState('')
    const [favourites, setFavourites] = useState([])
    const [showFood, setShowFood] = useState({})
    const [loggedIn, setLoggedIn] = useState(window.localStorage.getItem('loggedIn') || false)
    const [userData, setUserData] = useState(window.localStorage.getItem('user') || null)
    const [expiry, setExpiry] = useState(window.localStorage.getItem('expiry') || null)
    const [loading, setLoading] = useState(false)
    const [itemsOnPage, setItemsOnPage] = useState(5)
    const [pages, setPages] = useState(1)
    const [activePage, setActivePage] = useState(1)
    const [chosenFilter, setChosenFilter] = useState({"Cuisine": "All", "MealType": "All"})
    const [previousFilter, setPreviousFilter] = useState({"Cuisine": "All", "MealType": "All"})

    const valuesPassed = {recipe: [searchRecipe, setSearchRecipe], favourite: [favourites, setFavourites], 
        food: [showFood, setShowFood], loggedin: [loggedIn, setLoggedIn], userdata: [userData, setUserData], expiresession: [ expiry, setExpiry ], 
        loadingdata: [loading, setLoading], itemsonpage: [itemsOnPage, setItemsOnPage], pagecount: [pages, setPages], activepagenumber: [activePage, setActivePage],
        newfilter: [chosenFilter, setChosenFilter], oldfilter: [previousFilter, setPreviousFilter]}

    return (
        <AppContext.Provider value={valuesPassed}>
            {props.children}
        </AppContext.Provider>
    )
}

export default DataProvider
