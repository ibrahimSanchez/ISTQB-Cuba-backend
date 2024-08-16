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
    // isAdminRole,
    validateJWT,
    validateFields
], reservationsGet);


// todo--------------------------------------------------------------------------------------
// todo------------------------------    post   ---------------------------------------------
// todo--------------------------------------------------------------------------------------
router.post('/', [
    validateJWT,
    check('userId', 'El campo "userId" es requerido').not().isEmpty(),
    check('curseId', 'El campo "curserId" es requerido').not().isEmpty(),
    check('userId').custom(existUser),
    check('curseId').custom(existCertification),
    validateFields
], reservationsPost);


// todo--------------------------------------------------------------------------------------
// todo------------------------------    put   ----------------------------------------------
// todo--------------------------------------------------------------------------------------
router.put('/:id', [
    isAdminRole,
    check('id').custom(existReservation),
    check('aprobada', 'El campo "aprobada" es requerido').not().isEmpty(),
    validateFields
], reservationsPut);


// todo--------------------------------------------------------------------------------------
// todo------------------------------    delete   -------------------------------------------
// todo--------------------------------------------------------------------------------------
router.delete('/:id', [
    // validateJWT,
    // isAdminRole,
    // hasRole('ADMIN_ROLE'),
    check('id').custom(existReservation),
    validateFields
], reservationsDelete);



module.exports = router;



// http://localhost:8080/api/reservations