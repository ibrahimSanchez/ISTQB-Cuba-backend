const { Sequelize, DataTypes } = require("sequelize");
const { User } = require("./user");
const { Certification } = require("./certification");
const sequelize = new Sequelize(`${process.env.CONNECTION_DB}`);


const Reservation = sequelize.define("reservation", {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },

    approved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});


// Relacion con otras tablas
Reservation.belongsTo(User, { foreignKey: 'userId' });

Reservation.belongsTo(Certification, { foreignKey: 'certificationId' });

// Crear la tabla
// (async () => {
//     await Reservation.sync({force: true});
// })();


Reservation.prototype.toJSON = function () {
    const values = { ...this.get() };
    const id = values.id;
    delete values.updatedAt;
    delete values.createdAt;
    delete values.state;
    delete values.id;
    values.uid = id;
    return values;
};



module.exports = { Reservation }; 