import z, { email } from "zod";
import { passwordField } from "./signup";

export const loginSchema = z.object({
  email: z.email({ error: "Escribe un correo válido" }),
  // En el login NO se exige el mínimo de 10: solo que no esté vacío.
  // (Si mañana subimos el mínimo, los usuarios con contraseñas viejas deben poder entrar.)
  password: z.string().min(1, { error: "Escribe tu contraseña" }),
});

export const recoverSchema = z.object({
  email: z.email({ error: "Escribe un correo válido" }),
});

export const newPasswordSchema = z
  .object({
    password: passwordField,
    confirm: z.string(),
  })
  // Regla que compara DOS campos: va sobre el objeto completo.
  // "path" indica bajo qué campo mostrar el error.
  .refine((d) => d.password === d.confirm, {
    error: "Las contraseñas no coinciden",
    path: ["confirm"],
  });
