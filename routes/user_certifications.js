const { Router } = require('express');
const { check } = require('express-validator');
const { user_certificationsGet, user_certificationsPut, user_certificationDelete, user_certificationArrayDelete } = require('../controllers/user_certifications');
const { isProfesorRole, validateJWT, validateFields, validateArrayUser_certification, hasRole } = require('../middlewares');
const { existUser_certification } = require('../helpers/index');


const router = Router();

// todo--------------------------------------------------------------------------------------
// todo------------------------------    get   ----------------------------------------------
// todo--------------------------------------------------------------------------------------
router.get('/', user_certificationsGet);




// todo--------------------------------------------------------------------------------------
// todo------------------------------    put   ----------------------------------------------
// todo--------------------------------------------------------------------------------------
router.put('/:id', [
    validateJWT,
    isProfesorRole,
    check('id').custom(existUser_certification),
    check('completed', 'El campo "completed" es requerido').not().isEmpty(),
    validateFields
], user_certificationsPut);




// todo--------------------------------------------------------------------------------------
// todo------------------------------    delete   -------------------------------------------
// todo--------------------------------------------------------------------------------------
router.delete('/:id', [
    validateJWT,
    isProfesorRole,
    hasRole('PROFESOR_ROLE'),
    check('id').custom(existUser_certification),
    validateFields
], user_certificationDelete);


// todo--------------------------------------------------------------------------------------
// todo------------------------------    delete array   -------------------------------------
// todo--------------------------------------------------------------------------------------
router.delete('/', [
    validateJWT,
    isProfesorRole,
    validateArrayUser_certification,
    hasRole('PROFESOR_ROLE'),
    validateFields
], user_certificationArrayDelete);





module.exports = router;

// http://localhost:8080/api/user_certifications