
const validateFields = require('../middlewares/validate-fields');
const validateRole = require('../middlewares/validate-role');
const validateJWT = require('../middlewares/validate-jwt');


module.exports = {
    ...validateFields,
    ...validateRole,
    ...validateJWT
}