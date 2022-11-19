const mongoose = require("mongoose");

// create an appointment order schema
const OrderSchema = new mongoose.Schema({
  patientName: {
    type: String,
    required: true,
  },
  patientId: {
    type: String,
    required: true,
  },
  doctorName: {
    type: String,
    required: true,
  },
  doctorId: {
    type: String,
    required: true,
  },
  disease: {
    type: String,
    required: true,
  },
  doctorLocation: {
    type: String,
    required: true
  },
  patientLocation: {
    type: String,
    required: true
  },
  doctorLatitude: {
    type: Number,
    required: true
  },
  patientLatitude: {
    type: Number,
    required: true
  },
  doctorLongitude: {
    type: Number,
    required: true
  },
  patientLongitude: {
    type: Number,
    required: true
  },
  doctorPhone: {
    type: Number,
    required: true
  },
  patientPhone: {
    type: Number,
    required: true
  },
  doctorGender: {
    type: String,
    required: true
  },
  patientGender: {
    type: String,
    required: true
  },
  doctorAvatar: {
    type: String,
    required: true
  },
  patientAvatar: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Compile model from schema
const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;