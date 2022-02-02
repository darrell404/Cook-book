import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import favouriteIcon from '../Assets/Favourite.svg'
import noImage from '../Assets/no-image.jpg'
import Loading from './Loading'

function FavouritePage(props) {

    const [favouriteArray, setMyFavouriteArray] = useState([])
    const [myFavourites, setMyFavourites] = useState()
    const [deleteEntry, setDeleteEntry] = useState(false)
    const [noRecipe, setNoRecipe] = useState(false)

    useEffect(() => {
         const fetchFavouriteArray = async() => {
            const getAllFavourites = await fetch('/api/favourites').then(res => res.json()).then(data => data.favourites)
            setMyFavouriteArray(getAllFavourites)
        }
        fetchFavouriteArray()
    }, [])

    useEffect(() => {
        timer()
        if (favouriteArray !== 0) {
            if(deleteEntry === true) {
                props.updateDB(favouriteArray)
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
        }
    }, [favouriteArray])

    const timer = () => {
        setTimeout(() => {
            if (!myFavourites) {
                setNoRecipe(true)
            }
        }, 2000)
    }

    const removeFavourite = (favouriteID) => {
        setDeleteEntry(true)
        setMyFavouriteArray(favouriteArray.filter(recipe => recipe !== favouriteID))
    }

    if(myFavourites)
    return (
        <div id="favourites-container" className="mx-auto w-75">
            <h3 className="text-center">My Favourites</h3>
            <div id="card-container" className="d-flex flex flex-wrap mx-auto justify-content-center">
                {myFavourites.map(favourite => 
                <div key={favourite.recipeID} id="card" className="mx-2 d-flex align-items justify-content-center">
                    <Card className="mt-3 p-2 mx-1" style={{ width: "250px", height: "340px"}}>
                        <Link to={`/recipe/${favourite.recipeID}`} className="recipe-link" state={{from: 'Main'}}>
                        <Card.Img className="recipe-image card-image-top mx-auto d-block" src={favourite.image ? favourite.image : noImage}/>
                        <Card.Title className="pt-2" style={{height: "60px"}}>
                            <h5 className="recipe-title text-center">{favourite.title.split(" ").map((e) => e.charAt(0).toUpperCase() + e.slice(1, e.length)).join(" ")}</h5>
                        </Card.Title>
                        </Link>
                        <Card.Text>
                        <span className="d-flex justify-content-center"><img className="favourite-icon m-4" src={favouriteIcon} onClick={() => removeFavourite(favourite.recipeID)} alt="Favourite" /></span>
                        </Card.Text>
                    </Card>
                </div>
            )}
            </div>
        </div>
    )

    else return (
        <div id="favourites-container" className="mx-auto w-75 text-center">
            <h3 className="text-center">My Favourites</h3>
            {!noRecipe && <Loading />}
            {noRecipe && <p >No items in your Favourites </p>}
        </div>
    )
}

export default FavouritePage;