const { check } = require('express-validator');
const { Router } = require('express');

const { validateFields, validateJWT, isAdminRole, hasRole } = require('../middlewares/index');

const { existJobApplication, existUser } = require('../helpers/index');

const {
    jobApplicatiosnGet,
    jobApplicationsPost,
    jobApplicationsPut,
    jobApplicationsDelete
} = require('../controllers/index');




const router =   Router();

// todo--------------------------------------------------------------------------------------
// todo------------------------------    get   ----------------------------------------------
// todo--------------------------------------------------------------------------------------
router.get('/',[
    validateJWT,
    isAdminRole,
    validateFields
], jobApplicatiosnGet);


// todo--------------------------------------------------------------------------------------
// todo------------------------------    post   ---------------------------------------------
// todo--------------------------------------------------------------------------------------
router.post('/', [
    validateJWT,
    check('userId', 'El campo "userId" es requerido').not().isEmpty(),
    check('emailUser', 'El campo "emailUser" es requerido').not().isEmpty(),
    check('nameUser', 'El campo "nameUser" es requerido').not().isEmpty(),
    check('description', 'El campo "description" es requerido').not().isEmpty(),
    check('userId').custom(existUser),
    validateFields
], jobApplicationsPost);


// todo--------------------------------------------------------------------------------------
// todo------------------------------    put   ----------------------------------------------
// todo--------------------------------------------------------------------------------------
router.put('/:id', [
    validateJWT,
    isAdminRole,
    check('id').custom(existJobApplication),
    check('approved', 'El campo "aprobada" es requerido').not().isEmpty(),
    validateFields
], jobApplicationsPut);


// todo--------------------------------------------------------------------------------------
// todo------------------------------    delete   -------------------------------------------
// todo--------------------------------------------------------------------------------------
router.delete('/:id', [
    validateJWT,
    isAdminRole,
    hasRole('ADMIN_ROLE'),
    check('id').custom(existJobApplication),
    validateFields
], jobApplicationsDelete);



module.exports = router;


// http://localhost:8080/api/jobApplications