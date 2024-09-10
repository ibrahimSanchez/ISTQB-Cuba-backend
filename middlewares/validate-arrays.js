
const { User } = require('../models/user');
const { Reservation } = require('../models/reservation');
const { JobApplication } = require('../models/jobApplication');




// todo--------------------------------------------------------------------------------------
// todo-----------------------------------    Users   ---------------------------------------
// todo--------------------------------------------------------------------------------------
const validateArrayUsers = async (req, res, next) => {
    const data = req.body.data;
    // console.log(data)
    const user = await User.findAll({
        where: {
            id: data,
            state: true
        }
    });

    if (user.length != data.length) return res.status(401).json({
        msg: `Los id no son válidos`
    });

    next();
}



// todo--------------------------------------------------------------------------------------
// todo------------------------------    Reservations   -------------------------------------
// todo--------------------------------------------------------------------------------------
const validateArrayReservations = async (req, res, next) => {
    const data = req.body.data;
    // console.log(data)
    const reservations = await Reservation.findAll({
        where: {
            id: data,
            state: true
        }
    });

    if (reservations.length != data.length) return res.status(401).json({
        msg: `Los id no son válidos`
    });

    next();
}




// todo--------------------------------------------------------------------------------------
// todo------------------------------    jobApplications   ----------------------------------
// todo--------------------------------------------------------------------------------------
const validateArrayJobApplications = async (req, res, next) => {
    const data = req.body.data;
    // console.log(data)
    const jobApplications = await JobApplication.findAll({
        where: {
            id: data,
            state: true
        }
    });

    if (jobApplications.length != data.length) return res.status(401).json({
        msg: `Los id no son válidos`
    });

    next();
}



module.exports = {
    validateArrayUsers,
    validateArrayReservations,
    validateArrayJobApplications
}