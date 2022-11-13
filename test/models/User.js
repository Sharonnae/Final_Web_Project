const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

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
  }
});

UserSchema.pre('save', function(next) {
  if (!this.isModified('password'))
      return next()
  bcrypt.hash(this.password, 10, (err, passwordHash) => {
      if (err)
          return next(err)
      this.password = passwordHash
      next()
  })
})

UserSchema.methods.comparePassword = function(password, cb) {
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

const User = mongoose.model("User", UserSchema);
module.exports = User;