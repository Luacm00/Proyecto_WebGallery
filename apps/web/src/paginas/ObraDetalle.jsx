import { Link, useParams } from "react-router-dom";
import { useArtwork } from "../catalogo/queries";
import Cargando from "../componentes/estado/Cargando";
import ErrorCarga from "../componentes/estado/ErrorCarga";
import BotonWhatsapp from "../componentes/catalogo/BotonWhatsapp";

export default function ObraDetalle() {
  const { id } = useParams();
  const { data: obra, isPending, isError, error, refetch } = useArtwork(id);

  if (isPending) return <Cargando />;
  if (isError) {
    return error.status === 404 || error.status === 400 ? (
      <ErrorCarga mensaje="Esta obra no existe." />
    ) : (
      <ErrorCarga onReintentar={refetch} />
    );
  }

  return (
    <div className="container my-5">
      <div className="row g-5">
        <div className="col-lg-7">
          <img
            src={obra.imageUrl}
            alt={obra.title}
            className="img-fluid rounded w-100"
            style={{
              maxHeight: "75vh",
              objectFit: "contain",
              backgroundColor: obra.dominantColor ?? "#e9ecef",
            }}
          />
        </div>
        <div className="col-lg-5">
          <h1 className="fw-bold">{obra.title}</h1>
          <p className="text-muted">
            por{" "}
            <Link to={`/artistas/${obra.artist.id}`}>{obra.artist.name}</Link>
            {obra.artist.city && `, ${obra.artist.city}`}
          </p>
          <p className="mb-4">
            <Link
              to={`/categorias/${obra.category.slug}`}
              className="badge text-bg-light text-decoration-none"
            >
              {obra.category.name}
            </Link>
          </p>
          <dl className="row small mb-4">
            {obra.year && (
              <>
                <dt className="col-4">Año</dt>
                <dd className="col-8">{obra.year}</dd>
              </>
            )}
            {obra.dimensions && (
              <>
                <dt className="col-4">Medidas</dt>
                <dd className="col-8">{obra.dimensions}</dd>
              </>
            )}
          </dl>
          {obra.description && <p className="text-muted">{obra.description}</p>}
          <BotonWhatsapp
            telefono={obra.artist.whatsapp}
            mensaje={`Hola, vi tu obra «${obra.title}» en Web Gallery y me gustaría saber más.`}
          />
        </div>
      </div>
    </div>
  );
}
