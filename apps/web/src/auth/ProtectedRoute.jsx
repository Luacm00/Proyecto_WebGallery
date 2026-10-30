import { Link, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import Cargando from "../componentes/estado/Cargando";

/**
 * Envuelve una ruta que requiere sesión.
 *   roles:           si se indica, solo esos roles pueden ver la página (p. ej. ["admin"])
 *   requireApproved: exige que el perfil esté aprobado
 * ⚠️ Es UX, no seguridad: la API y RLS son las que protegen los datos.
 */
export default function ProtectedRoute({
  children,
  roles,
  requireApproved = false,
}) {
  const { user, profile, profileError, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Cargando />;
  }

  // Sin sesión: al login, recordando a donde queria ir (Login ya usa state.from).
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (profileError || !profile) {
    return (
      <Aviso
        titulo="No pudimos cargar tu perfil"
        texto="Recarga la página o intenta más tarde."
      />
    );
  }

  if (roles && !roles.includes(profile.role)) {
    return (
      <Aviso
        titulo="No tienes permiso"
        texto="Esta sección no está disponible para tu cuenta."
      />
    );
  }

  if (requireApproved && profile.status !== "approved") {
    return (
      <Aviso
        titulo="Tu perfil está en revisión"
        texto="Te avisaremos cuando un administrador lo apruebe."
      />
    );
  }

  return children;
}

function Aviso({ titulo, texto }) {
  return (
    <div className="container my-5 text-center" style={{ maxWidth: 520 }}>
      <h1 className="h3">{titulo}</h1>
      <p className="text-muted">{texto}</p>
      <Link to="/" className="btn btn-outline-dark">
        Volver al inicio
      </Link>
    </div>
  );
}
