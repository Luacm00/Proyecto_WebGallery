// Límites de longitud. DEBEN coincidir con los "check" de
// supabase/migrations/*_schema.sql: si cambias uno, cambia el otro.
export const LIMITS = {
  displayName: { min: 2, max: 60 },
  fullName: { min: 3, max: 120 },
  city: { max: 80 },
  bio: { max: 1000 },
  // Supabase guarda las contraseñas con bcrypt, que ignora lo que pase de 72 bytes.
  password: { min: 10, max: 72 },
} as const;
