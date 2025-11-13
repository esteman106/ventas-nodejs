const sequelize = require('../config/database');
const User = require('./User');
const Product = require('./Product');
const Purchase = require('./Purchase');
const PurchaseItem = require('./PurchaseItem');

// Relaciones
User.hasMany(Purchase, { foreignKey: 'userId' });
Purchase.belongsTo(User, { foreignKey: 'userId' });

Purchase.hasMany(PurchaseItem, { foreignKey: 'purchaseId' });
PurchaseItem.belongsTo(Purchase, { foreignKey: 'purchaseId' });

Product.hasMany(PurchaseItem, { foreignKey: 'productId' });
PurchaseItem.belongsTo(Product, { foreignKey: 'productId' });

module.exports = {
  sequelize,
  User,
  Product,
  Purchase,
  PurchaseItem
};