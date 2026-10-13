# Web Gallery: revisión y plan de mejoras

Revisión del 13/10/2026. Se recorrió el sitio compilado en un navegador real (Edge headless), en escritorio (1280px) y móvil (375px), con la misma política de seguridad (CSP) que se aplicará en Netlify.

**Estado actual:** las 10 rutas cargan, sin imágenes rotas, sin errores de consola y sin desbordes en móvil. El build de producción y el test pasan.

---

## 1. Lo que ya se corrigió

### Enlaces y navegación

| Problema | Corrección |
| --- | --- |
| Los enlaces del footer (`/tecnicas`, `/categorias`, `/nosotros`) mostraban una página en blanco porque las rutas reales eran `/Tecnicas.js`, etc. | Rutas limpias: `/tecnicas`, `/categorias`, `/nosotros`, `/categorias/oleo`, `/categorias/tizas-pastel`... |
| La página Categorías generaba enlaces como `/Categorias.js/categorias/Oleo.js` (rutas relativas `./`). | Todos los enlaces son absolutos. |
| El menú desplegable de la navbar decía "Técnicas" (duplicado) y era un `<Link>` sin destino. | Ahora dice "Categorías" y es un `<button>`. |
| Íconos de Facebook/Twitter/Instagram apuntaban a la misma página. | Reemplazados por un enlace a GitHub (`rel="noopener noreferrer"`). |
| Una URL inexistente mostraba la página vacía. | Nueva página 404 ([NotFound.js](src/componentes/NotFound.js)). |
| Las URLs antiguas `*.js` dejarían de funcionar. | Redirecciones 301 en [netlify.toml](netlify.toml). |

### Visual y responsive

- Técnicas: imágenes con ancho fijo de 1040px desbordaban 334px en móvil. Ahora ocupan el ancho disponible con `object-fit: cover`.
- Inicio: las filas de categorías desbordaban 12px en móvil (`.row` sin contenedor).
- Carrusel: el texto "Técnicas" estaba repetido 3 veces con `id` duplicado; quedó uno solo.
- Galerías: imágenes recortadas uniformemente (`object-fit: cover`) y con carga diferida (`loading="lazy"`).
- Ícono del botón "Menú de técnicas" (Bootstrap Icons) no se veía porque faltaba importar su CSS.

### Código y textos

- `class=` → `className=` en Inicio (React lo marcaba como inválido); se quitaron `role="buttom"` y la clase basura `width: 18rem;`.
- Ortografía: *deguir → seguir, taleento → talento, encontraras → encontrarás, Aqui → Aquí, galeria → galería, Acrilico → Acrílico, Categorias → Categorías, Bienvenido! → ¡Bienvenido!*. Botón del modal "Close" → "Cerrar".
- Año del footer dinámico.
- `index.html`: meta descripción, Open Graph, `theme-color`, manifest y `<noscript>` en español.
- `manifest.json`: nombre real de la app (antes "Create React App Sample") e ícono existente.
- El test por defecto de CRA fallaba (buscaba "learn react"); ahora valida la página de inicio.
- React Router con *future flags* de v7 activados.

### Seguridad

