const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const Antiparasitario = sequelize.define('antiparasitario', {
    id_antiparasitario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    producto: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    dosis: {
        type: DataTypes.STRING(100),
        allowNull: true
    }
}, {
    tableName: 'antiparasitarios',
    timestamps: false
})

module.exports = Antiparasitario