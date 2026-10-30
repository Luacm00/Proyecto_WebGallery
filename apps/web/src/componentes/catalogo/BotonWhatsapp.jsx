import { whatsappLink } from "@webgallery/shared";

export default function BotonWhatsapp({ telefono, mensaje }) {
  if (!telefono) {
    // whatsapp es null cuando el artista no dio consentimiento para mostrarlo
    return (
      <p className="text-muted small">
        Este artista aún no ha publicado un contacto.
      </p>
    );
  }
  return (
    <a
      href={whatsappLink(telefono, mensaje)}
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-success"
    >
      <i className="bi bi-whatsapp me-2"></i>Contactar por WhatsApp
    </a>
  );
}
