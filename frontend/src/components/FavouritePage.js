import { useEffect, useState } from 'react'
import { RecipeBox } from '../components/Main'

function FavouritePage(props) {

    const [myFavourites, setMyFavourites] = useState([])

    const fetchFavourites = () => {
        props.fetchFavouriteState()
    }

    useEffect(() => {
        fetchFavourites()
    }, [])

    useEffect(() => {
        if(props.favourites) {
            props.favourites.forEach(id => {
                let fetchFavouriteData = async() => {
                    const dataFetched = await fetch(`/recipes/info/${id}`).then(res => res.json()).then(data => data)
                    setMyFavourites(data => [...myFavourites, data])
                }
                fetchFavouriteData()
            })
            console.log(myFavourites)
        }
    }, [props.favourites])

    if(props.favourites)
    return (
        <div id="favourites-container">
            <p>{props.favourites}</p>
            <p>{myFavourites}</p>
        </div>
    )

    else return (
        <div>
            No data found
        </div>
    )
}

export default FavouritePage;