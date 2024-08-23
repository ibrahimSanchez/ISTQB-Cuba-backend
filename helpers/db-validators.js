const { User } = require("../models/user");
const { Certification } = require("../models/certification");
const { Role } = require("../models/role");
const { Reservation } = require("../models/reservation");
const { JobApplication } = require("../models/jobApplication");


// todo--------------------------------------------------------------------------------------
// todo------------------------------    role valid   ---------------------------------------
// todo--------------------------------------------------------------------------------------
const isRoleValid = async (role = '') => {
    const existRole = await Role.findAll({ where: { role } });

    if (existRole.length === 0) {
        throw new Error(`El rol ${role} no esta en la BD`);
    }
}


// todo--------------------------------------------------------------------------------------
// todo------------------------------    exist email   --------------------------------------
// todo--------------------------------------------------------------------------------------
const existEmail = async (email = '') => {
    const exist = await User.findAll({ where: { email } });

    if (exist.length > 0)
        throw new Error(`El email: ${email} ya esta registrado`)
}



// todo--------------------------------------------------------------------------------------
// todo------------------------------    exist user   ---------------------------------------
// todo--------------------------------------------------------------------------------------
const existUser = async (id = '') => {
    const user = await User.findByPk(id);
    if (!user)
        throw new Error(`No existe el usuario con id ${id}`);
}


// todo--------------------------------------------------------------------------------------
// todo------------------------------    exist certification   ------------------------------
// todo--------------------------------------------------------------------------------------
const existCertification = async (id = '') => {
    const certification = await Certification.findByPk(id);
    if (!certification)
        throw new Error(`No existe la certificación con id ${id}`);
}


// todo--------------------------------------------------------------------------------------
// todo------------------------------    exist reservation   --------------------------------
// todo--------------------------------------------------------------------------------------
const existReservation = async (id = '') => {
    const reservation = await Reservation.findByPk(id);
    if (!reservation)
        throw new Error(`No existe la reservacion con id ${id}`);
}



// todo--------------------------------------------------------------------------------------
// todo------------------------------    exist jobApplication   -----------------------------
// todo--------------------------------------------------------------------------------------
const existJobApplication = async (id = '') => {
    const jobApplication = await JobApplication.findByPk(id);
    if (!jobApplication)
        throw new Error(`No existe la solicitud de trabajo con id ${id}`);
}




module.exports = {
    isRoleValid,
    existEmail,
    existUser,
    existCertification,
    existReservation,
    existJobApplication
}