# MetCommerce — sitio corporativo

Página corporativa de MetCommerce, publicada en https://metcommerce.netlify.app. MetCommerce es una plataforma SaaS que ayuda a pequeños negocios locales a digitalizar sus ventas y su inventario. Es el proyecto de grado del SENA del autor, pero se presenta como un producto real y profesional. Todo el sitio, el código, los comentarios y los commits van en español.

## Repositorio y despliegue

- **Este repo:** `mateocb1228/metcommerce-web`, en `C:\Users\matte\OneDrive\Desktop\metcommerce-web`.
- **No confundir** con `Desktop\Metcommerce` (`mateocb1228/Metcommerce`, repo viejo con una copia desactualizada de este sitio en `metcommerce-web/`) ni con `Desktop\tennix-shop` (la tienda). No editar ninguno de los dos desde aquí.
- **Netlify publica `main` automáticamente.** Un push a `main` es un despliegue a producción: pedir confirmación antes de cada push.
- Sitio estático sin build: `index.html`, `styles.css`, `script.js` e `img/`. Para probar en local basta abrir `index.html` o servir la carpeta con cualquier servidor estático.

## Modelo de negocio (lo que el sitio debe comunicar)

- MetCommerce cobra **implementación única + mensualidad de mantenimiento**. No es "software a medida de pago único". No afirmar qué cubre la mensualidad (hosting, dominio, etc.) hasta que el usuario lo defina.
- **Planes** (definidos por el usuario el 2026-10-13):
  - **Básico:** $800.000 COP de implementación + $50.000/mes. Tienda en línea, catálogo, carrito y panel básico.
  - **Completo:** $1.500.000 COP de implementación + $80.000/mes. Todo lo del Básico más pagos con Mercado Pago, correos automáticos, backups diarios y soporte prioritario.
  - En el Básico no hay pagos en línea: el cliente hace el pedido y coordina el pago directamente con el negocio.
  - **Sin definir todavía:** qué cubre la mensualidad (hosting, dominio), permanencia mínima, tiempo de implementación y cambio de plan. No afirmarlos en el sitio.
- En "Sobre nosotros" se menciona que MetCommerce nace como proyecto de grado del SENA. La política de privacidad identifica al responsable solo como "MetCommerce", sin NIT; así lo decidió el usuario.
- **Tennix Shop** es la tienda demo propia del autor, creada para mostrar lo que MetCommerce puede hacer. Se presenta como "tienda demo en producción", no como cliente ni como "proyecto demo" de maqueta.

## Tennix Shop: qué se puede afirmar

Solo funciones reales, verificables en https://tennix-shop.com:

- Tienda en línea en producción, con panel de administración (admin.tennix-shop.com) y API propia (Node + Express + MySQL).
- Catálogo con colores y tallas; cada talla se marca como disponible o agotada.
- Carrito y checkout; pagos con Mercado Pago Checkout Pro.
- Correos automáticos: pedido recibido, pago aprobado y despacho con número de guía.
- Dashboard de ventas en el panel.
- Backups diarios de la base de datos enviados por correo.
- Imágenes optimizadas en WebP y cabeceras de seguridad con CSP.

**No afirmar:**

- Que el inventario o el stock se descuenta solo con cada venta: los pedidos **no** descuentan stock; el admin marca las tallas agotadas.
- Estadísticas sin respaldo (número de negocios, % de reducción de errores, horas de implementación, etc.).
- Testimonios de clientes o pilotos que no existen.

## Plan de mejoras

1. **Credibilidad:** caso de Tennix real con capturas actuales y enlace a tennix-shop.com; quitar estadísticas, testimonios y funciones inventadas.
2. **Aspecto de SaaS:** planes (implementación + mensualidad), módulos, preguntas frecuentes, sobre nosotros y política de privacidad.
3. **Pulido técnico:** favicon, Open Graph, robots.txt, sitemap, labels en el formulario, sin `alert()` ni `onclick` en el HTML, e iconos propios en lugar de Font Awesome completo desde CDN.

## Convenciones

- Sin atribución de IA en commits ni archivos: nada de `Co-Authored-By` ni comentarios de "generado por".
- Comentarios en español, con la densidad del código existente. Nombres de clases y funciones en español (`servicio-card`, `enviarFormulario`).
- Paleta: azul oscuro `#03045e`, azul `#0077b6`, celeste `#00b4d8` (variables en `:root` de `styles.css`).
- Datos de contacto: WhatsApp +57 304 290 7179, metcommerce1@gmail.com, San Pedro de los Milagros (Antioquia).
