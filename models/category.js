const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(`${process.env.CONNECTION_DB}`);


const Category = sequelize.define('category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    category: {
        type: DataTypes.STRING
    }
});


// sequelize.sync({force: true})
//     .then(() => {
//         console.log('Modelo sincronizado correctamente');
//         // Insertar los roles
//         Category.bulkCreate([
//             { category: 'Base' },
//             { category: 'Intermedio' },
//             { category: 'Avanzado' }
//         ])
//             .then(() => {
//                 console.log('Categorias insertados con éxito');
//             })
//             .catch((error) => {
//                 console.error('Error al insertar categorias:', error);
//             });
//     })
//     .catch((error) => {
//         console.error('Error al sincronizar el modelo:', error);
//     })



Category.prototype.toJSON = function () {
    const values = { ...this.get() };
    const id = values.id;
    delete values.updatedAt;
    delete values.createdAt;
    delete values.id;
    values.uid = id;
    return values;
};

module.exports = { Category };