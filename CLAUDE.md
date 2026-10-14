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
- **Iconos:** sprite SVG al inicio del `<body>` de `index.html`, con trazos de Font Awesome Free 6.5.0 (CC BY 4.0; la atribución va en el comentario del sprite). Para agregar uno: copiar el `<path>` y el `viewBox` de `svgs/solid/<nombre>.svg` del paquete `@fontawesome/fontawesome-free@6.5.0` en un `<symbol id="i-<nombre>">`, y usarlo con `<svg class="icono" viewBox="..." aria-hidden="true" focusable="false"><use href="#i-<nombre>"></use></svg>`. No volver a cargar Font Awesome desde un CDN.
- **Formulario de contacto:** no guarda datos; arma el mensaje y abre WhatsApp. La validación y el envío están en `script.js`, sin `onclick` ni `alert()`.
- **Cabeceras de seguridad:** `_headers` define la CSP. No usar `<script>` en línea, `style=""` ni `onclick`; los estilos van en `styles.css` y el JS en `script.js`. Si se agrega un servicio externo (fuentes, scripts, analítica), permitirlo en la CSP y mencionarlo en la sección 4 de `privacidad.html`.
- **Recuadro "Powered by Netlify":** el plan no permite quitarlo. La CSP lo permite con el hash de su `<script>` y con `'unsafe-inline'` solo en `style-src-elem` (decisión del usuario el 2026-10-13; los detalles están en el comentario de `_headers`). Si la consola vuelve a mostrar un bloqueo de `script-src` con un hash nuevo, Netlify actualizó su script: reemplazar el hash en `_headers`.
- **arquitectura.html:** detalle técnico para el jurado del SENA. Cada afirmación se verificó contra el código de `tennix-shop` (solo lectura) el 2026-10-13; si Tennix cambia (dependencias, rutas, límites, backups), actualizar esta página.
- **404.html:** Netlify la sirve en cualquier URL inexistente, también en subcarpetas; por eso usa rutas absolutas (`/styles.css`).
- **Logo:** las páginas usan `img/logo-icono.webp` (120px de alto). `img/Logo-icono.png` es el original, para regenerar íconos; no cargarlo en las páginas.
- Paleta: azul oscuro `#03045e`, azul `#0077b6`, celeste `#00b4d8` (variables en `:root` de `styles.css`).
- Datos de contacto: WhatsApp +57 304 290 7179, metcommerce1@gmail.com, San Pedro de los Milagros (Antioquia).
