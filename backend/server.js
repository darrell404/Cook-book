const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')
const app = express();
const LoginRoute = require('./routes/Login')
const RegisterRoute = require('./routes/Register')
const recipeRoute = require('./routes/recipelist')
const LogoutRoute = require('./routes/Logout')
const session = require("express-session")
const MongoDBSession = require("connect-mongodb-session")(session)
const cookieParser = require("cookie-parser")
const dbURL = process.env.DB_URL

// Mongoose Connection

mongoose.connect(dbURL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log("Connected to Database!"))

const store = new MongoDBSession({
    uri: dbURL,
    collection: 'sessions'
})

// Start of Express config

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser())
app.use(session({
    secret: "This is my cook book",
    resave: false,
    saveUninitialized: false,
    store: store
})) 

app.get('/', (req, res) => {
    req.session.isAuth = true
    res.send("This is the root location!")
})

// Routes

app.use('/recipes', recipeRoute)

app.use('/login', LoginRoute)

app.use('/register', RegisterRoute)

app.use('/logout', LogoutRoute)

app.listen(5000, () => {
    console.log("Server is now running!")
})