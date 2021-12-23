const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')
const app = express();
const LoginRoute = require('./routes/Login')
const recipeRoute = require('./routes/recipelist')
const dbURL = process.env.DB_URL

mongoose.connect(dbURL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log("Connected to Database!"))

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("This is the root location!")
})

app.use('/recipes', recipeRoute)
app.use('/login', LoginRoute)

app.listen(5000, () => {
    console.log("Server is now running!")
})