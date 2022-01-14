const express = require("express")
const router = express.Router();
const passport = require("passport")
const LocalStrategy = require('passport-local')
const bcrypt = require("bcrypt")
const User = require('../models/User');

router.route('/').post(async (req, res) => {
    const {email, password} = req.body
    try {
    const getUserAccount = await User.findOne({email}).select('firstName password')
        if (getUserAccount !== null) {
            const encryptPassword = await bcrypt.compare(password, getUserAccount.password, (err, result) => {
                if (err) console.log(err)
                else if(result) {
                    console.log(result)
                    req.session.isAuth = true
                    req.session.email = email
                    req.session.userID = getUserAccount._id
                    req.session.name = getUserAccount.firstName
                    console.log(getUserAccount)
                    req.session.save();
                    console.log(`User account ${req.body.email} has been found!`)
                    res.send(req.session)
                }
                else if (!result) {
                    res.json({"error" : "Incorrect username or password"})
                    console.log("Incorrect username or password")
                }
            })
        }

        else {
            res.json({"error" : "Incorrect username or password"})
            console.log("User does not exist!")
        }
    }
    catch(err) {
        console.log(err)
    }
})

module.exports = router