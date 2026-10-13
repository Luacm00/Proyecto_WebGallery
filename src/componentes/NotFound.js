import React from "react";
import BackToHomeButton from "./BackToHomeButton";

const NotFound = () => {
  return (
    <div className="container text-center my-5">
      <h1 className="display-3 fw-bold">404</h1>
      <p className="lead">La página que buscas no existe.</p>
      <BackToHomeButton />
    </div>
  );
};

export default NotFound;
