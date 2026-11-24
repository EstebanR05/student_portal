import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { usePortal } from "../context/PortalContext";
import Toast from "../components/Toast";

function SemestresCursados() {
  const { usuario } = useAuth();
  const { estudiantes, carreras, matriculas } = usePortal();
  const navigate = useNavigate();
  const location = useLocation();

  const [toastMensaje, setToastMensaje] = useState(location.state?.toastMensaje || "");

  useEffect(() => {
    if (location.state?.toastMensaje) {
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const estudiante = estudiantes.find((e) => e.id === usuario?.id);
  const carrera = carreras.find((c) => c.id === estudiante?.carreraId);
  const misMatriculas = matriculas.filter((m) => m.estudianteId === estudiante?.id);

  if (!estudiante) {
    return (
      <main className="main-content page-enter">
        <div className="alert-box alert-box--error">
          No se encontró información académica para este usuario.
        </div>
      </main>
    );
  }

  return (
    <main className="main-content page-enter">
      <div className="section-block">
        <div className="dashboard-section-head">
          <div>
            <h2>Semestres cursados y matrícula</h2>
            <p style={{ margin: "0.25rem 0 0", color: "var(--text-muted)" }}>
              Programa: <strong>{carrera?.nombre || "Ingeniería"}</strong> · Código:{" "}
              <strong>{estudiante.codigo}</strong>
            </p>
          </div>
        </div>

        <div className="table-responsive" style={{ marginTop: "1.25rem" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Semestre</th>
                <th>Periodo</th>
                <th>Estado</th>
                <th>Materias</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {estudiante.semestresCursados.map((sem) => {
                const solicitudPendiente = misMatriculas.find(
                  (m) => m.semestreNumero === sem.semestreNumero && m.estado === "Pendiente"
                );
                const badgeClass =
                  sem.estado === "Aprobado"
                    ? "badge--approved"
                    : sem.estado === "En curso"
                    ? "badge--pending"
                    : "badge--pending";

                return (
                  <tr key={sem.semestreNumero}>
                    <td className="font-bold">Semestre {sem.semestreNumero}</td>
                    <td>{sem.periodo}</td>
                    <td>
                      <span className={`badge ${badgeClass}`}>{sem.estado}</span>
                    </td>
                    <td>
                      {sem.estado === "Disponible"
                        ? solicitudPendiente
                          ? `Solicitud pendiente (${solicitudPendiente.totalCreditos} cr.)`
                          : "Listo para matricular"
                        : `${sem.notas.length} asignatura(s)`}
                    </td>
                    <td className="text-center">
                      {sem.estado === "Disponible" ? (
                        solicitudPendiente ? (
                          <span className="badge badge--pending">En revisión</span>
                        ) : (
                          <button
                            type="button"
                            className="btn btn--primary btn--sm"
                            onClick={() =>
                              navigate("/matricular", {
                                state: { semestreNumero: sem.semestreNumero }
                              })
                            }
                          >
                            Matricular
                          </button>
                        )
                      ) : (
                        <button
                          type="button"
                          className="btn btn--outline btn--sm"
                          onClick={() => navigate(`/semestres/${sem.semestreNumero}/notas`)}
                        >
                          Ver notas
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {misMatriculas.length > 0 && (
        <div className="section-block" style={{ marginTop: "1.5rem" }}>
          <h3>Historial de solicitudes de matrícula</h3>
          <div className="table-responsive" style={{ marginTop: "1rem" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Semestre</th>
                  <th>Materias</th>
                  <th>Créditos</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {misMatriculas.map((matr) => (
                  <tr key={matr.id}>
                    <td className="font-bold">Semestre {matr.semestreNumero}</td>
                    <td>{matr.materias.map((m) => m.titulo).join(", ")}</td>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <Toast mensaje={toastMensaje} tipo="success" cerrar={() => setToastMensaje("")} />
    </main>
  );
}

export default SemestresCursados;
