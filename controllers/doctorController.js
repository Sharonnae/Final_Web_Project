const User = require('../models/User')
const Appointment = require('../models/Appointment')

const getDoctorData = async (req, res) => {
    const doctors = await User.find({ role: 'doctor' })
    res.json({
        doctors: doctors
    })
}

const doctorDashboardView = async (req, res) => {
    const { userid } = req.user
    const appointments = await Appointment.find({ doctorId: userid })

    res.render('doctorDashboard', {
        appointments: appointments,
        token: ''
    })
}

const doctorProfileView = async (req, res) => {
    const {userid} = req.user
    const doctorData = await User.findById(userid)
    res.render('doctorProfile', {
        user: doctorData
    })
}

const acceptAppointment = async (req, res) => {
    const { id } = req.params
    const appointment = await Appointment.findById(id)
    appointment.status = 'accepted'
    await appointment.save()
    res.json({
        status: 'success'
    })
}

const declineAppointment = async (req, res) => {
    const { id } = req.params
    const appointment = await Appointment.findById(id)
    appointment.status = 'declined'
    await appointment.save()
    res.json({
        status: 'success'
    })
}

module.exports = {
    doctorDashboardView,
    doctorProfileView,
    acceptAppointment,
    declineAppointment,
    getDoctorData
}