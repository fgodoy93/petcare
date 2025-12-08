const sequelize = require('../config/db');
const Tutor = require('./Tutor');
const Mascota = require('./Mascota');
const Vacuna = require('./Vacuna');
const Antiparasitario = require('./Antiparasitario');
const Consulta = require('./Consulta');

// Importar asociaciones
require('./associations');

// Función para sincronizar base de datos
const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida');
    
    // Sincronizar modelos (alter: true actualiza las tablas sin borrar datos)
    await sequelize.sync({ alter: true });
    console.log('✅ Tablas sincronizadas correctamente');
    
    return true;
  } catch (error) {
    console.error('❌ Error al conectar/sincronizar base de datos:', error);
    throw error;
  }
};

module.exports = {
  sequelize,
  Tutor,
  Mascota,
  Vacuna,
  Antiparasitario,
  Consulta,
  syncDatabase
};