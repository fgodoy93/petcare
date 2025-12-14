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
    },
    // ✅ NUEVO: Duración en días
    duracion_dias: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: 'Duración de protección en días'
    },
    // ✅ NUEVO: Fecha calculada de próxima aplicación
    proxima_aplicacion: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        comment: 'Fecha calculada para próxima dosis'
    }
}, {
    tableName: 'antiparasitarios',
    timestamps: false
})

module.exports = Antiparasitario
