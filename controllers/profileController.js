// include needed model and module
const User = require('../models/User') // for user info and password updates
const bcrypt = require("bcrypt"); // for password handling

// for profile picture upload in profile account page.
// render doctorProfile or pationtProfile accoridng to user type.
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

// recieves a userid an existing password and a new password. if the password is correct, updates to the new one.
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

// update user details according to the given data in the request.
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