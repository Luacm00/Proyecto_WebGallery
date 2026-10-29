import React from "react";
import { Link } from "react-router-dom";
import { useCategories } from "../catalogo/queries";

export default function Categorias() {
  const { data: categorias, isPending, isError, refetch } = useCategories();

  if (isPending) {
    return (
      <div className="container my-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </div>
    );
  }
  if (isError) {
    return (
      <div className="container my-5 text-center">
        <p>Error al cargar, intente nuevamente.</p>
        <button
          type="button"
          className="btn btn-outline-dark"
          onClick={() => refetch()}
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <h1 className="mb-4">Categorías</h1>
      <div className="row g-4">
        {categorias.map((c) => (
          <div key={c.slug} className="col-12 col-sm-6 col-lg-4">
            <div className="card h-100">
              {c.coverUrl ? (
                <img
                  src={c.coverUrl}
                  alt={c.name}
                  className="card-img-top"
                  loading="lazy"
                  style={{ height: 200, objectFit: "cover" }}
                />
              ) : (
                <div
                  className="card-img-top bg-secondary-subtle"
                  style={{ height: 200 }}
                />
              )}
              <div className="card-body">
                <h2 className="card-title h5">
                  <Link
                    to={`/categorias/${c.slug}`}
                    className="stretched-link text-decoration-none text-dark"
                  >
                    {c.name}
                  </Link>
                </h2>
                <p className="card-text text-muted">{c.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
