const { User_certification } = require("../models/user_certification");


// todo--------------------------------------------------------------------------------------
// todo-------------------------------    get   ---------------------------------------------
// todo--------------------------------------------------------------------------------------
const user_certificationsGet = async (req, res) => {
    
    try {
        const user_certifications = await User_certification.findAll({
            order: ['id'],
            where: { state: true }
        })

        res.json({
            user_certifications
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'No se pudo optener la información'
        });
    }
}


// const [total, reservations] = await Promise.all([
//     Reservation.count(q),
//     Reservation.findAll({
//         order: ['id'],
//         where: { state: true }
//     })
// ]);



// todo--------------------------------------------------------------------------------------
// todo------------------------------    put   ----------------------------------------------
// todo--------------------------------------------------------------------------------------
const user_certificationsPut = async (req = request, res = response) => {

    const { id } = req.params;
    const { ...rest } = req.body;

    try {
        const user_certification = await User_certification.findByPk(id);
        Object.assign(user_certification, rest);
        await user_certification.save();

        res.json({
            msg: 'Historia de certificación modificada correctamete',
            user_certification
        });


    } catch (error) {
        console.log('error en el put', error)
    }
}










// todo--------------------------------------------------------------------------------------
// todo------------------------------    delete   -------------------------------------------
// todo--------------------------------------------------------------------------------------
const user_certificationDelete = async (req = request, res = response) => {

    const { id } = req.params;

    const { user: userAuth } = req; //Para ver quien es el usuario que elimina

    try {

        const user_certification = await User_certification.findByPk(id);
        if (user_certification.state) {
            user_certification.state = false;
            await user_certification.save();

            res.json({
                msg: 'Historia de certificación eliminada correctamente',
                user_certification,
                userAuth
            });
        } else
            res.status(404).json({
                msg: 'La historia de certificación no esta almacenada en la BD'
            });

    } catch (error) {
        console.log('error en el delete', error)
    }
}



// todo--------------------------------------------------------------------------------------
// todo------------------------------    delete array   -------------------------------------
// todo--------------------------------------------------------------------------------------
const user_certificationArrayDelete = async (req = request, res = response) => {

    const data = req.body.data;
    const { user: userAuth } = req;

    try {
        const user_certifications = await User_certification.findAll({
            where: {
                id: data,
                state: true
            }
        });

        user_certifications.forEach(async (user_certification) => {

            if (user_certification.state) {
                user_certification.state = false;
                await user_certification.save();

            } else
                res.status(404).json({
                    msg: 'Las historias de certificación no están almacenadas en la BD'
                });
        })

        res.json({
            msg: 'Historias de certificación eliminadas correctamente',
            user_certifications,
            userAuth
        });

    } catch (error) {
        console.log('error en el delete', error)
    }
}















module.exports = {
    user_certificationsGet,
    user_certificationsPut,
    user_certificationDelete,
    user_certificationArrayDelete
};