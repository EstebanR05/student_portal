import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { usePortal } from "../context/PortalContext";
import BackButton from "../components/BackButton";

function SemestreNotas() {
  const { numero } = useParams();
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const {
    estudiantes,
    materias,
    calcularPromedioMateria,
    evaluarEstadoMateria
  } = usePortal();

  const estudiante = estudiantes.find((e) => e.id === usuario?.id);
  const semestre = estudiante?.semestresCursados.find(
    (s) => s.semestreNumero === Number(numero)
  );

  return (
    <main className="main-content page-enter">
      <div className="section-block">
        <div className="dashboard-section-head">
          <div className="page-head-left">
            <BackButton onClick={() => navigate("/semestres")} label="Volver a semestres" />
            <div>
              <h2>Notas · Semestre {numero}</h2>
              <p style={{ margin: "0.25rem 0 0", color: "var(--text-muted)" }}>
                {semestre ? `Periodo ${semestre.periodo} · Estado: ${semestre.estado}` : "Semestre no encontrado"}
              </p>
            </div>
          </div>
        </div>

        {!semestre || semestre.notas.length === 0 ? (
          <div className="alert-box alert-box--info" style={{ marginTop: "1rem" }}>
            No hay calificaciones registradas para este semestre todavía.
          </div>
        ) : (
          <div className="table-responsive" style={{ marginTop: "1.25rem" }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Materia</th>
                  <th>Créditos</th>
                  <th>Corte 1</th>
                  <th>Corte 2</th>
                  <th>Corte 3</th>
                  <th>Promedio</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {semestre.notas.map((n) => {
                  const mat = materias.find((m) => m.id === n.materiaId);
                  const promedio = calcularPromedioMateria(n.nota1, n.nota2, n.nota3);
                  const estado = evaluarEstadoMateria(promedio);
                  const gana = estado === "Gana";

                  return (
                    <tr key={n.materiaId}>
                      <td>{mat?.codigo || n.materiaId}</td>
                      <td className="font-bold">{mat?.titulo || "Asignatura"}</td>
                      <td>{mat?.creditos ?? "-"}</td>
                      <td>{Number(n.nota1).toFixed(1)}</td>
                      <td>{Number(n.nota2).toFixed(1)}</td>
                      <td>{Number(n.nota3).toFixed(1)}</td>
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
        )}
      </div>
    </main>
  );
}

export default SemestreNotas;
