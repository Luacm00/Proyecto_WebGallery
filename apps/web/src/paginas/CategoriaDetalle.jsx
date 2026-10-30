import { useParams } from "react-router-dom";
import { useCategory, useCategoryArtworks } from "../catalogo/queries";
import Cargando from "../componentes/estado/Cargando";
import ErrorCarga from "../componentes/estado/ErrorCarga";
import ObraCard from "../componentes/catalogo/ObraCard";
import BackToHomeButton from "../componentes/BackToHomeButton";

export default function CategoriaDetalle() {
  const { slug } = useParams();
  const categoria = useCategory(slug);
  const obras = useCategoryArtworks(slug);

  if (categoria.isPending) return <Cargando />;
  if (categoria.isError) {
    return categoria.error.status === 404 ? (
      <ErrorCarga mensaje="Esta categoría no existe." />
    ) : (
      <ErrorCarga onReintentar={categoria.refetch} />
    );
  }

  const c = categoria.data;
  //Todas las páginas cargadas en una sola lista.
  const lista = obras.data?.pages.flatMap((p) => p.items) ?? [];

  function ListaObras({ obras, lista }) {
    if (obras.isPending) return <Cargando />;
    if (obras.isError) {
      return <ErrorCarga onReintentar={obras.refetch} />;
    }
    if (lista.length === 0) {
      return (
        <p className="text-center text-muted">
          Aún no hay obras en esta categoría.
        </p>
      );
    }
    return (
      <div className="row g-4">
        {lista.map((obra) => (
          <div key={obra.id} className="col-12 col-sm-6 col-lg-4">
            <ObraCard obra={obra} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="container my-5">
      <header className="text-center mb-5">
        <h1 className="display-4 fw-bold">{c.name}</h1>
        <p className="lead text-muted">{c.description}</p>
      </header>

      <ListaObras obras={obras} lista={lista} />

      {obras.hasNextPage && (
        <div className="text-center mt-4">
          <button
            type="button"
            className="btn btn-outline-dark"
            onClick={() => obras.fetchNextPage()}
            disabled={obras.isFetchingNextPage}
          >
            {obras.isFetchingNextPage ? "Cargando..." : "Ver más"}
          </button>
        </div>
      )}

      <BackToHomeButton />
    </div>
  );
}
