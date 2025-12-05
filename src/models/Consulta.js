const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const Consulta = sequelize.define('consulta', {
    id_consulta: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    motivo: {
        type: DataTypes.STRING(255),
        allowNull: true
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
    tableName: 'consultas',
    timestamps: false
})

module.exports = Consulta