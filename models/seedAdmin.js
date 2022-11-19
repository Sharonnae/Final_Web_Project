const User = require('./User') // imports user.js for user structure.
const dotenv = require("dotenv"); //imports .env config.
dotenv.config()

// creates a schema of the 'admin' user.
const admin = new User({
    fullname: 'admin',
    email: process.env.ADMIN_MAIL,
    password: process.env.ADMIN_PASS,
    location: 'Tel Aviv',
    latitude: 1,
    longitude: 1,
    phone: 0501234567,
    gender: 'male',
    avatar: 'male.png',
    role: 'admin'
})

// if 'admin' doesn't exists, it creates it.
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