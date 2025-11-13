const { Purchase, PurchaseItem, Product, User } = require('../models');

const createPurchase = async (req, res) => {
  const transaction = await require('../config/database').transaction();
  
  try {
    const { items } = req.body;
    const userId = req.user.id;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Debe proporcionar al menos un producto' });
    }

    let totalAmount = 0;
    const purchaseItems = [];

    // Validar productos y calcular total
    for (const item of items) {
      const product = await Product.findByPk(item.productId, { transaction });
      
      if (!product) {
        await transaction.rollback();
        return res.status(404).json({ error: `Producto con ID ${item.productId} no encontrado` });
      }

      if (product.quantityAvailable < item.quantity) {
        await transaction.rollback();
        return res.status(400).json({ 
          error: `Stock insuficiente para el producto ${product.name}. Disponible: ${product.quantityAvailable}` 
        });
      }

      const subtotal = product.price * item.quantity;
      totalAmount += subtotal;

      purchaseItems.push({
        productId: product.id,
        quantity: item.quantity,
        unitPrice: product.price,
        subtotal
      });

      // Actualizar stock
      await product.update({
        quantityAvailable: product.quantityAvailable - item.quantity
      }, { transaction });
    }

    // Crear la compra
    const purchase = await Purchase.create({
      userId,
      totalAmount,
      purchaseDate: new Date()
    }, { transaction });

    // Crear items de la compra
    for (const item of purchaseItems) {
      await PurchaseItem.create({
        ...item,
        purchaseId: purchase.id
      }, { transaction });
    }

    await transaction.commit();

    // Obtener la compra completa con sus relaciones
    const completePurchase = await Purchase.findByPk(purchase.id, {
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'email']
        },
        {
          model: PurchaseItem,
          include: [Product]
        }
      ]
    });

    res.status(201).json({
      message: 'Compra realizada exitosamente',
      purchase: completePurchase
    });

  } catch (error) {
    await transaction.rollback();
    res.status(500).json({ error: 'Error al realizar la compra: ' + error.message });
  }
};

const getPurchaseHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const purchases = await Purchase.findAll({
      where: { userId },
      include: [
        {
          model: PurchaseItem,
          include: [Product]
        }
      ],
      order: [['purchaseDate', 'DESC']]
    });

    res.json(purchases);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener historial de compras: ' + error.message });
  }
};

const getPurchaseById = async (req, res) => {
  try {
    const purchase = await Purchase.findOne({
      where: { 
        id: req.params.id,
        userId: req.user.id 
      },
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'email']
        },
        {
          model: PurchaseItem,
          include: [Product]
        }
      ]
    });

    if (!purchase) {
      return res.status(404).json({ error: 'Compra no encontrada' });
    }

    res.json(purchase);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la compra: ' + error.message });
  }
};

module.exports = {
  createPurchase,
  getPurchaseHistory,
  getPurchaseById
};