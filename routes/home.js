// route homeView from homeController
const express = require('express')
const {
    homeView
} = require('../controllers/homeController')
const router = express.Router()

router.get('/', homeView)

module.exports = router