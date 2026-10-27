const ACTUALIZADA = "27 de octubre de 2026";
const CORREO_CONTACTO = "web.gallery.contacto@gmail.com";

export default function Privacidad() {
  return (
    <div className="container my-5" style={{ maxWidth: 760 }}>
      <h1 className="h2 mb-1">Política de tratamiento de datos personales</h1>
      <p className="text-muted">Última actualización: {ACTUALIZADA}</p>

      <h2 className="h5 mt-4">1. Responsable</h2>
      <p>
        Web Gallery es responsable del tratamiento de los datos personales
        recolectados en este sitio, conforme a la Ley 1581 de 2012 y el Decreto
        1377 de 2013. Contacto:{" "}
        <a href={`mailto:${CORREO_CONTACTO}`}>{CORREO_CONTACTO}</a>.
      </p>

      <h2 className="h5 mt-4">2. Datos que recolectamos</h2>
      <ul>
        <li>Nombre artístico.</li>
        <li>Nombre completo.</li>
        <li>Correo electrónico.</li>
        <li>Teléfono de contacto.</li>
        <li>Ciudad (opcional).</li>
        <li>Fotografías de las obras que publique.</li>
      </ul>
      <p>
        Aclaramos que a los <strong>visitantes</strong> no se les solicitan sus
        datos.
      </p>

      <h2 className="h5 mt-4">3. Finalidades</h2>
      <ul>
        <li>Crear y administrar la cuenta del artista.</li>
        <li>Verificar la identidad antes de aprobarlo.</li>
        <li>Publicar sus obras con su nombre artístico.</li>
        <li>
          Mostrar su WhatsApp a los visitantes{" "}
          <strong>solo si lo autorizó.</strong>
        </li>
        <li>Enviar correos de la cuenta: confirmación y recuperación.</li>
      </ul>

      <h2 className="h5 mt-4">4. Datos públicos</h2>
      <p>
        Cualquier visitante puede ver el <strong>nombre artístico</strong>, la{" "}
        <strong>ciudad</strong> y las <strong>obras aprobadas</strong> de cada
        artista y, solo si el artista lo autorizó, su número de{" "}
        <strong>WhatsApp</strong>. El nombre completo, el correo electrónico y,
        sin autorización, el teléfono <strong>nunca se publican</strong>.
      </p>

      <h2 className="h5 mt-4">5. Derechos del titular</h2>
      <p>Según el artículo 8 de la Ley 1581 de 2012, como titular puedes:</p>
      <ul>
        <li>Conocer, actualizar y rectificar tus datos personales.</li>
        <li>Solicitar prueba de la autorización que nos diste.</li>
        <li>Ser informado sobre el uso que se ha dado a tus datos.</li>
        <li>
          Revocar la autorización o solicitar la supresión de tus datos cuando
          no se respeten los principios, derechos y garantías de la ley.
        </li>
        <li>Acceder gratuitamente a tus datos personales.</li>
        <li>
          Presentar quejas ante la Superintendencia de Industria y Comercio
          (SIC).
        </li>
      </ul>

      <h2 className="h5 mt-4">6. Cómo ejercer tus derechos</h2>
      <p>
        Escríbenos a <a href={`mailto:${CORREO_CONTACTO}`}>{CORREO_CONTACTO}</a>{" "}
        indicando tu nombre, el correo de tu cuenta y tu solicitud. Las{" "}
        <strong>consultas</strong> se responden en un máximo de 10 días hábiles
        y los <strong>reclamos</strong> en un máximo de 15 días hábiles,
        conforme a los artículos 14 y 15 de la ley.
      </p>

      <h2 className="h5 mt-4">7. Seguridad y conservación</h2>
      <p>
        Tus datos se almacenan con controles de acceso: cada artista solo puede
        ver y modificar su propia información, y solo los administradores pueden
        revisarla para aprobar cuentas. Conservamos los datos mientras tu cuenta
        esté activa. Si solicitas eliminarla, borramos tus datos personales y
        las fotografías de tus obras.
      </p>
    </div>
  );
}
