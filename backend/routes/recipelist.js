const axios = require("axios")
const express = require("express")
const router = express.Router()
require('dotenv').config()

const URL = process.env.RECIPE_URL
const APIKEY = process.env.API_KEY

async function getRecipe() {
    
}

router.route('/').get((req,res) => {
    res.send("This is the Recipes endpoint")
})

router.route('/search/:recipename').get((req,res) => {
    const fetchRecipes = () => axios(`${URL}/complexSearch?query=${req.params.recipename}&apiKey=${APIKEY}`).then(response => res.send(response.data))
    try {
        fetchRecipes()
    }
    catch(e) {
        console.error(e)
    }
    console.log(req.params.recipename)
})

router.route('/info/:recipeID').get((req,res) => {
    const fetchRecipeFromID = () => axios(`${URL}/${req.params.recipeID}/information?apiKey=${APIKEY}`).then(response => res.send(response.data))
    try {
        fetchRecipeFromID()
    }
    catch(e) {
        console.error(e)
    }
})


module.exports = router