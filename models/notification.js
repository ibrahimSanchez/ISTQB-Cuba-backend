const { Sequelize, DataTypes } = require("sequelize");
const { User } = require("./user");
const sequelize = new Sequelize(`${process.env.CONNECTION_DB}`);


const Notification = sequelize.define("notification", {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    view: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    date: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    message: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    theme: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
});

// Relacion con otras tablas
Notification.belongsTo(User, { foreignKey: 'userId' });


// Crear la tabla
// (async () => {
//     await Notification.sync({force: true});
// })();


Notification.prototype.toJSON = function () {
    const values = { ...this.get() };
    const id = values.id;
    delete values.updatedAt;
    delete values.createdAt;
    delete values.state;
    delete values.id;
    values.uid = id;
    return values;
};



module.exports = { Notification }; 