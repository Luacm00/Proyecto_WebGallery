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
              <Link className="nav-link btn btn-outline-dark me-2" aria-current="page" to="/">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link btn btn-outline-dark me-2" aria-current="page" to="/Tecnicas.js">
                Técnicas
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle btn btn-outline-dark me-2"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Técnicas
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="./categorias/Oleo.js">
                    Óleo
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="./categorias/Acrilico.js">
                    Acrilico
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="./categorias/Vinilo.js">
                    Vinilo
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" to="./categorias/Carboncillo.js">
                    Carboncillo
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="./categorias/TizasPastel.js">
                    Tizas Pastel
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link btn btn-outline-dark" aria-current="page" to="./Nosotros.js">
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
