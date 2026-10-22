import { describe, expect, it } from "vitest";
import { toE164 } from "./phone";
import { whatsappLink } from "./phone";

describe("toE164", () => {
  it("convierte un celular colombiano sin indicativo", () => {
    expect(toE164("300 123 4567")).toBe("+573001234567");
  });

  it("respeta el indicativo de otro pais", () => {
    expect(toE164("+1 202 555 0143")).toBe("+12025550143");
  });

  it("rechaza lo que no es un télefono", () => {
    expect(toE164("12345")).toBeNull();
    expect(toE164("abc")).toBeNull();
  });
});

describe("whatsappLink", () => {
  it("arma el mensaje sin el +", () => {
    expect(whatsappLink("+573001234567")).toBe("https://wa.me/573001234567");
  });

  it("agrega el mensaje codificado", () => {
    expect(whatsappLink("+573001234567", "Hola, vi tu obra")).toBe(
      "https://wa.me/573001234567?text=Hola%2C%20vi%20tu%20obra",
    );
  });

  it("ignora un mensaje vacío", () => {
    expect(whatsappLink("573001234567", "")).toBe("https://wa.me/573001234567");
  });
});
