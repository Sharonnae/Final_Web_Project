const User = require('../../models/User') 

const signupView = (req, res) => {
    res.render('signup', {
    })
}

const signupUser = async (req, res) => {
    const { fullname, email, password, location, latitude, longitude, phone, gender, role } = req.body;

    console.log('dfa', req.body)

    const oldUser = await User.findOne({ email: email })

    console.log('a', oldUser)

    if (oldUser) {
        res.render('signup', {
            status: 'alreadyExist'
        })
    } else {
        const newUser = new User({
            fullname: fullname,
            email: email,
            password: password,
            location: location,
            latitude: latitude,
            longitude: longitude,
            phone: phone,
            gender: gender,
            role: role
        })

        await newUser.save()

        res.render('login', {
        })
    }
}

module.exports = {
    signupView,
    signupUser
}