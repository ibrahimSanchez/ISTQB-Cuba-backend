
const validateFields = require('../middlewares/validate-fields');
const validateRole = require('../middlewares/validate-role');


module.exports = {
    ...validateFields,
    ...validateRole
}