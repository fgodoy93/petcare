const Mascota = require('./Mascota')
const Vacuna = require('./Vacuna')
const Antiparasitario = require('./Antiparasitario')
const Consulta = require('./Consulta')
const Tutor = require('./Tutor')

// Relaciones Tutor - Mascota
Tutor.hasMany(Mascota, {
    foreignKey: 'id_tutor',
    as: 'mascotas'
})
Mascota.belongsTo(Tutor, {
    foreignKey: 'id_tutor',
    as: 'tutor'
})

// Relaciones Mascota - Vacuna
Mascota.hasMany(Vacuna, { 
    foreignKey: 'id_mascota',
    as: 'vacunas'
})
Vacuna.belongsTo(Mascota, { 
    foreignKey: 'id_mascota',
    as: 'mascota'
})

// Relaciones Mascota - Antiparasitario
Mascota.hasMany(Antiparasitario, { 
    foreignKey: 'id_mascota',
    as: 'antiparasitarios'
})
Antiparasitario.belongsTo(Mascota, { 
    foreignKey: 'id_mascota',
    as: 'mascota'
})

// Relaciones Mascota - Consulta
Mascota.hasMany(Consulta, { 
    foreignKey: 'id_mascota',
    as: 'consultas'
})
Consulta.belongsTo(Mascota, { 
    foreignKey: 'id_mascota',
    as: 'mascota'
})

module.exports = { Mascota, Vacuna, Antiparasitario, Consulta, Tutor }