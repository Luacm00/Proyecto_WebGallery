import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./componentes/Navbar";
import Inicio from "./componentes/Inicio";
import Tecnicas from "./componentes/Tecnicas";
import Categorias from "./componentes/Categorias";
import Nosotros from "./componentes/Nosotros";
import Footer from "./componentes/Footer";
import Oleo from "./componentes/categorias/Oleo";
import Acrilico from "./componentes/categorias/Acrilico";
import Vinilo from "./componentes/categorias/Vinilo";
import Carboncillo from "./componentes/categorias/Carboncillo";
import TizasPastel from "./componentes/categorias/TizasPastel";

import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/Categorias.js" element={<Categorias />} />
            <Route path="/Tecnicas.js" element={<Tecnicas />} />
            <Route path="/categorias/Oleo.js" element={<Oleo />} />
            <Route path="/categorias/Acrilico.js" element={<Acrilico />} />
            <Route path="/categorias/Vinilo.js" element={<Vinilo />} />
            <Route
              path="/categorias/Carboncillo.js"
              element={<Carboncillo />}
            />
            <Route
              path="/categorias/TizasPastel.js"
              element={<TizasPastel />}
            />
            <Route path="/Nosotros.js" element={<Nosotros />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
