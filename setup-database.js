const { sequelize } = require('./models');
const bcrypt = require('bcryptjs');

const setupDatabase = async () => {
  try {
    // Sincronizar base de datos
    await sequelize.sync({ force: true });
    console.log('Tablas creadas exitosamente');

    // Insertar datos iniciales
    const { User, Product } = require('./models');

    // Crear usuarios de prueba
    await User.bulkCreate([
      {
        name: 'Administrador',
        email: 'admin@test.com',
        password: bcrypt.hashSync('admin123',10),
        role: 'admin'
      },
      {
        name: 'Pepe Limones',
        email: 'pepe@test.com',
        password: bcrypt.hashSync('cliente123',10),
        role: 'client'
      }
    ]);

    // Crear productos de prueba
    await Product.bulkCreate([
      {
        sku: 'LOTE-2024-001',
        name: 'Laptop HP Pavilion 15',
        price: 850.00,
        quantityAvailable: 15
      },
      {
        sku: 'LOTE-2024-002',
        name: 'Mouse Inalámbrico Logitech',
        price: 25.50,
        quantityAvailable: 50
      },
      {
        sku: 'LOTE-2024-003',
        name: 'Teclado Mecánico RGB',
        price: 75.00,
        quantityAvailable: 30
      }
    ]);

    console.log('Datos iniciales insertados');
    console.log('Usuario admin: admin@test.com / admin123');
    console.log('Usuario cliente: cliente1@test.com / cliente123');

  } catch (error) {
    console.error('Error configurando la base de datos:', error);
  } finally {
    await sequelize.close();
  }
};

// Ejecutar si se llama directamente
if (require.main === module) {
  setupDatabase();
}

module.exports = setupDatabase;