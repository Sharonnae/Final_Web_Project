const User = require('../models/User')

const patientDashboardView = async (req, res) => {
    const doctors = await User.find({ role: 'doctor' })

    res.render('patientDashboard', {
        doctors: doctors
    })
}

const patientProfileView = (req, res) => {
    res.render('patientProfile', {

    })
}

module.exports = {
    patientDashboardView,
    patientProfileView
}