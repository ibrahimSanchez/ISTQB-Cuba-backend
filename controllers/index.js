const userController = require('./users');
const certificationController = require('./certifications');
const reservationController = require('./reservations');
const jobApplicationsController = require('./jobApplications');
const roleController = require('./roles');



module.exports = {
    ...userController,
    ...certificationController,
    ...reservationController,
    ...jobApplicationsController,
    ...roleController
}