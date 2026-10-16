import { describe, expect, it } from "vitest";
import { signupSchema } from "./signup";

const valido = {
  email: "ana@ejemplo.com",
  password: "una-clave-segura",
  displayName: " Ana ",
  fullName: "Ana Prueba",
  phone: "300 123 4567",
  dataConsent: true,
};

describe("signupSchema", () => {
  it("acepta datos válidos, limpia espacios y normaliza el teléfono", () => {
    const r = signupSchema.safeParse(valido);
    expect(r.success).toBe(true);
    expect(r.data?.displayName).toBe("Ana");
    expect(r.data?.phone).toBe("+573001234567");
    expect(r.data?.whatsappPublic).toBe(false); // valor por defecto
  });

  it("exige la autorización de datos", () => {
    const r = signupSchema.safeParse({ ...valido, dataConsent: false });
    expect(r.success).toBe(false);
    expect(r.error?.issues[0].path).toEqual(["dataConsent"]);
  });

  it("rechaza un telefono invalido", () => {
    const r = signupSchema.safeParse({ ...valido, phone: "12345" });
    expect(r.success).toBe(false);
    expect(r.error?.issues[0].path).toEqual(["phone"]);
  });

  it("rechaza contraseña con extension invalida", () => {
    const r = signupSchema.safeParse({ ...valido, password: "cinco" })
    expect(r.success).toBe(false)
    expect(r.error?.issues[0].path).toEqual(["password"]);
  });

  it("rechaza nombre sin la minima extension", () => {
    const r = signupSchema.safeParse({ ...valido, fullName: "An" })
    expect(r.success).toBe(false)
    expect(r.error?.issues[0].path).toEqual(["fullName"]);
  });
});
