const express = require("express")
const router = express.Router();

router.route('/').get((req,res) => {
    res.send("This is the Users endpoint")
})


module.exports = router