import { useState } from "react";
import { usePortal } from "../context/PortalContext";
import Modal from "../components/Modal";
import Toast from "../components/Toast";

function AdminMatriculas() {
  const { matriculas, resolverSolicitudMatricula } = usePortal();
  const [seleccionada, setSeleccionada] = useState(null);
  const [toast, setToast] = useState({ mensaje: "", tipo: "success" });

  const manejarResolucion = (estado) => {
    if (!seleccionada) return;
    resolverSolicitudMatricula(seleccionada.id, estado);
    setToast({
      mensaje: `Solicitud de ${seleccionada.estudianteNombre} marcada como ${estado}.`,
      tipo: estado === "Aprobada" ? "success" : "warning"
    });
    setSeleccionada(null);
  };

  return (
    <main className="main-content page-enter">
      <div className="section-block">
        <h2>Solicitudes de Matrícula</h2>
        <p style={{ marginTop: "0.25rem", color: "var(--text-muted)" }}>
          Revisa el detalle de cada solicitud y aprueba o rechaza la inscripción semestral.
        </p>

        <div className="table-responsive" style={{ marginTop: "1.25rem" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Estudiante</th>
                <th>Carrera</th>
                <th>Semestre</th>
                <th>Créditos</th>
                <th>Estado</th>
                <th className="text-center">Detalle</th>
              </tr>
            </thead>
            <tbody>
              {matriculas.map((matr) => (
                <tr key={matr.id}>
                  <td>
                    <div className="font-bold">{matr.estudianteNombre}</div>
                    <div style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                      {matr.estudianteCorreo}
                    </div>
                  </td>
                  <td>{matr.carreraNombre}</td>
                  <td>Semestre {matr.semestreNumero}</td>
                  <td>{matr.totalCreditos}</td>
                  <td>
                    <span
                      className={`badge ${
                        matr.estado === "Aprobada"
                          ? "badge--approved"
                          : matr.estado === "Rechazada"
                          ? "badge--failed"
                          : "badge--pending"
                      }`}
                    >
                      {matr.estado}
                    </span>
                  </td>
                  <td className="text-center">
                    <button
                      type="button"
                      className="btn btn--outline btn--sm"
                      onClick={() => setSeleccionada(matr)}
                    >
                      Ver
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        abierto={Boolean(seleccionada)}
        cerrar={() => setSeleccionada(null)}
        titulo={seleccionada ? `Matrícula · ${seleccionada.estudianteNombre}` : "Detalle"}
      >
        {seleccionada && (
          <div>
            <div className="card__meta-list">
              <div className="card__meta-item">
                <span className="meta-label">Correo</span>
                <span className="meta-value">{seleccionada.estudianteCorreo}</span>
              </div>
              <div className="card__meta-item">
                <span className="meta-label">Teléfono</span>
                <span className="meta-value">{seleccionada.telefono || "No registrado"}</span>
              </div>
              <div className="card__meta-item">
                <span className="meta-label">Carrera</span>
                <span className="meta-value">{seleccionada.carreraNombre}</span>
              </div>
              <div className="card__meta-item">
                <span className="meta-label">Semestre / Créditos</span>
                <span className="meta-value">
                  Semestre {seleccionada.semestreNumero} ({seleccionada.totalCreditos} créditos)
                </span>
              </div>
            </div>

            <h4 style={{ margin: "1rem 0 0.5rem" }}>Materias solicitadas</h4>
            <ul style={{ margin: 0, paddingLeft: "1.2rem" }}>
              {seleccionada.materias.map((m) => (
                <li key={m.id} style={{ marginBottom: "0.3rem" }}>
                  <strong>{m.codigo}</strong> · {m.titulo} ({m.creditos} cr.)
                </li>
              ))}
            </ul>

            {seleccionada.observaciones && (
              <p style={{ marginTop: "0.85rem", fontSize: "0.9rem", color: "var(--text-muted)" }}>
                <strong>Observaciones:</strong> {seleccionada.observaciones}
              </p>
            )}

            <div className="modal-actions">
              {seleccionada.estado === "Pendiente" ? (
                <>
                  <button
                    type="button"
                    className="btn btn--danger-subtle"
                    onClick={() => manejarResolucion("Rechazada")}
                  >
                    Rechazar
                  </button>
                  <button
                    type="button"
                    className="btn btn--primary"
                    onClick={() => manejarResolucion("Aprobada")}
                  >
                    Aprobar
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className="btn btn--outline"
                  onClick={() => setSeleccionada(null)}
                >
                  Cerrar
                </button>
              )}
            </div>
          </div>
        )}
      </Modal>

      <Toast
        mensaje={toast.mensaje}
        tipo={toast.tipo}
        cerrar={() => setToast({ mensaje: "", tipo: "success" })}
      />
    </main>
  );
}

export default AdminMatriculas;
