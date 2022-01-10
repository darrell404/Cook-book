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
        const fetchFavouritesFromAPI = async() => {
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"favourites" : props.favourites })
            }
            const fetchFromAPI = await fetch('/recipes/searchRecipes', options).then(res => res.json()).then(data => (data.fetchFavourites[0]))
            setMyFavourites(fetchFromAPI)
        }
            fetchFavouritesFromAPI()
    }, [])

    if(myFavourites)
    return (
        <div id="favourites-container" className="mx-auto w-75">
            <h3 className="text-center">My Favourites</h3>
            <div id="card-container" className="mx-auto d-flex align-items justify-content-center">
                <Card className="mt-3 p-2 mx-1" style={{ width: "250px", height: "330px"}}>
                    <Link to={`/recipe/${myFavourites.id}`} className="recipe-link" state={{from: 'Main'}}>
                    <Card.Img className="recipe-image card-image-top mx-auto d-block" src={myFavourites.image}/>
                    <Card.Title>
                        <h5 className="recipe-title text-center">{myFavourites.title.split(" ").map((e) => e.charAt(0).toUpperCase() + e.slice(1, e.length)).join(" ")}</h5>
                    </Card.Title>
                    </Link>
                    <Card.Text>
                    <span className="d-flex justify-content-center"><img className="favourite-icon m-4" src={favouriteIcon} alt="Favourite" /></span>
                    </Card.Text>
                </Card>
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