const { check } = require('express-validator');
const { Router } = require('express');

const { validateFields } = require('../middlewares/index');

const { existCurse } = require('../helpers/index');

const {
  cursesGet,
  cursesPost,
  cursesPut,
  cursesDelete
} = require('../controllers/index');



const router =   Router();

// todo--------------------------------------------------------------------------------------
// todo------------------------------    get   ----------------------------------------------
// todo--------------------------------------------------------------------------------------
router.get('/', cursesGet);


// todo--------------------------------------------------------------------------------------
// todo------------------------------    post   ---------------------------------------------
// todo--------------------------------------------------------------------------------------
router.post('/', [
    check('name', 'El campo "name" es requerido').not().isEmpty(),
    check('description', 'El campo "description" es requerido').not().isEmpty(),
    check('category', 'El campo "category" es requerido').not().isEmpty(),
    validateFields
], cursesPost);


// todo--------------------------------------------------------------------------------------
// todo------------------------------    put   ----------------------------------------------
// todo--------------------------------------------------------------------------------------
router.put('/:id', [
    check('id').custom(existCurse),
    validateFields
], cursesPut);


// todo--------------------------------------------------------------------------------------
// todo------------------------------    delete   -------------------------------------------
// todo--------------------------------------------------------------------------------------
router.delete('/:id', [
    // validateJWT,
    // isAdminRole,
    // hasRole('ADMIN_ROLE'),
    check('id').custom(existCurse),
    validateFields
], cursesDelete);



module.exports = router;



// http://localhost:8080/api/curses