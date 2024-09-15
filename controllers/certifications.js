const { response, request } = require('express');
const { Certification } = require('../models/certification');


// todo--------------------------------------------------------------------------------------
// todo------------------------------    get   ----------------------------------------------
// todo--------------------------------------------------------------------------------------
const certificationsGet = async (req = request, res = response) => {

    const userId = req.header('x-userId');

    try {
        if (!userId) {
            const q = { where: { state: true } };
            const [total, certifications] = await Promise.all([
                Certification.count(q),
                Certification.findAll({
                    order: ['id'],
                    where: { state: true }
                })
            ]);

            res.json({
                total,
                certifications
            });
        }
        else {
            const q = { where: { state: true, userId: userId } };
            const [total, certifications] = await Promise.all([
                Certification.count(q),
                Certification.findAll({
                    order: ['id'],
                    where: { state: true, userId: userId }
                })
            ]);

            res.json({
                total,
                certifications
            });
        }

    } catch (error) {
        console.log('error en el get', error)
    }
}



// todo--------------------------------------------------------------------------------------
// todo-------------------------------    get by id   ---------------------------------------
// todo--------------------------------------------------------------------------------------
const getCertificationById = async (req, res) => {

    const { id } = req.params;

    try {
        const certifications = await Certification.findByPk(id)

        res.json({
            certifications
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'No se pudo optener la certificación'
        });
    }
}



// todo--------------------------------------------------------------------------------------
// todo------------------------------    post   ---------------------------------------------
// todo--------------------------------------------------------------------------------------
const certificationsPost = async (req = request, res = response) => {

    const { name, description, category, prise, userId } = req.body;
    const certifications = new Certification({ name, description, category, prise, userId });

    try {
        await certifications.save();
        res.json({
            msg: 'Certificación creada correctamente',
            certifications
        })
    } catch (error) {
        console.log('error en el post', error)
    }
}


// todo--------------------------------------------------------------------------------------
// todo------------------------------    put   ----------------------------------------------
// todo--------------------------------------------------------------------------------------
const certificationsPut = async (req = request, res = response) => {

    const { id } = req.params;
    const { id: i, ...rest } = req.body;

    try {
        const certifications = await Certification.findByPk(id);
        Object.assign(certifications, rest);
        await certifications.save();

        res.json({
            msg: 'Certificación modificada correctamete',
            certifications
        });

    } catch (error) {
        console.log('error en el put', error)
    }
}



// todo--------------------------------------------------------------------------------------
// todo------------------------------    delete   -------------------------------------------
// todo--------------------------------------------------------------------------------------
const certificationsDelete = async (req = request, res = response) => {

    const { id } = req.params;

    const { user: userAuth } = req; //Para ver quien es el usuario que elimina

    try {

        const certifications = await Certification.findByPk(id);
        if (certifications.state) {
            certifications.state = false;
            await certifications.save();

            res.json({
                msg: 'Certificación eliminada correctamente',
                certifications,
                userAuth
            });
        } else
            res.status(404).json({
                msg: 'El certificación no esta almacenada en la BD'
            });

    } catch (error) {
        console.log('error en el delete', error)
    }
}


module.exports = {
    certificationsGet,
    getCertificationById,
    certificationsPost,
    certificationsPut,
    certificationsDelete,
};