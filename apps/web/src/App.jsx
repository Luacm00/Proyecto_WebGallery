import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./componentes/Navbar";
import Inicio from "./componentes/Inicio";
import Tecnicas from "./componentes/Tecnicas";
import Categorias from "./componentes/Categorias";
import Nosotros from "./componentes/Nosotros";
import Footer from "./componentes/Footer";
import NotFound from "./componentes/NotFound";

import "./App.css";
import Registro from "./paginas/Registro";
import Login from "./paginas/Login";
import Recuperar from "./paginas/Recuperar";
import Restablecer from "./paginas/Restablecer";
import Panel from "./paginas/Panel";
import Admin from "./paginas/Admin";
import ProtectedRoute from "./auth/ProtectedRoute";
import Privacidad from "./paginas/Privacidad";
import CategoriaDetalle from "./paginas/CategoriaDetalle";

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
            <Route path="/categorias/:slug" element={<CategoriaDetalle />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/login" element={<Login />} />
            <Route path="/recuperar" element={<Recuperar />} />
            <Route path="/restablecer" element={<Restablecer />} />
            <Route
              path="/panel"
              element={
                <ProtectedRoute>
                  <Panel />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <Admin />
                </ProtectedRoute>
              }
            />
            <Route path="/privacidad" element={<Privacidad />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
