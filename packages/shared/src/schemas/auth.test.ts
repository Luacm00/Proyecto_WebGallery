import { describe, expect, it } from "vitest";
import { loginSchema, recoverSchema, newPasswordSchema } from "./auth";

const valido = {
  email: "fernan@ejemplo.com",
  password: "una-clave-segura",
};

const nuevaPassword = {
  password: "mi-clave-nueva-123",
  confirm: "mi-clave-nueva-123",
};

describe("loginSchema", () => {
  it("Valida el ingreso, rechaza una contraseña vacía.", () => {
    const r = loginSchema.safeParse({ ...valido, password: "" });
    expect(r.success).toBe(false);
    expect(r.error?.issues[0].path).toEqual(["password"]);
  });
});

describe("newPasswordSchema", () => {
  it("Acepta dos contraseñas iguales de 10 o más caracteres", () => {
    const r = newPasswordSchema.safeParse(nuevaPassword);
    expect(r.success).toBe(true);
  });

  it("rechaza contraseñas que no coinciden", () => {
    const r = newPasswordSchema.safeParse({
      ...nuevaPassword,
      confirm: "mi-nueva-clase-321",
    });
    expect(r.success).toBe(false);
    expect(r.error?.issues[0].path).toEqual(["confirm"]);
  });

  it("rechaza una contraseña corta, aunque coincida", () => {
    const r = newPasswordSchema.safeParse({
      password: "mi-clave",
      confirm: "mi-clave",
    });
    expect(r.success).toBe(false);
    expect(r.error?.issues[0].path).toEqual(["password"]);
  });
});
