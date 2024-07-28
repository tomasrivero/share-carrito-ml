# Mi carrito

## Descripción

**Mi carrito** es una aplicación web desarrollada en Angular que permite a los usuarios armar una lista de productos de Mercado Libre y compartirlo con los demás 🛍️

Link: https://mlshare.netlify.app/

## Funcionalidades

- Añadir productos a la lista pegando enlaces de productos de ML.
- Visualizar la información del producto, incluyendo nombre, precio y la imagen del producto.
- Eliminar productos de la lista.
- Ver el precio total de los productos añadidos.

## Tecnologías

- **Angular 17**: Framework de desarrollo para construir la aplicación.
- **ngx-toastr**: Para notificaciones emergentes.

## Uso

1. **Añadir Productos:**
    - Para agregar productos deberías estar logeado en la aplicación de mercado libre para que el link al producto tenga el formato https://www.mercadolibre.com/[NOMBRE-DEL-PRODUCTO]/p/[ID-DEL-PRODUCTO]
    - Pegá el enlace del producto en el campo de entrada.
    - Hace click en el botón **"+"** para añadir el producto a la lista.

2. **Ver Detalles del Producto:**
    - Los productos añadidos se mostrarán en la lista con su nombre, imagen y precio.

3. **Eliminar Productos:**
    - Hace click en el icono de eliminar junto al producto que deseas quitar de la lista.

4. **Ver Precio Total:**
    - El precio total de todos los productos añadidos se mostrará al final de la lista.

5. **Compartir**
    - A medida que se van agregando productos, la pagina se actualiza con los ids de los productos para que cualquier persona pueda verlos


---