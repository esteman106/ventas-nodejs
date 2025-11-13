const express = require('express');
const { 
  createPurchase, 
  getPurchaseHistory, 
  getPurchaseById 
} = require('../controllers/purchaseController');
const authenticate = require('../middleware/auth');
const authorize = require('../middleware/role');

const router = express.Router();

// Todas las rutas requieren autenticación
router.use(authenticate);

/**
 * @api {post} /purchases Realizar compra
 * @apiName CreatePurchase
 * @apiGroup Compras
 * @apiVersion 1.0.0
 * @apiPermission client
 * 
 * @apiHeader {String} Authorization Token JWT de cliente
 * 
 * @apiParam {Object[]} items Lista de productos a comprar
 * @apiParam {Number} items.productId ID del producto
 * @apiParam {Number} items.quantity Cantidad a comprar
 * 
 * @apiParamExample {json} Request-Example:
 *     {
 *       "items": [
 *         {
 *           "productId": 1,
 *           "quantity": 2
 *         },
 *         {
 *           "productId": 2,
 *           "quantity": 1
 *         }
 *       ]
 *     }
 * 
 * @apiSuccess {String} message Mensaje de confirmación
 * @apiSuccess {Object} purchase Datos de la compra realizada
 * @apiSuccess {Number} purchase.id ID de la compra
 * @apiSuccess {String} purchase.purchase_date Fecha de la compra
 * @apiSuccess {Number} purchase.total_amount Monto total
 * @apiSuccess {Object} purchase.User Datos del cliente
 * @apiSuccess {Object[]} purchase.PurchaseItems Items comprados
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "message": "Compra realizada exitosamente",
 *       "purchase": {
 *         "id": 1,
 *         "purchase_date": "2024-01-01T10:30:00.000Z",
 *         "total_amount": 925.50,
 *         "User": {
 *           "id": 2,
 *           "name": "Juan Pérez",
 *           "email": "juan@email.com"
 *         },
 *         "PurchaseItems": [
 *           {
 *             "quantity": 1,
 *             "unit_price": 850.00,
 *             "subtotal": 850.00,
 *             "Product": {
 *               "id": 1,
 *               "name": "Laptop HP",
 *               "batch_number": "LOTE-001"
 *             }
 *           }
 *         ]
 *       }
 *     }
 * 
 * @apiError (Error 400) {String} error Stock insuficiente
 * @apiError (Error 404) {String} error Producto no encontrado
 */
router.post('/', authorize('client'), createPurchase);

/**
 * @api {get} /purchases/history Obtener historial de compras
 * @apiName GetPurchaseHistory
 * @apiGroup Compras
 * @apiVersion 1.0.0
 * @apiPermission client
 * 
 * @apiHeader {String} Authorization Token JWT de cliente
 * 
 * @apiSuccess {Object[]} purchases Historial de compras del usuario
 * @apiSuccess {Number} purchases.id ID de la compra
 * @apiSuccess {String} purchases.purchase_date Fecha de la compra
 * @apiSuccess {Number} purchases.total_amount Monto total
 * @apiSuccess {Object[]} purchases.PurchaseItems Items de la compra
 * 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         "id": 1,
 *         "purchase_date": "2024-01-01T10:30:00.000Z",
 *         "total_amount": 925.50,
 *         "PurchaseItems": [
 *           {
 *             "quantity": 1,
 *             "unit_price": 850.00,
 *             "subtotal": 850.00,
 *             "Product": {
 *               "id": 1,
 *               "name": "Laptop HP",
 *               "price": 850.00
 *             }
 *           }
 *         ]
 *       }
 *     ]
 */
router.get('/history', authorize('client'), getPurchaseHistory);

/**
 * @api {get} /purchases/:id Obtener compra específica
 * @apiName GetPurchase
 * @apiGroup Compras
 * @apiVersion 1.0.0
 * @apiPermission client
 * 
 * @apiHeader {String} Authorization Token JWT de cliente
 * 
 * @apiParam {Number} id ID de la compra
 * 
 * @apiSuccess {Object} purchase Datos completos de la compra
 * @apiSuccess {Number} purchase.id ID de la compra
 * @apiSuccess {String} purchase.purchase_date Fecha de la compra
 * @apiSuccess {Number} purchase.total_amount Monto total
 * @apiSuccess {Object} purchase.User Datos del cliente
 * @apiSuccess {Object[]} purchase.PurchaseItems Items de la compra
 * 
 * @apiError (Error 404) {String} error Compra no encontrada
 */
router.get('/:id', authorize('client'), getPurchaseById);

module.exports = router;