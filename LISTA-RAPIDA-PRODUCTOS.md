# Lista rápida de productos — Fundas Stock

Se agregó el botón **📋 Lista rápida** visible para administración.

## Funciones
- Búsqueda por nombre, categoría, URL/slug y modelo.
- Edición en una tabla de costo, precio de venta, precio mayorista y stock por modelo.
- Guardado por fila en Firebase Firestore.
- Validación de precios no negativos y unidades enteras no negativas.
- No modifica fotos, identificadores de Tiendanube, ni otros campos del producto.

## Formato de stock
Separá variantes con comas y usá `Modelo:unidades` para cada una.
Ejemplo: `iPhone 15:10, iPhone 16:5`.
Para producto sin variantes: `Único:10`.

## Publicar
Reemplazá los archivos del repositorio por los de esta carpeta y hacé commit/push. Vercel hará el deploy automáticamente si el repositorio está conectado. Después iniciá sesión como administrador y abrí **📋 Lista rápida**.
