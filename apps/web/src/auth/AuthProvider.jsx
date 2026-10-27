import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { apiFetch } from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [sessionLoading, setSessionLoading] = useState(true); // true hasta saber si hay sesión guardada
  const [perfil, setPerfil] = useState({ estado: "inactivo", datos: null }); // estado: "inactivo" (sin usuario) | "cargando" | "listo" | "error"

  // 1. Sesión
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setSessionLoading(false);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });
    return () => subscription.unsubscribe();
  }, []);

  // 2. Perfil: se pide a la API cada vez que CAMBIA EL USUARIO
  const userId = session?.user?.id;
  useEffect(() => {
    if (!userId) {
      setPerfil({ estado: "inactivo", datos: null });
      return;
    }
    let cancelado = false;
    setPerfil({ estado: "cargando", datos: null });
    apiFetch("/me", { token: session.access_token })
      .then((datos) => {
        if (!cancelado) setPerfil({ estado: "listo", datos });
      })
      .catch(() => {
        if (!cancelado) setPerfil({ estado: "error", datos: null });
      });
    return () => {
      cancelado = true;
    };
  }, [userId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Cargando = no sabemos aún si hay sesión, O hay usuario pero su perfil aún no llega.
  const loading =
    sessionLoading ||
    (!!userId && (perfil.estado === "inactivo" || perfil.estado === "cargando"));

  const value = {
    session,
    user: session?.user ?? null,
    profile: perfil.datos,
    profileError: perfil.estado === "error",
    loading,
    signOut: () => supabase.auth.signOut(),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook para leer la sesión desde cualquier componente.
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}
