/**
 * Campo de texto con etiqueta, ayuda y mensaje de error (Bootstrap + react-hook-form).
 */
export function TextField({
  label,
  name,
  register,
  error,
  type = "text",
  autoComplete,
  help,
}) {
  const helpId = `${name}-help`;
  const errorId = `${name}-error`;

  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        id={name}
        type={type}
        autoComplete={autoComplete}
        className={`form-control ${error ? "is-invalid" : ""}`}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? errorId : help ? helpId : undefined}
        {...register(name)}
      />
      {help && !error && (
        <div id={helpId} className="form-text">
          {help}
        </div>
      )}
      {error && (
        <div id={errorId} className="invalid-feedback">
          {error.message}
        </div>
      )}
    </div>
  );
}
