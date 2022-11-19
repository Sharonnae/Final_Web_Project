// creating a user model.
// https://thinkster.io/tutorials/node-json-api/creating-the-user-model

const mongoose = require("mongoose"); // for mongodb connection.
const bcrypt = require('bcrypt') // for password hashing and validation.

// create a user schema structure.
const UserSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  expertise: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// hash password before saving it, to secure it.
UserSchema.pre('save', function (next) {
  if (!this.isModified('password'))
    return next()
  bcrypt.hash(this.password, 10, (err, passwordHash) => {
    if (err)
      return next(err)
    this.password = passwordHash
    next()
  })
})

// validate password saved.
UserSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err)
      return cb(err);
    else {
      if (!isMatch)
        return cb(null, isMatch)
      return cb(null, this)
    }
  })
}
// registers our schema with mongoose. Our user model can then be accessed anywhere in our application by calling mongoose.model('User')
const User = mongoose.model("User", UserSchema);
module.exports = User;