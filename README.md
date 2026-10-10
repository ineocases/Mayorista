# Fundas Stock — catálogo y administración

Aplicación web estática con Firebase Authentication y Cloud Firestore.

## Nueva herramienta: catálogo de Tiendanube y fotos

Desde **Acceso Personal de Trabajo** (con una cuenta autenticada de Firebase), abrir el menú lateral y elegir **Sincronizar Tiendanube / Fotos**.

### Sincronizar catálogo
1. En Tiendanube, exportar el catálogo como CSV (también se aceptan XLS/XLSX).
2. Seleccionar el archivo en el administrador.
3. Revisar el resumen de productos nuevos y existentes.
4. Confirmar la sincronización.

Los productos se agrupan por identificador de URL y sus variantes se combinan. La sincronización actualiza nombre, categoría, costo, precio de venta, stock/variantes y guarda el identificador de Tiendanube y SKU cuando están disponibles. Se intenta encontrar productos existentes por identificador y, como alternativa, por nombre normalizado. Las fotos actuales y el precio mayorista de los productos existentes se conservan. No se eliminan productos que no estén en el CSV.

**Antes de la primera importación:** hacer una exportación de respaldo de los datos de Firestore. Revisar el resumen y probar primero con una exportación pequeña si la base contiene productos con nombres repetidos.

### Asignar fotos manualmente
1. En la misma herramienta, seleccionar un producto.
2. Seleccionar una o varias imágenes.
3. Revisar las miniaturas y pulsar **Subir y guardar fotos**.

Las imágenes se suben a ImgBB y se agregan a la galería existente del producto.

## Publicación
- Publicar los archivos del proyecto en el hosting habitual.
- `firebase.js` contiene la configuración del proyecto Firebase.
- Confirmar que Firebase Authentication tenga habilitado el proveedor Email/Password y que las reglas de Firestore permitan a usuarios autenticados autorizados modificar la colección `fundas`.
- La interfaz oculta las herramientas para sesiones anónimas, pero **la seguridad real debe aplicarse también en las reglas de Firestore**. No usar reglas abiertas a todo el público.

## Consideraciones de seguridad
El proyecto original incluye claves de servicios de terceros en código de navegador. Las claves que se usan desde el frontend pueden ser vistas por visitantes; restringirlas desde el proveedor o mover las operaciones sensibles a un backend/Cloud Function. No publicar credenciales privadas ni claves de servicio de Firebase Admin.
