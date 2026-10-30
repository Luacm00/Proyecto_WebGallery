import { useCategories } from "../catalogo/queries";
import BackToHomeButton from "./BackToHomeButton";
import Cargando from "./estado/Cargando";
import ErrorCarga from "./estado/ErrorCarga";

export default function Tecnicas() {
  const { data: tecnicas, isPending, isError, refetch } = useCategories();

  if (isPending) {
    return <Cargando />;
  }
  if (isError) {
    return <ErrorCarga onReintentar={refetch} />;
  }

  return (
    <div>
      <div className="container-fluid mt-3">
        <div className="row">
          {/* Menú lateral: un enlace por técnica, al ancla de su sección */}
          <nav
            id="sidebarMenu"
            className="col-md-3 col-lg-2 d-md-block bg-dark sidebar collapse"
          >
            <div className="position-sticky">
              <ul className="nav flex-column mt-5">
                {tecnicas.map((t) => (
                  <li key={t.slug} className="nav-item">
                    <a className="nav-link" href={`#${t.slug}`}>
                      {t.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <button
              className="btn btn-secondary d-md-none mb-3"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#sidebarMenu"
              aria-controls="sidebarMenu"
              aria-expanded="false"
              aria-label="Mostrar menú de técnicas"
            >
              <i className="bi bi-list"></i> Menú de técnicas
            </button>

            <div className="d-flex flex-column align-items-center">
              <h1 className="display-3 text-center fw-bold mb-5">Técnicas</h1>

              {tecnicas.map((t) => (
                <section key={t.slug} id={t.slug} className="mb-5 w-100">
                  <div className="card">
                    {t.coverUrl && (
                      <img
                        src={t.coverUrl}
                        alt={t.name}
                        className="card-img-top"
                        loading="lazy"
                        style={{ height: 400, objectFit: "cover" }}
                      />
                    )}
                    <div className="card-body">
                      <h2 className="card-title h5">{t.name}</h2>
                      <p className="card-text">{t.description}</p>

                      {t.howTo && (
                        <>
                          <h3 className="h6">¿Cómo se emplea?</h3>
                          <p>{t.howTo}</p>
                        </>
                      )}
                      {t.materials && (
                        <>
                          <h3 className="h6">¿Qué se necesita?</h3>
                          <p>{t.materials}</p>
                        </>
                      )}
                    </div>
                  </div>
                </section>
              ))}
            </div>
          </main>
        </div>
      </div>
      <BackToHomeButton />
      <br />
    </div>
  );
}
