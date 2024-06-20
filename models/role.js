const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(`${process.env.CONNECTION_DB}`);


const Role = sequelize.define('role', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    role: {
        type: DataTypes.STRING
    }
});


// sequelize.sync({force: true})
//     .then(() => {
//         console.log('Modelo sincronizado correctamente');
//         // Insertar los roles
//         Role.bulkCreate([
//             { role: 'ADMIN_ROLE' },
//             { role: 'USER_ROLE' }
//         ])
//             .then(() => {
//                 console.log('Roles insertados con éxito');
//             })
//             .catch((error) => {
//                 console.error('Error al insertar roles:', error);
//             });
//     })
//     .catch((error) => {
//         console.error('Error al sincronizar el modelo:', error);
//     })



module.exports = { Role };