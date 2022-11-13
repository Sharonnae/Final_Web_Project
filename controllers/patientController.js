const User = require('../models/User')
const Appointment = require('../models/Appointment')

const patientDashboardView = async (req, res) => {
    const doctors = await User.find({ role: 'doctor' })

    res.render('patientDashboard', {
        doctors: doctors,
        token: ''
    })
}

const patientProfileView = async (req, res) => {
    const { userid } = req.user
    const appointmentData = await Appointment.find({ patientId: userid })
    const patientData = await User.findById(userid)
    res.render('patientProfile', {
        user: patientData,
        appointments: appointmentData
    })
}

const setAppointment = async (req, res) => {
    const {
        doctorId,
        dateTime
    } = req.body
    const {
        userid
    } = req.user

    const doctor = await User.findById(doctorId)
    const patient = await User.findById(userid)

    const appointment = new Appointment({
        patientName: patient.fullname,
        patientId: userid,
        doctorName: doctor.fullname,
        doctorId: doctorId,
        dateTime: dateTime,
        doctorLocation: doctor.location,
        patientLocation: patient.location,
        doctorLatitude: doctor.latitude,
        doctorLongitude: doctor.longitude,
        patientLatitude: patient.latitude,
        patientLongitude: patient.longitude,
        doctorPhone: doctor.phone,
        patientPhone: patient.phone,
        doctorGender: doctor.gender,
        patientGender: patient.gender,
        doctorAvatar: doctor.avatar,
        patientAvatar: patient.avatar,
        status: 'pending'
    })
    await appointment.save()
    res.json({
        status: 'success'
    })
}

module.exports = {
    patientDashboardView,
    patientProfileView,
    setAppointment
}