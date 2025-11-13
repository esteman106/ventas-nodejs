# Documentación de la API de Inventario

## Introducción

Bienvenido a la documentación de la API del Sistema de Inventario. Esta API permite gestionar usuarios, productos y compras con autenticación JWT y control de roles.

## Características Principales

- **Autenticación JWT**: Seguridad mediante tokens
- **Control de Roles**: Administrador y Cliente
- **Gestión de Inventario**: CRUD completo de productos
- **Sistema de Compras**: Proceso de compra con validación de stock
- **Documentación Interactiva**: Esta documentación generada con APIDoc

## Roles del Sistema

### Administrador
- Gestionar productos (crear, editar, eliminar)
- Ver todas las compras del sistema
- Acceso completo al inventario

### Cliente
- Ver productos disponibles
- Realizar compras
- Ver historial de sus compras

## Autenticación

La API utiliza autenticación JWT (JSON Web Token). Para acceder a endpoints protegidos, incluye el token en el header:

```http
Authorization: Bearer <tu_token_jwt>
Enpoint:  http://localhost:3000/api
```