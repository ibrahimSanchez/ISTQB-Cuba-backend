const { response, request } = require('express');
const { Reservation } = require('../models/reservation');
const { Notification } = require('../models/notification');


// todo--------------------------------------------------------------------------------------
// todo------------------------------    get   ----------------------------------------------
// todo--------------------------------------------------------------------------------------
const reservationsGet = async (req = request, res = response) => {

    const q = { where: { state: true } };

    try {
        const [total, reservations] = await Promise.all([
            Reservation.count(q),
            Reservation.findAll({
                order: ['id'],
                where: { state: true }
            })
        ]);


        res.json({
            total,
            reservations,
        });
    } catch (error) {
        console.log('error en el get', error)
    }
}


// todo--------------------------------------------------------------------------------------
// todo------------------------------    post   ---------------------------------------------
// todo--------------------------------------------------------------------------------------
const reservationsPost = async (req = request, res = response) => {

    const { userId, certificationId, approved } = req.body;
    const reservation = new Reservation({ userId, certificationId, approved });

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

        // Create notification
        const d = new Date();
        const date = `${d.getDate() + 1}/${d.getMonth() + 1}/${d.getFullYear()}`
        const message = `Se ha aprobado la reservación`;
        const theme = `Reservación`;
        const notification = new Notification({ date, message, theme, userId: reservation.userId });
        await notification.save();

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



// todo--------------------------------------------------------------------------------------
// todo------------------------------    delete array   -------------------------------------
// todo--------------------------------------------------------------------------------------
const reservationsArrayDelete = async (req = request, res = response) => {

    const data = req.body.data;
    const { user: userAuth } = req;

    try {
        const reservations = await Reservation.findAll({
            where: {
                id: data,
                state: true
            }
        });

        reservations.forEach(async (reservation) => {

            if (reservation.state) {
                reservation.state = false;
                await reservation.save();

            } else
                res.status(404).json({
                    msg: 'Las reservaciones no están almacenadas en la BD'
                });
        })

        res.json({
            msg: 'Reservaciones eliminadas correctamente',
            reservations,
            userAuth
        });

    } catch (error) {
        console.log('error en el delete', error)
    }
}





module.exports = {
    reservationsGet,
    reservationsPost,
    reservationsPut,
    reservationsDelete,
    reservationsArrayDelete
};