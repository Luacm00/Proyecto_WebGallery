import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "../App.css";

const Inicio = () => {
  return (
    <div className="inicio-background">
      {/*Seccion de Bienvenida*/}
      <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-body-tertiary background-image">
        <div className="col-md-6 p-lg-3 mx-auto my-1">
          <h1 className="display-3 fw-bold">WEB GALLERY</h1>
          <br />
          <h4 className="fw-normal fst-italic text-muted mb-3">
            "El pintor tiene el Universo en su mente, y en sus manos."
          </h4>
          <h5 className="fst-italic">Leonardo da Vinci</h5>
        </div>
      </div>

      <br />

      <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center custom-margin-bottom bienvenido-background">
        <div className="card border-0 bg-transparent">
          <div className="card-body">
            <h3 className="card-title">¡Bienvenido!</h3>
            <p className="card-text">
              Esperamos que seas un amante más del arte y disfrutes nuestro
              contenido, te invitamos a seguir explorando nuestras categorías
              para ver maravillosas obras de arte.
            </p>
          </div>
        </div>
      </div>

      <br />

      {/*Seccion de Tecnicas*/}
      <div className="contenedor-tecnicas">
        <div id="carouselTecnicas" className="carousel slide">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="/img/t1.jpg"
                className="d-block w-100 carousel-img-fixed"
                alt="Técnica: óleo"
              />
            </div>
            <div className="carousel-item">
              <img
                src="/img/t2.jpg"
                className="d-block w-100 carousel-img-fixed"
                alt="Técnica: Vinilo"
              />
            </div>
            <div className="carousel-item">
              <img
                src="/img/t3.jpg"
                className="d-block w-100 carousel-img-fixed"
                alt="Técnica: Carboncillo"
              />
            </div>
            <div id="tecnicas" className="carousel-caption d-none d-md-block">
              <h3 className="fw-bold text-black">Técnicas</h3>
              <p className="fw-medium text-bg-light">
                Aquí encontrarás información sobre las diferentes técnicas más
                usadas en nuestra galería.
              </p>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselTecnicas"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselTecnicas"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <div className="d-grid gap-2 d-md-flex my-2 justify-content-md-end">
          <Link className="btn btn-outline-dark" to="/tecnicas">
            Ver más
          </Link>
        </div>
      </div>

      <br />

      {/*Seccion de Categorias*/}
      <div className="contenedor-categorias container-fluid">
        <div className="col-md-12 p-lg-5 mx-auto my-3">
          <div id="categorias" className="mt-5">
            <h2 className="fw-bold">Categorías</h2>
            <p className="p-md-4">
              Aquí puedes explorar las diferentes categorías de arte que hay en
              nuestra galería.
            </p>
          </div>
        </div>
        <div className="row my-lg-3 p-3">
          <div className="col-sm-4 mb-3 mb-sm-0">
            <div className="card">
              <img
                src="/img/oleo.jpg"
                className="card-img-top card-img-fixed"
                alt="Óleo"
              />
              <div className="card-body">
                <p className="card-text">
                  Aquí encontrarás algunas obras empleando la técnica del óleo.
                </p>
                <Link to="/categorias/oleo" className="btn btn-outline-dark">
                  Ver más
                </Link>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card">
              <img
                src="/img/acril.webp"
                className="card-img-top card-img-fixed"
                alt="Acrílico"
              />
              <div className="card-body">
                <p className="card-text">
                  Aquí encontrarás algunas obras empleando la técnica del
                  acrílico.
                </p>
                <Link
                  to="/categorias/acrilico"
                  className="btn btn-outline-dark"
                >
                  Ver más
                </Link>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card">
              <img
                src="/img/vinil.jpg"
                className="card-img-top card-img-fixed"
                alt="Vinilo"
              />
              <div className="card-body">
                <p className="card-text">
                  Aquí encontrarás algunas obras empleando la técnica del
                  vinilo.
                </p>
                <Link
                  to="/categorias/vinilo"
                  className="btn btn-outline-dark"
                >
                  Ver más
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row my-lg-5 p-3">
          <div className="col-sm-4 mb-3 mb-sm-0">
            <div className="card">
              <img
                src="/img/carbon.avif"
                className="card-img-top card-img-fixed"
                alt="Carboncillo"
              />
              <div className="card-body">
                <p className="card-text">
                  Aquí encontrarás algunas obras empleando la técnica del
                  carboncillo.
                </p>
                <Link
                  to="/categorias/carboncillo"
                  className="btn btn-outline-dark"
                >
                  Ver más
                </Link>
              </div>
            </div>
          </div>
          <div className="col-sm-4">
            <div className="card">
              <img
                src="/img/tizas.jpg"
                className="card-img-top card-img-fixed"
                alt="Tizas Pastel"
              />
              <div className="card-body">
                <p className="card-text">
                  Aquí encontrarás algunas obras empleando la técnica de las
                  tizas pastel.
                </p>
                <Link
                  to="/categorias/tizas-pastel"
                  className="btn btn-outline-dark"
                >
                  Ver más
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
