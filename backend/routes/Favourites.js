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
        let userEmail = req.session.email
        let updateUser = await User.findOneAndUpdate({"email": userEmail}, { $set: req.body }, {
            new: true, upsert: true, returnOriginal: false
        })
        res.json({"msg": "done"})
    }
    
})

module.exports = router