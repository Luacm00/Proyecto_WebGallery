import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <Link className="navbar-brand" to="/">
              <img
                src="/wgallery.png"
                alt="Web Gallery"
                width="auto"
                height="80"
                style={{ borderRadius: "55px" }}
              />
            </Link>
            <h6>Web Gallery</h6>
          </div>
          <div className="col-md-4">
            <h5>Enlaces Rápidos</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-light">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/tecnicas" className="text-light">
                  Técnicas
                </Link>
              </li>
              <li>
                <Link to="/categorias" className="text-light">
                  Categorías
                </Link>
              </li>
              <li>
                <Link to="/nosotros" className="text-light">
                  Nosotros
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Contacto</h5>
            <p>Email: contacto@webgallery.com</p>
            <p>Teléfono: +123 456 789</p>
            <div className="d-flex">
              <a
                href="https://github.com/Luacm00"
                className="text-light fs-4"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
          <p>&copy; {new Date().getFullYear()} Web Gallery. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
