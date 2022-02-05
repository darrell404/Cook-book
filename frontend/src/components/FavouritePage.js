import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import favouriteIcon from '../Assets/Favourite.svg'
import noImage from '../Assets/no-image.jpg'
import Loading from './Loading'
import { updateDB } from './utils/Utils'

function FavouritePage() {

    const [favouriteArray, setMyFavouriteArray] = useState([])
    const [myFavourites, setMyFavourites] = useState()
    const [deleteEntry, setDeleteEntry] = useState(false)
    const [noRecipe, setNoRecipe] = useState(false)
    const [loadPage, setLoadPage] = useState(true)
    const favouriteArrayIsFetched = useRef(false)

    // Fetch the array of Favourites from API

    useEffect(() => {
         const fetchFavouriteArray = async() => {
            const getAllFavourites = await fetch('/api/favourites').then(res => res.json()).then(data => data.favourites)
            setMyFavouriteArray(getAllFavourites)
        }
        fetchFavouriteArray()
    }, [])

    // When an item has been removed, this will update the Database, also checks if there is no recipe on mount

    useEffect(() => {
        if (favouriteArrayIsFetched.current)
            {
                if(deleteEntry === true) {
                    updateDB(favouriteArray)
                    setDeleteEntry(false)
                }
                const fetchFavouritesFromAPI = async() => {
                    const options = {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({"favourites" : favouriteArray })
                    }
                    const fetchFromAPI = await fetch('/api/recipes/searchRecipes', options).then(res => res.json()).then(data => (data.favouriteArray))
                    setMyFavourites(fetchFromAPI)   
                }
                    fetchFavouritesFromAPI()
                    setLoadPage(false)

                if (favouriteArray.length === 0) {
                    setLoadPage(false)
                    setNoRecipe(true)
                }
            }
        else {
            favouriteArrayIsFetched.current = true
        }
    }, [favouriteArray])

    const removeFavourite = (favouriteID) => {
        setDeleteEntry(true)
        setMyFavouriteArray(favouriteArray.filter(recipe => recipe !== favouriteID))
    }

    return (
        <div id="favourites-container" className="mx-auto w-75 text-center">
             <h3 className="text-center">My Favourites</h3>
             {loadPage ? <Loading /> : null}
             {noRecipe ? <p >No items in your Favourites </p> : null}
             {myFavourites ? 
                 <div id="card-container" className="d-flex flex flex-wrap mx-auto justify-content-center">
                     {myFavourites.map(favourite => 
                     <div key={favourite.recipeID} id="card" className="mx-2 d-flex align-items justify-content-center">
                         <Card className="mt-3 p-2 mx-1" style={{ width: "250px", height: "340px"}}>
                             <Link to={`/recipe/${favourite.recipeID}`} className="recipe-link" state={{from: 'Main'}}>
                             <Card.Img className="recipe-image card-image-top mx-auto d-block" src={favourite.image ? favourite.image : noImage}/>
                             <Card.Title className="pt-2" style={{height: "60px"}}>
                                 <h5 className="recipe-title text-center">{favourite.title.split(" ").map((e) => e.charAt(0).toUpperCase() + e.slice(1)).join(" ")}</h5>
                             </Card.Title>
                             </Link>
                             <Card.Text>
                             <span className="d-flex justify-content-center"><img className="favourite-icon m-4" src={favouriteIcon} onClick={() => removeFavourite(favourite.recipeID)} alt="Favourite" /></span>
                             </Card.Text>
                         </Card>
                     </div>
                 )}
                 </div> : null
             }
         </div>
    )
}

export default FavouritePage;