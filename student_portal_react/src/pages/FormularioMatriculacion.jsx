import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { usePortal } from "../context/PortalContext";
import BackButton from "../components/BackButton";
import Accordion from "../components/Accordion";
import { detectarCrucesHorario } from "../utils/horarios";

const TERMINOS_MATRICULA = [
  {
    pregunta: "Validación de créditos y prerrequisitos",
    respuesta:
      "La solicitud queda sujeta a verificación por parte de la Coordinación Académica y al cumplimiento del límite de créditos semestrales."
  },
  {
    pregunta: "Cambio de estado al aprobar",
    respuesta:
      "Una vez el administrador apruebe tu solicitud, el semestre pasará automáticamente a estado 'En curso' con tus materias inscritas."
  }
];

function FormularioMatriculacion() {
  const location = useLocation();
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const { estudiantes, carreras, crearSolicitudMatricula } = usePortal();

  const materiasSeleccionadas = location.state?.materiasSeleccionadas;
  const semestreNumero = location.state?.semestreNumero;
  const totalCreditos = location.state?.totalCreditos || 0;

  const estudiante = estudiantes.find((e) => e.id === usuario?.id);
  const carrera = carreras.find((c) => c.id === estudiante?.carreraId);

  const [nombre, setNombre] = useState(estudiante?.nombre || usuario?.nombre || "");
  const [correo, setCorreo] = useState(estudiante?.correo || usuario?.correo || "");
  const [telefono, setTelefono] = useState(estudiante?.telefono || "");
  const [observaciones, setObservaciones] = useState("");
  const [error, setError] = useState("");

  const { cruces } = detectarCrucesHorario(materiasSeleccionadas);

  if (!materiasSeleccionadas?.length || !semestreNumero || cruces.length > 0) {
    return <Navigate to="/semestres" replace />;
  }

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (!nombre.trim() || !correo.trim() || !telefono.trim()) {
      setError("Por favor completa nombre, correo y teléfono de contacto.");
      return;
    }

    crearSolicitudMatricula({
      estudianteId: estudiante?.id || usuario?.id,
      estudianteNombre: nombre.trim(),
      estudianteCorreo: correo.trim(),
      carreraNombre: carrera?.nombre || usuario?.programa || "Ingeniería en Sistemas",
      semestreNumero,
      materias: materiasSeleccionadas.map((m) => ({
        id: m.id,
        titulo: m.titulo,
        codigo: m.codigo,
        creditos: m.creditos
      })),
      totalCreditos,
      telefono: telefono.trim(),
      observaciones: observaciones.trim() || "Sin observaciones adicionales."
    });

    navigate("/semestres", {
      replace: true,
      state: { toastMensaje: "Solicitud de matrícula radicada correctamente." }
    });
  };

  return (
    <main className="main-content page-enter">
      <div className="section-block">
        <div className="dashboard-section-head">
          <div className="page-head-left">
            <BackButton
              onClick={() => navigate("/matricular", { state: { semestreNumero } })}
              label="Volver a selección de materias"
            />
            <div>
              <h2>Formulario de Matriculación · Semestre {semestreNumero}</h2>
              <p style={{ margin: "0.25rem 0 0", color: "var(--text-muted)" }}>
                Confirma tus datos de contacto y revisa las asignaturas seleccionadas.
              </p>
            </div>
          </div>
        </div>

        <div className="contacto-layout" style={{ marginTop: "1.25rem" }}>
          <form onSubmit={manejarEnvio} className="card" noValidate>
            <h3 style={{ marginTop: 0 }}>Datos del estudiante</h3>

            <div className="form-group">
              <label htmlFor="matr-nombre">Nombre completo</label>
              <input
                id="matr-nombre"
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="matr-correo">Correo institucional</label>
              <input
                id="matr-correo"
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="matr-telefono">Teléfono de contacto</label>
              <input
                id="matr-telefono"
                type="tel"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="matr-obs">Observaciones (opcional)</label>
              <textarea
                id="matr-obs"
                rows="3"
                value={observaciones}
                onChange={(e) => setObservaciones(e.target.value)}
                placeholder="Notas sobre cruce de horarios, homologaciones, etc."
              />
            </div>

            {error && (
              <div className="alert-box alert-box--error" role="alert" style={{ marginBottom: "1rem" }}>
                {error}
              </div>
            )}

            <button type="submit" className="btn btn--primary">
              Enviar solicitud de matrícula
            </button>
          </form>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div className="card">
              <div className="card__header">
                <h3 className="card__title">Resumen de matrícula</h3>
                <span className="badge badge--approved">{totalCreditos} créditos</span>
              </div>
              <ul style={{ margin: "0.75rem 0 0", paddingLeft: "1.2rem" }}>
                {materiasSeleccionadas.map((m) => (
                  <li key={m.id} style={{ marginBottom: "0.4rem" }}>
                    <strong>{m.codigo}</strong> · {m.titulo} ({m.creditos} cr.)
                  </li>
                ))}
              </ul>
            </div>

            <div className="card">
              <h3 style={{ marginTop: 0 }}>Términos de matrícula</h3>
              <Accordion items={TERMINOS_MATRICULA} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default FormularioMatriculacion;
