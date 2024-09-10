const { Category } = require('../models/category');



// todo--------------------------------------------------------------------------------------
// todo-------------------------------    get   ---------------------------------------------
// todo--------------------------------------------------------------------------------------
const categoriesGet = async (req, res) => {

    try {
        const categories = await Category.findAll();

        res.json({
            categories
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'No se pudo optener las categorías'
        });
    }
}


module.exports = {
    categoriesGet
};