const User = require("../../models/User");

const signupView = (req, res) => {
  res.render("signup", {});
};

const signupUser = async (req, res) => {
  const {
    fullname,
    email,
    password,
    location,
    latitude,
    longitude,
    phone,
    gender,
    role,
  } = req.body;

  console.log("dfa", req.body);

  const oldUser = await User.findOne({ email: email });

  if (oldUser) {
    res.render("signup", {
      status: "alreadyExist",
    });
  } else {
    let newUser;
    if (role === "doctor") {
      newUser = new User({
        fullname: fullname,
        email: email,
        password: password,
        location: location,
        latitude: latitude,
        longitude: longitude,
        phone: phone,
        gender: gender,
        avatar: gender === "male" ? "male.png" : "female.png",
        role: role,
        expertise: req.body.expertise,
      });
    } else {
      newUser = new User({
        fullname: fullname,
        email: email,
        password: password,
        location: location,
        latitude: latitude,
        longitude: longitude,
        phone: phone,
        gender: gender,
        avatar: gender === "male" ? "male.png" : "female.png",
        role: role,
      });
    }

    await newUser.save();

    res.render("login", {
      status: "",
    });
  }
};

module.exports = {
  signupView,
  signupUser,
};
