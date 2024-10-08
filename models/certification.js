const { Sequelize, DataTypes } = require("sequelize");
const { User } = require("./user");
const sequelize = new Sequelize(`${process.env.CONNECTION_DB}`);


const Certification = sequelize.define("certification", {

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
        allowNull: false,
        validate: {
            isIn: [['Base', 'Avanzado', 'Intermedio']]
        }
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

 

// Relacion con otras tablas
Certification.belongsTo(User, { foreignKey: 'userId' });




// Crear la tabla
// (async () => {
//     await Certification.sync({force: true});
// })();


Certification.prototype.toJSON = function () {
    const values = { ...this.get() };
    const id = values.id;
    delete values.updatedAt;
    delete values.createdAt;
    delete values.state;
    delete values.id;
    values.uid = id;
    return values;
};




module.exports = { Certification };