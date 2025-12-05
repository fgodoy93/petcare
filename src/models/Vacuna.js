const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const Vacuna = sequelize.define('vacuna', {
    id_vacuna: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    tipo: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    veterinario: {
        type: DataTypes.STRING(100),
        allowNull: true
    },
    id_mascota: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'vacunas',
    timestamps: false
})

module.exports = Vacuna