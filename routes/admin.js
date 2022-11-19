// route a lot of functionality from adminController.
const express = require('express')
const router = express.Router()
const {
    adminDashboardView,
    adminDoctorManageView,
    adminPatientManageView,
    addDoctor,
    updateDoctor,
    addPatient,
    updatePatient,
    deleteUser,
    useMedicalService
} = require('../controllers/adminController')


router.get('/', adminDashboardView)
router.get('/useMedicalService', useMedicalService)
router.get('/deleteUser/:id', deleteUser)
router.get('/doctor-manage', adminDoctorManageView)
router.get('/patient-manage', adminPatientManageView)

router.post('/doctor-manage/addDoctor', addDoctor)
router.post('/doctor-manage/updateDoctor', updateDoctor)
router.post('/patient-manage/addPatient', addPatient)
router.post('/patient-manage/updatePatient', updatePatient)

module.exports = router