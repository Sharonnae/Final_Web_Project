const adminDashboardView = (req, res) => {
    res.render('adminDashboard', {

    })
}

const adminDoctorManageView = (req, res) => {
    res.render('adminDoctorManage', {

    })
}

const adminPatientManageView = (req, res) => {
    res.render('adminPatientManage', {

    })
}

module.exports = {
    adminDashboardView,
    adminDoctorManageView,
    adminPatientManageView
}