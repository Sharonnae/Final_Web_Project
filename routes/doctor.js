const express = require('express')
const {
    doctorDashboardView,
    doctorProfileView,
    acceptAppointment,
    declineAppointment,
    getDoctorData
} = require('../controllers/doctorController')
const auth = require('../middleware/auth')

const router = express.Router()

router.get('/', auth, doctorDashboardView)

router.get('/profile', auth, doctorProfileView)
router.get('/getDoctorData', auth, getDoctorData)

router.get('/acceptOrder/:id', auth, acceptAppointment)
router.get('/declineOrder/:id', auth, declineAppointment)

module.exports = router