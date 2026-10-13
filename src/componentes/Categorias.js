import React from "react";
import { Link } from "react-router-dom";


const Categorias = () => {
    return (
        <div className="container mt-5">
            <h1>Categorías</h1>
            <ul>
                <li><Link to="/categorias/oleo">Óleo</Link></li>
                <li><Link to="/categorias/acrilico">Acrílico</Link></li>
                <li><Link to="/categorias/vinilo">Vinilo</Link></li>
                <li><Link to="/categorias/carboncillo">Carboncillo</Link></li>
                <li><Link to="/categorias/tizas-pastel">Tizas Pastel</Link></li>
            </ul>
        </div>
    )
}

export default Categorias;
