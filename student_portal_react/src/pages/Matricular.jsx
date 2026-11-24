import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { usePortal } from "../context/PortalContext";
import Tabs from "../components/Tabs";
import Toast from "../components/Toast";

function Matricular() {
  const location = useLocation();
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const {
    config,
    estudiantes,
    carreras,
    materias,
    obtenerMateriasQuedadas
  } = usePortal();

  const semestreNumero = location.state?.semestreNumero;
  const [seleccionadas, setSeleccionadas] = useState([]);
  const [toast, setToast] = useState({ mensaje: "", tipo: "warning" });

  if (!semestreNumero) {
    return <Navigate to="/semestres" replace />;
  }

  const estudiante = estudiantes.find((e) => e.id === usuario?.id);
  const carrera = carreras.find((c) => c.id === estudiante?.carreraId);
  const planSemestre = carrera?.semestres.find((s) => s.numero === Number(semestreNumero));

  const materiasSemestre = (planSemestre?.materiaIds || [])
    .map((id) => materias.find((m) => m.id === id))
    .filter(Boolean);

  const materiasQuedadas = estudiante ? obtenerMateriasQuedadas(estudiante.id) : [];

  const totalCreditos = seleccionadas.reduce((acc, m) => acc + Number(m.creditos || 0), 0);

  const toggleMateria = (materia) => {
    const yaSeleccionada = seleccionadas.some((m) => m.id === materia.id);
    if (yaSeleccionada) {
      setSeleccionadas((prev) => prev.filter((m) => m.id !== materia.id));
      return;
    }

    const nuevoTotal = totalCreditos + Number(materia.creditos || 0);
    if (nuevoTotal > config.maxCreditosSemestre) {
      setToast({
        mensaje: `No puedes superar el límite de ${config.maxCreditosSemestre} créditos por semestre.`,
        tipo: "warning"
      });
      return;
    }

    setSeleccionadas((prev) => [...prev, materia]);
  };

  const renderListaMaterias = (lista, mensajeVacio) => {
    if (lista.length === 0) {
      return <div className="alert-box alert-box--info">{mensajeVacio}</div>;
    }

    return (
      <div className="card-grid">
        {lista.map((mat) => {
          const marcada = seleccionadas.some((m) => m.id === mat.id);
          return (
            <article key={mat.id} className={`card ${marcada ? "card--accent" : ""}`}>
              <div className="card__header">
                <h3 className="card__title">{mat.titulo}</h3>
                <span className="badge badge--pending">{mat.creditos} cr.</span>
              </div>
              <p className="card__desc">{mat.descripcion}</p>
              <div className="card__meta-list">
                <div className="card__meta-item">
                  <span className="meta-label">Código</span>
                  <span className="meta-value">{mat.codigo}</span>
                </div>
                <div className="card__meta-item">
                  <span className="meta-label">Docente</span>
                  <span className="meta-value">{mat.docente}</span>
                </div>
                {mat.promedioAnterior !== undefined && (
                  <div className="card__meta-item">
                    <span className="meta-label">Nota previa (Sem. {mat.semestreOrigen})</span>
                    <span className="meta-value">{mat.promedioAnterior.toFixed(2)}</span>
                  </div>
                )}
              </div>
              <div style={{ marginTop: "1rem" }}>
                <button
                  type="button"
                  className={`btn btn--sm ${marcada ? "btn--danger-subtle" : "btn--primary"}`}
                  onClick={() => toggleMateria(mat)}
                >
                  {marcada ? "Quitar materia" : "Agregar materia"}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    );
  };

  const tabsItems = [
    {
      titulo: "Materias del Semestre",
      contenido: renderListaMaterias(
        materiasSemestre,
        "No hay materias asignadas a este semestre en tu plan de estudios."
      )
    },
    {
      titulo: `Materias Quedadas / Reprobadas (${materiasQuedadas.length})`,
      contenido: renderListaMaterias(
        materiasQuedadas,
        "No tienes materias reprobadas pendientes por repetir."
      )
    }
  ];

  return (
    <main className="main-content page-enter">
      <div className="section-block">
        <div className="dashboard-section-head">
          <div>
            <h2>Matrícula · Semestre {semestreNumero}</h2>
            <p style={{ margin: "0.25rem 0 0", color: "var(--text-muted)" }}>
              Selecciona las asignaturas que deseas inscribir para este periodo.
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
            <span className="badge badge--approved" data-testid="contador-creditos">
              {totalCreditos} / {config.maxCreditosSemestre} créditos
            </span>
            <button
              type="button"
              className="btn btn--outline btn--sm"
              onClick={() => navigate("/semestres")}
            >
              ← Volver
            </button>
          </div>
        </div>

        <div style={{ marginTop: "1.25rem" }}>
          <Tabs items={tabsItems} />
        </div>

        <div
          className="matricula-summary"
          style={{
            marginTop: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem"
          }}
        >
          <div>
            <strong>Materias seleccionadas: {seleccionadas.length}</strong>
            <p style={{ margin: "0.2rem 0 0", color: "var(--text-muted)", fontSize: "0.9rem" }}>
              Total de créditos: {totalCreditos} de {config.maxCreditosSemestre} permitidos
            </p>
          </div>
          <button
            type="button"
            className="btn btn--primary"
            disabled={seleccionadas.length === 0}
            onClick={() =>
              navigate("/matricular/formulario", {
                state: {
                  semestreNumero,
                  materiasSeleccionadas: seleccionadas,
                  totalCreditos
                }
              })
            }
          >
            Continuar al Formulario de Matriculación →
          </button>
        </div>
      </div>

      <Toast
        mensaje={toast.mensaje}
        tipo={toast.tipo}
        cerrar={() => setToast({ mensaje: "", tipo: "warning" })}
      />
    </main>
  );
}

export default Matricular;
