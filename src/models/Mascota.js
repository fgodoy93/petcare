const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const Mascota = sequelize.define('Mascota', {
    id_mascota: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    especie: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    raza: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    fechaNacimiento: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    sexo: {
        type: DataTypes.ENUM('macho', 'hembra'),
        allowNull: false
    },
    peso: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true
    },
    color: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    foto: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    activa: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    id_tutor: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'mascotas',
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
})

module.exports = Mascota