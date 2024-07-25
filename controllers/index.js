const userController = require('./users');
const curseController = require('./curses');
const reservationController = require('./reservations');




module.exports = {
    ...userController,
    ...curseController,
    ...reservationController
}