import { zodResolver } from "@hookform/resolvers/zod";
import { recoverSchema } from "@webgallery/shared";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "../lib/supabase";
import { Link } from "react-router-dom";
import { TextField } from "../componentes/forms/TextField";

export default function Recuperar() {
  const [enviado, setEnviado] = useState(false);
  const [errorServidor, setErrorServidor] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(recoverSchema),
    mode: "onBlur", //valida cada campo al salir de el, no en cada tecla
  });

  // Única excepción: el límite de envíos (no revela si el correo existe).
  async function onSubmit({ email }) {
    setErrorServidor(null);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/restablecer`,
    });

    if (error?.code === "over_email_send_rate_limit") {
      setErrorServidor(
        "Se enviaron demasiados correos. Espera unos minutos e intenta de nuevo.",
      );
      return;
    }
    // Cualquier otro caso (exista o no el correo): el mismo mensaje.
    setEnviado(true);
  }

  // Pantalla 1: después de enviar
  if (enviado) {
    return (
      <div className="container my-5 text-center" style={{ maxWidth: 440 }}>
        <h1 className="h3">Revisa tu correo</h1>
        <p>
          Si existe una cuenta con ese correo, te enviamos un enlace para
          restablecer tu contraseña.
        </p>
        <Link to="/login">Volver a ingresar</Link>
      </div>
    );
  }

  // Pantalla 2: el formulario
  return (
    <div className="container my-5" style={{ maxWidth: 440 }}>
      <h1 className="h3 mb-3">Recuperar contraseña</h1>
      <p className="text-muted">
        Escribe el correo de tu cuenta y te enviaremos un enlace para crear una
        contraseña nueva.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          label="Correo electrónico"
          name="email"
          type="email"
          autoComplete="email"
          register={register}
          error={errors.email}
        />

        {errorServidor && (
          <div className="alert alert-danger" role="alert">
            {errorServidor}
          </div>
        )}

        <button
          type="submit"
          className="btn btn-dark w-100 mb-3"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Enviando..." : "Enviar enlace"}
        </button>
      </form>

      <p className="text-center">
        <Link to="/login">Volver a ingresar</Link>
      </p>
    </div>
  );
}
