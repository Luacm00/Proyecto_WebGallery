import { forwardRef } from "react";
import { Turnstile } from "@marsidev/react-turnstile";

const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY;

/**
 * Widget de Turnstile. Llama onToken(token) al validar,
 * y onToken(null) si el token expira o hay error.
 * El ref permite reiniciarlo: ref.current?.reset()
 */
export const Captcha = forwardRef(function Captcha({ onToken }, ref) {
  return (
    <div className="mb-3">
      <Turnstile
        ref={ref}
        siteKey={SITE_KEY}
        options={{ language: "es", size: "flexible" }}
        onSuccess={onToken}
        onExpire={() => onToken(null)}
        onError={() => onToken(null)}
      />
    </div>
  );
});
