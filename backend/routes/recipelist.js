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

router.route('/:recipename').get((req,res) => {
    // console.log(URL)
    // const getQuery = `${URL}` + `/complexsearch?query=${req.params.recipename}` + `&apiKey=${APIKEY}`
    // console.log(getQuery)
    const fetchRecipe = () => axios(`${URL}` + `/complexSearch?query=${req.params.recipename}` + `&apiKey=${APIKEY}`).then(response => res.send(response.data))
    // const fetchRecipe = () => axios('https://dog.ceo/api/breeds/list/all').then(response => res.json(response.data))
    fetchRecipe()
    console.log(req.params.recipename)
})


module.exports = router