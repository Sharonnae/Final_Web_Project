const User = require('../models/User')
const bcrypt = require("bcrypt");

const uploadAvatar = async (req, res) => {
    const { userid, role } = req.user
    try {
        if (req.files) {
            let avatar = req.files.files
            let avatarName = Date.now() + avatar.name
            avatar.mv('./public/avatar/' + avatarName)

            const currentUser = await User.findById(userid)
            currentUser.avatar = avatarName
            await currentUser.save()

            if (role === 'doctor') {
                res.render('doctorProfile', {
                    user: currentUser
                })
            } else {
                res.render('patientProfile', {
                    user: currentUser
                })
            }
        }
    } catch (err) {
        res.status(500).send(err);
    }
}

const changePassword = async (req, res) => {
    const { userid } = req.user
    const {
        currentPwd,
        newPwd
    } = req.body
    const user = await User.findById(userid)
    bcrypt.compare(currentPwd, user.password, async (err, data) => {
        if (err) throw err
        if (data) {
            user.password = newPwd
            await user.save()
            res.json({
                status: 'success'
            })
        } else {
            res.json({
                status: 'error'
            })
        }
    })
}

const changeProfile = async (req, res) => {
    const { userid, role } = req.user
    const {
        phone,
        location,
        latitude,
        longitude
    } = req.body
    const user = await User.findById(userid)
    user.phone = phone
    user.location = location
    user.latitude = latitude
    user.longitude = longitude
    await user.save()

    res.json({
        status: 'success',
        role: role
    })
}

module.exports = {
    uploadAvatar,
    changePassword,
    changeProfile
}