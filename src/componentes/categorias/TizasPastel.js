import React from "react";
import ImageGallery from "../ImageGallery";
import "bootstrap/dist/css/bootstrap.min.css";
import BackToHomeButton from "../BackToHomeButton";

const TizasPastel = () => {
    const tizaspImages = [
        {src: "/img/tizap1.jpg", caption: "Obra en Tizas Pastel 1"},
        {src: "/img/tizap2.jpg", caption: "Obra en Tizas Pastel 2"},
        {src: "/img/tizap3.jpg", caption: "Obra en Tizas Pastel 3"},
        {src: "/img/tizap4.jpg", caption: "Obra en Tizas Pastel 4"},
        {src: "/img/tizap5.jpg", caption: "Obra en Tizas Pastel 5"},
        {src: "/img/tizap6.jpg", caption: "Obra en Tizas Pastel 6"}
    ];

    return(
        <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-body-tertiary">
            <h1 className="display-3 fw-bold">Tizas Pastel</h1>
            <p>Galería de obras en tizas pastel.</p>
            <ImageGallery images={tizaspImages} />
            <BackToHomeButton />
        </div>
    )
}

export default TizasPastel;