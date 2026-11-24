import { useEffect, useId } from "react";

function Modal({ abierto, cerrar, titulo, children }) {
  const titleId = useId();

  useEffect(() => {
    if (!abierto) return;

    const manejarTecla = (evento) => {
      if (evento.key === "Escape") {
        cerrar();
      }
    };

    document.addEventListener("keydown", manejarTecla);
    return () => document.removeEventListener("keydown", manejarTecla);
  }, [abierto, cerrar]);

  if (!abierto) return null;

  return (
    <div
      className="modal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          cerrar();
        }
      }}
    >
      <div
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="modal-header">
          <h3 id={titleId} className="modal-title">
            {titulo}
          </h3>
          <button
            type="button"
            className="modal-close"
            onClick={cerrar}
            aria-label="Cerrar modal"
          >
            ✕
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
