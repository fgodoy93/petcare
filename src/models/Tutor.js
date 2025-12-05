const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const Tutor = sequelize.define('tutor', {
    id_tutor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_tutor'
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    telefono: {
        type: DataTypes.STRING(30),
        allowNull: true
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'tutores',
    timestamps: false,
    underscored: true
})

module.exports = Tutor