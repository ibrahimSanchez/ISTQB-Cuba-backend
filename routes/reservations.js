const { check } = require('express-validator');
const { Router } = require('express');

const { validateFields, validateJWT, validateArrayReservations, hasRole, isProfesorRole } = require('../middlewares/index');

const { existCertification, existUser, existReservation } = require('../helpers/index');

const {
    reservationsGet,
    reservationsPost,
    reservationsPut,
    reservationsDelete,
    reservationsArrayDelete
} = require('../controllers/index');



const router = Router();

// todo--------------------------------------------------------------------------------------
// todo------------------------------    get   ----------------------------------------------
// todo--------------------------------------------------------------------------------------
router.get('/', [
    validateJWT,
    isProfesorRole,
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
    isProfesorRole,
    check('id').custom(existReservation),
    check('approved', 'El campo "aprobada" es requerido').not().isEmpty(),
    validateFields
], reservationsPut);


// todo--------------------------------------------------------------------------------------
// todo------------------------------    delete   -------------------------------------------
// todo--------------------------------------------------------------------------------------
router.delete('/:id', [
    validateJWT,
    isProfesorRole,
    hasRole('PROFESOR_ROLE'),
    check('id').custom(existReservation),
    validateFields
], reservationsDelete);


// todo--------------------------------------------------------------------------------------
// todo------------------------------    delete array   -------------------------------------
// todo--------------------------------------------------------------------------------------
router.delete('/', [
    validateJWT,
    isProfesorRole,
    validateArrayReservations,
    hasRole('PROFESOR_ROLE'),
    validateFields
], reservationsArrayDelete);



module.exports = router;



// http://localhost:8080/api/reservations