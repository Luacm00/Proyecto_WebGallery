import React from "react";
import { Link } from "react-router-dom";


const Categorias = () => {
    return (
        <div className="container mt-5">
            <h1>Categorias</h1>
            <ul>
                <li><Link to="./categorias/Oleo.js">Óleo</Link></li>
                <li><Link to="./categorias/Acrilico.js">Acrilico</Link></li>
                <li><Link to="./categorias/Vinilo.js">Vinilo</Link></li>
                <li><Link to="./categorias/Carboncillo.js">Carboncillo</Link></li>
                <li><Link to="./categorias/TizasPastel.js">Tizas Pastel</Link></li>
            </ul>
        </div>
    )
}

export default Categorias;