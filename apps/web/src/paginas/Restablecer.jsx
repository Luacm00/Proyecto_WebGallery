import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { newPasswordSchema } from "@webgallery/shared";
import { supabase } from "../lib/supabase";
import { TextField } from "../componentes/forms/TextField";

export default function Restablecer() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [errorServidor, setErrorServidor] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(newPasswordSchema),
    mode: "onBlur",
  });

  if (loading) return null;

  //Sin sesión de recuperación: llegó sin el enlace, o el enlace venció o ya se usó.
  if (!user) {
    return (
      <div className="container my-5 text-center" style={{ maxWidth: 440 }}>
        <h1 className="h3">Enlace no válido</h1>
        <p>El enlace venció o ya fue usado.</p>
        <Link to="/recuperar" className="btn btn-dark">
          Pedir un enlace nuevo
        </Link>
      </div>
    );
  }

  async function onSubmit({ password }) {
    setErrorServidor(null);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setErrorServidor(mensajeDeError(error));
      return;
    }
    navigate("/", { replace: true });
  }

  return (
    <div className="container my-5" style={{ maxWidth: 440 }}>
      <h1 className="h3 mb-4">Nueva contraseña</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          label="Nueva contraseña"
          name="password"
          type="password"
          autoComplete="new-password"
          register={register}
          error={errors.password}
          help="Mínimo 10 caracteres."
        />
        <TextField
          label="Repite la contraseña"
          name="confirm"
          type="password"
          autoComplete="new-password"
          register={register}
          error={errors.confirm}
        />

        {errorServidor && (
          <div className="alert alert-danger" role="alert">
            {errorServidor}
          </div>
        )}

        <button
          type="submit"
          className="btn btn-dark w-100"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Guardando..." : "Guardar contraseña"}
        </button>
      </form>
    </div>
  );
}

function mensajeDeError(error) {
  switch (error.code) {
    case "same_password":
      return "La nueva contraseña debe ser distinta a la anterior.";
    case "weak_password":
      return "La contraseña es demasiado débil. Usa al menos 10 caracteres.";
    default:
      return "No pudimos restablecer tu contraseña. Intenta de nuevo.";
  }
}
