const express = require('express')
const router = express.Router()
const {
    adminDashboardView,
    adminDoctorManageView,
    adminPatientManageView
} = require('../controllers/adminController')


router.get('/', adminDashboardView)
router.get('/doctor-manage', adminDoctorManageView)
router.get('/patient-manage', adminPatientManageView)

module.exports = router