const { User } = require("../models/user");
const { Curse } = require("../models/curse");
const { Role } = require("../models/role");
const { Reservation } = require("../models/reservation");


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
// todo------------------------------    exist curse   ---------------------------------------
// todo--------------------------------------------------------------------------------------
const existCurse = async (id = '') => {
    const curse = await Curse.findByPk(id);
    if (!curse)
        throw new Error(`No existe el curso con id ${id}`);
}


// todo--------------------------------------------------------------------------------------
// todo------------------------------    exist reservation   ---------------------------------------
// todo--------------------------------------------------------------------------------------
const existReservation = async (id = '') => {
    const reservation = await Reservation.findByPk(id);
    if (!reservation)
        throw new Error(`No existe la reservacion con id ${id}`);
}




module.exports = {
    isRoleValid,
    existEmail,
    existUser,
    existCurse,
    existReservation
}