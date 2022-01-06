const express = require("express")
const router = express.Router()

router.route('/').post((req,res) => {
    req.session.destroy()
    res.clearCookie('connect.sid')
    res.send({"message": "Logged out!"})
})

module.exports = router