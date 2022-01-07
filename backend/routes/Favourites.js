const express = require("express")
const router = express.Router();

router.route('/').get((req, res) => {
    console.log(req.body)
    res.send("Sent data")
})

router.route('/add').post((req, res) => {
    console.log(req.body)
    res.json({"msg": "done"})
})

module.exports = router