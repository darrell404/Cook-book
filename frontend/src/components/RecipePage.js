import '../css/addon.css'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react';
import { ListGroup, Row, Image, Tabs, Tab, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import Loading from './Loading';
import { UpdateFavouriteState } from './utils/Utils'
import { AppContext } from '../context/Context'
import setToFavourite from '../Assets/Set-Favourite.svg'
import addedToFavourite from '../Assets/Favourite.svg'

function RecipePage() {
    const navigate = useNavigate()
    const [favouriteIcon, setFavouriteIcon] = useState(false)
    const [metric, setMetric] = useState("metric")
    const [recipeData, setRecipeData] = useState()
    const [noRecipe, setNoRecipe] = useState(false)
    const { favourite, loggedin } = useContext(AppContext)
    const [loggedIn, setLoggedIn] = loggedin
    const [favourites, setFavourites] = favourite
    var { id } = useParams();
    const getRecipeData = async () => await fetch(`/api/recipes/info/${id}`).then(response => response.json()).then(data => setRecipeData(data))

    useEffect(() => {
        timer()
        getRecipeData()
    }, [])

    const changeMetric = (val) => {
        setMetric(val)
    }

    const timer = () => {
        setTimeout(() => {
            if(!recipeData) {
                setNoRecipe(true)
            }
        }, 2000)
    }

    useEffect(() => {
        const fetchFavouriteState = async (event) => {
              const getAllFavourites = await fetch('/api/favourites').then(res => res.json()).then(data => data.favourites)
              setFavourites(getAllFavourites)
        }
        fetchFavouriteState()
    }, [])

    useEffect(() => {
    if (favourites.includes(parseInt(id))) {
      setFavouriteIcon(true)
    }
    else setFavouriteIcon(false)
  }, [favourites])

    function addSummary() {
        let recipeSummary = `${recipeData.summary.split('.').slice(0, 2)}.`;
        return {
            __html: recipeSummary
        }
    }

    if (recipeData)
    return(
        <div>
            <div className="recipe-container pb-5">
                <div className='container'>
                    <div className="button-container w-100 d-flex justify-content-md-end justify-content-center">
                        <button className="px-2 rounded" style={favouriteIcon ?{ backgroundColor: "#ffc107" } : {backgroundColor : "white"}} onClick={() => loggedIn ? UpdateFavouriteState(parseInt(id), favourites, setFavourites) : navigate('/account/login')}>
                            <img className="favourite-icon m-2" src={favouriteIcon ? addedToFavourite : setToFavourite} alt="Favourite" />
                            {favouriteIcon ? "Remove from Favourites" : "Add to Favourites"}
                        </button>
                    </div>
                    <h2 className="my-5 text-center"><b className="border-bottom border-warning border-3">{recipeData.title.toUpperCase()}</b></h2>
                    <p className="text-center"><b className="text-warning">Servings:</b> {recipeData.servings} <b className="text-warning">Cooking Time:</b> {recipeData.readyInMinutes} minutes</p>
                    <Row className="mb-5">
                        <Image className='w-50 m-auto rounded-sm p-0' src={recipeData.image} fluid/>
                    </Row>
                    <p className='w-50 m-auto text-center pb-5' dangerouslySetInnerHTML={addSummary()}/>
                    <div className="tab-container p-3 border border-warning border-3">
                        <Tabs variant="pills" className="tab-pane" defaultActiveKey="ingredients" id="controlled-tab-example">
                            <Tab className="tab" eventKey="ingredients" title="Ingredients">
                                <div className='pl-5 mt-3'>
                                <h5 className="py-2">Units</h5>
                                <ToggleButtonGroup name="units" type="radio" defaultValue={metric} onChange={changeMetric}>
                                    <ToggleButton variant="outline-warning" className="text-dark" id="metric" value={"metric"}><strong>METRIC</strong></ToggleButton>
                                    <ToggleButton variant="outline-warning" className="text-dark" id="us" value={"us"}><b>US</b></ToggleButton>
                                </ToggleButtonGroup>
                                <p className='pl-5 mt-3'>The ingredients for this recipe are as follows:</p>
                                <Ingredients recipeData={recipeData} metric={metric}/>
                                </div>
                            </Tab>
                            <Tab eventKey="recipe" title="Recipe">
                                <div className='pl-5 mt-4'>
                                    <ol>
                                    {recipeData.analyzedInstructions.length !== 0 ? recipeData.analyzedInstructions[0].steps.map((e,index) => <li key={index}>{e.step}</li>) :
                                        <p>No recipe available for this item</p>
                                    }
                                    </ol>
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    )

    else return(
        <div>
            {!noRecipe && <Loading />}
            {noRecipe &&
                <div className="container text-center" id="page-not-found-container">
                    <h1 className="pt-5 display-1">404</h1>
                    <h1 className="display-1">Recipe Not Found</h1>
                    <p>
                        Sorry, this page does not exist<br/>
                        Please head back to the main page, and search again
                    </p>
                </div>
            }
        </div>
    )
}

function Ingredients(props) {
    if (props.metric === 'us')
    return (
        <div>
            {props.recipeData.extendedIngredients.map((data, id) =>
                <ListGroup key={id}>
                    <ListGroup.Item className="ingredient border-0">
                        {`${(data.measures.us.amount === 0.5) ? '1/2' : data.measures.us.amount === 0.25 ? '1/4' : data.measures.us.amount} `} 
                        {`${data.measures.us.unitShort} `}{data.originalName}
                        </ListGroup.Item>
                </ListGroup>
            )}
        </div>
    )

    else return (
        <div>
            {props.recipeData.extendedIngredients.map((data, id) =>
                <ListGroup key={id}>
                    <ListGroup.Item className="ingredient border-0">
                    {`${(data.measures.metric.amount === 0.5) ? '1/2' : data.measures.metric.amount === 0.25 ? '1/4' : Math.ceil(data.measures.metric.amount)} `} 
                        {`${data.measures.metric.unitShort} `}{data.originalName}
                        </ListGroup.Item>
                </ListGroup>
            )}
        </div>
    )
}

export default RecipePage;