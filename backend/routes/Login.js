const express = require("express")
const router = express.Router();
const passport = require("passport")
const LocalStrategy = require('passport-local')
const bcrypt = require("bcrypt")
const User = require('../models/model')

router.route('/').post(async (req, res) => {
    try {
    const getUserAccount = await User.findOne({"email": req.body.email})
        if (getUserAccount) {
            const encryptPassword = await bcrypt.compare(req.body.password, getUserAccount.password, (err, result) => {
                if (err) console.log(err)
                else if(result == true) {
                    console.log(`User account ${req.body.email} has been found!`)
                    res.send(getUserAccount)
                }
                else console.log("Incorrect username or password")
            })
        }

        else (console.log("User does not exist!"))
    }
    catch(err) {
        console.log(err)
    }
})

module.exports = router