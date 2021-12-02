const express = require("express")
const passport = require("passport")
const bcrypt = require("bcrypt")
const client = require("mongodb").MongoClient
const cors = require('cors')
const app = express();
const recipeRoute = require('./routes/recipelist')
const dbURL = process.env.DB_URL

try {
    client.connect(dbURL, function(err, db) {
    console.log("Connection to DB successful")
    })}
catch (error) {
    console.log(error)
}

app.use(cors());

app.get('/', (req, res) => {
    res.send("This is the root location!")
})

app.use('/recipes', recipeRoute)

app.post('/login',
    passport.authenticate('local'),
    (req,res) => {
        
    })

app.listen(5000, () => {
    console.log("Server is now running!")
})