import { useAuth } from "../auth/AuthProvider";

const TEXTOS_ESTADO = {
  pending: "En revisión",
  approved: "Aprobado",
  suspended: "Suspendido",
};

export default function Panel() {
  const { profile } = useAuth();

  return (
    <div className="container my-5">
      <h1 className="h3">Hola, {profile.displayName}</h1>
      <p>
        Estado de tu perfil:{" "}
        <strong>{TEXTOS_ESTADO[profile.status] ?? profile.status}</strong>
      </p>
      <p className="text-muted">Aquí subirás y administrarás tus obras.</p>
    </div>
  );
}
