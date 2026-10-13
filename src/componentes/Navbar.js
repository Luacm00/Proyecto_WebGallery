import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
        <img src="/wgallery.png" alt="Web Gallery" width="auto" height="80" style={{ borderRadius: '55px'}} />
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
              <Link className="nav-link btn btn-outline-dark me-2" to="/tecnicas">
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
                <li>
                  <Link className="dropdown-item" to="/categorias/oleo">
                    Óleo
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/categorias/acrilico">
                    Acrílico
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/categorias/vinilo">
                    Vinilo
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" to="/categorias/carboncillo">
                    Carboncillo
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/categorias/tizas-pastel">
                    Tizas Pastel
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link btn btn-outline-dark" to="/nosotros">
                Nosotros
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
