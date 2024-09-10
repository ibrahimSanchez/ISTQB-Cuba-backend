const { Router } = require('express');



const {
    categoriesGet
} = require('../controllers/index');



const router = Router();

// todo--------------------------------------------------------------------------------------
// todo------------------------------    get   ----------------------------------------------
// todo--------------------------------------------------------------------------------------
router.get('/', categoriesGet);


module.exports = router;



// http://localhost:8080/api/categories