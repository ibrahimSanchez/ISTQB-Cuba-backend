const userController = require('./users');
const certificationController = require('./certifications');
const reservationController = require('./reservations');
const jobApplicationsController = require('./jobApplications');
const roleController = require('./roles');
const notificationsController = require('./notifications');
const categoriesController = require('./categories');
const provincesController = require('./provinces');
const municipalitiesController = require('./municipalities');
const user_certificationsController = require('./user_certifications');
const searchController = require('./search');


module.exports = {
    ...userController,
    ...certificationController,
    ...reservationController,
    ...jobApplicationsController,
    ...roleController,
    ...notificationsController,
    ...categoriesController,
    ...provincesController,
    ...municipalitiesController,
    ...user_certificationsController,
    ...searchController
}