import React from "react";
import ImageGallery from "../ImageGallery";
import "bootstrap/dist/css/bootstrap.min.css";
import BackToHomeButton from "../BackToHomeButton";

const Acrilico = () => {
    const acrilicoImages = [
        {src: "/img/acrilico1.webp", caption: "Obra en Acrílico 1"},
        {src: "/img/acrilico2.avif", caption: "Obra en Acrílico 2"},
        {src: "/img/acrilico3.webp", caption: "Obra en Acrílico 3"},
        {src: "/img/acrilico4.jpg", caption: "Obra en Acrílico 4"},
        {src: "/img/acrilico5.webp", caption: "Obra en Acrílico 5"},
        {src: "/img/acrilico6.jpg", caption: "Obra en Acrílico 6"}
    ];

    return(
        <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-body-tertiary">
            <h1 className="display-3 fw-bold">Técnica de Acrílico</h1>
            <p>Galería de obras en acrílico.</p>
            <ImageGallery images={acrilicoImages} />
            <BackToHomeButton />
        </div>
    )
}

export default Acrilico;