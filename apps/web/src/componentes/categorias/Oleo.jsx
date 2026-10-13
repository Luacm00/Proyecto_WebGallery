import React from "react";
import ImageGallery from "../ImageGallery";
import "bootstrap/dist/css/bootstrap.min.css";
import BackToHomeButton from "../BackToHomeButton";

const oleoImages = [
  { src: "/img/oleo1.jpg", caption: "Obra en Óleo 1" },
  { src: "/img/oleo2.jpg", caption: "Obra en Óleo 2" },
  { src: "/img/oleo3.webp", caption: "Obra en Óleo 3" },
  { src: "/img/oleo4.webp", caption: "Obra en Óleo 4" },
  { src: "/img/oleo5.webp", caption: "Obra en Óleo 5" },
  { src: "/img/oleo6.jpg", caption: "Obra en Óleo 6" },
];

const Oleo = () => {
  return (
    <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-body-tertiary">
      <h1 className="display-3 fw-bold">Técnica de Óleo</h1>
      <p>Galería de obras en óleo.</p>
      <ImageGallery images={oleoImages} />
      <BackToHomeButton />
    </div>
  );
};

export default Oleo;
