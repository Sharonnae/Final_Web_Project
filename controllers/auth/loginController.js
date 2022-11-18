const User = require('../../models/User')
const Appointment = require('../../models/Appointment')
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const loginView = (req, res) => {
    res.render('login', {
        status: ''
    })
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email })

    if (user) {
        bcrypt.compare(password, user.password, async (err, data) => {
            if (err) throw err
            if (data) {
                const token = JWT.sign(
                    {
                        userid: user._id,
                        role: user.role
                    },
                    process.env.TOKEN_SECRET,
                    {
                        expiresIn: "10h"
                    }
                )
                if (user.role === 'admin') {
                    res.json({
                        status: 'success',
                        role: 'admin', 
                        token: token
                    })
                } else if (user.role === 'doctor') {
                    const appointments = await Appointment.find({ doctorId: user._id })
                    res.json({
                        status: 'success',
                        token: token,
                        role: 'doctor'
                    })
                } else if (user.role === 'patient') {
                    const doctors = await User.find({ role: 'doctor' })
                    res.json({
                        status: 'success',
                        token: token,
                        role: 'patient'
                    })
                }
            } else {
                res.render('login', {
                    status: 'wrongPwd'
                })
            }
        })
    } else {
        res.render('login', {
            status: 'notExist'
        })
    }
}

module.exports = {
    loginView,
    loginUser
}