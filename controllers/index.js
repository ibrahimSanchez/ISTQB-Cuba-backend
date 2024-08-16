const userController = require('./users');
const certificationController = require('./certifications');
const reservationController = require('./reservations');




module.exports = {
    ...userController,
    ...certificationController,
    ...reservationController
}