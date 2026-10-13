# Web Gallery

Galería de arte web hecha con React. Reúne obras en cinco técnicas (óleo, acrílico, vinilo, carboncillo y tizas pastel) y explica cada una: qué es, cómo se emplea y qué materiales necesita.

**Demo:** [proyectowebgallery.netlify.app](https://proyectowebgallery.netlify.app/)

![Página de inicio de Web Gallery](docs/inicio.webp)

## Funcionalidades

- Galería por técnica con visor de imagen ampliada (modal).
- Página de técnicas con navegación lateral a cada sección.
- Carrusel de técnicas y tarjetas de categorías en el inicio.
- Diseño responsive: navegación colapsable y galerías adaptadas a móvil.
- Rutas limpias con React Router, página 404 y redirecciones de URLs antiguas.
- Cabeceras de seguridad en producción (Content Security Policy, `X-Frame-Options`, `nosniff`, etc.).

## Capturas

| Galería | Técnicas | Móvil |
| --- | --- | --- |
| ![Galería de óleo](docs/galeria.webp) | ![Página de técnicas](docs/tecnicas.webp) | ![Vista móvil](docs/movil.webp) |

## Tecnologías

- [React 18](https://react.dev) (Create React App)
- [React Router 6](https://reactrouter.com)
- [Bootstrap 5](https://getbootstrap.com) y [React Bootstrap](https://react-bootstrap.github.io)
- Font Awesome y Bootstrap Icons
- [Netlify](https://www.netlify.com) para el despliegue continuo

## Ejecutar localmente

Requiere Node.js 18 o superior.

```bash
git clone https://github.com/Luacm00/Proyecto_WebGallery.git
cd Proyecto_WebGallery
npm install
npm start          # http://localhost:3000
```

| Comando | Descripción |
| --- | --- |
| `npm start` | Servidor de desarrollo con recarga automática. |
| `npm test` | Ejecuta los tests. |
| `npm run build` | Genera la versión de producción en `build/`. |

## Estructura

```text
public/
  img/                  Imágenes de las obras y técnicas
src/
  App.js                Definición de rutas
  componentes/
    Navbar.js, Footer.js
    Inicio.js           Página principal
    Tecnicas.js         Descripción de cada técnica
    ImageGallery.js     Cuadrícula de obras + ImageModal.js
    categorias/         Una página por técnica
netlify.toml            Build, redirecciones y cabeceras de seguridad
```

## Despliegue

El sitio se publica en Netlify automáticamente con cada push a `master`. La configuración está en [`netlify.toml`](netlify.toml).

## Próximos pasos

El plan de mejoras (rendimiento, diseño y accesibilidad) está en [MEJORAS.md](MEJORAS.md).

## Créditos

Las imágenes de las obras se usan con fines educativos y pertenecen a sus respectivos autores.

---

Hecho por [Luacm00](https://github.com/Luacm00).
