const { response, request } = require('express');
const { Curse } = require('../models/curse');


// todo--------------------------------------------------------------------------------------
// todo------------------------------    get   ----------------------------------------------
// todo--------------------------------------------------------------------------------------
const cursesGet = async (req = request, res = response) => {

    const { limit = 10, start = 0 } = req.query;
    const q = { where: { state: true } };

    try {
        const [total, curses] = await Promise.all([
            Curse.count(q),
            Curse.findAll({
                limit: Number(limit) ? Number(limit) : 10,
                offset: Number(start) ? Number(start) : 0,
                order: ['id'],
                where: { state: true }
            })
        ]);

        res.json({
            total,
            curses
        });
    } catch (error) {
        console.log('error en el get', error)
    }
}


// todo--------------------------------------------------------------------------------------
// todo------------------------------    post   ---------------------------------------------
// todo--------------------------------------------------------------------------------------
const cursesPost = async (req = request, res = response) => {

    const { name, description, category, prise } = req.body;
    const curse = new Curse({ name, description, category, prise });

    try {
        await curse.save();
        res.json({
            msg: 'Curso creado correctamente',
            curse
        })
    } catch (error) {
        console.log('error en el post', error)
    }
}


// todo--------------------------------------------------------------------------------------
// todo------------------------------    put   ----------------------------------------------
// todo--------------------------------------------------------------------------------------
const cursesPut = async (req = request, res = response) => {

    const { id } = req.params;
    const { id: i, ...rest } = req.body;

    try {
        const curse = await Curse.findByPk(id);
        Object.assign(curse, rest);
        await curse.save();

        res.json({
            msg: 'Curso modificado correctamete',
            curse
        });

    } catch (error) {
        console.log('error en el put', error)
    }
}



// todo--------------------------------------------------------------------------------------
// todo------------------------------    delete   -------------------------------------------
// todo--------------------------------------------------------------------------------------
const cursesDelete = async (req = request, res = response) => {

    const { id } = req.params;

    const { user: userAuth } = req; //Para ver quien es el usuario que elimina

    try {

        const curse = await Curse.findByPk(id);
        if (curse.state) {
            curse.state = false;
            await curse.save();

            res.json({
                msg: 'Curso eliminado correctamente',
                curse,
                userAuth
            });
        } else
            res.status(404).json({
                msg: 'El curso no esta almacenado en la BD'
            });

    } catch (error) {
        console.log('error en el delete', error)
    }
}


module.exports = {
    cursesGet,
    cursesPost,
    cursesPut,
    cursesDelete
};