# Sistema de Ventas - API REST

Sistema de gestión de ventas desarrollado con Node.js, Express, Sequelize y MySQL. Incluye autenticación JWT, control de roles (Admin/Cliente) y API REST completa.

🚀 Características
 
    Autenticación JWT - Seguridad con tokens

    Control de Roles - Administrador y Cliente
    
    Gestión de Productos - CRUD completo de inventario

    Sistema de Compras - Proceso de compra con validación de stock

    Reportes - Historial de compras y facturas

    Documentación API - Documentación interactiva con APIDoc

    Base de Datos MySQL - Con Sequelize ORM

🛠️ Tecnologías

    Backend: Node.js + Express.js

    Base de Datos: MySQL + Sequelize ORM

    Autenticación: JWT + bcryptjs

    Documentación: APIDoc

    Variables de Entorno: dotenv

📋 Prerrequisitos

    Node.js (v14 o superior)

    MySQL (v5.7 o superior)

    npm

⚙️ Instalación
1. Clonar o Descargar el Proyecto
```bash
# Si tienes el código en un repositorio
git clone https://github.com/esteman106/ventas-nodejs ventas
cd ventas

# O si tienes los archivos directamente
mkdir ventas
cd ventas
# Copia todos los archivos aquí
```

2. Configurar Variables de Entorno

Renombra el archivo .env.example a .env y reemplaza los datos por tu base de datos y genera un token para JWT.

3. Configurar Base de Datos (Opción Automática)

# Crear tablas y datos de prueba
npm run db:reset

🚀 Ejecución
Desarrollo
```bash

npm run dev
```
Producción
```bash

npm start
```

El servidor estará en: http://localhost:3000

📚 Documentación de la API
Generar Documentación
bash

# Generar documentación
npm run doc

# Generar y servir documentación
npm run doc:serve

La documentación estará disponible en: http://localhost:8080

Endpoints Principales
Autenticación

    POST /api/auth/register - Registrar usuario

    POST /api/auth/login - Iniciar sesión

Productos

    GET /api/products - Listar productos (Público)

    GET /api/products/:id - Obtener producto (Público)

    POST /api/products - Crear producto (Admin)

    PUT /api/products/:id - Actualizar producto (Admin)

    DELETE /api/products/:id - Eliminar producto (Admin)

Compras

    POST /api/purchases - Realizar compra (Cliente)

    GET /api/purchases/history - Historial de compras (Cliente)

    GET /api/purchases/:id - Obtener compra específica (Cliente)

Administración

    GET /api/products/admin/purchases - Todas las compras (Admin)