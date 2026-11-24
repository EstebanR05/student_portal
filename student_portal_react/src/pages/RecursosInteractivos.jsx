import { useState } from "react";
import { useFormulario } from "../context/FormularioContext";
import Dropdown from "../components/Dropdown";
import Tabs from "../components/Tabs";
import Accordion from "../components/Accordion";
import Modal from "../components/Modal";
import Toast from "../components/Toast";

const PREGUNTAS_FRECUENTES = [
  {
    pregunta: "¿Cuál es el límite de créditos permitidos por semestre?",
    respuesta:
      "Un estudiante de pregrado puede matricular hasta 21 créditos regulares por periodo académico sin autorización especial."
  },
  {
    pregunta: "¿Cómo se calcula el promedio ponderado del semestre?",
    respuesta:
      "Cada asignatura aporta según sus cinco evaluaciones registradas. La nota mínima aprobatoria institucional es 3.0 sobre 5.0."
  },
  {
    pregunta: "¿Puedo cancelar una asignatura después de iniciar clases?",
    respuesta:
      "Sí, puedes gestionar retiros o ajustes de matrícula desde la sección de Servicios o radicando una solicitud en Contacto durante las primeras cuatro semanas."
  }
];

function RecursosInteractivos() {
  const { catalogo, agregarInscripcion, inscripciones } = useFormulario();
  const [cursoSeleccionado, setCursoSeleccionado] = useState(catalogo[0] || null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [toast, setToast] = useState(null);

  const opcionesCursos = catalogo.map((curso) => ({
    label: `${curso.titulo} (${curso.creditos} créditos)`,
    value: curso.id,
    curso
  }));

  const yaInscrito = cursoSeleccionado
    ? inscripciones.some((item) => item.id === cursoSeleccionado.id)
    : false;

  const confirmarInscripcion = () => {
    if (!cursoSeleccionado) return;
    agregarInscripcion(cursoSeleccionado);
    setModalAbierto(false);
    setToast({
      mensaje: `Inscripción confirmada para "${cursoSeleccionado.titulo}".`,
      tipo: "success"
    });
  };

  const tabsContenido = cursoSeleccionado
    ? [
        {
          titulo: "📖 Sílabo y Descripción",
          contenido: (
            <div>
              <p><strong>Asignatura:</strong> {cursoSeleccionado.titulo}</p>
              <p>{cursoSeleccionado.descripcion}</p>
              <p><strong>Categoría:</strong> {cursoSeleccionado.categoria}</p>
            </div>
          )
        },
        {
          titulo: "🕒 Horario y Aula",
          contenido: (
            <div>
              <p><strong>Docente:</strong> {cursoSeleccionado.docente}</p>
              <p><strong>Horario:</strong> {cursoSeleccionado.horario || "Por definir"}</p>
              <p><strong>Aula:</strong> {cursoSeleccionado.aula || "Campus Principal"}</p>
              <p><strong>Modalidad:</strong> {cursoSeleccionado.modalidad || "Presencial"}</p>
            </div>
          )
        },
        {
          titulo: "✅ Requisitos",
          contenido: (
            <div>
              <p><strong>Créditos académicos:</strong> {cursoSeleccionado.creditos} créditos</p>
              <p><strong>Estado actual:</strong> {cursoSeleccionado.estado}</p>
              <p>Se recomienda contar con disponibilidad en el horario asignado y haber aprobado los prerrequisitos de nivel básico.</p>
            </div>
          )
        }
      ]
    : [];

  return (
    <main className="main-content page-enter">
      <section className="section-block">
        <h2>🧩 Recursos Interactivos del Estudiante</h2>
        <p>
          Explora los detalles de cada asignatura, consulta el reglamento académico y confirma tu preinscripción
          utilizando los componentes interactivos del portal.
        </p>

        <div className="recursos-panel">
          <div className="recursos-selector">
            <label style={{ marginBottom: "0.5rem" }}>1. Selecciona una asignatura para inspeccionar:</label>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
              <Dropdown
                label={cursoSeleccionado ? cursoSeleccionado.titulo : "Seleccionar asignatura"}
                opciones={opcionesCursos}
                onSeleccionar={(opcion) => {
                  setCursoSeleccionado(opcion.curso);
                  setToast({
                    mensaje: `Consultando ficha de ${opcion.curso.titulo}`,
                    tipo: "warning"
                  });
                }}
              />

              {cursoSeleccionado && (
                <button
                  type="button"
                  className="btn btn--primary"
                  onClick={() => setModalAbierto(true)}
                  disabled={yaInscrito}
                >
                  {yaInscrito ? "✓ Ya matriculada" : "➕ Preinscribir Asignatura"}
                </button>
              )}
            </div>
          </div>

          {cursoSeleccionado && (
            <div style={{ marginTop: "1.75rem" }}>
              <h3 style={{ color: "var(--color-primary)", marginBottom: "0.75rem" }}>
                2. Ficha Académica de {cursoSeleccionado.titulo}
              </h3>
              <Tabs items={tabsContenido} />
            </div>
          )}

          <div style={{ marginTop: "2.25rem" }}>
            <h3 style={{ color: "var(--color-primary)", marginBottom: "0.75rem" }}>
              3. Preguntas Frecuentes de Matrícula
            </h3>
            <Accordion items={PREGUNTAS_FRECUENTES} />
          </div>
        </div>
      </section>

      <Modal
        abierto={modalAbierto}
        cerrar={() => setModalAbierto(false)}
        titulo="Confirmar Inscripción de Asignatura"
      >
        {cursoSeleccionado && (
          <div>
            <p>
              ¿Deseas agregar <strong>{cursoSeleccionado.titulo}</strong> ({cursoSeleccionado.creditos} créditos)
              a tu plan de matrícula actual?
            </p>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
              Docente: {cursoSeleccionado.docente} · Horario: {cursoSeleccionado.horario || "Por definir"}
            </p>
            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end", marginTop: "1.5rem" }}>
              <button
                type="button"
                className="btn btn--outline"
                onClick={() => setModalAbierto(false)}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn--primary"
                onClick={confirmarInscripcion}
              >
                Confirmar Matrícula
              </button>
            </div>
          </div>
        )}
      </Modal>

      {toast && (
        <Toast
          mensaje={toast.mensaje}
          tipo={toast.tipo}
          cerrar={() => setToast(null)}
        />
      )}
    </main>
  );
}

export default RecursosInteractivos;
