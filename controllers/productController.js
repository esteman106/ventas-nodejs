const { Product, Purchase, PurchaseItem, User } = require('../models');

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      order: [['entryDate', 'DESC']]
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos: ' + error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener producto: ' + error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { sku, name, price, quantityAvailable } = req.body;

    // Verificar si el número de lote ya existe
    const existingProduct = await Product.findOne({ where: { sku } });
    if (existingProduct) {
      return res.status(400).json({ error: 'El número de lote ya existe' });
    }

    const product = await Product.create({
      sku,
      name,
      price,
      quantityAvailable,
      entryDate: new Date()
    });

    res.status(201).json({
      message: 'Producto creado exitosamente',
      product
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear producto: ' + error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    const { sku, name, price, quantityAvailable } = req.body;

    // Verificar si el número de lote ya existe (excluyendo el producto actual)
    if (sku && sku !== product.sku) {
      const existingProduct = await Product.findOne({ where: { sku } });
      if (existingProduct) {
        return res.status(400).json({ error: 'El número de lote ya existe' });
      }
    }

    await product.update({
      sku: sku || product.sku,
      name: name || product.name,
      price: price || product.price,
      quantityAvailable: quantityAvailable || product.quantityAvailable
    });

    res.json({
      message: 'Producto actualizado exitosamente',
      product
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar producto: ' + error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    await product.destroy();
    res.json({ message: 'Producto eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar producto: ' + error.message });
  }
};

const getAllPurchases = async (req, res) => {
  try {
    const purchases = await Purchase.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'email']
        },
        {
          model: PurchaseItem,
          include: [Product]
        }
      ],
      order: [['purchaseDate', 'DESC']]
    });

    res.json(purchases);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener compras: ' + error.message });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getAllPurchases
};