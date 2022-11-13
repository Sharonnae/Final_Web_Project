const express = require('express')
const {
    patientDashboardView,
    patientProfileView
} = require('../controllers/patientController')

const router = express.Router()

router.get('/', patientDashboardView)

router.get('/profile', patientProfileView)

module.exports = router