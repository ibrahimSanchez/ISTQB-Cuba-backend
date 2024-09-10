const { check } = require('express-validator');
const { Router } = require('express');

const { validateFields, hasRole, isAdminRole, validateJWT } = require('../middlewares/index');

const { existNotification, existUser } = require('../helpers/index');

const {
    notificationsGet,
    getNotificationByUserId,
    notificationsPost,
    notificationsPut,
    notificationsDelete
} = require('../controllers/index');



const router = Router();

// todo--------------------------------------------------------------------------------------
// todo------------------------------    get   ----------------------------------------------
// todo--------------------------------------------------------------------------------------
router.get('/', notificationsGet);


// todo--------------------------------------------------------------------------------------
// todo------------------------------    get by user id   -----------------------------------
// todo--------------------------------------------------------------------------------------
router.get('/:id', [
    check('id').custom(existUser),
    validateFields
], getNotificationByUserId);


// todo--------------------------------------------------------------------------------------
// todo------------------------------    post   ---------------------------------------------
// todo--------------------------------------------------------------------------------------
router.post('/', [
    check('userId', 'El campo "userId" es requerido').not().isEmpty(),
    check('date', 'El campo "date" es requerido').not().isEmpty(),
    check('message', 'El campo "message" es requerido').not().isEmpty(),
    check('theme', 'El campo "theme" es requerido').not().isEmpty(),
    validateFields
], notificationsPost);


// todo--------------------------------------------------------------------------------------
// todo------------------------------    put   ----------------------------------------------
// todo--------------------------------------------------------------------------------------
router.put('/:id', [
    check('id').custom(existNotification),
    validateFields
], notificationsPut);


// todo--------------------------------------------------------------------------------------
// todo------------------------------    delete   -------------------------------------------
// todo--------------------------------------------------------------------------------------
router.delete('/:id', [
    validateJWT,
    // isAdminRole,
    // hasRole('ADMIN_ROLE'),
    check('id').custom(existNotification),
    validateFields
], notificationsDelete);



module.exports = router;



// http://localhost:8080/api/notifications