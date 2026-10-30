import Cargando from "../estado/Cargando";
import ErrorCarga from "../estado/ErrorCarga";
import ObraCard from "./ObraCard";

function ListaObras({ obras, lista, vacio }) {
  if (obras.isPending) return <Cargando />;
  if (obras.isError) {
    return <ErrorCarga onReintentar={obras.refetch} />;
  }
  if (lista.length === 0) {
    return (
      <p className="text-center text-muted">
        {vacio}
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

export default function GaleriaObras({ obras, vacio = "Aún no hay obras." }) {
  const lista = obras.data?.pages.flatMap((p) => p.items) ?? [];
  return (
    <>
      <ListaObras obras={obras} lista={lista} vacio={vacio} />
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
    </>
  );
}
