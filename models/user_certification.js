const { Sequelize, DataTypes } = require("sequelize");
const { User } = require("./user");
const { Certification } = require("./certification");
const sequelize = new Sequelize(`${process.env.CONNECTION_DB}`);


const User_certification = sequelize.define("user_certification", {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },

    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});


// Relacion con otras tablas
User_certification.belongsTo(User, { foreignKey: 'userId' });

User_certification.belongsTo(Certification, { foreignKey: 'certificationId' });


// Crear la tabla
// (async () => {
//     await User_certification.sync({force: true});
// })();


User_certification.prototype.toJSON = function () {
    const values = { ...this.get() };
    const id = values.id;
    delete values.updatedAt;
    delete values.createdAt;
    delete values.state;
    delete values.id;
    values.uid = id;
    return values;
};



module.exports = { User_certification }; 