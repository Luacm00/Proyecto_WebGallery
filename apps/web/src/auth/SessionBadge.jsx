import { Link } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function SessionBadge() {
  const { user, profile, loading, signOut } = useAuth();

  if (loading) {
    return null;
  }

  if (user) {
    return (
      <div className="ms-auto d-flex align-items-center gap-2">
        <span className="text-light small">
          {profile?.displayName ?? user.email}
        </span>

        {profile?.status === "pending" && (
          <span className="badge text-bg-warning">En revisión</span>
        )}

        <Link to="/panel" className="btn btn-outline-light btn-sm">Mi panel</Link>
        
        {profile?.role === "admin" && (
          <Link to="/admin" className="btn btn-outline-light btn-sm">Admin</Link>
        )}

        <button
          type="button"
          className="btn btn-outline-light btn-sm"
          onClick={signOut}
        >
          Salir
        </button>
      </div>
    );
  }

  return (
    <Link to="/login" className="ms-auto btn btn-outline-light btn-sm">
      Ingresar
    </Link>
  );
}
