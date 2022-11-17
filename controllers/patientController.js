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
    const data = appointmentData.map((data) => {
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
    const patientData = await User.findById(userid)
    res.render('patientProfile', {
        user: patientData,
        appointments: data
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