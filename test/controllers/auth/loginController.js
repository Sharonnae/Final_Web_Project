const User = require('../../models/User')
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

const loginView = (req, res) => {
    res.render('login', {
        email: '',
        password: ''
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
                    res.render('adminDashboard', {
                        status: 'success',
                        token: token
                    })
                } else if (user.role === 'doctor') {
                    res.render('doctorDashboard', {
                        status: 'success',
                        token: token
                    })
                } else if (user.role === 'patient') {
                    const doctors = await User.find({ role: 'doctor' })
                    res.render('patientDashboard', {
                        status: 'success',
                        token: token,
                        doctors: doctors
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