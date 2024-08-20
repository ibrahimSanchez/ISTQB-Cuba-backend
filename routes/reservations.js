const { check } = require('express-validator');
const { Router } = require('express');

const { validateFields, isAdminRole, validateJWT } = require('../middlewares/index');

const { existCertification, existUser, existReservation } = require('../helpers/index');

const {
    reservationsGet,
    reservationsPost,
    reservationsPut,
    reservationsDelete
} = require('../controllers/index');



const router =   Router();

// todo--------------------------------------------------------------------------------------
// todo------------------------------    get   ----------------------------------------------
// todo--------------------------------------------------------------------------------------
router.get('/',[
    validateJWT,
    isAdminRole,
    validateFields
], reservationsGet);


// todo--------------------------------------------------------------------------------------
// todo------------------------------    post   ---------------------------------------------
// todo--------------------------------------------------------------------------------------
router.post('/', [
    validateJWT,
    check('userId', 'El campo "userId" es requerido').not().isEmpty(),
    check('certificationId', 'El campo "certificationId" es requerido').not().isEmpty(),
    check('userId').custom(existUser),
    check('certificationId').custom(existCertification),
    validateFields
], reservationsPost);


// todo--------------------------------------------------------------------------------------
// todo------------------------------    put   ----------------------------------------------
// todo--------------------------------------------------------------------------------------
router.put('/:id', [
    validateJWT,
    isAdminRole,
    check('id').custom(existReservation),
    check('approved', 'El campo "aprobada" es requerido').not().isEmpty(),
    validateFields
], reservationsPut);


// todo--------------------------------------------------------------------------------------
// todo------------------------------    delete   -------------------------------------------
// todo--------------------------------------------------------------------------------------
router.delete('/:id', [
    validateJWT,
    // isAdminRole,
    // hasRole('ADMIN_ROLE'),
    check('id').custom(existReservation),
    validateFields
], reservationsDelete);



module.exports = router;



// http://localhost:8080/api/reservations