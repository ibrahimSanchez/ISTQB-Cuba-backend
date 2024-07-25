const { response, request } = require('express');
const { Reservation } = require('../models/reservation');


// todo--------------------------------------------------------------------------------------
// todo------------------------------    get   ----------------------------------------------
// todo--------------------------------------------------------------------------------------
const reservationsGet = async (req = request, res = response) => {

    const { limit = 10, start = 0 } = req.query;
    const q = { where: { state: true } };

    try {
        const [total, reservations] = await Promise.all([
            Reservation.count(q),
            Reservation.findAll({
                limit: Number(limit) ? Number(limit) : 10,
                offset: Number(start) ? Number(start) : 0,
                order: ['id'],
                where: { state: true }
            })
        ]);

        res.json({
            total,
            reservations
        });
    } catch (error) {
        console.log('error en el get', error)
    }
}


// todo--------------------------------------------------------------------------------------
// todo------------------------------    post   ---------------------------------------------
// todo--------------------------------------------------------------------------------------
const reservationsPost = async (req = request, res = response) => {

    const { userId, curseId, aprobada } = req.body;
    const reservation = new Reservation({ userId, curseId, aprobada });

    try {
        await reservation.save();
        res.json({
            msg: 'Reservacion creada correctamente',
            reservation
        })
    } catch (error) {
        console.log('error en el post', error)
    }
}


// todo--------------------------------------------------------------------------------------
// todo------------------------------    put   ----------------------------------------------
// todo--------------------------------------------------------------------------------------
const reservationsPut = async (req = request, res = response) => {

    const { id } = req.params;
    const { id: i, userId, curseId, ...rest } = req.body;

    try {
        const reservation = await Reservation.findByPk(id);
        Object.assign(reservation, rest);
        await reservation.save();

        res.json({
            msg: 'Reservacion modificada correctamete',
            reservation
        });

    } catch (error) {
        console.log('error en el put', error)
    }
}



// todo--------------------------------------------------------------------------------------
// todo------------------------------    delete   -------------------------------------------
// todo--------------------------------------------------------------------------------------
const reservationsDelete = async (req = request, res = response) => {

    const { id } = req.params;

    const { user: userAuth } = req; //Para ver quien es el usuario que elimina

    try {

        const reservation = await Reservation.findByPk(id);
        if (reservation.state) {
            reservation.state = false;
            await reservation.save();

            res.json({
                msg: 'Reservacion eliminada correctamente',
                reservation,
                userAuth
            });
        } else
            res.status(404).json({
                msg: 'La reservacion no esta almacenada en la BD'
            });

    } catch (error) {
        console.log('error en el delete', error)
    }
}


module.exports = {
    reservationsGet,
    reservationsPost,
    reservationsPut,
    reservationsDelete
};