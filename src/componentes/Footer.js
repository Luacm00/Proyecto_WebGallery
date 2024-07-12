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
              <Link to="#" className="text-light me-3">
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link to="#" className="text-light me-3">
                <i className="fab fa-twitter"></i>
              </Link>
              <Link to="#" className="text-light">
                <i className="fab fa-instagram"></i>
              </Link>
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
          <p>&copy; 2024 Web Gallery. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
