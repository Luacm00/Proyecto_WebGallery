import z from "zod";
import { LIMITS } from "../limits";
import { toE164 } from "../phone";

export const signupSchema = z.object({
  email: z.email({ error: "Escribe un correo válido" }),

  password: z
    .string()
    .min(LIMITS.password.min, {
      error: `La contraseña debe tener al menos ${LIMITS.password.min} caracteres`,
    })
    .max(LIMITS.password.max, {
      error: `Máximo ${LIMITS.password.max} caracteres`,
    }),

  displayName: z
    .string()
    .trim()
    .min(LIMITS.displayName.min, {
      error: `Mínimo ${LIMITS.displayName.min} caracteres`,
    })
    .max(LIMITS.displayName.max, {
      error: `Máximo ${LIMITS.displayName.max} caracteres`,
    }),

  fullName: z
    .string()
    .trim()
    .min(LIMITS.fullName.min, {
      error: `Mínimo ${LIMITS.fullName.min} caracteres`,
    })
    .max(LIMITS.fullName.max, {
      error: `Máximo ${LIMITS.fullName.max} caracteres`,
    }),

  city: z
    .string()
    .trim()
    .max(LIMITS.city.max, { error: `Máximo ${LIMITS.city.max} caracteres` })
    .optional(),

  phone: z
    .string()
    .trim()
    .refine((v) => toE164(v) !== null, {
      error: "Escribe un número válido, por ej. 300 123 4567",
    })
    .transform((v) => toE164(v)!), // ya sabemos que es válido: lo guardamos en E.164

  whatsappPublic: z.boolean().default(false),

  // Ley 1581: sin autorización expresa no hay registro. Solo se acepta exactamente true.
  dataConsent: z.literal(true, {
    error: "Debes autorizar el tratamiento de datos para registrarte",
  }),
});

// Dos tipos a partir del mismo esquema:
export type SignupInput = z.input<typeof signupSchema>; // lo que llena el formulario ("300 123 4567")
export type SignupData = z.output<typeof signupSchema>; // lo que sale validado ("+573001234567")
