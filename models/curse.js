const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(`${process.env.CONNECTION_DB}`);


const Curse = sequelize.define("curse", {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    name: {
        type: DataTypes.STRING(200),
        allowNull: false
    },

    description: {
        type: DataTypes.STRING(500),
        allowNull: false
    },

    category: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },

    prise: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
});

// Crear la tabla
// (async () => {
//     await Curse.sync({force: true});
// })();


Curse.prototype.toJSON = function () {
    const values = { ...this.get() };
    const id = values.id;
    delete values.updatedAt;
    delete values.createdAt;
    delete values.state;
    delete values.id;
    values.uid = id;
    return values;
};




module.exports = { Curse };