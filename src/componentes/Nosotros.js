import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import BackToHomeButton from "./BackToHomeButton";

const Nosotros = () => {
  return (
    <div>
      <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-body-tertiary background-image">
        <div className="col-md-6 p-lg-3 mx-auto my-1">
          <h2 className="display-3 fw-bold">Nosotros</h2>
          <br />
          <h5 className="fw-normal fst-italic text-muted mb-3">
            Somos una galería que busca impulsar el taleento de los que no
            pueden dar a mostrar sus obras a todo el público, además damos
            información sobre algunas técnicas de arte más vistas en nuestra
            galeria, esperamos disfrutes nuestro contenido!!
          </h5>
          <h6 className="fst-italic">Equipo de Web Gallery</h6>
        </div>
      </div>
      <BackToHomeButton />
      <br />
    </div>
  );
};

export default Nosotros;
