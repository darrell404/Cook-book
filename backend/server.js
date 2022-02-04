const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')
const app = express();
const LoginRoute = require('./routes/Login')
const RegisterRoute = require('./routes/Register')
const recipeRoute = require('./routes/recipelist')
const LogoutRoute = require('./routes/Logout')
const FavouritesRoute = require('./routes/Favourites')
const session = require("express-session")
const MongoDBSession = require("connect-mongodb-session")(session)
const cookieParser = require("cookie-parser")
const dbURL = process.env.DB_URL
const router = express.Router()
const path = require("path")

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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())
app.use(session({
    secret: "This is my cook book",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        maxAge: 1000 * 60 * 60
    }
})) 

app.use('/api', router)

// Routes

router.use('/recipes', recipeRoute)

router.use('/login', LoginRoute)

router.use('/register', RegisterRoute)

router.use('/logout', LogoutRoute)

router.use('/favourites', FavouritesRoute)

if(process.env.NODE_ENV === 'production') {

app.use('/', express.static('../frontend/build'))
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
    });
}

app.listen(5000, () => {
    console.log("Server is now running!")
})