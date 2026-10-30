import { useParams } from "react-router-dom";
import { useArtist, useArtistArtworks } from "../catalogo/queries";
import Cargando from "../componentes/estado/Cargando";
import ErrorCarga from "../componentes/estado/ErrorCarga";
import BotonWhatsapp from "../componentes/catalogo/BotonWhatsapp";
import GaleriaObras from "../componentes/catalogo/GaleriaObras";

export default function ArtistaDetalle() {
  const { id } = useParams();
  const { data: artist, isPending, isError, error, refetch } = useArtist(id);
  const obras = useArtistArtworks(id);

  if (isPending) return <Cargando />;
  if (isError) {
    return error.status === 404 || error.status === 400 ? (
      <ErrorCarga mensaje="Este artista no existe." />
    ) : (
      <ErrorCarga onReintentar={refetch} />
    );
  }

  return (
    <div className="container my-5">
      <header className="text-center mb-5">
        <h1 className="display-5 fw-bold">{artist.name}</h1>
        {artist.city && <p className="text-muted">{artist.city}</p>}
        {artist.bio && <p className="lead">{artist.bio}</p>}
        <BotonWhatsapp
          telefono={artist.whatsapp}
          mensaje="Hola, vi tu perfil en Web Gallery y me gustaría saber más de tu trabajo."
        />
      </header>
      <h2 className="h4 mb-4">Obras</h2>
      <GaleriaObras
        obras={obras}
        vacio="Este artista aún no tiene obras publicadas."
      />
    </div>
  );
}
