import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { usePortal } from "../context/PortalContext";
import FeaturedCourseCarousel from "../components/FeaturedCourseCarousel";

const PROXIMOS_EVENTOS = [
  { dia: "Lun 24", titulo: "Inicio de clases", detalle: "Apertura oficial del semestre académico" },
  { dia: "Mié 26", titulo: "Revisión de matrículas", detalle: "Comité de programa y coordinación" },
  { dia: "Vie 28", titulo: "Cierre de registro", detalle: "Fecha límite de matrícula y ajustes" }
];

function Inicio() {
  const { usuario } = useAuth();
  const { config, materias, carreras, estudiantes, matriculas, obtenerMateriasQuedadas } = usePortal();
  const esAdmin = usuario?.rol === "administrador";
  const estudianteActual = !esAdmin
    ? estudiantes.find((e) => e.id === usuario?.id)
    : null;
  const carreraEstudiante = estudianteActual
    ? carreras.find((c) => c.id === estudianteActual.carreraId)
    : null;
  const nombreUsuario = estudianteActual?.nombre || usuario?.nombre || "Usuario";

  const materiasQuedadas = estudianteActual
    ? obtenerMateriasQuedadas(estudianteActual.id)
    : [];
  const semestresAprobados = estudianteActual
    ? estudianteActual.semestresCursados.filter((s) => s.estado === "Aprobado").length
    : 0;
  const matriculasPendientes = matriculas.filter((m) => m.estado === "Pendiente").length;

  const notificaciones = esAdmin
    ? [
        ...matriculas.slice(0, 3).map((m) => ({
          id: m.id,
          titulo: `Matrícula: ${m.estudianteNombre}`,
          detalle: `${m.estado} · Semestre ${m.semestreNumero} (${m.totalCreditos} cr.)`,
          tipo: m.estado === "Aprobada" ? "ok" : m.estado === "Pendiente" ? "pending" : "info"
        })),
        {
          id: "sys-cfg",
          titulo: "Límite de créditos activo",
          detalle: `Máximo ${config.maxCreditosSemestre} créditos por semestre`,
          tipo: "info"
        }
      ]
    : [
        ...matriculas
          .filter((m) => m.estudianteId === usuario?.id)
          .slice(0, 2)
          .map((m) => ({
            id: m.id,
            titulo: `Solicitud Semestre ${m.semestreNumero}`,
            detalle: `Estado: ${m.estado} · ${m.totalCreditos} créditos`,
            tipo: m.estado === "Aprobada" ? "ok" : "pending"
          })),
        {
          id: "sys-est",
          titulo: materiasQuedadas.length > 0 ? "Materias pendientes por repetir" : "Historial al día",
          detalle:
            materiasQuedadas.length > 0
              ? `Tienes ${materiasQuedadas.length} materia(s) reprobada(s) disponible(s) para rematricular.`
              : `Máximo permitido: ${config.maxCreditosSemestre} créditos por semestre.`,
          tipo: materiasQuedadas.length > 0 ? "pending" : "info"
        }
      ];

  return (
    <main className="main-content page-enter">
      <div className="dashboard-layout">
        <div className="dashboard-main">
          <section className="dashboard-hero">
            <div className="dashboard-hero-copy">
              <span className="dashboard-hero-eyebrow">
                ¡BIENVENIDO, {nombreUsuario.toUpperCase()}!
              </span>
              <h1 className="dashboard-hero-title">Academiq Hub</h1>
              <p className="dashboard-hero-subtitle">
                Plataforma académica institucional ·{" "}
                {esAdmin
                  ? "Panel de Administración"
                  : carreraEstudiante?.nombre || usuario?.programa || "Ingeniería en Sistemas"}
              </p>

            </div>

            <div className="dashboard-hero-art" aria-hidden="true">
              <svg viewBox="0 0 220 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="hero-svg">
                <rect x="28" y="34" width="132" height="84" rx="10" fill="#ffffff" stroke="#93c5fd" strokeWidth="2.5" />
                <rect x="40" y="46" width="108" height="54" rx="6" fill="#eff6ff" />
                <rect x="52" y="58" width="52" height="8" rx="4" fill="#2563eb" />
                <rect x="52" y="72" width="84" height="6" rx="3" fill="#93c5fd" />
                <rect x="52" y="84" width="66" height="6" rx="3" fill="#bfdbfe" />
                <path d="M78 118h32l6 14H72l6-14z" fill="#bfdbfe" />
                <rect x="60" y="132" width="68" height="6" rx="3" fill="#2563eb" />
                <g transform="translate(132, 16)">
                  <path d="M36 6L6 20l30 14 30-14-30-14z" fill="#0f172a" />
                  <path d="M16 25v14c0 6 9 11 20 11s20-5 20-11V25l-20 9-20-9z" fill="#1e293b" />
                  <line x1="62" y1="22" x2="62" y2="42" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" />
                  <circle cx="62" cy="44" r="3.5" fill="#2563eb" />
                </g>
              </svg>
            </div>
          </section>

          <section className="kpi-grid" aria-label="Indicadores principales">
            {esAdmin ? (
              <>
                <article className="kpi-card kpi-card--blue">
                  <span className="kpi-label">Materias registradas</span>
                  <strong className="kpi-value">{materias.length}</strong>
                  <span className="kpi-meta">Catálogo académico</span>
                </article>
                <article className="kpi-card kpi-card--lavender">
                  <span className="kpi-label">Carreras activas</span>
                  <strong className="kpi-value">{carreras.length}</strong>
                  <span className="kpi-meta">Planes curriculares</span>
                </article>
                <article className="kpi-card kpi-card--green">
                  <span className="kpi-label">Estudiantes</span>
                  <strong className="kpi-value">{estudiantes.length}</strong>
                  <span className="kpi-meta">Activos en plataforma</span>
                </article>
                <article className="kpi-card kpi-card--amber">
                  <span className="kpi-label">Matrículas pendientes</span>
                  <strong className="kpi-value">{matriculasPendientes}</strong>
                  <span className="kpi-meta">Por revisar</span>
                </article>
              </>
            ) : (
              <>
                <article className="kpi-card kpi-card--blue">
                  <span className="kpi-label">Semestres aprobados</span>
                  <strong className="kpi-value">{semestresAprobados}</strong>
                  <span className="kpi-meta">Historial académico</span>
                </article>
                <article className="kpi-card kpi-card--amber">
                  <span className="kpi-label">Materias quedadas</span>
                  <strong className="kpi-value">{materiasQuedadas.length}</strong>
                  <span className="kpi-meta">Disponibles para repetir</span>
                </article>
                <article className="kpi-card kpi-card--green">
                  <span className="kpi-label">Límite de créditos</span>
                  <strong className="kpi-value">{config.maxCreditosSemestre}</strong>
                  <span className="kpi-meta">Tope por semestre</span>
                </article>
                <article className="kpi-card kpi-card--lavender">
                  <span className="kpi-label">Código estudiantil</span>
                  <strong className="kpi-value kpi-value--text">
                    {estudianteActual?.codigo || usuario?.codigo}
                  </strong>
                  <span className="kpi-meta">{carreraEstudiante?.codigo || "UNICOMFACAUCA"}</span>
                </article>
              </>
            )}
          </section>

          <section className="dashboard-section">
            <div className="dashboard-section-head">
              <h2>Asignaturas destacadas</h2>
              <Link to={esAdmin ? "/admin/materias" : "/semestres"} className="dashboard-link">
                {esAdmin ? "Gestionar todas →" : "Ver mis semestres →"}
              </Link>
            </div>
            <FeaturedCourseCarousel cursos={materias} />
          </section>
        </div>

        <aside className="dashboard-rail" aria-label="Resumen lateral">
          <section className="rail-card">
            <div className="rail-card-head">
              <h3>Notificaciones</h3>
              <span className="badge badge--pending">{notificaciones.length}</span>
            </div>
            <div className="notif-list">
              {notificaciones.map((item) => (
                <div key={item.id} className="notif-item">
                  <span className={`notif-status notif-status--${item.tipo}`} aria-hidden="true">
                    {item.tipo === "ok" ? "✓" : item.tipo === "pending" ? "!" : "i"}
                  </span>
                  <div className="notif-content">
                    <strong>{item.titulo}</strong>
                    <span>{item.detalle}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rail-card">
            <div className="rail-card-head">
              <h3>Próximos eventos</h3>
              <span className="rail-card-tag">Calendario</span>
            </div>
            <div className="event-list">
              {PROXIMOS_EVENTOS.map((ev) => (
                <div key={ev.dia} className="event-item">
                  <span className="event-date">{ev.dia}</span>
                  <div className="event-content">
                    <strong>{ev.titulo}</strong>
                    <span>{ev.detalle}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}

export default Inicio;
