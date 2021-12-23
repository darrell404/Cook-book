import '../css/addon.css'
import { useParams } from 'react-router-dom'
import { Navigation } from './Main';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ListGroup, Row, Col, Image, Tabs, Tab, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';

function RecipePage(props) {
    const [metric, setMetric] = useState("us")
    const [recipeData, setRecipeData] = useState(null)
    var { id } = useParams();
    // const getRecipeData = async () => await axios(`/recipes/info/${id}`).then(response => setRecipeData(response.data))
    const getRecipeData = async () => await axios("http://localhost:8080/recipes/1").then(response => setRecipeData(response.data))

    useEffect(() => {
        getRecipeData()
    }, [])

    const changeMetric = (val) => {
        setMetric(val)
    }

    function addSummary() {
        let recipeSummary = recipeData.summary.split('.').slice(0, 2);
        return {
            __html: recipeSummary
        }
    }

    function addInstructions() {
        return {
            __html: recipeData.instructions
        }
    }

    if (recipeData !== null)
    return(
        <div>
            <Navigation />
            <div className="recipe-container">
                <div className='container w-80'>
                    <h2 className="my-5 text-center"><b className="border-bottom border-warning border-3">{recipeData.title.toUpperCase()}</b></h2>
                    <p className="text-center"><b className="text-warning">Servings:</b> {recipeData.servings} <b className="text-warning">Cooking Time:</b> {recipeData.readyInMinutes} minutes</p>
                    <Row className="mb-5">
                        <Image className='w-50 m-auto rounded-sm p-0' src={recipeData.image} fluid/>
                    </Row>
                    <p className='w-50 m-auto text-center pb-5' dangerouslySetInnerHTML={addSummary()}/>
                    <div className="tab-container p-3 border border-warning border-3">
                        <Tabs defaultActiveKey="ingredients" id="controlled-tab-example">
                            <Tab className="tab" eventKey="ingredients" title="Ingredients">
                                <div className='pl-5 mt-3'>
                                <p>Units</p>
                                <ToggleButtonGroup name="units" type="radio" defaultValue={metric} onChange={changeMetric}>
                                    <ToggleButton variant="warning" className="text-dark" id="us" value={"us"}><b>US</b></ToggleButton>
                                    <ToggleButton variant="warning" className="text-dark" id="metric" value={"metric"}><strong>METRIC</strong></ToggleButton>
                                </ToggleButtonGroup>
                                <p className='pl-5 mt-3'>The ingredients for this recipe are as follows:</p>
                                <Ingredients recipeData={recipeData} metric={metric}/>
                                </div>
                            </Tab>
                            <Tab eventKey="recipe" title="Recipe">
                                <div className='pl-5 mt-4'>
                                    <ol>
                                    {recipeData.analyzedInstructions[0].steps.map(e => <li>{e.step}</li>)}
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
            <Navigation />
        </div>
    )
}

function Ingredients(props) {
    if (props.metric === 'us')
    return (
        <div>
            {props.recipeData.extendedIngredients.map((data, id) =>
                <ListGroup key={id}>
                    <ListGroup.Item className="ingredient">
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
                    <ListGroup.Item className="ingredient">
                    {`${(data.measures.metric.amount === 0.5) ? '1/2' : data.measures.metric.amount === 0.25 ? '1/4' : Math.ceil(data.measures.metric.amount)} `} 
                        {`${data.measures.metric.unitShort} `}{data.originalName}
                        </ListGroup.Item>
                </ListGroup>
            )}
        </div>
    )
}

export default RecipePage;