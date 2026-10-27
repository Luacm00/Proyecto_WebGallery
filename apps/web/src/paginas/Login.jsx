import { useRef, useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@webgallery/shared";
import { supabase } from "../lib/supabase";
import { useAuth } from "../auth/AuthProvider";
import { TextField } from "../componentes/forms/TextField";
import { Captcha } from "../componentes/forms/Captcha";

export default function Login() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [errorServidor, setErrorServidor] = useState(null);
  const captchaRef = useRef(null);
  const [captchaToken, setCaptchaToken] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

  // ¿A dónde volver? Si venía de una página protegida, ahí; si no, al inicio.
  const destino = location.state?.from ?? "/";

  // Si ya tiene sesión, /login no tiene sentido: lo mandamos a su destino.
  if (user) return <Navigate to={destino} replace />;

  async function onSubmit({ email, password }) {
    setErrorServidor(null);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
      options: { captchaToken },
    });
    if (error) {
      // El token ya se gastó: pedimos uno nuevo para el siguiente intento.
      captchaRef.current?.reset();
      setCaptchaToken(null);
      setErrorServidor(mensajeDeError(error));
      return;
    }
    navigate(destino, { replace: true });
  }

  return (
    <div className="container my-5" style={{ maxWidth: 440 }}>
      <h1 className="h3 mb-4">Ingresar</h1>

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
          autoComplete="current-password"
          register={register}
          error={errors.password}
        />

        <Captcha ref={captchaRef} onToken={setCaptchaToken} />

        {errorServidor && (
          <div className="alert alert-danger" role="alert">
            {errorServidor}
          </div>
        )}

        <button
          type="submit"
          className="btn btn-dark w-100 mb-3"
          disabled={isSubmitting || !captchaToken}
        >
          {isSubmitting ? "Ingresando..." : "Ingresar"}
        </button>
      </form>

      <p className="text-center mb-1">
        <Link to="/recuperar">¿Olvidaste tu contraseña?</Link>
      </p>
      <p className="text-center">
        ¿Eres artista y no tienes cuenta? <Link to="/registro">Regístrate</Link>
      </p>
    </div>
  );
}

function mensajeDeError(error) {
  switch (error.code) {
    case "invalid_credentials":
      return "Correo o contraseña incorrectos."; // nunca decir cuál de los dos
    case "email_not_confirmed":
      return "Aún no confirmas tu correo. Revisa tu bandeja de entrada (y la de spam).";
    case "captcha_failed":
      return "No pudimos verificar que eres una persona. Intenta de nuevo.";
    default:
      return "No pudimos iniciar sesión. Intenta de nuevo en unos minutos.";
  }
}
