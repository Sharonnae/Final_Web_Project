const express = require('express')
const {
    newsView
} = require('../controllers/newsController')
const router = express.Router()

router.get('/', newsView)

module.exports = router