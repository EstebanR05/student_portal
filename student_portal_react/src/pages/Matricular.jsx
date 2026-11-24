import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { usePortal } from "../context/PortalContext";
import BackButton from "../components/BackButton";
import Tabs from "../components/Tabs";
import Toast from "../components/Toast";
import { detectarCrucesHorario, hayCruceEntreMaterias } from "../utils/horarios";

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
  const { cruces, idsEnCruce } = detectarCrucesHorario(seleccionadas);
  const hayCruces = cruces.length > 0;

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

    const conflicto = seleccionadas.find((m) => hayCruceEntreMaterias(m, materia));
    if (conflicto) {
      setToast({
        mensaje: `Cruce de horario: "${materia.titulo}" se cruza con "${conflicto.titulo}". Cambia una de las dos para poder continuar.`,
        tipo: "error"
      });
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
          const enCruce = marcada && idsEnCruce.has(mat.id);
          return (
            <article
              key={mat.id}
              className={`card ${enCruce ? "card--conflict" : marcada ? "card--accent" : ""}`}
            >
              <div className="card__header">
                <h3 className="card__title">{mat.titulo}</h3>
                <div style={{ display: "inline-flex", gap: "0.4rem", alignItems: "center" }}>
                  {enCruce && <span className="badge badge--failed">Cruce de horario</span>}
                  <span className="badge badge--pending">{mat.creditos} cr.</span>
                </div>
              </div>
              <p className="card__desc">{mat.descripcion}</p>
              <div className="card__meta-list">
                <div className="card__meta-item">
                  <span className="meta-label">Código</span>
                  <span className="meta-value">{mat.codigo}</span>
                </div>
                <div className="card__meta-item">
                  <span className="meta-label">Horario</span>
                  <span className="meta-value">{mat.horario}</span>
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
          <div className="page-head-left">
            <BackButton onClick={() => navigate("/semestres")} label="Volver a semestres" />
            <div>
              <h2>Matrícula · Semestre {semestreNumero}</h2>
              <p style={{ margin: "0.25rem 0 0", color: "var(--text-muted)" }}>
                Selecciona las asignaturas que deseas inscribir para este periodo.
              </p>
            </div>
          </div>
          <span className="badge badge--approved" data-testid="contador-creditos">
            {totalCreditos} / {config.maxCreditosSemestre} créditos
          </span>
        </div>

        <div style={{ marginTop: "1.25rem" }}>
          <Tabs items={tabsItems} />
        </div>

        {hayCruces && (
          <div className="alert-box alert-box--error" role="alert" style={{ marginTop: "1.25rem" }}>
            <strong>⚠️ Tienes cruces de horario en tu selección:</strong>
            <ul style={{ margin: "0.4rem 0 0 1.2rem", padding: 0 }}>
              {cruces.map((c) => (
                <li key={`${c.materiaA.id}-${c.materiaB.id}`}>
                  <strong>{c.materiaA.titulo}</strong> ({c.materiaA.horario}) se cruza con{" "}
                  <strong>{c.materiaB.titulo}</strong> ({c.materiaB.horario}) el{" "}
                  {c.diasComunes.join(", ")}.
                </li>
              ))}
            </ul>
          </div>
        )}

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
              {hayCruces ? " · Resuelve los cruces de horario para continuar." : ""}
            </p>
          </div>
          <button
            type="button"
            className="btn btn--primary"
            disabled={seleccionadas.length === 0 || hayCruces}
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
