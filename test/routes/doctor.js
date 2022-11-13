const express = require('express')
const {
    doctorDashboardView,
    doctorProfileView
} = require('../controllers/doctorController')

const router = express.Router()

router.get('/', doctorDashboardView)

router.get('/profile', doctorProfileView)

module.exports = router