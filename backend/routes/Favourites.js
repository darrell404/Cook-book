const express = require("express")
const router = express.Router();
const User = require('../models/User');

router.route('/').get(async (req, res) => {
    if(req.session.userID) {
        try {
            let user = req.session.userID
            let userFavourites = await User.findById(user)
            if (userFavourites) {
                let {favourites} = userFavourites
                res.json({favourites})
            }
            else return
        }
        catch(err) {
            console.log("Error")
            console.log(err)
        }
    }
    else return
})

router.route('/add').post(async (req, res) => {
    if(req.session.userID) {
        let foundUser = req.session.userID
        console.log(req.body.favourites)
        let updateUser = await User.findOneAndUpdate(foundUser, { $set: req.body }, {
            new: true, upsert: true, returnOriginal: false
        })
        console.log(updateUser)
        res.json({"msg": "done"})
    }
    
})

module.exports = router