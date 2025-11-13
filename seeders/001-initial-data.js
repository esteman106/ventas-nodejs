'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    // Insertar usuarios
    const users = await queryInterface.bulkInsert('users', [
      {
        name: 'Admin Seeder',
        email: 'admin@test.com',
        password: await bcrypt.hash('admin123', 10),
        role: 'admin',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Cliente 1',
        email: 'cliente1@test.com',
        password: await bcrypt.hash('cliente123', 10),
        role: 'client',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Pepe Limones',
        email: 'pepe@test.com',
        password: await bcrypt.hash('password123', 10),
        role: 'client',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], { returning: true });

    // Insertar productos
    const products = await queryInterface.bulkInsert('products', [
      {
        sku: 'TEST-2025-001',
        name: 'Laptop HP Pavilion 15',
        price: 850.00,
        quantity_available: 15,
        entry_date: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        sku: 'TEST-2025-002',
        name: 'Mouse Inalámbrico Logitech',
        price: 25.50,
        quantity_available: 50,
        entry_date: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        sku: 'TEST-2025-003',
        name: 'Teclado Mecánico RGB',
        price: 75.00,
        quantity_available: 30,
        entry_date: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        sku: 'TEST-2025-004',
        name: 'Monitor 24" Samsung FHD',
        price: 300.00,
        quantity_available: 20,
        entry_date: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        sku: 'TEST-2025-005',
        name: 'Impresora Laser HP',
        price: 200.00,
        quantity_available: 10,
        entry_date: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        sku: 'TEST-2025-006',
        name: 'Disco Duro SSD 500GB',
        price: 60.00,
        quantity_available: 25,
        entry_date: new Date(),
        created_at: new Date(),
        updated_at: new Date()
      }
    ], { returning: true });
  },

  async down(queryInterface, Sequelize) {
    // Eliminar datos en orden inverso
    await queryInterface.bulkDelete('purchase_items', null, {});
    await queryInterface.bulkDelete('purchases', null, {});
    await queryInterface.bulkDelete('products', null, {});
    await queryInterface.bulkDelete('users', null, {});
  }
};