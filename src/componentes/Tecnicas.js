import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import BackToHomeButton from "./BackToHomeButton";

const Tecnicas = () => {
  return (
    <div>
      <div className="container-fluid mt-3">
        <div className="row">
          {/* Sidebar */}
          <nav
            id="sidebarMenu"
            className="col-md-3 col-lg-2 d-md-block bg-dark sidebar collapse "
          >
            <div className="position-sticky">
              <ul className="nav flex-column mt-5">
                <li className="nav-item">
                  <a className="nav-link" href="#oleo">
                    Óleo
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#acrilico">
                    Acrílico
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#vinilo">
                    Vinilo
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#carboncillo">
                    Carboncillo
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#tizas">
                    Tizas Pastel
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          {/* Main Content */}
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <button
              className="btn btn-secondary d-md-none mb-3"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#sidebarMenu"
              aria-controls="sidebarMenu"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="bi bi-list"></i> Toggle Sidebar
            </button>
            <div className="d-flex flex-column align-items-center">
              <h1 className="display-3 text-center fw-bold mb-5">Técnicas</h1>

              {/* Técnica Óleo */}
              <section id="oleo" className="mb-5">
                <div className="card">
                  <img
                    src="/img/t-oleo.webp"
                    className="card-img-top"
                    alt="Óleo"
                    style={{ width: "1040px", height: "400px" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">Óleo</h5>
                    <p className="card-text">
                      El óleo es una técnica de pintura que utiliza pigmentos
                      mezclados con aceites. Es conocida por su capacidad de
                      crear detalles y su durabilidad.
                    </p>
                    <h6>¿Cómo se emplea?</h6>
                    <p>
                      Se aplica sobre lienzo, madera o paneles, utilizando
                      pinceles, espátulas y otros utensilios.
                    </p>
                    <h6>¿Qué se necesita?</h6>
                    <p>
                      Pigmentos de óleo, aceites (como aceite de linaza),
                      lienzos o paneles, pinceles, y medios para mezclar.
                    </p>
                  </div>
                </div>
              </section>

              {/* Técnica Acrílico */}
              <section id="acrilico" className="mb-5">
                <div className="card">
                  <img
                    src="/img/t-acrilico.jpg"
                    className="card-img-top"
                    alt="Acrílico"
                    style={{ width: "1040px", height: "400px" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">Acrílico</h5>
                    <p className="card-text">
                      La pintura acrílica es conocida por su rápido secado y su
                      versatilidad, pudiendo imitar acuarelas, óleos y otros
                      estilos.
                    </p>
                    <h6>¿Cómo se emplea?</h6>
                    <p>
                      Se puede aplicar en lienzo, madera, papel y otros soportes
                      usando pinceles, espátulas, o incluso directamente con las
                      manos.
                    </p>
                    <h6>¿Qué se necesita?</h6>
                    <p>
                      Pinturas acrílicas, pinceles, paletas para mezclar, agua
                      para diluir y diversos soportes como lienzo o papel.
                    </p>
                  </div>
                </div>
              </section>

              {/* Técnica Vinilo */}
              <section id="vinilo" className="mb-5">
                <div className="card">
                  <img
                    src="/img/t-vinilo.jpg"
                    className="card-img-top"
                    alt="Vinilo"
                    style={{ width: "1040px", height: "400px" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">Vinilo</h5>
                    <p className="card-text">
                      La pintura vinílica es similar al acrílico, pero con una
                      base de acetato de polivinilo. Es muy utilizada en la
                      decoración mural.
                    </p>
                    <h6>¿Cómo se emplea?</h6>
                    <p>
                      Se aplica generalmente en paredes y grandes superficies
                      utilizando rodillos, pinceles y aerosoles.
                    </p>
                    <h6>¿Qué se necesita?</h6>
                    <p>
                      Pintura vinílica, rodillos, pinceles, cintas adhesivas
                      para delimitar áreas, y agua para limpiar.
                    </p>
                  </div>
                </div>
              </section>

              {/* Técnica Carboncillo */}
              <section id="carboncillo" className="mb-5">
                <div className="card">
                  <img
                    src="/img/t-carbon.png"
                    className="card-img-top"
                    alt="Carboncillo"
                    style={{ width: "1040px", height: "400px" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">Carboncillo</h5>
                    <p className="card-text">
                      El carboncillo es una técnica de dibujo que utiliza
                      varillas de carbón. Es muy apreciada por sus tonos
                      profundos y la capacidad de sombreado.
                    </p>
                    <h6>¿Cómo se emplea?</h6>
                    <p>
                      Se utiliza sobre papel o lienzo, y es ideal para bocetos
                      rápidos y dibujos detallados.
                    </p>
                    <h6>¿Qué se necesita?</h6>
                    <p>
                      Carboncillo, papel especial para carboncillo, goma de
                      borrar maleable, fijador para carboncillo.
                    </p>
                  </div>
                </div>
              </section>

              {/* Técnica Tizas Pastel */}
              <section id="tizas" className="mb-5">
                <div className="card">
                  <img
                    src="/img/t-tizas.jpg"
                    className="card-img-top"
                    alt="Tizas Pastel"
                    style={{ width: "1040px", height: "400px" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">Tizas Pastel</h5>
                    <p className="card-text">
                      Las tizas pastel son utilizadas para crear obras con
                      colores vibrantes y texturas suaves. Es una técnica ideal
                      para retratos y paisajes.
                    </p>
                    <h6>¿Cómo se emplea?</h6>
                    <p>
                      Se aplica sobre papel rugoso o liso, permitiendo mezclas
                      de colores con los dedos o herramientas especiales.
                    </p>
                    <h6>¿Qué se necesita?</h6>
                    <p>
                      Tizas pastel, papel para pasteles, fijador para pasteles,
                      y herramientas de mezcla como difuminos o esfuminos.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </main>
        </div>
      </div>
      <BackToHomeButton />
      <br />
    </div>
  );
};

export default Tecnicas;
