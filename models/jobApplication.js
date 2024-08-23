const { Sequelize, DataTypes } = require("sequelize");
const { User } = require("./user");
const sequelize = new Sequelize(`${process.env.CONNECTION_DB}`);


const JobApplication = sequelize.define("jobApplication", {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    emailUser: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },

    nameUser: {
        type: DataTypes.STRING(200),
        allowNull: false
    },

    description: {
        type: DataTypes.STRING(500),
        allowNull: false
    },

    approved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    
});



// Relacion con otras tablas
JobApplication.belongsTo(User, { foreignKey: 'userId' });


// Crear la tabla
// (async () => {
//     await JobApplication.sync({force: true});
// })();


JobApplication.prototype.toJSON = function () {
    const values = { ...this.get() };
    const id = values.id;
    delete values.updatedAt;
    delete values.createdAt;
    delete values.state;
    delete values.id;
    values.uid = id;
    return values;
};




module.exports = { JobApplication };