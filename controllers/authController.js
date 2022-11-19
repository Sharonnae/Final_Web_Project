const User = require("../models/User");
const bcrypt = require("bcryptjs");

const authView = (req, res) => {
    res.render('auth', {
        username: '',
        email: '',
        password: ''
    });
}

const loginUser = (req, res) => {
    const { email, password } = req.body;
}

const registerUser = (req, res) => {
    const { reg_name, reg_email, reg_password } = req.body;


    console.log('registerUser', reg_name, reg_email, reg_password);
}

module.exports = {
    authView,
    loginUser,
    registerUser
}