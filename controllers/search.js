const { Op } = require('sequelize');

const { User } = require("../models/user");

const allowedCollectios = [
    'users',
    'categories',
    'products',
    'roles'
];


const searchUser = async (term = '', res) => {

    const isId = Number.isInteger(Number(term));

    if (isId) {
        const user = await User.findByPk(term)

        return res.json({
            results: (user) ? [user] : []
        });
    }

    const users = await User.findAll({
        where: {
            [Op.and]: [
                {
                    [Op.or]: [
                        { name: { [Op.iLike]: `%${term}%` } },
                        { email: { [Op.iLike]: `%${term}%` } }
                    ]
                },
                { state: true }
            ]
        }
    })

    res.json({
        results: users
    });
}





const search = (req, res) => {

    const { collection, term } = req.params;

    if (!allowedCollectios.includes(collection))
        return res.status(400).json({
            msg: `Las colecciones permitidas son ${allowedCollectios}`
        });

    switch (collection) {
        case 'users':
            searchUser(term, res);
            break;

        case 'categories':
            searchCategories(term, res)
            break;

        case 'products':
            searchProducts(term, res)
            break;

        default:
            res.status(500).json({
                msg: "Se le olvido hacer la busqueda"
            });
            break;
    }

}



module.exports = {
    search
}