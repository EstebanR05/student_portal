import { useState } from "react";
import { usePortal } from "../context/PortalContext";
import Toast from "../components/Toast";

function AdminConfiguraciones() {
  const { config, actualizarConfig } = usePortal();
  const [maxCreditos, setMaxCreditos] = useState(String(config.maxCreditosSemestre));
  const [toast, setToast] = useState({ mensaje: "", tipo: "success" });

  const manejarGuardar = (e) => {
    e.preventDefault();
    const valor = Number(maxCreditos);
    if (!Number.isInteger(valor) || valor < 1 || valor > 40) {
      setToast({
        mensaje: "Ingresa un número entero válido entre 1 y 40 créditos.",
        tipo: "error"
      });
      return;
    }

    actualizarConfig({ maxCreditosSemestre: valor });
    setToast({
      mensaje: `Límite actualizado a ${valor} créditos por semestre.`,
      tipo: "success"
    });
  };

  return (
    <main className="main-content page-enter">
      <div className="section-block">
        <h2>Configuraciones académicas</h2>
        <p style={{ marginTop: "0.25rem", color: "var(--text-muted)" }}>
          Define los parámetros globales que regulan la matrícula semestral.
        </p>

        <form onSubmit={manejarGuardar} className="card" style={{ marginTop: "1.25rem", maxWidth: "480px" }}>
          <div className="form-group">
            <label htmlFor="cfg-max-creditos">Máximo de créditos por semestre</label>
            <input
              id="cfg-max-creditos"
              type="number"
              min="1"
              max="40"
              value={maxCreditos}
              onChange={(e) => setMaxCreditos(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn--primary">
            Guardar configuración
          </button>
        </form>
      </div>

      <Toast
        mensaje={toast.mensaje}
        tipo={toast.tipo}
        cerrar={() => setToast({ mensaje: "", tipo: "success" })}
      />
    </main>
  );
}

export default AdminConfiguraciones;
