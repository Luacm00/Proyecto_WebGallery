export default function ErrorCarga({
  mensaje = "No pudimos cargar la información.",
  onReintentar,
}) {
  return (
    <div className="container my-5 text-center">
      <p>{mensaje}</p>
      {onReintentar && (
        <button
          type="button"
          className="btn btn-outline-dark"
          onClick={() => onReintentar()}
        >
          Reintentar
        </button>
      )}
    </div>
  );
}
