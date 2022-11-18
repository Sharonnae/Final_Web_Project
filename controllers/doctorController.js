const User = require('../models/User')
const Appointment = require('../models/Appointment')

const formatDate = (date) => {
    var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return (
    date.getMonth() +
    1 +
    "/" +
    date.getDate() +
    "/" +
    date.getFullYear() +
    "  " +
    strTime
  );
}

const getDoctorData = async (req, res) => {
    const doctors = await User.find({ role: 'doctor' })
    res.json({
        doctors: doctors
    })
}

const doctorDashboardView = async (req, res) => {
    const { userid } = req.user
    const appointments = await Appointment.find({ doctorId: userid })
    const data = appointments.map((data) => {
        return {
            _id: data._id,
            patientName: data.patientName,
            patientId: data.patientId,
            doctorName: data.doctorName,
            doctorId: data.doctorId,
            dateTime: formatDate(new Date(data.dateTime)),
            doctorLocation: data.doctorLocation,
            patientLocation: data.patientLocation,
            doctorLatitude: data.doctorLatitude,
            patientLatitude: data.patientLatitude,
            doctorLongitude: data.doctorLongitude,
            patientLongitude: data.patientLongitude,
            doctorPhone: data.doctorPhone,
            patientPhone: data.patientPhone,
            doctorGender: data.doctorGender,
            patientGender: data.patientGender,
            doctorAvatar: data.doctorAvatar,
            patientAvatar: data.patientAvatar,
            status: data.status,
            createdAt: data.createdAt
        }
    })

    res.render('doctorDashboard', {
        appointments: data,
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