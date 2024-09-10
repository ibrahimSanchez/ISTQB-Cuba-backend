const { response, request } = require('express');
const { JobApplication } = require('../models/jobApplication');
const { Notification } = require('../models/notification');


// todo--------------------------------------------------------------------------------------
// todo------------------------------    get   ----------------------------------------------
// todo--------------------------------------------------------------------------------------
const jobApplicatiosnGet = async (req = request, res = response) => {

    const { limit = 10, start = 0 } = req.query;
    const q = { where: { state: true } };

    try {
        const [total, jobApplications] = await Promise.all([
            JobApplication.count(q),
            JobApplication.findAll({
                limit: Number(limit) ? Number(limit) : 10,
                offset: Number(start) ? Number(start) : 0,
                order: ['id'],
                where: { state: true }
            })
        ]);

        res.json({
            total,
            jobApplications
        });
    } catch (error) {
        console.log('error en el get', error)
    }
}



// todo--------------------------------------------------------------------------------------
// todo-------------------------------    get by id   ---------------------------------------
// todo--------------------------------------------------------------------------------------
const getJobApplication = async (req, res) => {

    const { id } = req.params;

    try {
        const jobApplications = await JobApplication.findByPk(id)

        res.json({
            jobApplications
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'No se pudo optener la solicitud'
        });
    }
}


// todo--------------------------------------------------------------------------------------
// todo------------------------------    post   ---------------------------------------------
// todo--------------------------------------------------------------------------------------
const jobApplicationsPost = async (req = request, res = response) => {

    const { nameUser, emailUser, userId, description } = req.body;
    const jobApplications = new JobApplication({ nameUser, emailUser, userId, description });

    try {
        await jobApplications.save();
        res.json({
            msg: 'Solicitud de trabajo enviada correctamente',
            jobApplications
        })
    } catch (error) {
        console.log('error en el post', error)
    }
}
 

// todo--------------------------------------------------------------------------------------
// todo------------------------------    put   ----------------------------------------------
// todo--------------------------------------------------------------------------------------
const jobApplicationsPut = async (req = request, res = response) => {

    const { id } = req.params;
    const { id: i, ...rest } = req.body;

    try {
        const jobApplications = await JobApplication.findByPk(id);
        Object.assign(jobApplications, rest);
        await jobApplications.save();


        // Create notification
        const d = new Date();
        const date = `${d.getDay() + 1}/${d.getMonth()}/${d.getFullYear()}`
        const message = `Se ha aprobado la solicitud de trabajo`;
        const theme = `Solicitud de trabajo`;
        const notification = new Notification({ date, message, theme, userId: jobApplications.userId });
        await notification.save();


        res.json({
            msg: 'Solicitud de trabajo modificada correctamete',
            jobApplications
        });

    } catch (error) {
        console.log('error en el put', error)
    }
}



// todo--------------------------------------------------------------------------------------
// todo------------------------------    delete   -------------------------------------------
// todo--------------------------------------------------------------------------------------
const jobApplicationsDelete = async (req = request, res = response) => {

    const { id } = req.params;

    const { user: userAuth } = req; //Para ver quien es el usuario que elimina

    try {

        const jobApplications = await JobApplication.findByPk(id);
        if (jobApplications.state) {
            jobApplications.state = false;
            await jobApplications.save();

            res.json({
                msg: 'Solicitud de trabajo eliminada correctamente',
                jobApplications,
                userAuth
            });
        } else
            res.status(404).json({
                msg: 'La solicitud de trabajo no esta almacenada en la BD'
            });

    } catch (error) {
        console.log('error en el delete', error)
    }
}


// todo--------------------------------------------------------------------------------------
// todo------------------------------    delete array   -------------------------------------
// todo--------------------------------------------------------------------------------------
const jobApplicationsArrayDelete = async (req = request, res = response) => {

    const data = req.body.data;
    const { user: userAuth } = req;

    try {
        const jobApplications = await JobApplication.findAll({
            where: {
                id: data,
                state: true
            }
        });

        jobApplications.forEach(async (jobApplication) => {

            if (jobApplication.state) {
                jobApplication.state = false;
                await jobApplication.save();

            } else
                res.status(404).json({
                    msg: 'Las solicitudes de trabajo no están almacenadas en la BD'
                });
        })

        res.json({
            msg: 'Solicitudes de trabajo eliminadas correctamente',
            jobApplications,
            userAuth
        });

    } catch (error) {
        console.log('error en el delete', error)
    }
}




module.exports = {
    jobApplicatiosnGet,
    getJobApplication,
    jobApplicationsPost,
    jobApplicationsPut,
    jobApplicationsDelete,
    jobApplicationsArrayDelete
};