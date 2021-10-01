const express = require("express")
const passport = require("passport")
const bcrypt = require("bcrypt")
const client = require("mongodb").MongoClient
const app = express();
const dbURL = process.env.DB_URL


try {
    client.connect(dbURL, function(err, db) {
    console.log("Connection to DB successful")
    })}
catch (error) {
    console.log(error)
}

app.get('/', (req, res) => {
    res.send("This is the root location!")
})

app.get('/recipes')

app.post('/login',
    passport.authenticate('local'),
    (req,res) => {
        
    })

app.listen(5000, () => {
    console.log("Server is now running!")
})