const express = require('express');
const { 
  getAllProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct,
  getAllPurchases 
} = require('../controllers/productController');
const authenticate = require('../middleware/auth');
const authorize = require('../middleware/role');

const router = express.Router();

/**
 * @api {get} /products Obtener todos los productos
 * @apiName GetProducts
 * @apiGroup Productos
 * @apiVersion 1.0.0
 * 
 * @apiSuccess {Object[]} products Lista de productos
 * @apiSuccess {Number} products.id ID del producto
 * @apiSuccess {String} products.sku Número de lote
 * @apiSuccess {String} products.name Nombre del producto
 * @apiSuccess {Number} products.price Precio del producto
 * @apiSuccess {Number} products.quantity_available Cantidad disponible
 * @apiSuccess {String} products.entry_date Fecha de ingreso
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "id": 1,
 *         "sku": "LOTE-001",
 *         "name": "Laptop HP",
 *         "price": 850.00,
 *         "quantity_available": 15,
 *         "entry_date": "2024-01-01T00:00:00.000Z"
 *       }
 *     ]
 */
router.get('/', getAllProducts);

/**
 * @api {get} /products/:id Obtener producto por ID
 * @apiName GetProduct
 * @apiGroup Productos
 * @apiVersion 1.0.0
 * 
 * @apiParam {Number} id ID único del producto
 * 
 * @apiSuccess {Object} product Datos del producto
 * @apiSuccess {Number} product.id ID del producto
 * @apiSuccess {String} product.sku Número de lote
 * @apiSuccess {String} product.name Nombre del producto
 * @apiSuccess {Number} product.price Precio del producto
 * @apiSuccess {Number} product.quantity_available Cantidad disponible
 * @apiSuccess {String} product.entry_date Fecha de ingreso
 * 
 * @apiError (Error 404) {String} error Producto no encontrado
 */
router.get('/:id', getProductById);

/**
 * @api {post} /products Crear producto
 * @apiName CreateProduct
 * @apiGroup Productos
 * @apiVersion 1.0.0
 * @apiPermission admin
 * 
 * @apiHeader {String} Authorization Token JWT de administrador
 * 
 * @apiParam {String} sku Número de lote (único)
 * @apiParam {String} name Nombre del producto
 * @apiParam {Number} price Precio del producto
 * @apiParam {Number} quantityAvailable Cantidad disponible
 * 
 * @apiSuccess {String} message Mensaje de confirmación
 * @apiSuccess {Object} product Producto creado
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "message": "Producto creado exitosamente",
 *       "product": {
 *         "id": 1,
 *         "sku": "LOTE-001",
 *         "name": "Laptop HP",
 *         "price": 850.00,
 *         "quantity_available": 15,
 *         "entry_date": "2024-01-01T00:00:00.000Z"
 *       }
 *     }
 * 
 * @apiError (Error 400) {String} error El número de lote ya existe
 * @apiError (Error 401) {String} error Token no proporcionado o inválido
 * @apiError (Error 403) {String} error Acceso denegado. No tienes permisos suficientes
 */
router.post('/', authenticate, authorize('admin'), createProduct);

/**
 * @api {put} /products/:id Actualizar producto
 * @apiName UpdateProduct
 * @apiGroup Productos
 * @apiVersion 1.0.0
 * @apiPermission admin
 * 
 * @apiHeader {String} Authorization Token JWT de administrador
 * 
 * @apiParam {Number} id ID único del producto a actualizar
 * @apiParam {String} [sku] Número de lote (único)
 * @apiParam {String} [name] Nombre del producto
 * @apiParam {Number} [price] Precio del producto
 * @apiParam {Number} [quantityAvailable] Cantidad disponible
 * 
 * @apiSuccess {String} message Mensaje de confirmación
 * @apiSuccess {Object} product Producto actualizado
 */
router.put('/:id', authenticate, authorize('admin'), updateProduct);

/**
 * @api {delete} /products/:id Eliminar producto
 * @apiName DeleteProduct
 * @apiGroup Productos
 * @apiVersion 1.0.0
 * @apiPermission admin
 * 
 * @apiHeader {String} Authorization Token JWT de administrador
 * 
 * @apiParam {Number} id ID único del producto a eliminar
 * 
 * @apiSuccess {String} message Mensaje de confirmación
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Producto eliminado exitosamente"
 *     }
 */
router.delete('/:id', authenticate, authorize('admin'), deleteProduct);

/**
 * @api {get} /products/admin/purchases Obtener todas las compras (Admin)
 * @apiName GetAllPurchases
 * @apiGroup Productos
 * @apiVersion 1.0.0
 * @apiPermission admin
 * 
 * @apiHeader {String} Authorization Token JWT de administrador
 * 
 * @apiSuccess {Object[]} purchases Lista de todas las compras
 * @apiSuccess {Number} purchases.id ID de la compra
 * @apiSuccess {String} purchases.purchase_date Fecha de la compra
 * @apiSuccess {Number} purchases.total_amount Monto total
 * @apiSuccess {Object} purchases.User Datos del cliente
 * @apiSuccess {Object[]} purchases.PurchaseItems Items de la compra
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "id": 1,
 *         "purchase_date": "2024-01-01T10:30:00.000Z",
 *         "total_amount": 925.50,
 *         "User": {
 *           "id": 2,
 *           "name": "Pedro Coral",
 *           "email": "pcoral@email.com"
 *         },
 *         "PurchaseItems": [
 *           {
 *             "id": 1,
 *             "quantity": 1,
 *             "unit_price": 850.00,
 *             "subtotal": 850.00,
 *             "Product": {
 *               "id": 1,
 *               "name": "Laptop HP",
 *               "sku": "TEST-001"
 *             }
 *           }
 *         ]
 *       }
 *     ]
 */
router.get('/admin/purchases', authenticate, authorize('admin'), getAllPurchases);

module.exports = router;