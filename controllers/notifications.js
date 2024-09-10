const { response, request } = require('express');
const { Notification } = require('../models/notification');


// todo--------------------------------------------------------------------------------------
// todo------------------------------    get   ----------------------------------------------
// todo--------------------------------------------------------------------------------------
const notificationsGet = async (req = request, res = response) => {

    const { limit = 10, start = 0 } = req.query;
    const q = { where: { state: true } };

    try {
        const [total, notifications] = await Promise.all([
            Notification.count(q),
            Notification.findAll({
                limit: Number(limit) ? Number(limit) : 10,
                offset: Number(start) ? Number(start) : 0,
                order: ['id'],
                where: { state: true }
            })
        ]);


        res.json({
            total,
            notifications,
        });
    } catch (error) {
        console.log('error en el get', error)
    }
}


// todo--------------------------------------------------------------------------------------
// todo-------------------------------    get by user id   ----------------------------------
// todo--------------------------------------------------------------------------------------
const getNotificationByUserId = async (req, res) => {

    const { id } = req.params;

    try {
        const notifications = await Notification.findAll({
            where: {
                userId: id,
                state: true
            }
        });

        res.json({
            notifications
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'No se pudo optener las notificaciones'
        });
    }
}


// todo--------------------------------------------------------------------------------------
// todo------------------------------    post   ---------------------------------------------
// todo--------------------------------------------------------------------------------------
const notificationsPost = async (req = request, res = response) => {

    const { userId, date, message, theme } = req.body;
    const notification = new Notification({ userId, date, message, theme });

    try {
        await notification.save();
        res.json({
            msg: 'Notificación creada correctamente',
            notification
        })
    } catch (error) {
        console.log('error en el post', error)
    }
}


// todo--------------------------------------------------------------------------------------
// todo------------------------------    put   ----------------------------------------------
// todo--------------------------------------------------------------------------------------
const notificationsPut = async (req = request, res = response) => {

    const { id } = req.params;
    const { id: i, userId, ...rest } = req.body;

    try {
        const notification = await Notification.findByPk(id);
        Object.assign(notification, rest);
        await notification.save();

        res.json({
            msg: 'Notificación modificada correctamete',
            notification
        });

    } catch (error) {
        console.log('error en el put', error)
    }
}


// todo--------------------------------------------------------------------------------------
// todo------------------------------    delete   -------------------------------------------
// todo--------------------------------------------------------------------------------------
const notificationsDelete = async (req = request, res = response) => {

    const { id } = req.params;
    const { user: userAuth } = req; //Para ver quien es el usuario que elimina

    try {
        const notification = await Notification.findByPk(id);
        if (notification.state) {
            notification.state = false;
            await notification.save();

            res.json({
                msg: 'Notificación eliminada correctamente',
                notification,
                userAuth
            });
        } else
            res.status(404).json({
                msg: 'La notificación no esta almacenada en la BD'
            });

    } catch (error) {
        console.log('error en el delete', error)
    }
}



module.exports = {
    notificationsGet,
    getNotificationByUserId,
    notificationsPost,
    notificationsPut,
    notificationsDelete
};