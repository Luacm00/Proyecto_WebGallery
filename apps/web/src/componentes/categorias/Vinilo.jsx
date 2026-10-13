import React from "react";
import ImageGallery from "../ImageGallery";
import "bootstrap/dist/css/bootstrap.min.css";
import BackToHomeButton from "../BackToHomeButton";

const Vinilo = () => {
    const viniloImages = [
        {src: "/img/vinilo1.jpg", caption: "Obra en Vinilo 1"},
        {src: "/img/vinilo2.jpg", caption: "Obra en Vinilo 2"},
        {src: "/img/vinilo3.jpg", caption: "Obra en Vinilo 3"},
        {src: "/img/vinilo4.jpg", caption: "Obra en Vinilo 4"},
        {src: "/img/vinil.jpg", caption: "Obra en Vinilo 5"},
        {src: "/img/vinilo6.jpg", caption: "Obra en Vinilo 6"}
    ];

    return(
        <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-body-tertiary">
            <h1 className="display-3 fw-bold">Vinilo</h1>
            <p>Galería de obras en vinilo.</p>
            <ImageGallery images={viniloImages} />
            <BackToHomeButton />
        </div>
    )
}

export default Vinilo;