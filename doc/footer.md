# Información Adicional

## Ejemplos de Uso

### 1. Registro de Usuario
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Pedro Coral",
    "email": "pcoral@email.com",
    "password": "123456",
    "role": "client"
  }'
```
### 2. Login de Usuario
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "pcoral@email.com",
    "password": "123456"
  }'
```
### 3. Crear Producto

```bash
curl -X GET http://localhost:3000/api/products
```
### 4. Crear Producto (Admin)
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <token_admin>" \
  -d '{
    "sku": "TEST-123",
    "name": "Producto demo",
    "price": 25.00,
    "quantityAvailable": 5
  }'
```
### 5. Estructura de Respuesta
```json
{
  "message": "Mensaje descriptivo",
  "data": { ... } // Datos opcionales
}
```

### Caso de error

```json
{
  "error": "Descripción del error"
}
```

## 6. Scripts de Generación

**Agregar al package.json**:
```json
{
  "scripts": {
    "doc": "apidoc -i routes/ -o apidoc/ -f .js --config apidoc.json",
    "doc:serve": "npm run doc && npx http-server apidoc/ -p 8080 -o",
    "doc:watch": "nodemon --watch routes/ --ext js --exec \"npm run doc\""
  }
}
```