import { useContext } from "react";
import { Link } from "react-router-dom";
import { FormularioContext } from "../context/FormularioContext";
import InfoCard from "../components/InfoCard";
import ClienteActual from "../components/ClienteActual";

function Inicio() {
  const { formulario, totalCreditos, cantidadInscripciones } = useContext(FormularioContext);

  const nombreEstudiante = formulario.nombre ? formulario.nombre : "Carlos Andrés Mendoza Silva";
  const programaEstudiante = formulario.programa ? formulario.programa : "Ingeniería de Sistemas y Computación";

  const datosEstudiante = [
    { label: "Estudiante", value: nombreEstudiante },
    { label: "Código", value: "EST-20242089" },
    { label: "Programa", value: programaEstudiante },
    { label: "Correo", value: formulario.correo || "estudiante@universidad.edu.co" }
  ];

  const datosAcademicos = [
    { label: "Semestre", value: "4° Semestre Académico" },
    { label: "Materias en Matrícula", value: `${cantidadInscripciones} Asignaturas` },
    { label: "Créditos Matriculados", value: `${totalCreditos > 0 ? totalCreditos : 20} Créditos` },
    { label: "Estado de Matrícula", value: "Activo / Matriculado" }
  ];

  return (
    <main className="main-content">
      <section className="section-block">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <p className="badge badge--approved" style={{ marginBottom: "0.4rem" }}>
              CORTE 2 · APLICACIONES WEB
            </p>
            <h2 style={{ margin: 0 }}>🏠 Portal Académico del Estudiante</h2>
          </div>

          <div style={{ display: "flex", gap: "0.6rem" }}>
            <Link to="/servicios" className="btn btn--primary btn--sm">
              Explorar Asignaturas
            </Link>
            <Link to="/contacto" className="btn btn--outline btn--sm">
              Actualizar Datos
            </Link>
          </div>
        </div>

        <p style={{ marginTop: "1rem" }}>
          Bienvenido al portal web institucional de <strong>Academiq Hub</strong>. Esta plataforma integra
          los conceptos desarrollados en clase para una experiencia fluida como Single Page Application (SPA).
        </p>

        {/* Componente Reutilizable ClienteActual que consume el Estado Global */}
        <div style={{ margin: "1.75rem 0" }}>
          <ClienteActual />
        </div>

        {/* Tarjetas informativas del estudiante y periodo */}
        <div className="card-grid">
          <InfoCard
            titulo="Datos del Estudiante"
            descripcion="Información del estudiante sincronizada con el estado global."
            items={datosEstudiante}
            destacado={true}
          />

          <InfoCard
            titulo="Resumen del Periodo Académico"
            descripcion="Carga académica y créditos vigentes conservados en almacenamiento local."
            items={datosAcademicos}
            destacado={true}
          />
        </div>

        {/* Resumen conceptual de las actividades del Corte 2 */}
        <div style={{ marginTop: "2.5rem" }}>
          <h3 style={{ color: "var(--color-primary)", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.5rem" }}>
            Arquitectura y Conceptos Clave Implementados
          </h3>

          <div className="card-grid">
            <article className="card">
              <div className="card__header">
                <h4 className="card__title" style={{ fontSize: "1rem" }}>1. Componentes Reutilizables</h4>
              </div>
              <p className="card__desc">
                Modularización de la interfaz en componentes independientes y reutilizables como <code>Header</code>,
                <code>Navbar</code>, <code>Footer</code>, <code>ServiceCard</code>, <code>InfoCard</code> y <code>ClienteActual</code>.
              </p>
            </article>

            <article className="card">
              <div className="card__header">
                <h4 className="card__title" style={{ fontSize: "1rem" }}>2. Enrutamiento con React Router</h4>
              </div>
              <p className="card__desc">
                Navegación SPA sin recarga del navegador con <code>BrowserRouter</code>, <code>Routes</code>, <code>Route</code>,
                parámetros dinámicos con <code>useParams()</code> y redirección con <code>useNavigate()</code>.
              </p>
            </article>

            <article className="card">
              <div className="card__header">
                <h4 className="card__title" style={{ fontSize: "1rem" }}>3. Formularios Controlados</h4>
              </div>
              <p className="card__desc">
                Gestión de formularios con <code>useState</code>, captura genérica de eventos con <code>onChange</code>,
                bloqueo de recarga con <code>preventDefault()</code> y validaciones en tiempo real.
              </p>
            </article>

            <article className="card">
              <div className="card__header">
                <h4 className="card__title" style={{ fontSize: "1rem" }}>4. Estado Global (Context API)</h4>
              </div>
              <p className="card__desc">
                Implementación de <code>FormularioContext</code> y <code>FormularioProvider</code> para compartir datos del estudiante
                y del plan de matrícula entre múltiples componentes sin incurrir en prop drilling.
              </p>
            </article>

            <article className="card">
              <div className="card__header">
                <h4 className="card__title" style={{ fontSize: "1rem" }}>5. Persistencia Local</h4>
              </div>
              <p className="card__desc">
                Sincronización automática del estado con <code>localStorage</code> utilizando <code>useEffect()</code> y recuperación
                automática con <code>JSON.parse()</code> al recargar la página (F5).
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Inicio;
