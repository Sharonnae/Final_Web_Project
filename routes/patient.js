const express = require('express')
const {
    patientDashboardView,
    patientProfileView,
    setAppointment
} = require('../controllers/patientController')
const auth = require('../middleware/auth')

const router = express.Router()

router.get('/', auth, patientDashboardView)

router.get('/profile', auth, patientProfileView)

router.post('/setAppointment', auth, setAppointment)

module.exports = router