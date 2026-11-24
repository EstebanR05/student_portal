import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePortal } from "../context/PortalContext";
import Tabs from "../components/Tabs";
import Toast from "../components/Toast";

function AdminEstudianteNotas() {
  const { estudianteId } = useParams();
  const navigate = useNavigate();
  const {
    estudiantes,
    carreras,
    materias,
    actualizarNotaEstudiante,
    calcularPromedioMateria,
    evaluarEstadoMateria
  } = usePortal();

  const [toast, setToast] = useState({ mensaje: "", tipo: "success" });

  const estudiante = estudiantes.find((e) => e.id === estudianteId);
  const carrera = carreras.find((c) => c.id === estudiante?.carreraId);

  if (!estudiante) {
    return (
      <main className="main-content page-enter">
        <div className="alert-box alert-box--error">Estudiante no encontrado.</div>
        <button
          type="button"
          className="btn btn--outline btn--sm"
          style={{ marginTop: "1rem" }}
          onClick={() => navigate("/admin/estudiantes")}
        >
          ← Volver a estudiantes
        </button>
      </main>
    );
  }

  const manejarCambioNota = (semestreNumero, notaActual, campo, valorRaw) => {
    const valor = Math.max(0, Math.min(5, Number(valorRaw) || 0));
    const nuevasNotas = {
      nota1: notaActual.nota1,
      nota2: notaActual.nota2,
      nota3: notaActual.nota3,
      [campo]: valor
    };
    actualizarNotaEstudiante(estudiante.id, semestreNumero, notaActual.materiaId, nuevasNotas);
    setToast({ mensaje: "Calificación guardada.", tipo: "success" });
  };

  const tabsItems = estudiante.semestresCursados.map((sem) => ({
    titulo: `Semestre ${sem.semestreNumero} (${sem.estado})`,
    contenido:
      sem.notas.length === 0 ? (
        <div className="alert-box alert-box--info">
          Este semestre aún no tiene materias con calificaciones asignadas.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Código</th>
                <th>Materia</th>
                <th>Corte 1</th>
                <th>Corte 2</th>
                <th>Corte 3</th>
                <th>Promedio</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {sem.notas.map((n) => {
                const mat = materias.find((m) => m.id === n.materiaId);
                const promedio = calcularPromedioMateria(n.nota1, n.nota2, n.nota3);
                const estado = evaluarEstadoMateria(promedio);
                const gana = estado === "Gana";

                return (
                  <tr key={n.materiaId}>
                    <td>{mat?.codigo || n.materiaId}</td>
                    <td className="font-bold">{mat?.titulo || "Asignatura"}</td>
                    <td>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        aria-label={`Nota 1 ${mat?.titulo || n.materiaId}`}
                        className="grade-input"
                        value={n.nota1}
                        onChange={(e) =>
                          manejarCambioNota(sem.semestreNumero, n, "nota1", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        aria-label={`Nota 2 ${mat?.titulo || n.materiaId}`}
                        className="grade-input"
                        value={n.nota2}
                        onChange={(e) =>
                          manejarCambioNota(sem.semestreNumero, n, "nota2", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        aria-label={`Nota 3 ${mat?.titulo || n.materiaId}`}
                        className="grade-input"
                        value={n.nota3}
                        onChange={(e) =>
                          manejarCambioNota(sem.semestreNumero, n, "nota3", e.target.value)
                        }
                      />
                    </td>
                    <td className="font-bold">{promedio.toFixed(2)}</td>
                    <td>
                      <span className={`badge ${gana ? "badge--approved" : "badge--failed"}`}>
                        {estado}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )
  }));

  return (
    <main className="main-content page-enter">
      <div className="section-block">
        <div className="dashboard-section-head">
          <div>
            <h2>Notas de {estudiante.nombre}</h2>
            <p style={{ margin: "0.25rem 0 0", color: "var(--text-muted)" }}>
              Código: <strong>{estudiante.codigo}</strong> · Carrera:{" "}
              <strong>{carrera?.nombre || "Sin asignar"}</strong>
            </p>
          </div>
          <button
            type="button"
            className="btn btn--outline btn--sm"
            onClick={() => navigate("/admin/estudiantes")}
          >
            ← Volver a estudiantes
          </button>
        </div>

        <div style={{ marginTop: "1.25rem" }}>
          <Tabs items={tabsItems} />
        </div>
      </div>

      <Toast
        mensaje={toast.mensaje}
        tipo={toast.tipo}
        cerrar={() => setToast({ mensaje: "", tipo: "success" })}
      />
    </main>
  );
}

export default AdminEstudianteNotas;
