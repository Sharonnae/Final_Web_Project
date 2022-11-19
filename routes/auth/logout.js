// route to login.ejs file with user that not logged in.
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.render('login', {
        status: 'logout'
    })
});

module.exports = router;