- `react-router-dom` 6.24.1 → 6.30.6.
- `npm audit fix`: se eliminaron las 4 vulnerabilidades críticas.
- [netlify.toml](netlify.toml) añade cabeceras: CSP estricta (`script-src 'self'`), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`, y caché de un año para `/static/*`.
- Se revisó el código y el historial de git: no hay claves, tokens ni archivos `.env`, ni uso de `dangerouslySetInnerHTML`/`eval`.

---

## 2. Pendiente: proyecto

### Prioridad alta

1. **Datos de contacto ficticios.** El footer muestra `contacto@webgallery.com` y `+123 456 789`. Reemplázalos por datos reales o quítalos; en un portafolio, datos falsos restan credibilidad.
2. **Derechos de las imágenes.** Si las obras se descargaron de internet, publicarlas puede infringir derechos de autor. Usa imágenes de dominio público o con licencia libre (p. ej. [Unsplash](https://unsplash.com), [Wikimedia Commons](https://commons.wikimedia.org), las colecciones abiertas del [Met](https://www.metmuseum.org/art/collection) o del [Rijksmuseum](https://www.rijksmuseum.nl/en/rijksstudio)) y cita autor y fuente en cada obra.
3. **Peso de imágenes: 10 MB en `public/img`.** `oleo.jpg` pesa 1,9 MB y se muestra a 280px de alto. Convierte todo a WebP/AVIF a ~1600px máx. (galería) y ~600px (miniaturas): la carga bajaría a menos de 2 MB. Herramienta: [Squoosh](https://squoosh.app) o `sharp`.
4. **Marcas de agua.** Al menos `oleo2.jpg` tiene la marca de agua de un banco de imágenes de pago: es la primera a reemplazar (ver punto 2).

### Prioridad media

5. **Migrar de Create React App a Vite.** CRA está abandonado oficialmente; es la causa de las ~100 alertas restantes de `npm audit` (todas en herramientas de build, no llegan al navegador del visitante). Vite da builds más rápidos y elimina esas alertas.
6. **React Router v7.** Las 2 alertas restantes de `react-router` (open redirect con `\` en `<Link>`, y una de SSR) **no aplican** a este sitio porque todos los destinos están escritos en el código, pero se cierran del todo al migrar a v7 (los *future flags* ya están activos).
7. **Datos centralizados.** Las 5 páginas de categoría son casi idénticas. Un único componente `Categoria` + un archivo `obras.js` con los datos (título, técnica, autor, año, imagen) reduce código y facilita agregar obras.
8. **Dependencias sin uso.** `react-scroll` y `@popperjs/core` (Bootstrap ya lo incluye) no se usan. Bootstrap CSS se importa en 11 archivos; basta con `index.js`.
9. **Imágenes sin uso:** `acrilic_02.jpg`, `inicio.jpg`.
10. **`/categorias`** es una lista básica sin estilos; dale el mismo diseño de tarjetas del inicio o quítala del footer.
11. **Más tests:** navegación entre rutas, apertura/cierre del modal y la página 404.

---

## 3. Pendiente: visual y UX

1. **Identidad visual.** Hoy es Bootstrap por defecto. Define una paleta (p. ej. fondo crema/hueso y un color de acento) y una tipografía con carácter para títulos (*Playfair Display*, *Cormorant*) con una sans limpia para texto (*Inter*). Una galería de arte se beneficia de mucho espacio en blanco y poco "ruido".
2. **Galería tipo *masonry*.** Las obras tienen proporciones distintas; recortarlas a 400px de alto corta los cuadros. Un layout de columnas (CSS `columns` o `grid` con `grid-auto-flow: dense`) muestra la obra completa.
3. **Lightbox mejorado.** En el modal, añade navegación anterior/siguiente (flechas y teclado), y ficha de la obra: título, artista, año, técnica, medidas.
4. **Pies de foto reales.** "Obra en Óleo 1" no aporta; usa título y autor.
5. **Hover de tarjetas.** `scale(1.05)` en todas las `.card` (incluidas las de Técnicas, de ancho completo) se siente brusco. Prueba sombra + `translateY(-4px)`, solo en tarjetas clicables, y respeta `prefers-reduced-motion`.
6. **Hero del inicio.** La imagen de fondo de toda la página compite con el contenido. Mejor un hero a pantalla completa con overlay oscuro, el título y un botón "Explorar la galería".
7. **Navbar.** Logo de 80px de alto ocupa mucho en móvil; reducir a ~48px. Marcar el enlace de la página actual con `NavLink` (estado activo). Cerrar el menú hamburguesa al navegar.
8. **Técnicas.** La barra lateral oscura con texto blanco no tiene contraste con su fondo en hover (texto negro sobre blanco aparece como un "botón" suelto). Convierte la página en tarjetas alternadas imagen/texto o en pestañas.
9. **Carrusel.** No avanza solo (`data-bs-ride="carousel"`) y el texto con `text-bg-light` sobre la imagen es difícil de leer; usar un overlay degradado.
10. **Accesibilidad.** Imágenes clicables de la galería deben ser `<button>` para poder abrirlas con teclado; textos `alt` descriptivos; revisar contraste (WCAG AA) del texto gris sobre imágenes.
11. **Modo oscuro.** Bootstrap 5.3 lo soporta con `data-bs-theme="dark"`; un selector claro/oscuro luce bien en portafolio.
12. **Página Nosotros** muy corta: añade misión, cómo enviar obras (un formulario con [Netlify Forms](https://docs.netlify.com/forms/setup/) es gratis y no requiere backend) y créditos.

---

## 4. Despliegue en Netlify

Sitio: **<https://proyectowebgallery.netlify.app/>**. El archivo [netlify.toml](netlify.toml) define el comando de build, la carpeta `build`, Node 20, las redirecciones SPA y las cabeceras.

1. En [app.netlify.com](https://app.netlify.com) → sitio `proyectowebgallery` → **Site configuration → Build & deploy → Continuous deployment**, confirma que está enlazado al repo `Luacm00/Proyecto_WebGallery`, rama `master`. Si se subió arrastrando la carpeta (deploy manual), usa **Link repository** para enlazarlo.
2. Con el repo enlazado, cada `git push` a `master` redespliega automáticamente y cada Pull Request genera una URL de vista previa.
3. Verifica tras el deploy:
   - Recargar en `/tecnicas` o `/categorias/oleo` no da 404.
   - `/Tecnicas.js` redirige a `/tecnicas`.
   - [securityheaders.com](https://securityheaders.com) con tu URL debería dar nota A.
   - [PageSpeed Insights](https://pagespeed.web.dev) para medir rendimiento (mejorará mucho al optimizar las imágenes).

---

## 5. Para el portafolio de GitHub

1. ~~README nuevo~~ (hecho: demo, capturas en `docs/`, tecnologías, instrucciones). Pendiente: actualizar las capturas cuando cambie el diseño, y añadir el badge de estado de Netlify (**Site configuration → Status badges**).
2. **"About" del repo:** descripción corta, URL de Netlify en *Website* y *topics*: `react`, `bootstrap`, `react-router`, `gallery`, `netlify`, `portfolio`.
3. **Fijar (pin)** el repo en tu perfil de GitHub.
4. **Commits claros** en adelante (p. ej. `fix: rutas del footer`, `feat: página 404`); quien revise tu código mira el historial.
5. **Nombre del repo:** `web-gallery` es más estándar que `Proyecto_WebGallery`. GitHub redirige el nombre viejo automáticamente; si lo cambias, actualiza el remote con `git remote set-url`.
