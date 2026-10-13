import React from 'react';
import { Link } from 'react-router-dom';

const BackToHomeButton = () => {
  return (
    <div className="text-center mt-3">
      <Link to="/" className="btn btn-outline-dark">
        Regresar a Inicio
      </Link>
    </div>
  );
};

export default BackToHomeButton;
