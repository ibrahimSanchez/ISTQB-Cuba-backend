const { check } = require('express-validator');
const { Router } = require('express');

const { validateFields } = require('../middlewares/index');

const { existEmail, existUser, isRoleValid } = require('../helpers/index');

const {
    usersGet,
    usersPut,
    usersPost,
    usersDelete
} = require('../controllers/users');



const router =   Router();

// todo--------------------------------------------------------------------------------------
// todo------------------------------    get   ----------------------------------------------
// todo--------------------------------------------------------------------------------------
router.get('/', usersGet);


// todo--------------------------------------------------------------------------------------
// todo------------------------------    post   ---------------------------------------------
// todo--------------------------------------------------------------------------------------
router.post('/', [
    check('name', 'El campo "name" es requerido').not().isEmpty(),
    check('password', 'El campo "password" debe tener como minimo 8 caaracteres').isLength({ min: 8 }),
    check('email', 'El campo "email" no es valido').isEmail(),
    check('email').custom(existEmail),
    check('role').custom(isRoleValid),
    validateFields
], usersPost);


// todo--------------------------------------------------------------------------------------
// todo------------------------------    put   ----------------------------------------------
// todo--------------------------------------------------------------------------------------
router.put('/:id', [
    check('id').custom(existUser),
    // check('role').custom(isRoleValid),
    validateFields
], usersPut);


// todo--------------------------------------------------------------------------------------
// todo------------------------------    delete   -------------------------------------------
// todo--------------------------------------------------------------------------------------
router.delete('/:id', [
    // validateJWT,
    // isAdminRole,
    // hasRole('ADMIN_ROLE'),
    check('id').custom(existUser),
    validateFields
], usersDelete);



module.exports = router;



// http://localhost:8080/api/users