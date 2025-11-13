const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/purchases', require('./routes/purchases'));

// Ruta de estado de la aplicación
app.get('/', (req, res) => {
  res.json({ message: 'De momento todo esta bien' });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Inicializar servidor
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Sincronizar base de datos
    await sequelize.authenticate();
    await sequelize.sync({ force: false }); // Cambiar a true en desarrollo para recrear tablas
    console.log('Conexión a la base de datos realizada');

    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en puerto ${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar servidor:', error);
    process.exit(1);
  }
};

startServer();