import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, toSignupMetadata } from "@webgallery/shared";
import { supabase } from "../lib/supabase";
import { TextField } from "../componentes/forms/TextField";
import { Link } from "react-router-dom";

export default function Registro() {
  const [enviado, setEnviado] = useState(false);
  const [errorServidor, setErrorServidor] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signupSchema),
    mode: "onBlur", //valida cada campo al salir de el, no en cada tecla
  });

  // Solo se ejecuta si el esquema aprobó TODO. "data" ya viene transformado
  async function onSubmit(data) {
    setErrorServidor(null);
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: toSignupMetadata(data), // -> raw_user_meta_data -> trigger
        emailRedirectTo: window.location.origin, // a dónde lleva el enlace del correo
      },
    });

    if (error) {
      setErrorServidor(mensajeDeError(error));
      return;
    }
    setEnviado(true);
  }

  if (enviado) {
    return (
      <div className="container my-5 text-center" style={{ maxWidth: 560 }}>
        <h1 className="h3">Revisa tu correo</h1>
        <p className="lead">
          Si el correo es válido, te enviamos un enlace para confirmar tu
          cuenta.
        </p>
        <p className="text-muted">
          Después de confirmarlo, revisaremos tu perfil antes de que puedas
          publicar obras.
        </p>
      </div>
    );
  }

  return (
    <div className="container my-5" style={{ maxWidth: 560 }}>
      <h1 className="h3 mb-4">Registro de artista</h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <TextField
          label="Correo electrónico"
          name="email"
          type="email"
          autoComplete="email"
          register={register}
          error={errors.email}
        />

        <TextField
          label="Contraseña"
          name="password"
          type="password"
          autoComplete="new-password"
          register={register}
          error={errors.password}
          help="Mínimo 10 caracteres. Una frase larga es más segura que símbolos raros."
        />

        <TextField
          label="Nombre artístico"
          name="displayName"
          autoComplete="nickname"
          register={register}
          error={errors.displayName}
        />

        <TextField
          label="Nombre completo"
          name="fullName"
          autoComplete="name"
          register={register}
          error={errors.fullName}
        />

        <TextField
          label="Celular (WhatsApp)"
          name="phone"
          type="tel"
          autoComplete="tel"
          register={register}
          error={errors.phone}
          help="Ej: 300 123 4567. Si no es de Colombia, incluye el indicativo (+1...)."
        />

        <TextField
          label="Ciudad (opcional)"
          name="city"
          autoComplete="address-level2"
          register={register}
          error={errors.city}
        />

        <div className="form-check mb-3">
          <input
            id="whatsappPublic"
            type="checkbox"
            className={`form-check-input ${errors.whatsappPublic ? "is-invalid" : ""}`}
            {...register("whatsappPublic")}
          />
          <label htmlFor="whatsappPublic" className="form-check-label">
            Mostrar mi número para que los visitantes me escriban por WhatsApp.
          </label>
        </div>

        <div className="form-check mb-3">
          <input
            id="dataConsent"
            type="checkbox"
            className={`form-check-input ${errors.dataConsent ? "is-invalid" : ""}`}
            {...register("dataConsent")}
          />
          <label htmlFor="dataConsent" className="form-check-label">
            Autorizo el tratamiento de mis datos personales según la{" "}
            <Link to="/privacidad" target="_blank" rel="noopener">
              política de privacidad
            </Link>{" "}
            (Ley 1581 de 2012).
          </label>
          {errors.dataConsent && (
            <div className="invalid-feedback">{errors.dataConsent.message}</div>
          )}
        </div>

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
          {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
        </button>
      </form>
    </div>
  );
}

// Traduce los códigos de error de Supabase a mensajes para el usuario.
function mensajeDeError(error) {
  switch (error.code) {
    case "weak_password":
      return "La contraseña es demasiado débil. Usa al menos 10 caracteres.";
    case "over_email_send_rate_limit":
      return "Se enviaron demasiados correos. Espera unos minutos e intenta de nuevo.";
    default:
      // Nunca mostramos el mensaje técnico (p. ej. "Database error saving new user").
      return "No pudimos crear tu cuenta. Revisa los datos e intenta de nuevo.";
  }
}
