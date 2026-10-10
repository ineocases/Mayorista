# Conectar Fundas Stock con Tiendanube

La sincronización consulta productos e imágenes de la tienda `6194482`. En la primera versión, actualiza solamente `foto` y `fotos` de los productos ya existentes en Firestore. No crea productos ni modifica stock, precios, variantes o costos.

## 1. Variables de entorno en Vercel

En Vercel → proyecto Fundas Stock → Settings → Environment Variables, agregá:

- `TIENDANUBE_ACCESS_TOKEN`: token privado de la aplicación instalada en la tienda 6194482.
- `TIENDANUBE_CONTACT_EMAIL`: email de contacto válido para identificar las solicitudes a la API.
- `TIENDANUBE_APP_NAME`: `Fundas Stock` (opcional).

No agregues el token a `app.js`, `index.html`, GitHub ni al ZIP público. Si el token estuvo expuesto, revocalo/renovalo antes de usarlo.

## 2. Permisos de la aplicación

La aplicación debe tener el permiso `read_products`. Si cambiás los permisos de una app OAuth, reinstalala/autorízala otra vez y asegurate de que el token actualizado esté en Vercel. Para una app a medida, generá una clave con permiso de lectura de productos.

## 3. Desplegar

Subí estos cambios al repositorio de GitHub conectado a Vercel. Confirmá que el proyecto esté configurado para servir archivos estáticos desde la raíz y funciones Node desde `api/`. Después de guardar las variables, hacé un nuevo deploy.

## 4. Probar

Entrá a Fundas Stock como administrador y usá **Sincronizar fotos TN**. Revisá el resumen antes de confirmar. Los productos sin coincidencia se muestran en la consola del navegador y no se modifican.

## Importante

La coincidencia usa identificador URL (handle/slug) y como alternativa el nombre normalizado. Si hay productos con nombres duplicados, revisá los resultados antes de confirmar. La función de sincronización no puede garantizar coincidencias perfectas si el catálogo de Firestore no guarda el handle correcto.
