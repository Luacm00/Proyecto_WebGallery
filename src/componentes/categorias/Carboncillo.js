import React from "react";
import ImageGallery from "../ImageGallery";
import "bootstrap/dist/css/bootstrap.min.css";
import BackToHomeButton from "../BackToHomeButton";

const Carboncillo = () => {
    const carboncilloImages = [
        {src: "/img/carbon1.jfif", caption: "Obra en Carboncillo 1"},
        {src: "/img/carbon2.png", caption: "Obra en Carboncillo 2"},
        {src: "/img/carbon3.webp", caption: "Obra en Carboncillo 3"},
        {src: "/img/carbon4.jpg", caption: "Obra en Carboncillo 4"},
        {src: "/img/carbon5.jpg", caption: "Obra en Carboncillo 5"},
        {src: "/img/carbon6.jpg", caption: "Obra en Carboncillo 6"}
    ];

    return(
        <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-body-tertiary">
            <h1 className="display-3 fw-bold">Carboncillo</h1>
            <p>Galería de obras en carboncillo.</p>
            <ImageGallery images={carboncilloImages} />
            <BackToHomeButton />
        </div>
    )
}

export default Carboncillo;