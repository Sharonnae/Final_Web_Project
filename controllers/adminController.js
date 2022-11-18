const User = require("../models/User");
const Appointment = require("../models/Appointment");
const axios = require("axios");

const useMedicalService = async (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://healthy.p.rapidapi.com/symptoms/clinicalstudies',
    headers: {
      'X-RapidAPI-Key': '024a27d6abmshd9b33958cfe143dp1993d0jsnef3aca747e95',
      'X-RapidAPI-Host': 'healthy.p.rapidapi.com'
    }
  };
  
  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });
}

const adminDashboardView = async (req, res) => {
  const appointmentData = await Appointment.aggregate([
    {
      $sort: { createdAt: 1 },
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
  ]);
  const patientData = await User.aggregate([
    {
      $sort: { createdAt: 1 },
    },
    {
      $match: { role: "patient" },
    },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
  ]);
  const aData = appointmentData;
  const pData = patientData;
  res.render("adminDashboard", {
    appointment: aData,
    patient: pData,
  });
};

const adminDoctorManageView = async (req, res) => {
  const doctors = await User.find({ role: "doctor" });
  res.render("adminDoctorManage", {
    doctors: doctors,
  });
};

const adminPatientManageView = async (req, res) => {
  const patients = await User.find({ role: "patient" });
  res.render("adminPatientManage", {
    patients: patients,
  });
};

const addDoctor = async (req, res) => {
  const {
    fullname,
    email,
    password,
    location,
    latitude,
    longitude,
    phone,
    gender,
    expertise,
  } = req.body;
  const oldUser = await User.findOne({ email: email });
  if (oldUser) {
    res.json({
      status: "alreadyExist",
    });
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
      avatar: gender === "male" ? "male.png" : "female.png",
      role: "doctor",
      expertise: expertise,
    });
    await newUser.save();

    res.json({
      status: "success",
    });
  }
};

const updateDoctor = async (req, res) => {
  const {
    id,
    fullname,
    email,
    password,
    location,
    latitude,
    longitude,
    phone,
    gender,
    expertise,
  } = req.body;
  const currentUser = await User.findById(id);
  if (currentUser.email === email) {
    currentUser.fullname = fullname;
    if (password) {
      currentUser.password = password;
    }
    currentUser.location = location;
    currentUser.latitude = latitude;
    currentUser.longitude = longitude;
    currentUser.phone = phone;
    currentUser.gender = gender;
    currentUser.expertise = expertise;
    await currentUser.save();

    res.json({
      status: "success",
    });
  } else {
    const oldUser = await User.find({ email: email });
    if (oldUser) {
      res.json({
        status: "alreadyExist",
      });
    } else {
      currentUser.fullname = fullname;
      currentUser.email = email;
      if (password) {
        currentUser.password = password;
      }
      currentUser.location = location;
      currentUser.latitude = latitude;
      currentUser.longitude = longitude;
      currentUser.phone = phone;
      currentUser.gender = gender;
      currentUser.expertise = expertise;
      await currentUser.save();
      res.json({
        status: "success",
      });
    }
  }
};

const updatePatient = async (req, res) => {
  console.log(req.body);
  const {
    id,
    fullname,
    email,
    password,
    location,
    latitude,
    longitude,
    phone,
    gender,
  } = req.body;
  const currentUser = await User.findById(id);
  if (currentUser.email === email) {
    currentUser.fullname = fullname;
    if (password) {
      currentUser.password = password;
    }
    currentUser.location = location;
    currentUser.latitude = latitude;
    currentUser.longitude = longitude;
    currentUser.phone = phone;
    currentUser.gender = gender;
    await currentUser.save();

    res.json({
      status: "success",
    });
  } else {
    const oldUser = await User.find({ email: email });
    if (oldUser) {
      res.json({
        status: "alreadyExist",
      });
    } else {
      currentUser.fullname = fullname;
      currentUser.email = email;
      if (password) {
        currentUser.password = password;
      }
      currentUser.location = location;
      currentUser.latitude = latitude;
      currentUser.longitude = longitude;
      currentUser.phone = phone;
      currentUser.gender = gender;
      await currentUser.save();
      res.json({
        status: "success",
      });
    }
  }
};

const addPatient = async (req, res) => {
  console.log("a", req.body);
  const {
    fullname,
    email,
    password,
    location,
    latitude,
    longitude,
    phone,
    gender,
  } = req.body;
  const oldUser = await User.findOne({ email: email });
  if (oldUser) {
    res.json({
      status: "alreadyExist",
    });
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
      avatar: gender === "male" ? "male.png" : "female.png",
      role: "patient",
    });
    await newUser.save();

    res.json({
      status: "success",
    });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  await User.deleteOne({ _id: id });
  res.json({
    status: "success",
  });
};

// const getAppointmentStatisticData = async (req, res) => {
//   Appointment.aggregate([
//     {
//       $group: {
//         _id: {$dateToString: {format: "%Y-%m", date: '$createdAt'}},
//         count: {$sum: 1}
//       }
//     }
//   ], function(err, result) {
//     if (err) {
//       res.send(err)
//     } else {
//       res.json(result)
//     }
//   })
// }

// const getPatientStatisticData = async (req, res) => {
//   const
//   User.aggregate([
//     {
//       $match: {role: 'patient'}
//     },
//     {
//       $group: {
//         _id: {$dateToString: {format: "%Y-%m-%d", date: '$createdAt'}},
//         count: {$sum: 1}
//       }
//     }
//   ], function(err, result) {
//     if (err) {
//       res.send(err)
//     } else {
//       res.json(result)
//     }
//   })
//   // res.json({
//   //   patientStatistic: patients,
//   //   appointmentStatistic: appointments
//   // })
// }

module.exports = {
  adminDashboardView,
  adminDoctorManageView,
  adminPatientManageView,
  addDoctor,
  updateDoctor,
  updatePatient,
  addPatient,
  deleteUser,
  useMedicalService,
};
