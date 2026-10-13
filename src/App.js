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
import NotFound from "./componentes/NotFound";

import "./App.css";

const App = () => {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="d-flex flex-column min-vh-100">
        <Navbar />
        <div className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/tecnicas" element={<Tecnicas />} />
            <Route path="/categorias/oleo" element={<Oleo />} />
            <Route path="/categorias/acrilico" element={<Acrilico />} />
            <Route path="/categorias/vinilo" element={<Vinilo />} />
            <Route path="/categorias/carboncillo" element={<Carboncillo />} />
            <Route path="/categorias/tizas-pastel" element={<TizasPastel />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
