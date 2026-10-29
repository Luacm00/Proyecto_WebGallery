import React from "react";
import { Link } from "react-router-dom";
import SessionBadge from "../auth/SessionBadge";
import { useCategories } from "../catalogo/queries";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src="/wgallery.png"
            alt="Web Gallery"
            width="auto"
            height="80"
            style={{ borderRadius: "55px" }}
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarScroll"
          aria-controls="navbarScroll"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarScroll">
          <ul
            className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll"
            style={{ maxHeight: "100px" }}
          >
            <li className="nav-item">
              <Link className="nav-link btn btn-outline-dark me-2" to="/">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link btn btn-outline-dark me-2"
                to="/tecnicas"
              >
                Técnicas
              </Link>
            </li>
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle btn btn-outline-dark me-2"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categorías
              </button>
              <ul className="dropdown-menu">
                <CategoriasMenu />
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link btn btn-outline-dark" to="/nosotros">
                Nosotros
              </Link>
            </li>
          </ul>
          <SessionBadge />
        </div>
      </div>
    </nav>
  );
};

function CategoriasMenu() {
  const { data: categorias, isPending, isError } = useCategories();

  if (isPending) {
    return (
      <li>
        <span className="dropdown-item disabled">Cargando...</span>
      </li>
    );
  }
  // Si la API falla, el menú no queda vacio: lleva a la página de categorias.
  if (isError) {
    return (
      <li>
        <Link className="dropdown-item" to="/categorias">
          Ver categorías
        </Link>
      </li>
    );
  }
  return categorias.map((c) => (
    <li key={c.slug}>
      <Link className="dropdown-item" to={`/categorias/${c.slug}`}>
        {c.name}
      </Link>
    </li>
  ));
}

export default Navbar;
