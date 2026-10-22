import {
  parsePhoneNumberFromString,
  type CountryCode,
} from "libphonenumber-js";

/**
 * Convierte un teléfono escrito por el usuario a E.164 (+573001234567).
 * Si no trae indicativo, asume Colombia. Devuelve null si no es válido.
 */
export function toE164(
  input: string,
  defaultCountry: CountryCode = "CO",
): string | null {
  const phone = parsePhoneNumberFromString(input, defaultCountry);
  return phone?.isValid() ? phone.number : null;
}

/**
 * Enlace para abrir un chat de WhatsApp con el número dado.
 * Si hay mensaje, llega prellenado en la caja de texto.
 */
export function whatsappLink(e164: string, message?: string): string {
  const number = e164.replace("+", "");
  const base = `https://wa.me/${number}`;

  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
