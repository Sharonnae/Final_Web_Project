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

    // if (!email || !password) {
    //     console.log("Please fill in all the fields");
    //     res.render("login", {
    //       email,
    //       password,
    //     });
    //   } else {
    //     passport.authenticate("local", {
    //       successRedirect: "/dashboard",
    //       failureRedirect: "/login",
    //       failureFlash: true,
    //     })(req, res);
    //   }
}

const registerUser = (req, res) => {
    const { reg_name, reg_email, reg_password } = req.body;

    // if (!reg_name || !reg_email || !reg_password) {
    //     console.log("Fill empty fields");
    // } else {
    //     User.findOne({email: reg_email})
    //         .then((user) => {
    //             if (user) {
    //                 console.log('email exists');
    //                 res.render('auth', {
    //                     username: reg_name,
    //                     email: reg_email,
    //                     password: reg_password
    //                 });
    //             } else {
    //                 const newUser = new User({
    //                     username: reg_name,
    //                     email: reg_email,
    //                     password: reg_password
    //                 });

    //                 // newUser
    //                 //     .save()
    //                 //     .then(res.redirect('/'))
    //                 //     .catch((err) => console.log(err));

    //                 bcrypt.genSalt(10, (err, salt) =>
    //                     bcrypt.hash(newUser.password, salt, (err, hash) => {
    //                         if (err) throw err;
    //                         newUser.password = hash;
    //                         newUser
    //                             .save()
    //                             .then(res.redirect('/'))
    //                             .catch((err) => console.log(err));
    //                     })
    //                 )
    //             }
    //         })
    // }

    console.log('registerUser', reg_name, reg_email, reg_password);
    // console.log('ddd', req.body)
}

module.exports = {
    authView,
    loginUser,
    registerUser
}