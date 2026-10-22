import { Link } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function SessionBadge() {
  const { user, loading, signOut } = useAuth();

  if (loading) {
    return null;
  }

  if (user) {
    return (
      <div className="ms-auto d-flex align-items-center gap-2">
        <span className="text-light small">{user.email}</span>
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
