const { check } = require('express-validator');
const { Router } = require('express');

const { validateFields, hasRole, validateJWT, isProfesorRole } = require('../middlewares/index');

const { existCertification } = require('../helpers/index');

const {
    certificationsGet,
    certificationsPost,
    certificationsPut,
    certificationsDelete,
    getCertificationById
} = require('../controllers/index');



const router = Router();

// todo--------------------------------------------------------------------------------------
// todo------------------------------    get   ----------------------------------------------
// todo--------------------------------------------------------------------------------------
router.get('/', certificationsGet);


// todo--------------------------------------------------------------------------------------
// todo------------------------------    get by id   ----------------------------------------------
// todo--------------------------------------------------------------------------------------
router.get('/:id', [
    check('id').custom(existCertification),
    validateFields
], getCertificationById);



// todo--------------------------------------------------------------------------------------
// todo------------------------------    post   ---------------------------------------------
// todo--------------------------------------------------------------------------------------
router.post('/', [
    validateJWT,
    isProfesorRole,
    hasRole('PROFESOR_ROLE'),
    check('name', 'El campo "name" es requerido').not().isEmpty(),
    check('description', 'El campo "description" es requerido').not().isEmpty(),
    check('category', 'El campo "category" es requerido').not().isEmpty(),
    check('userId', 'El campo "userId" es requerido').not().isEmpty(),
    validateFields
], certificationsPost);


// todo--------------------------------------------------------------------------------------
// todo------------------------------    put   ----------------------------------------------
// todo--------------------------------------------------------------------------------------
router.put('/:id', [
    validateJWT,
    isProfesorRole,
    hasRole('PROFESOR_ROLE'),
    check('id').custom(existCertification),
    validateFields
], certificationsPut);


// todo--------------------------------------------------------------------------------------
// todo------------------------------    delete   -------------------------------------------
// todo--------------------------------------------------------------------------------------
router.delete('/:id', [
    validateJWT,
    isProfesorRole,
    hasRole('PROFESOR_ROLE'),
    check('id').custom(existCertification),
    validateFields
], certificationsDelete);



module.exports = router;



// http://localhost:8080/api/certifications