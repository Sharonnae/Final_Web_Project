const User = require('./User')
const dotenv = require("dotenv");
dotenv.config()

const admin = new User({
    fullname: 'admin',
    email: process.env.ADMIN_MAIL,
    password: process.env.ADMIN_PASS,
    location: 'Tel Aviv',
    latitude: 1,
    longitude: 1,
    phone: 1111111,
    gender: 'male',
    avatar: 'male.png',
    role: 'admin'
})

const seedAdmin = async () => {
    try {
        const existUser = await User.findOne({ role: 'admin' })

        if (!existUser) {
            await admin.save()
        }
    } catch (err) {
        console.error(err)
    }
}

module.exports = {
    seedAdmin
}