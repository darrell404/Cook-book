const axios = require("axios")
const express = require("express")
const router = express.Router()
require('dotenv').config()
const Recipe = require('../models/Recipe');

const URL = process.env.RECIPE_URL
const APIKEY = process.env.API_KEY

// '/recipes' endpoint

router.route('/').get((req,res) => {
    res.send("This is the Recipes endpoint")
})

router.route('/search/:recipename').get((req,res) => {
    
    try {
        const fetchRecipes = axios(`${URL}/complexSearch?query=${req.params.recipename}&apiKey=${APIKEY}`)
                                .then(response => res.send(response.data))
                                    .catch(function(error) { 
                                        if (error.response.data.code === 402) {
                                            res.json({"message": "3rd party API limit reached"})
                                            console.log({"Error": "3rd party API limit reached"})
                                        }
                                    })
    }
    catch(err) {
        console.log(err)
    }
})

router.route('/info/:recipeID').get((req,res) => {
    try {
        const fetchRecipeFromID = () => axios(`${URL}/${req.params.recipeID}/information?apiKey=${APIKEY}`)
                                            .then(response => res.send(response.data))
                                                .catch(function(error) { 
                                                    if (error.response.data.code === 402) {
                                                        res.json({"message": "3rd party API limit reached"})
                                                        console.log({"Error": "3rd party API limit reached"})
                                                    }
                                                })
    }
    catch(err) {
        console.log(err)
    }
})

router.route('/searchRecipes').post((req,res) => {
    const recipeList = req.body.favourites
    var favouriteArray = []

    const fetchData = async() => {
        try {
            const fetchFavourites = await Recipe.find({recipeID: { $in : recipeList }}).then((dataReceived) => {
                if (dataReceived) {
                    res.json({"favouriteArray": dataReceived})
                }
                else res.json({"msg" : "Data not found"})
            })
        }
        catch(err) {
            console.log(err)
        }
    }
    fetchData()

})

module.exports = router