const userController = require('./users');
const certificationController = require('./certifications');
const reservationController = require('./reservations');
const jobApplicationsController = require('./jobApplications');
const roleController = require('./roles');
const notificationsController = require('./notifications');
const categoriesController = require('./categories');
const provincesController = require('./provinces');
const municipalitiesController = require('./municipalities');



module.exports = {
    ...userController,
    ...certificationController,
    ...reservationController,
    ...jobApplicationsController,
    ...roleController,
    ...notificationsController,
    ...categoriesController,
    ...provincesController,
    ...municipalitiesController
}