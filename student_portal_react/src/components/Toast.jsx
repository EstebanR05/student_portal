import { useEffect } from "react";

function Toast({ mensaje, tipo = "success", cerrar, duracion = 3000 }) {
  useEffect(() => {
    if (!mensaje || !cerrar) return;

    const temporizador = setTimeout(() => {
      cerrar();
    }, duracion);

    return () => clearTimeout(temporizador);
  }, [mensaje, duracion, cerrar]);

  if (!mensaje) return null;

  const icono =
    tipo === "error" ? "❌" : tipo === "warning" ? "⚠️" : "✅";

  return (
    <div
      className={`toast toast--${tipo}`}
      role="status"
      aria-live="polite"
    >
      <span className="toast-icon" aria-hidden="true">{icono}</span>
      <span className="toast-message">{mensaje}</span>
      {cerrar && (
        <button
          type="button"
          className="toast-close"
          onClick={cerrar}
          aria-label="Cerrar notificación"
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default Toast;
