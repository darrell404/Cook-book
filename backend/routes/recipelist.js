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

router.route('/search/:recipename').get(async (req,res) => {
    try {
        const fetchRecipes = await axios(`${URL}/complexSearch?query=${req.params.recipename}&apiKey=${APIKEY}`)
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

router.route('/info/:recipeID').get(async (req,res) => {
    const baseURL = 'http://localhost:5000'
    const options = {
        method: 'POST',
        url: baseURL + '/api/recipes/searchSingleRecipe',
        data: {
            foodID: req.params.recipeID
        }
    }

    try {
        const fetchRecipe = await axios(options)
                            .then(response => console.log(response.data))
                                .catch((error) => {
                                    console.log(error)
                                })
        const getRecipeFromDB = await Recipe.find({recipeID: req.params.recipeID}).then((dataReceived => {
            if (dataReceived.length !== 0) {
                res.send(dataReceived[0])
            }
            else console.log("Error")
        }))
    }
    catch(err) {
        console.log(err)
    }
})

router.route('/searchRecipes').post((req,res) => {
    const recipeList = req.body.favourites
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

router.route('/searchSingleRecipe').post(async (req,res) => {
    const foodID = req.body.foodID
    try {
        const findRecipeFromDB = await Recipe.find({recipeID: foodID})
        if (findRecipeFromDB.length == 0) {
            console.log("Food not in DB")
            const fetchRecipe = await axios(`${URL}/${foodID}/information?apiKey=${APIKEY}`)
                .then(response => (response.data))
            fetchRecipe.recipeID = fetchRecipe.id
            delete fetchRecipe.id
                try {
                    const addNewRecipe = await Recipe.create(fetchRecipe)
                    res.json({"msg": "success"})
                }
                catch(err) {
                    console.log(err)
                }
            }
        else {
            console.log("Food in DB, no action needed")
            res.json({"msg": "no action needed"})
        }
        }
    catch(err) {
        console.log(err)
    }
})

module.exports = router