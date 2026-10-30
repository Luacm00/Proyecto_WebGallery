import { useParams } from "react-router-dom";
import { useCategory, useCategoryArtworks } from "../catalogo/queries";
import Cargando from "../componentes/estado/Cargando";
import ErrorCarga from "../componentes/estado/ErrorCarga";
import BackToHomeButton from "../componentes/BackToHomeButton";
import GaleriaObras from "../componentes/catalogo/GaleriaObras";

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

  return (
    <div className="container my-5">
      <header className="text-center mb-5">
        <h1 className="display-4 fw-bold">{c.name}</h1>
        <p className="lead text-muted">{c.description}</p>
      </header>

      <GaleriaObras obras={obras} vacio="Aún no hay obras en esta categoría." />

      <BackToHomeButton />
    </div>
  );
}
