const { Router } = require('express');
const { municipalitiesGet } = require('../controllers');


const router = Router();


// todo--------------------------------------------------------------------------------------
// todo------------------------------    get   ----------------------------------------------
// todo--------------------------------------------------------------------------------------
router.get('/', municipalitiesGet);




module.exports = router;




// http://localhost:8080/api/municipalities