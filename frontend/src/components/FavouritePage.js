import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import favouriteIcon from '../Assets/Favourite.svg'

function FavouritePage(props) {

    const [myFavourites, setMyFavourites] = useState('')

    const fetchFavourites = () => {
        props.fetchFavouriteState()
    }

    useEffect(() => {
        fetchFavourites()
    }, [])

    useEffect(() => {
        if (props.favourites.length !== 0) {
            const fetchFavouritesFromAPI = async() => {
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({"favourites" : props.favourites })
                }
                const fetchFromAPI = await fetch('/recipes/searchRecipes', options).then(res => res.json()).then(data => (data.favouriteArray))
                console.log(fetchFromAPI)
                setMyFavourites(fetchFromAPI)
            }
                fetchFavouritesFromAPI()
        }
    }, [props.favourites])

    if(myFavourites)
    return (
        <div id="favourites-container" className="mx-auto w-75">
            <h3 className="text-center">My Favourites</h3>
            <div id="card-container" className="d-flex flex flex-wrap mx-auto justify-content-center">
                {myFavourites.map(favourite => 
                <div key={favourite.recipeID} id="card" className="mx-2 d-flex align-items justify-content-center">
                    <Card className="mt-3 p-2 mx-1" style={{ width: "250px", height: "330px"}}>
                        <Link to={`/recipe/${favourite.recipeID}`} className="recipe-link" state={{from: 'Main'}}>
                        <Card.Img className="recipe-image card-image-top mx-auto d-block" src={favourite.image}/>
                        <Card.Title>
                            <h5 className="recipe-title text-center">{favourite.title.split(" ").map((e) => e.charAt(0).toUpperCase() + e.slice(1, e.length)).join(" ")}</h5>
                        </Card.Title>
                        </Link>
                        <Card.Text>
                        <span className="d-flex justify-content-center"><img className="favourite-icon m-4" src={favouriteIcon} alt="Favourite" /></span>
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
            No items in your Favourites
        </div>
    )
}

export default FavouritePage;